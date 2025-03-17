
import React from "react";
import { Layout } from "@/components/layout/Layout";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <div className="prose max-w-none">
          <p className="mb-4">Last Updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
          <p>
            Welcome to Grocery Match ("we," "our," or "us"). We are committed to protecting your privacy and handling your personal information with transparency and care. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Information We Collect</h2>
          <h3 className="text-xl font-medium mt-6 mb-3">Personal Information</h3>
          <p>
            We may collect the following personal information when you register for an account, place an order, or interact with our website:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Billing and shipping address</li>
            <li>Payment information (we do not store complete credit card details)</li>
            <li>Account login credentials</li>
          </ul>
          
          <h3 className="text-xl font-medium mt-6 mb-3">Usage Information</h3>
          <p>
            When you browse our website, we automatically collect:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Device information</li>
            <li>Pages visited and time spent</li>
            <li>Referral sources</li>
            <li>Shopping behaviors (items viewed, added to cart, purchased)</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. How We Use Your Information</h2>
          <p>
            We use your information for the following purposes:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Processing and fulfilling your orders</li>
            <li>Creating and managing your account</li>
            <li>Providing customer support</li>
            <li>Sending order confirmations and updates</li>
            <li>Personalizing your shopping experience</li>
            <li>Sending marketing communications (with your consent)</li>
            <li>Analyzing and improving our website and services</li>
            <li>Preventing fraud and ensuring security</li>
            <li>Complying with legal obligations</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can manage cookie preferences through your browser settings.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">5. How We Share Your Information</h2>
          <p>
            We may share your information with:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Service providers (payment processors, shipping companies, etc.)</li>
            <li>Business partners (with your consent)</li>
            <li>Legal authorities (when required by law)</li>
          </ul>
          <p>
            We do not sell your personal information to third parties.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Data Security</h2>
          <p>
            We implement appropriate security measures to protect your information from unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is completely secure, and we cannot guarantee absolute security.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Your Privacy Rights</h2>
          <p>
            Depending on your location, you may have the right to:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Delete your personal data</li>
            <li>Object to or restrict processing</li>
            <li>Data portability</li>
            <li>Withdraw consent</li>
          </ul>
          <p>
            To exercise these rights, please contact us using the information in the "Contact Us" section.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Children's Privacy</h2>
          <p>
            Our website is not intended for children under 16. We do not knowingly collect personal information from children under 16. If you believe we have inadvertently collected information from a child, please contact us to have it removed.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will notify you of significant changes by posting the updated policy on our website with a revised "Last Updated" date.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">10. Contact Us</h2>
          <p>
            If you have questions or concerns about this Privacy Policy or our data practices, please contact us at:
          </p>
          <p>
            Email: privacy@grocerymatch.com<br />
            Address: 123 Main Street, Anytown, USA 12345<br />
            Phone: (555) 123-4567
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
