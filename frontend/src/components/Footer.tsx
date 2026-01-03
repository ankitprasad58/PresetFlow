// frontend/src/components/Footer.tsx
import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Heart,
  Shield,
  CreditCard,
  Headphones,
} from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900/95 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4 gradient-text">
              PresetFlow
            </h3>
            <p className="text-gray-400 mb-4">
              Professional video editing presets for creators worldwide.
              Transform your footage with our premium collection.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="p-2 bg-gray-800 rounded-lg hover:bg-purple-600 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-800 rounded-lg hover:bg-blue-400 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-800 rounded-lg hover:bg-pink-600 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-800 rounded-lg hover:bg-red-600 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  All Presets
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Popular Bundles
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Free Samples
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Tutorials
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Affiliate Program
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-bold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Refund Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Trust Badges */}
          <div>
            <h4 className="text-lg font-bold mb-4">100% Secure & Trusted</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Shield className="w-6 h-6 text-green-400" />
                <div>
                  <p className="font-semibold">Secure Payments</p>
                  <p className="text-sm text-gray-400">
                    256-bit SSL encryption
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <CreditCard className="w-6 h-6 text-blue-400" />
                <div>
                  <p className="font-semibold">Multiple Payment Options</p>
                  <p className="text-sm text-gray-400">
                    Cards, UPI, Net Banking
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Headphones className="w-6 h-6 text-yellow-400" />
                <div>
                  {/* <p className="font-semibold">24/7 Support</p> */}
                  <p className="text-sm text-gray-400">Email & Live Chat</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            © {new Date().getFullYear()} PresetFlow. All rights reserved. Made
            with <Heart className="inline w-4 h-4 text-red-500" /> by creators
            for creators.
          </p>
          <div className="flex items-center space-x-6">
            <img
              src="https://stripe.com/img/v3/home/social.png"
              alt="Stripe"
              className="h-8 opacity-70"
            />
            <img
              src="https://www.ssl.com/wp-content/uploads/2021/02/SSLcom-Secure-Site.svg"
              alt="SSL Secure"
              className="h-8 opacity-70"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
