import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — HypeCheck",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] px-4 py-16">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="text-[13px] text-[#555555] hover:text-[#999999] transition-colors"
        >
          ← Back to home
        </Link>

        <h1 className="mt-8 text-3xl font-bold text-[#F5F5F5]">Privacy Policy</h1>
        <p className="mt-2 text-[13px] text-[#555555]">Last updated: May 2026</p>

        <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-[#999999]">
          <section>
            <h2 className="mb-3 text-lg font-semibold text-[#F5F5F5]">Who we are</h2>
            <p>
              HypeCheck is a product by NullHype AI. This policy explains what data we collect,
              why we collect it, and how we handle it. We believe in minimal data collection —
              we only store what is necessary to provide the service.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[#F5F5F5]">What we collect</h2>
            <p className="mb-3">When you use HypeCheck, we collect and store:</p>
            <p className="mb-2">
              <span className="text-[#F5F5F5] font-medium">Account information:</span> Your
              email address and display name, provided by Google or GitHub when you sign in
              via OAuth. We do not store your password — authentication is handled entirely
              by your OAuth provider.
            </p>
            <p className="mb-2">
              <span className="text-[#F5F5F5] font-medium">Idea submissions:</span> The text
              you enter when requesting a HypeCheck report. This is stored so you can access
              your report history.
            </p>
            <p className="mb-2">
              <span className="text-[#F5F5F5] font-medium">Generated reports:</span> The AI
              generated validation reports, stored in your account so you can revisit and
              share them.
            </p>
            <p>
              <span className="text-[#F5F5F5] font-medium">Payment information:</span> Payments
              are processed by Dodo Payments. We do not see, store, or have access to your
              credit card number or banking details. We only receive a confirmation that
              payment succeeded along with your user ID to credit your account.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[#F5F5F5]">How your idea is processed</h2>
            <p>
              When you submit an idea, it is sent to the Anthropic Claude API to generate your
              report. Anthropic processes the text to produce the analysis and does not use your
              input to train their models. For details, refer to{" "}
              <a
                href="https://www.anthropic.com/policies/privacy"
                className="text-[#60A5FA] hover:text-[#93C5FD] underline underline-offset-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Anthropic&apos;s privacy policy
              </a>.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[#F5F5F5]">Where your data is stored</h2>
            <p>
              Your data is stored in Supabase (hosted on AWS infrastructure). Authentication
              is managed by Supabase Auth. The application is hosted on Vercel. All data
              is transmitted over HTTPS.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[#F5F5F5]">Cookies and tracking</h2>
            <p>
              We do not use analytics cookies, tracking pixels, or any third-party tracking
              tools. The only cookies used are essential authentication cookies set by Supabase
              to keep you signed in.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[#F5F5F5]">Shareable reports</h2>
            <p>
              Reports are accessible via a unique URL. Anyone with the link can view the report
              content. If you share a report link publicly, the idea text and analysis in that
              report become publicly visible. You control whether to share each link.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[#F5F5F5]">Your rights</h2>
            <p>
              You can request deletion of your account and all associated data at any time by
              emailing us. If you are in the EU, you have additional rights under GDPR including
              the right to access, correct, and port your data. We will respond to any data
              request within 30 days.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[#F5F5F5]">Data retention</h2>
            <p>
              Your account data and reports are retained as long as your account is active.
              If you request account deletion, all data is permanently removed within 30 days.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[#F5F5F5]">Contact</h2>
            <p>
              For any privacy related questions or data deletion requests, email us at{" "}
              <a
                href="mailto:hello@nullhype.tech"
                className="text-[#60A5FA] hover:text-[#93C5FD] underline underline-offset-2"
              >
                hello@nullhype.tech
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
