
import React from "react";
import { Layout } from "@/components/layout/Layout";

const RefundPolicy = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Refund Policy</h1>
        <div className="prose max-w-none">
          <p className="mb-4">Last Updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Return Eligibility</h2>
          <p>
            At Grocery Match, we want you to be completely satisfied with your purchase. You may return items within 30 days of delivery under the following conditions:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Items must be unused, unopened, and in their original packaging</li>
            <li>Perishable items must be reported within 24 hours of delivery</li>
            <li>You must have proof of purchase (order number, receipt)</li>
          </ul>
          
          <p className="font-medium mt-4">Items not eligible for return:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Opened food items (unless defective)</li>
            <li>Gift cards</li>
            <li>Personalized or custom-made products</li>
            <li>Clearance or final sale items</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Return Process</h2>
          <p>
            To initiate a return:
          </p>
          <ol className="list-decimal pl-6 mb-4">
            <li>Log in to your account and visit the "Order History" section</li>
            <li>Select the order and items you wish to return</li>
            <li>Fill out the return reason</li>
            <li>Print the prepaid return shipping label (if applicable)</li>
            <li>Package the items securely in their original packaging</li>
            <li>Attach the return label and drop off at the specified carrier</li>
          </ol>
          <p>
            Alternatively, you can contact our customer service team at returns@grocerymatch.com or call (555) 123-4567 for assistance with your return.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Refund Options</h2>
          <p>
            We offer several refund options:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><span className="font-medium">Original payment method:</span> Refund to the credit card, debit card, or payment service used for purchase</li>
            <li><span className="font-medium">Store credit:</span> Receive store credit worth 110% of the purchase price (excluding shipping)</li>
            <li><span className="font-medium">Replacement:</span> We can ship a replacement for defective or damaged items</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Refund Timeline</h2>
          <p>
            After receiving your return:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>We inspect the items within 1-2 business days</li>
            <li>Approved refunds are processed within 3-5 business days</li>
            <li>It may take an additional 5-10 business days for the refund to appear on your account, depending on your financial institution</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Damaged or Defective Items</h2>
          <p>
            If you receive damaged or defective items:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Contact us within 48 hours of delivery (24 hours for perishable items)</li>
            <li>Provide photos of the damaged items and packaging</li>
            <li>We'll process a refund or replacement without requiring a return in most cases</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Return Shipping</h2>
          <p>
            For returns due to our error (wrong item, defective product, etc.), we provide prepaid return shipping labels. For returns due to customer preference, a shipping fee of $5.99 may be deducted from the refund amount, unless the order qualifies for free returns.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Exchanges</h2>
          <p>
            For exchanges:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Initiate a return for the original item</li>
            <li>Place a new order for the desired item</li>
            <li>Note in the return form that you've placed an exchange order</li>
            <li>We'll expedite the new order when possible</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Gift Returns</h2>
          <p>
            For gifts purchased from our website:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Returns are accepted with a gift receipt</li>
            <li>Refunds for gift returns are issued as store credit to the recipient</li>
            <li>The original purchaser will not be notified of the return</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Subscription Cancellations</h2>
          <p>
            For subscription-based products:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>You may cancel recurring subscriptions at any time from your account settings</li>
            <li>Partial refunds may be available for unused subscription periods</li>
            <li>Cancellations must be made at least 3 business days before the next scheduled delivery</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">10. Exceptions and Special Cases</h2>
          <p>
            We evaluate exceptional circumstances on a case-by-case basis. Please contact our customer service team if you have a special situation regarding a return or refund.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">11. Contact Information</h2>
          <p>
            For questions or assistance with returns and refunds:
          </p>
          <p>
            Email: returns@grocerymatch.com<br />
            Phone: (555) 123-4567<br />
            Hours: Monday-Friday, 9 AM - 6 PM EST
          </p>
          <p>
            This refund policy may be updated periodically. The policy in effect at the time of your purchase will apply to your return.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default RefundPolicy;
