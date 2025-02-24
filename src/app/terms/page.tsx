export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      
      <div className="prose dark:prose-invert">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing and using Clean Convert, you agree to be bound by these Terms of Service.
            If you do not agree to these terms, please do not use our service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Service Description</h2>
          <p>
            Clean Convert provides image conversion services. We allow users to convert images
            between different formats, with both free and premium features available.
          </p>
          <ul className="list-disc pl-6 mt-4">
            <li>Free users can convert single images</li>
            <li>Registered users can convert multiple images using credits</li>
            <li>Maximum file size per image: 10MB</li>
            <li>Supported formats: JPEG, PNG, WebP, GIF, TIFF, AVIF, HEIF</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>You must provide accurate registration information</li>
            <li>You are responsible for maintaining your account security</li>
            <li>You must not upload malicious or illegal content</li>
            <li>You must respect intellectual property rights</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Credits and Payments</h2>
          <p>
            Credits are required for multiple image conversions. Credits can be purchased
            through our platform. Unused credits do not expire. Refunds are handled on a
            case-by-case basis.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Service Limitations</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>We do not guarantee 100% service availability</li>
            <li>We reserve the right to modify or discontinue services</li>
            <li>We may update these terms at any time</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Contact Information</h2>
          <p>
            For questions about these Terms of Service, please contact us at{' '}
            <a href="mailto:support@cleanconvert.com" className="text-primary hover:underline">
              support@cleanconvert.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
