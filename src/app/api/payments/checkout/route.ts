import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import DodoPayments from 'dodopayments'

const dodo = new DodoPayments({
  bearerToken: process.env.DODO_SECRET_KEY!,
  environment: 'test_mode',
})

const PRODUCTS = {
  single: {
    product_id: process.env.DODO_PRODUCT_ID_SINGLE!,
    credits: 1,
  },
  pack: {
    product_id: process.env.DODO_PRODUCT_ID_PACK!,
    credits: 10,
  },
} as const

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json().catch(() => ({}))
    const tier = body.tier === 'pack' ? 'pack' : 'single'
    const product = PRODUCTS[tier]

    const session = await dodo.payments.create({
      billing: {
        city: '',
        country: 'US',
        state: '',
        street: '',
        zipcode: '',
      },
      customer: {
        email: user.email!,
        name: user.email!,
      },
      product_cart: [
        {
          product_id: product.product_id,
          quantity: 1,
        },
      ],
      payment_link: true,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/check?purchased=true`,
      metadata: {
        supabase_user_id: user.id,
        tier: tier,
        credits: String(product.credits),
      },
    })

    return NextResponse.json({ url: session.payment_link })
  } catch (error) {
    console.error('Dodo checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
