
import React from "react";
import { Layout } from "@/components/layout/Layout";

const ShippingPolicy = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Shipping Policy</h1>
        <div className="prose max-w-none">
          <p className="mb-4">Last Updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Shipping Methods and Delivery Times</h2>
          <p>
            At Grocery Match, we offer several shipping methods to ensure your ingredients arrive fresh and on time:
          </p>
          <table className="w-full border-collapse mb-6">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 text-left">Shipping Method</th>
                <th className="border border-gray-300 p-2 text-left">Estimated Delivery Time</th>
                <th className="border border-gray-300 p-2 text-left">Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">Standard Shipping</td>
                <td className="border border-gray-300 p-2">3-5 business days</td>
                <td className="border border-gray-300 p-2">$5.99 (Free on orders over $50)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Express Shipping</td>
                <td className="border border-gray-300 p-2">2 business days</td>
                <td className="border border-gray-300 p-2">$12.99</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Next Day Delivery</td>
                <td className="border border-gray-300 p-2">1 business day</td>
                <td className="border border-gray-300 p-2">$19.99</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Same Day Delivery</td>
                <td className="border border-gray-300 p-2">Same day (orders before 11 AM)</td>
                <td className="border border-gray-300 p-2">$24.99 (Available in select areas)</td>
              </tr>
            </tbody>
          </table>
          <p>
            Business days are Monday through Friday, excluding holidays. Orders placed after 2 PM may be processed the following business day.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Order Processing</h2>
          <p>
            Orders are typically processed within 24 hours of being placed. During high-volume periods (holidays, special promotions), processing may take up to 48 hours. You will receive a confirmation email when your order has been processed and another when it has shipped, including tracking information.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Delivery Areas</h2>
          <p>
            We currently ship to all 50 United States and select international destinations. Same Day Delivery is available only in major metropolitan areas. To check if your location is eligible for Same Day Delivery, enter your zip code during checkout.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Perishable Items</h2>
          <p>
            For perishable items, we use insulated packaging and cooling materials to ensure freshness during transit. Perishable orders are shipped early in the week (Monday-Wednesday) to avoid weekend delays. During extreme weather conditions, perishable shipments may be delayed for safety.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Shipping Restrictions</h2>
          <p>
            Certain items, including alcohol and some specialty ingredients, may have shipping restrictions based on state or local regulations. These restrictions will be noted on product pages.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Order Tracking</h2>
          <p>
            Once your order ships, you will receive an email with tracking information. You can also view order status and tracking details in the "Order History" section of your account.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Shipping Delays</h2>
          <p>
            While we strive to meet our delivery estimates, delays can occur due to:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Severe weather conditions</li>
            <li>Carrier delays</li>
            <li>Natural disasters</li>
            <li>Holidays</li>
            <li>Incorrect shipping information</li>
          </ul>
          <p>
            We will notify you of any significant delays and provide updated delivery estimates when possible.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Delivery Issues</h2>
          <p>
            If you experience any of the following issues, please contact customer service within 48 hours:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Missing items</li>
            <li>Damaged products</li>
            <li>Quality concerns</li>
            <li>Incorrect items received</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Signature Requirement</h2>
          <p>
            Orders over $100 and orders containing alcohol require an adult signature (21+) upon delivery. If no one is available to sign, the carrier will leave a notice and attempt delivery again on the next business day.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">10. International Shipping</h2>
          <p>
            For international orders, customers are responsible for all duties, taxes, and customs fees. Delivery times for international shipments typically range from 7-21 business days, depending on the destination and customs processing.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">11. Contact Us</h2>
          <p>
            If you have any questions about our shipping policy, please contact our customer service team:
          </p>
          <p>
            Email: shipping@grocerymatch.com<br />
            Phone: (555) 123-4567<br />
            Hours: Monday-Friday, 9 AM - 6 PM EST
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default ShippingPolicy;
