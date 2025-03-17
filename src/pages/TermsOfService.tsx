
import React from "react";
import { Layout } from "@/components/layout/Layout";

const TermsOfService = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <div className="prose max-w-none">
          <p className="mb-4">Last Updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Agreement to Terms</h2>
          <p>
            By accessing or using Grocery Match, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the materials on Grocery Match for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose or for any public display</li>
            <li>Attempt to reverse engineer any software contained on Grocery Match</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
            <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
          </ul>
          <p>
            This license shall automatically terminate if you violate any of these restrictions and may be terminated by Grocery Match at any time.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Account Registration</h2>
          <p>
            To access certain features of the website, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
          </p>
          <p>
            You are responsible for safeguarding your password and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">4. User Conduct</h2>
          <p>
            While using our website, you agree not to:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe upon the rights of others</li>
            <li>Distribute harmful code or interfere with website operation</li>
            <li>Impersonate any person or entity</li>
            <li>Engage in any activity that could harm minors</li>
            <li>Harvest or collect user information without consent</li>
            <li>Use the website for unauthorized advertising or promotions</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Products and Ordering</h2>
          <p>
            Product descriptions, pricing, and availability are subject to change without notice. We reserve the right to limit quantities, terminate accounts, or cancel orders at our discretion.
          </p>
          <p>
            By placing an order, you represent that you are authorized to use the payment method and shipping address provided. We reserve the right to verify information before accepting or shipping orders.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Pricing and Payment</h2>
          <p>
            All prices are shown in USD and do not include applicable taxes and shipping costs, which will be added at checkout. Payment must be made at the time of order placement through our secure payment system.
          </p>
          <p>
            While we strive to display accurate pricing, errors may occur. If we discover an error in the price of products you have ordered, we will inform you and give you the option to continue with the correct price or cancel your order.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Intellectual Property</h2>
          <p>
            The website content, including text, graphics, logos, images, audio, video, software, and other material, is owned by Grocery Match or its licensors and is protected by copyright, trademark, and other intellectual property laws.
          </p>
          <p>
            You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any content without our express written permission.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Disclaimer</h2>
          <p>
            The materials on Grocery Match are provided on an 'as is' basis. Grocery Match makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Limitation of Liability</h2>
          <p>
            In no event shall Grocery Match or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Grocery Match, even if Grocery Match or a Grocery Match authorized representative has been notified orally or in writing of the possibility of such damage.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">10. Governing Law</h2>
          <p>
            These Terms of Service shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions. Any disputes relating to these terms shall be subject to the exclusive jurisdiction of the courts of the United States.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">11. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting on the website. Your continued use of the website after any changes indicates your acceptance of the modified terms.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">12. Contact Us</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at:
          </p>
          <p>
            Email: terms@grocerymatch.com<br />
            Address: 123 Main Street, Anytown, USA 12345<br />
            Phone: (555) 123-4567
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default TermsOfService;
