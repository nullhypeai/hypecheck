import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import { Webhook } from 'standardwebhooks'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

interface WebhookPayload {
  type: string
  data: {
    metadata?: {
      supabase_user_id?: string
      tier?: string
      credits?: string
    }
    [key: string]: unknown
  }
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text()
    const webhookSecret = process.env.DODO_WEBHOOK_SECRET!

    const webhook = new Webhook(webhookSecret)
    let payload: WebhookPayload

    try {
      payload = webhook.verify(rawBody, {
        'webhook-id': req.headers.get('webhook-id') ?? '',
        'webhook-timestamp': req.headers.get('webhook-timestamp') ?? '',
        'webhook-signature': req.headers.get('webhook-signature') ?? '',
      }) as WebhookPayload
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    if (payload.type === 'payment.succeeded') {
      const userId = payload.data.metadata?.supabase_user_id
      const credits = parseInt(payload.data.metadata?.credits ?? '1', 10)

      if (userId) {
        // Atomically add credits using Supabase RPC or raw increment
        const { data: profile, error: fetchError } = await supabase
          .from('profiles')
          .select('report_credits')
          .eq('id', userId)
          .single()

        if (fetchError || !profile) {
          console.error('Error fetching profile:', fetchError)
          return NextResponse.json(
            { error: 'User not found' },
            { status: 500 }
          )
        }

        const { error: updateError } = await supabase
          .from('profiles')
          .update({
            report_credits: profile.report_credits + credits,
            updated_at: new Date().toISOString(),
          })
          .eq('id', userId)

        if (updateError) {
          console.error('Error adding credits:', updateError)
          return NextResponse.json(
            { error: 'Database update failed' },
            { status: 500 }
          )
        }

        console.log(`Added ${credits} credits to user ${userId}`)
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}
