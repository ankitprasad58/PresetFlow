// frontend/src/pages/Dashboard.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  Clock,
  Settings,
  CreditCard,
  Bell,
  Shield,
  TrendingUp,
  Package,
  User,
  LogOut,
  Eye,
  Share2,
  Star,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("presets");

  const purchasedPresets = [
    {
      id: 1,
      name: "Cinematic Gold",
      date: "2024-01-15",
      downloads: 3,
      rating: 5,
    },
    { id: 2, name: "Urban Night", date: "2024-01-10", downloads: 2, rating: 4 },
    {
      id: 3,
      name: "Vintage Film",
      date: "2024-01-05",
      downloads: 1,
      rating: 5,
    },
  ];

  const stats = [
    {
      label: "Total Spent",
      value: "₹297",
      icon: <CreditCard />,
      change: "+33%",
    },
    { label: "Presets Owned", value: "3", icon: <Package />, change: "+1 new" },
    { label: "Downloads", value: "6", icon: <Download />, change: "+2 today" },
    {
      label: "Account Age",
      value: "15 days",
      icon: <Clock />,
      change: "Active",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Welcome back, {user?.name || "Creator"}! 👋
              </h1>
              <p className="text-gray-400">
                Manage your presets, downloads, and account settings
              </p>
            </div>
            <div className="flex items-center space-x-3 mt-4 md:mt-0">
              <button className="p-3 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <button className="p-3 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button
                onClick={logout}
                className="px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 rounded-xl font-semibold flex items-center space-x-2 hover:from-red-700 hover:to-red-800 transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gray-900 rounded-xl">
                    <div className="text-purple-400">{stat.icon}</div>
                  </div>
                  <span className="text-sm text-green-400 font-semibold">
                    {stat.change}
                  </span>
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 mb-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center text-2xl font-bold">
                  {user?.name?.charAt(0) || "U"}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{user?.name || "User"}</h3>
                  <p className="text-gray-400 text-sm">{user?.email}</p>
                </div>
              </div>

              <div className="space-y-2">
                {["presets", "billing", "security", "preferences"].map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                        activeTab === tab
                          ? "bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-purple-700"
                          : "hover:bg-gray-700/50"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        {tab === "presets" && <Package className="w-5 h-5" />}
                        {tab === "billing" && (
                          <CreditCard className="w-5 h-5" />
                        )}
                        {tab === "security" && <Shield className="w-5 h-5" />}
                        {tab === "preferences" && (
                          <Settings className="w-5 h-5" />
                        )}
                        <span className="capitalize">{tab}</span>
                      </div>
                      {tab === "presets" && (
                        <span className="px-2 py-1 bg-purple-600 text-xs rounded-full">
                          {purchasedPresets.length}
                        </span>
                      )}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Security Status */}
            <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-700/50 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-6 h-6 text-green-400" />
                <h3 className="font-bold">Security Status</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">2FA</span>
                  <span className="px-2 py-1 bg-red-600 text-xs rounded-full">
                    Inactive
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Email Verified</span>
                  <span className="px-2 py-1 bg-green-600 text-xs rounded-full">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:w-3/4">
            <AnimatePresence mode="wait">
              {activeTab === "presets" && (
                <motion.div
                  key="presets"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Your Presets</h2>
                    <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all">
                      Buy More Presets
                    </button>
                  </div>

                  <div className="space-y-4">
                    {purchasedPresets.map((preset, index) => (
                      <motion.div
                        key={preset.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex flex-col md:flex-row items-center justify-between p-4 bg-gray-900/50 rounded-xl border border-gray-700 hover:border-purple-500 transition-colors group"
                      >
                        <div className="flex items-center space-x-4 mb-4 md:mb-0">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                            <Package className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="font-bold">{preset.name}</h3>
                            <p className="text-gray-400 text-sm">
                              Purchased on {preset.date} • {preset.downloads}{" "}
                              downloads
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          {/* Rating */}
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < preset.rating
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-600"
                                }`}
                              />
                            ))}
                          </div>

                          {/* Actions */}
                          <div className="flex items-center space-x-2">
                            <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors group-hover:bg-purple-600">
                              <Download className="w-4 h-4" />
                            </button>
                            <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors group-hover:bg-blue-600">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors group-hover:bg-green-600">
                              <Share2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: <TrendingUp />,
                label: "View Analytics",
                color: "from-purple-600 to-pink-600",
              },
              {
                icon: <CreditCard />,
                label: "Payment History",
                color: "from-blue-600 to-cyan-600",
              },
              {
                icon: <User />,
                label: "Edit Profile",
                color: "from-green-600 to-emerald-600",
              },
            ].map((action, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-6 bg-gradient-to-br ${action.color} rounded-2xl text-left group`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl">{action.icon}</div>
                  <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
                <h4 className="font-bold text-lg">{action.label}</h4>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
