import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/shared/PageHero";

const TermsPage = () => {
  return (
    <Layout>
      <PageHero
        title="Terms & Conditions"
        subtitle="Please read these terms carefully before using our website."
        badge="Legal"
      />

      <section className="py-20 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <div className="bg-card rounded-2xl p-8 lg:p-12 shadow-card border border-border">
              <p className="text-muted-foreground mb-8">
                Last updated: January 2024
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground mb-6">
                By accessing and using the Ghana Adventist Health Services (GAHS) website, you accept and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our website.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">2. Use of Website</h2>
              <p className="text-muted-foreground mb-4">
                You agree to use this website only for lawful purposes and in a way that does not:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                <li>Infringe the rights of others</li>
                <li>Restrict or inhibit anyone else's use of the website</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Transmit harmful, offensive, or illegal content</li>
              </ul>

              <h2 className="text-2xl font-bold text-foreground mb-4">3. Intellectual Property</h2>
              <p className="text-muted-foreground mb-6">
                All content on this website, including text, graphics, logos, images, and software, is the property of GAHS or its content suppliers and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">4. Medical Disclaimer</h2>
              <p className="text-muted-foreground mb-6">
                The information provided on this website is for general informational purposes only and should not be considered as medical advice. Always consult with a qualified healthcare professional for medical concerns. GAHS does not recommend or endorse any specific tests, physicians, products, or procedures.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">5. Limitation of Liability</h2>
              <p className="text-muted-foreground mb-6">
                GAHS shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of this website or any content, products, or services obtained through the website.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">6. External Links</h2>
              <p className="text-muted-foreground mb-6">
                This website may contain links to external websites. GAHS is not responsible for the content, privacy policies, or practices of any third-party websites. We encourage you to review the terms and privacy policies of any linked sites.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">7. Changes to Terms</h2>
              <p className="text-muted-foreground mb-6">
                GAHS reserves the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting on the website. Your continued use of the website after any changes constitutes acceptance of the new terms.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">8. Governing Law</h2>
              <p className="text-muted-foreground mb-6">
                These Terms and Conditions are governed by the laws of the Republic of Ghana. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Ghana.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">9. Contact Information</h2>
              <p className="text-muted-foreground">
                For questions about these Terms and Conditions, please contact us at:<br />
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

export default TermsPage;
