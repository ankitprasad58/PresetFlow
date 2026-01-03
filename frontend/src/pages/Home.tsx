// frontend/src/pages/Home.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Shield,
  Clock,
  TrendingUp,
  Star,
  Users,
  Award,
  ChevronRight,
} from "lucide-react";
import { useInView } from "react-intersection-observer";
import toast from "react-hot-toast";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [ref, inView] = useInView({ triggerOnce: true });

  const stats = [
    { value: "10,000+", label: "Happy Creators", icon: <Users /> },
    { value: "4.9/5", label: "Average Rating", icon: <Star /> },
    { value: "24/7", label: "Support", icon: <Shield /> },
    { value: "99%", label: "Satisfaction", icon: <TrendingUp /> },
  ];

  const presets = [
    {
      name: "Cinematic Gold",
      category: "Premium",
      price: 99,
      color: "from-yellow-600 to-orange-600",
    },
    {
      name: "Urban Night",
      category: "Popular",
      price: 99,
      color: "from-blue-600 to-purple-600",
    },
    {
      name: "Vintage Film",
      category: "Classic",
      price: 99,
      color: "from-rose-600 to-pink-600",
    },
    {
      name: "Cyberpunk",
      category: "Trending",
      price: 99,
      color: "from-green-600 to-teal-600",
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(56,189,248,0.2),transparent_50%)]"></div>
        </div>

        <div className="container mx-auto px-4 py-32 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-900 to-blue-900 border border-purple-700 rounded-full px-4 py-2 mb-6">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-semibold">
                🔥 Trending: 500+ Sold This Week
              </span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Transform Your
              </span>
              <br />
              <span className="text-white">Video Editing Game</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Professional-grade LUTs & presets that make your videos look like
              they were edited by Hollywood pros.
              <span className="text-yellow-400 font-semibold">
                {" "}
                Just ₹99 each!
              </span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  navigate("/products");
                  toast.success("🎉 Let's find your perfect preset!");
                }}
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-bold text-lg shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/50 transition-all duration-300"
              >
                <span className="flex items-center justify-center">
                  Browse All Presets
                  <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  toast("✨ Try our free sample preset!", { icon: "🎁" })
                }
                className="px-8 py-4 bg-gray-800 border border-gray-700 rounded-xl font-bold text-lg hover:bg-gray-700 transition-all duration-300"
              >
                Try Free Sample
              </motion.button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-gray-400 text-sm">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span>30-Day Money Back</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-yellow-400" />
                <span>Instant Download</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-purple-400" />
                <span>Industry Standard</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="absolute top-1/4 left-10 w-4 h-4 bg-purple-500 rounded-full blur-xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 4, delay: 0.5 }}
          className="absolute bottom-1/4 right-10 w-6 h-6 bg-blue-500 rounded-full blur-xl"
        />
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 text-center"
              >
                <div className="text-purple-400 mb-2 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Presets */}
      <section ref={ref} className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Most Popular Presets</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              These presets are flying off the shelves! Join thousands of
              satisfied creators.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {presets.map((preset, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => navigate("/products")}
              >
                {/* Glow Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${preset.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                ></div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 bg-gray-900 rounded-full text-xs font-semibold">
                      {preset.category}
                    </span>
                    <div className="flex items-center text-yellow-400">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="ml-1 text-sm">4.9</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-2">{preset.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Perfect for cinematic footage, adds depth and mood to your
                    videos
                  </p>

                  <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold text-green-400">
                      ₹{preset.price}
                    </div>
                    <button className="px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg text-sm font-semibold group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-300">
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Urgency Banner */}
      <div className="sticky bottom-0 z-40 bg-gradient-to-r from-red-900 to-orange-900 border-t border-red-700">
        <div className="container mx-auto px-4 py-3 text-center">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-2 md:mb-0">
              <Clock className="w-5 h-5 animate-pulse" />
              <span className="font-bold">LIMITED TIME OFFER:</span>
              <span>Buy 3 presets, get 1 FREE!</span>
            </div>
            <button
              onClick={() => navigate("/products")}
              className="px-6 py-2 bg-white text-red-700 font-bold rounded-lg hover:bg-red-50 transition-colors"
            >
              Claim Offer Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
