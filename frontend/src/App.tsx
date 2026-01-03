// frontend/src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Checkout from "./pages/checkout";
import Dashboard from "./pages/Dashboard";
import Success from "./pages/Success";
import Auth from "./pages/Auth";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";
import "./styles/global.css";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Elements stripe={stripePromise}>
          <Router>
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/success" element={<Success />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
              </Routes>
              <Footer />
              <Toaster
                position="top-right"
                toastOptions={{
                  style: {
                    background: "#1f2937",
                    color: "#fff",
                    border: "1px solid #374151",
                  },
                }}
              />
            </div>
          </Router>
        </Elements>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
