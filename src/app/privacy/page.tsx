import Link from "next/link";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";

export const metadata = {
  title: "Privacy Policy - HypeCheck",
};

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink">
      <SiteHeader />
      <main className="mx-auto w-full max-w-[728px] flex-1 px-4 py-12 sm:px-6 sm:py-16">
        <Link
          href="/"
          className="font-sans text-[13px] text-muted underline decoration-rule-strong underline-offset-4 transition-colors hover:text-accent"
        >
          ← Back to home
        </Link>

        <h1 className="mt-8 font-serif text-4xl font-medium tracking-tight text-ink sm:text-5xl">Privacy Policy</h1>
        <p className="kicker mt-4">Last updated: June 2026</p>

        <div className="mt-10 space-y-8 font-serif text-[17px] leading-relaxed text-ink-soft">
          <section className="border-t border-ink pt-5">
            <h2 className="mb-3 font-serif text-2xl font-medium tracking-tight text-ink">Who we are</h2>
            <p>
              HypeCheck is a product by NullHype AI. This policy explains what data we collect,
              why we collect it, and how we handle it. We believe in minimal data collection.
              we only store what is necessary to provide the service.
            </p>
          </section>

          <section className="border-t border-ink pt-5">
            <h2 className="mb-3 font-serif text-2xl font-medium tracking-tight text-ink">What we collect</h2>
            <p className="mb-3">When you use HypeCheck, we collect and store:</p>
            <p className="mb-2">
              <span className="text-ink font-medium">Account information:</span> Your
              email address and display name, provided by Google or GitHub when you sign in
              via OAuth. We do not store your password. Authentication is handled entirely
              by your OAuth provider.
            </p>
            <p className="mb-2">
              When you sign in using Google or GitHub, we collect and store your email address.
              We may use your email to send you transactional messages (such as report delivery
              confirmations), product updates, and occasional announcements about new features.
              You can request deletion of your account and associated email at any time by
              contacting hello@nullhype.tech.
            </p>
            <p className="mb-2">
              <span className="text-ink font-medium">Idea submissions:</span> The text
              you enter when requesting a HypeCheck report. This is stored so you can access
              your report history.
            </p>
            <p className="mb-2">
              <span className="text-ink font-medium">Generated reports:</span> The AI
              generated validation reports, stored in your account so you can revisit and
              share them.
            </p>
            <p>
              <span className="text-ink font-medium">Payment information:</span> Payments
              are processed by Dodo Payments. We do not see, store, or have access to your
              credit card number or banking details. We only receive a confirmation that
              payment succeeded along with your user ID to credit your account.
            </p>
          </section>

          <section className="border-t border-ink pt-5">
            <h2 className="mb-3 font-serif text-2xl font-medium tracking-tight text-ink">How your idea is processed</h2>
            <p>
              When you submit an idea, it is sent to the Anthropic Claude API to generate your
              report. Anthropic processes the text to produce the analysis and does not use your
              input to train their models. For details, refer to{" "}
              <a
                href="https://www.anthropic.com/policies/privacy"
                className="text-ink underline decoration-rule-strong underline-offset-4 transition-colors hover:text-accent"
                target="_blank"
                rel="noopener noreferrer"
              >
                Anthropic&apos;s privacy policy
              </a>.
            </p>
            <p className="mt-3">
              To research your idea, Claude runs web searches through Anthropic&apos;s web search tool, using short
              queries based on your idea (for example, the problem it solves or the names of likely competitors).
              The full text of your submission is not published anywhere.
            </p>
          </section>

          <section className="border-t border-ink pt-5">
            <h2 className="mb-3 font-serif text-2xl font-medium tracking-tight text-ink">Where your data is stored</h2>
            <p>
              Your data is stored in Supabase (hosted on AWS infrastructure). Authentication
              is managed by Supabase Auth. The application is hosted on Vercel. All data
              is transmitted over HTTPS.
            </p>
          </section>

          <section className="border-t border-ink pt-5">
            <h2 className="mb-3 font-serif text-2xl font-medium tracking-tight text-ink">Cookies and tracking</h2>
            <p>
              We use Vercel Web Analytics to understand aggregate website usage, including
              page views, referrers, device type, browser, operating system, and country. Vercel
              Web Analytics does not use cookies and reports anonymized, aggregated data rather
              than individual user profiles. We do not use analytics cookies or advertising
              tracking pixels. The only cookies used by HypeCheck are essential authentication
              cookies set by Supabase to keep you signed in.
            </p>
          </section>

          <section className="border-t border-ink pt-5">
            <h2 className="mb-3 font-serif text-2xl font-medium tracking-tight text-ink">Shareable reports</h2>
            <p>
              Reports are accessible via a unique URL. Anyone with the link can view the report
              content. If you share a report link publicly, the idea text and analysis in that
              report become publicly visible. You control whether to share each link.
            </p>
          </section>

          <section className="border-t border-ink pt-5">
            <h2 className="mb-3 font-serif text-2xl font-medium tracking-tight text-ink">Your rights</h2>
            <p>
              You can request deletion of your account and all associated data at any time by
              emailing us. If you are in the EU, you have additional rights under GDPR including
              the right to access, correct, and port your data. We will respond to any data
              request within 30 days.
            </p>
          </section>

          <section className="border-t border-ink pt-5">
            <h2 className="mb-3 font-serif text-2xl font-medium tracking-tight text-ink">Data retention</h2>
            <p>
              Your account data and reports are retained as long as your account is active.
              If you request account deletion, all data is permanently removed within 30 days.
            </p>
          </section>

          <section className="border-t border-ink pt-5">
            <h2 className="mb-3 font-serif text-2xl font-medium tracking-tight text-ink">Contact</h2>
            <p>
              For any privacy related questions or data deletion requests, email us at{" "}
              <a
                href="mailto:hello@nullhype.tech"
                className="text-ink underline decoration-rule-strong underline-offset-4 transition-colors hover:text-accent"
              >
                hello@nullhype.tech
              </a>.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
