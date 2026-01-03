import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  Trash2,
  ArrowLeft,
  Lock,
  Shield,
  CreditCard,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import toast from "react-hot-toast";

// Define CartItem interface
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = ({ amount }: { amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setPaymentError("");

    try {
      setTimeout(() => {
        toast.success("Payment successful! Redirecting...");
        navigate("/success");
      }, 2000);
    } catch (error) {
      setPaymentError("Payment failed. Please try again.");
      toast.error("Payment failed");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="glass-effect rounded-2xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Lock className="w-5 h-5 mr-2 text-green-500" />
          Secure Payment Details
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Card Information
            </label>
            <div className="p-4 border border-gray-600 rounded-xl bg-gray-900/50">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#ffffff",
                      "::placeholder": {
                        color: "#9ca3af",
                      },
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Expiry Date
              </label>
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full p-3 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                CVC
              </label>
              <input
                type="text"
                placeholder="123"
                className="w-full p-3 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {paymentError && (
        <div className="p-4 bg-red-900/30 border border-red-700 rounded-xl flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 text-red-400" />
          <span className="text-red-300">{paymentError}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={processing || !stripe}
        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-emerald-500/25"
      >
        {processing ? (
          <span className="flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            Processing...
          </span>
        ) : (
          `Pay ₹${(amount * 1.18).toFixed(2)}`
        )}
      </button>
    </form>
  );
};

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: "1",
      name: "LUT Color Grading Pack",
      price: 99.99,
      quantity: 1,
    },
  ]);

  // Calculate totals
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = total * 0.18;
  const finalTotal = total + tax;

  // Cart functions
  const removeFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCart(
      cart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center">
            <CreditCard className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-400 mb-8">Add some presets to get started!</p>
          <button
            onClick={() => navigate("/products")}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all"
          >
            Browse Presets
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8 max-w-6xl"
    >
      <div className="flex items-center mb-8">
        <button
          onClick={() => navigate("/products")}
          className="flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Continue Shopping
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Order Summary */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-2">Checkout</h1>
          <p className="text-gray-400 mb-6">
            Review your order and complete payment
          </p>

          {/* Cart Items */}
          <div className="glass-effect rounded-2xl p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">
                Your Presets ({cart.length})
              </h2>
              <button
                onClick={clearCart}
                className="text-sm text-red-400 hover:text-red-300 flex items-center"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Clear All
              </button>
            </div>

            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl border border-gray-700 group hover:border-purple-500 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-900 to-blue-900 rounded-xl flex items-center justify-center">
                      <div className="text-lg font-bold">🎬</div>
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-400">Video Preset Pack</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                        className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-lg hover:bg-gray-700"
                      >
                        -
                      </button>
                      <span className="font-semibold">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-lg hover:bg-gray-700"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="font-bold text-lg">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-400">
                        ₹{item.price} each
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-gray-400 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security Info */}
          <div className="glass-effect rounded-2xl p-6">
            <div className="flex items-center space-x-4 mb-4">
              <Shield className="w-6 h-6 text-green-400" />
              <div>
                <h3 className="font-bold">Secure Payment Guarantee</h3>
                <p className="text-sm text-gray-400">
                  Your transaction is protected
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-900/50 rounded-xl">
                <Lock className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <p className="text-sm">256-bit SSL</p>
              </div>
              <div className="text-center p-4 bg-gray-900/50 rounded-xl">
                <CheckCircle className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <p className="text-sm">Money Back</p>
              </div>
              <div className="text-center p-4 bg-gray-900/50 rounded-xl">
                <CreditCard className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <p className="text-sm">Secure Payment</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Payment */}
        <div>
          <div className="sticky top-24">
            <div className="glass-effect rounded-2xl p-6 mb-6">
              <h3 className="text-lg font-bold mb-4">Order Summary</h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="font-semibold">₹{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Tax (18%)</span>
                  <span className="font-semibold">₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-4 border-t border-gray-700">
                  <span>Total</span>
                  <span className="text-green-400">
                    ₹{finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <Elements stripe={stripePromise}>
                <CheckoutForm amount={total} />
              </Elements>
            </div>

            {/* Accepted Cards */}
            <div className="text-center text-sm text-gray-400">
              <p className="mb-2">We accept</p>
              <div className="flex justify-center space-x-4">
                <div className="w-10 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded"></div>
                <div className="w-10 h-6 bg-gradient-to-r from-red-500 to-orange-500 rounded"></div>
                <div className="w-10 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded"></div>
                <div className="w-10 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Checkout;
