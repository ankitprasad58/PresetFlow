import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const Success: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-16 text-center"
    >
      <div className="mb-8">
        <Check className="w-20 h-20 text-green-500 mx-auto" />
      </div>
      <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
      <p className="text-gray-400 mb-8">
        Your presets will be available in your dashboard
      </p>
      <button
        onClick={() => navigate("/dashboard")}
        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
      >
        Go to Dashboard
      </button>
    </motion.div>
  );
};

export default Success;
