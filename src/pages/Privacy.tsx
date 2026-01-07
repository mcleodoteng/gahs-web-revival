import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/shared/PageHero";

const PrivacyPage = () => {
  return (
    <Layout>
      <PageHero
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your personal information."
        badge="Legal"
      />

      <section className="py-20 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <div className="bg-card rounded-2xl p-8 lg:p-12 shadow-card border border-border">
              <p className="text-muted-foreground mb-8">
                Last updated: January 2024
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
              <p className="text-muted-foreground mb-6">
                Ghana Adventist Health Services (GAHS) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website or use our services.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">2. Information We Collect</h2>
              <p className="text-muted-foreground mb-4">
                We may collect the following types of information:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                <li>Personal identification information (name, email address, phone number)</li>
                <li>Contact information when you reach out to us</li>
                <li>Technical data (IP address, browser type, device information)</li>
                <li>Usage data (pages visited, time spent on site)</li>
              </ul>

              <h2 className="text-2xl font-bold text-foreground mb-4">3. How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                <li>Respond to your inquiries and provide customer support</li>
                <li>Improve our website and services</li>
                <li>Send periodic emails with updates (if subscribed)</li>
                <li>Analyze website usage to enhance user experience</li>
              </ul>

              <h2 className="text-2xl font-bold text-foreground mb-4">4. Data Protection</h2>
              <p className="text-muted-foreground mb-6">
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">5. Third-Party Disclosure</h2>
              <p className="text-muted-foreground mb-6">
                We do not sell, trade, or otherwise transfer your personal information to outside parties. This does not include trusted third parties who assist us in operating our website, conducting our business, or serving you, as long as those parties agree to keep this information confidential.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">6. Your Rights</h2>
              <p className="text-muted-foreground mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of marketing communications</li>
              </ul>

              <h2 className="text-2xl font-bold text-foreground mb-4">7. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy, please contact us at:<br />
                Email: info@gahs.org.gh<br />
                Address: GAHS Secretariat, Kumasi, Ghana
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPage;
