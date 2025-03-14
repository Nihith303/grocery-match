import React from "react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-gray-100 p-6 mt-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">CurryCart</h3>
            <p className="text-gray-600">
              Your one-stop shop for all ingredients to make delicious dishes from around the world.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
              </li>
              <li>
                <Link to="/favorites" className="text-gray-600 hover:text-gray-900">Favorites</Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-600 hover:text-gray-900">Cart</Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-600 hover:text-gray-900">Profile</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Policies</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-gray-900">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-gray-900">Terms of Service</Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-600 hover:text-gray-900">Shipping Policy</Link>
              </li>
              <li>
                <Link to="/refund" className="text-gray-600 hover:text-gray-900">Refund Policy</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} Grocery Match. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
