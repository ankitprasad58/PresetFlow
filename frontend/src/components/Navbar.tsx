// frontend/src/components/Navbar.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingCart,
  User,
  Menu,
  X,
  Shield,
  Download,
  Sparkles,
  Bell,
  Brain,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications] = useState(3); // Example notification count
  const { cart } = useCart();
  const { user, logout } = useAuth();

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-lg border-b border-gray-800 shadow-2xl">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <Sparkles className="w-8 h-8 text-purple-500 animate-pulse" />
                <div className="absolute inset-0 bg-purple-500 rounded-full blur-xl opacity-30"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  PresetFlow
                </h1>
                <p className="text-xs text-gray-400">Professional Presets</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 flex items-center space-x-1"
              >
                <Sparkles className="w-4 h-4" />
                <span>Home</span>
              </Link>
              <Link
                to="/ai-content"
                className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 flex items-center space-x-1"
              >
                <Brain className="w-4 h-4" />
                <span>AI Studio</span>
              </Link>
              <Link
                to="/products"
                className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 flex items-center space-x-1"
              >
                <Download className="w-4 h-4" />
                <span>Products</span>
              </Link>
              <Link
                to="/dashboard"
                className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 flex items-center space-x-1"
              >
                <User className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>

              {/* Security Badge */}
              <div className="flex items-center space-x-2 px-3 py-1 bg-green-900/30 border border-green-700 rounded-full">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-300">Secure</span>
              </div>

              {/* Cart with Notification */}
              <Link to="/checkout" className="relative">
                <ShoppingCart className="w-6 h-6 text-gray-300 hover:text-white transition-colors" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-600 to-pink-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </Link>

              {/* Notifications */}
              <button className="relative">
                <Bell className="w-6 h-6 text-gray-300 hover:text-yellow-400 transition-colors" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>

              {/* Auth Button */}
              {user ? (
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-red-500/25"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/auth"
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-gray-900/95 backdrop-blur-lg border-t border-gray-800"
            >
              <div className="container mx-auto px-4 py-4 space-y-4">
                <Link
                  to="/"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white py-2"
                  onClick={() => setIsOpen(false)}
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Home</span>
                </Link>
                <Link
                  to="/products"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white py-2"
                  onClick={() => setIsOpen(false)}
                >
                  <Download className="w-5 h-5" />
                  <span>Products</span>
                </Link>
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white py-2"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="w-5 h-5" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  to="/checkout"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white py-2"
                  onClick={() => setIsOpen(false)}
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Cart ({cartCount})</span>
                </Link>
                <div className="pt-4 border-t border-gray-800">
                  {user ? (
                    <button
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="w-full px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 rounded-lg font-semibold"
                    >
                      Logout
                    </button>
                  ) : (
                    <Link
                      to="/auth"
                      className="block w-full text-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold"
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
