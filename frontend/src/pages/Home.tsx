// frontend/src/pages/Home.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Youtube,
  Instagram,
  //   TikTok,
  Sparkles,
  Zap,
  Clock,
  TrendingUp,
  Star,
  Users,
  Award,
  ChevronRight,
  Video,
  Music,
  Palette,
  Code,
  Headphones,
  Camera,
  PenTool,
  BarChart,
  Brain,
  Rocket,
  Shield,
  Download,
  CheckCircle,
  Globe,
  Smartphone,
  Target,
} from "lucide-react";
import { useInView } from "react-intersection-observer";
import toast from "react-hot-toast";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [ref, inView] = useInView({ triggerOnce: true });

  // Platforms content creators use
  const platforms = [
    {
      name: "YouTube",
      icon: <Youtube className="w-6 h-6" />,
      color: "from-red-500 to-red-700",
    },
    {
      name: "Instagram",
      icon: <Instagram className="w-6 h-6" />,
      color: "from-pink-500 to-purple-700",
    },
    {
      name: "TikTok",
      //   icon: <TikTok className="w-6 h-6" />,
      color: "from-black to-gray-800",
    },
    {
      name: "Twitter",
      icon: <Globe className="w-6 h-6" />,
      color: "from-blue-400 to-blue-600",
    },
    {
      name: "Podcasts",
      icon: <Headphones className="w-6 h-6" />,
      color: "from-green-500 to-green-700",
    },
    {
      name: "Twitch",
      icon: <Smartphone className="w-6 h-6" />,
      color: "from-purple-500 to-purple-700",
    },
  ];

  // Content creation categories
  const creationCategories = [
    {
      icon: <Video className="w-8 h-8" />,
      name: "Video Editing",
      description: "LUTs, Transitions, Templates",
      stats: "500+ Presets",
      tools: ["Premiere Pro", "DaVinci", "Final Cut", "CapCut"],
      color: "from-purple-600 to-pink-600",
    },
    {
      icon: <Camera className="w-8 h-8" />,
      name: "Photo Editing",
      description: "Lightroom Presets, Filters, Actions",
      stats: "300+ Presets",
      tools: ["Lightroom", "Photoshop", "VSCO", "Mobile"],
      color: "from-blue-600 to-cyan-600",
    },
    {
      icon: <Music className="w-8 h-8" />,
      name: "Audio & Music",
      description: "Royalty-Free Music, SFX, Voiceovers",
      stats: "2,000+ Tracks",
      tools: ["Ableton", "FL Studio", "Audacity", "Voicemod"],
      color: "from-green-600 to-emerald-600",
    },
    {
      icon: <PenTool className="w-8 h-8" />,
      name: "Design & Graphics",
      description: "Templates, Mockups, Assets",
      stats: "1,500+ Templates",
      tools: ["Canva", "Figma", "Photoshop", "Illustrator"],
      color: "from-orange-600 to-red-600",
    },
    {
      icon: <Code className="w-8 h-8" />,
      name: "Content Tools",
      description: "Automation, Analytics, SEO",
      stats: "100+ Tools",
      tools: ["Notion", "Airtable", "SEO Tools", "Analytics"],
      color: "from-indigo-600 to-purple-600",
    },
    {
      icon: <Brain className="w-8 h-8" />,
      name: "AI Content Studio",
      description: "Generate content with AI, Chat interface",
      stats: "AI-Powered",
      tools: [
        "Text Generation",
        "Content Ideas",
        "Script Writing",
        "Social Posts",
      ],
      color: "from-rose-600 to-pink-600",
      isAI: true, // Add this flag
    },
  ];

  // Creator stats
  const creatorStats = [
    {
      value: "50,000+",
      label: "Active Creators",
      icon: <Users />,
      color: "text-blue-400",
    },
    {
      value: "4.8★",
      label: "Average Rating",
      icon: <Star />,
      color: "text-yellow-400",
    },
    {
      value: "10M+",
      label: "Downloads",
      icon: <Download />,
      color: "text-green-400",
    },
    {
      value: "95%",
      label: "Success Rate",
      icon: <TrendingUp />,
      color: "text-purple-400",
    },
  ];

  // Trending products for creators
  const trendingProducts = [
    {
      name: "YouTube Shorts Pack",
      category: "Video Templates",
      price: 149,
      rating: 4.9,
      sales: 842,
      icon: "🎬",
      bestFor: ["YouTube Shorts", "TikTok", "Reels"],
      color: "from-red-500 to-orange-500",
    },
    {
      name: "Podcast Launch Kit",
      category: "Audio Production",
      price: 299,
      rating: 4.8,
      sales: 456,
      icon: "🎙️",
      bestFor: ["Podcasters", "Voice Artists"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Instagram Story Pack",
      category: "Design Templates",
      price: 99,
      rating: 4.7,
      sales: 1245,
      icon: "📱",
      bestFor: ["Instagram", "Facebook", "Stories"],
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Content Planner Pro",
      category: "Productivity",
      price: 199,
      rating: 4.9,
      sales: 678,
      icon: "📅",
      bestFor: ["Content Planning", "Scheduling"],
      color: "from-green-500 to-emerald-500",
    },
  ];

  // Creator success features
  const creatorFeatures = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Save 10+ Hours/Week",
      description: "Pre-made templates & automation",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Professional Quality",
      description: "Stand out with premium assets",
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Grow Your Audience",
      description: "Tools designed for virality",
    },
    {
      icon: <BarChart className="w-6 h-6" />,
      title: "Increase Revenue",
      description: "Monetize your content better",
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section - Focused on Content Creation */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background with Platform Colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,0,0,0.15),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(255,0,128,0.15),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_80%,rgba(0,255,255,0.1),transparent_50%)]"></div>
        </div>

        <div className="container mx-auto px-4 py-32 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            {/* Platform Badges */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-3 mb-8"
            >
              {platforms.map((platform, index) => (
                <div
                  key={index}
                  className={`px-4 py-2 bg-gradient-to-r ${platform.color} rounded-full text-sm font-semibold flex items-center space-x-2 backdrop-blur-sm`}
                >
                  {platform.icon}
                  <span>{platform.name}</span>
                </div>
              ))}
            </motion.div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-red-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Everything You Need
              </span>
              <br />
              <span className="text-white">To Create Amazing Content</span>
            </h1>

            <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Premium tools, templates, and resources for content creators. From
              YouTube to TikTok, podcasts to blogs - we've got you covered.
              <span className="text-yellow-400 font-semibold block mt-2">
                Launch your next viral hit today!
              </span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/ai-content")}
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl font-bold text-lg shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/50 transition-all duration-300"
              >
                <span className="flex items-center justify-center">
                  <Brain className="w-5 h-5 mr-2" />
                  AI Studio
                </span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400 to-pink-500 blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  navigate("/products");
                  toast.success("🚀 Let's boost your content creation!");
                }}
                className="group relative px-8 py-4 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl font-bold text-lg shadow-2xl shadow-red-500/25 hover:shadow-red-500/50 transition-all duration-300"
              >
                <span className="flex items-center justify-center">
                  Explore Creator Tools
                  <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-400 to-pink-500 blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  toast("🎬 Free creator starter pack!", { icon: "🎁" })
                }
                className="px-8 py-4 bg-gray-800/50 border border-gray-700 rounded-xl font-bold text-lg hover:bg-gray-700/50 transition-all duration-300 backdrop-blur-sm"
              >
                Get Free Starter Kit
              </motion.button>
            </div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
            >
              {creatorStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className={`text-2xl font-bold ${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Creator Categories */}
      <section className="py-20 bg-gradient-to-b from-gray-900/50 to-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Creator <span className="gradient-text">Toolkit</span> for Every
              Platform
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Everything you need to create, edit, publish, and grow - all in
              one place.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {creationCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 cursor-pointer hover:border-purple-500/50 transition-all"
                onClick={() =>
                  navigate(
                    `/products?category=${category.name
                      .toLowerCase()
                      .replace(" ", "-")}`
                  )
                }
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}
                ></div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-br ${category.color}`}
                    >
                      {category.icon}
                    </div>
                    <span className="text-sm px-3 py-1 bg-gray-900/50 rounded-full">
                      {category.stats}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {category.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {category.tools.slice(0, 3).map((tool, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-900/50 text-gray-300 text-xs rounded-full"
                      >
                        {tool}
                      </span>
                    ))}
                    {category.tools.length > 3 && (
                      <span className="px-3 py-1 bg-gray-900/50 text-gray-300 text-xs rounded-full">
                        +{category.tools.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">
                      Explore Tools →
                    </span>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Creator Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {creatorFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-gray-800/20 backdrop-blur-sm border border-gray-700/30 rounded-xl p-5 text-center"
              >
                <div className="text-purple-400 mb-3 mx-auto w-fit">
                  {feature.icon}
                </div>
                <h4 className="font-semibold mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Creator Tools */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-2">
                🔥 Trending Creator Tools
              </h2>
              <p className="text-gray-400">
                What successful creators are using right now
              </p>
            </div>
            <button
              onClick={() => navigate("/products?sort=popular")}
              className="mt-4 md:mt-0 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-red-500/25 transition-all"
            >
              View All Tools
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-purple-500/50 transition-all cursor-pointer"
                onClick={() => navigate("/products")}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`text-3xl p-4 rounded-xl bg-gradient-to-br ${product.color}`}
                  >
                    {product.icon}
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-400">
                      {product.category}
                    </span>
                    <div className="flex items-center justify-end">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm">{product.rating}</span>
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-bold mb-2">{product.name}</h3>

                <div className="flex flex-wrap gap-1 mb-4">
                  {product.bestFor.map((platform, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-gray-900/50 text-gray-300 text-xs rounded"
                    >
                      {platform}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-green-400">
                    ₹{product.price}
                  </div>
                  <div className="text-sm text-gray-400">
                    {product.sales.toLocaleString()} creators
                  </div>
                </div>

                <button className="w-full py-2 bg-gray-800/50 rounded-lg text-sm font-semibold group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:to-pink-600 transition-all duration-300">
                  Get This Tool
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Creator Success Stories */}
      <section
        ref={ref}
        className="py-20 bg-gradient-to-b from-gray-900/50 to-black"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            From <span className="gradient-text">Zero to Creator</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Success Story 1 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-pink-600 flex items-center justify-center text-xl">
                  🎬
                </div>
                <div className="ml-4">
                  <h4 className="font-bold">Alex, YouTuber</h4>
                  <p className="text-sm text-gray-400">250K subscribers</p>
                </div>
              </div>
              <p className="text-gray-300 italic mb-4">
                "The YouTube templates cut my editing time by 70%. Went from 1
                video/week to 3!"
              </p>
              <div className="text-sm text-green-400 font-semibold">
                +300% Growth in 3 months
              </div>
            </motion.div>

            {/* Success Story 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-600 flex items-center justify-center text-xl">
                  🎙️
                </div>
                <div className="ml-4">
                  <h4 className="font-bold">Sarah, Podcaster</h4>
                  <p className="text-sm text-gray-400">50K monthly listeners</p>
                </div>
              </div>
              <p className="text-gray-300 italic mb-4">
                "The audio presets made my podcast sound professional overnight.
                Sponsors started reaching out!"
              </p>
              <div className="text-sm text-green-400 font-semibold">
                Launched Top 100 Podcast
              </div>
            </motion.div>

            {/* Success Story 3 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center text-xl">
                  📱
                </div>
                <div className="ml-4">
                  <h4 className="font-bold">Rohan, Instagram Creator</h4>
                  <p className="text-sm text-gray-400">100K followers</p>
                </div>
              </div>
              <p className="text-gray-300 italic mb-4">
                "Story templates got me 10K new followers in a month. My
                engagement tripled!"
              </p>
              <div className="text-sm text-green-400 font-semibold">
                10K+ New Followers/Month
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Creation Process */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Your <span className="gradient-text">Content Creation</span> Journey
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Plan",
                desc: "Content calendars & strategy",
                icon: "📅",
              },
              {
                step: "2",
                title: "Create",
                desc: "Templates & editing tools",
                icon: "🎬",
              },
              {
                step: "3",
                title: "Edit",
                desc: "Presets & automation",
                icon: "✨",
              },
              {
                step: "4",
                title: "Publish",
                desc: "Scheduling & optimization",
                icon: "🚀",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-3xl">
                  {step.icon}
                </div>
                <div className="text-2xl font-bold mb-2">{step.step}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA for Creators */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 via-purple-900/20 to-blue-900/20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="max-w-3xl mx-auto"
          >
            <Sparkles className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Start Creating{" "}
              <span className="gradient-text">Amazing Content</span> Today
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              Join 50,000+ creators who've transformed their content game with
              our tools. No more struggling with complex software or spending
              hours on edits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/products")}
                className="px-8 py-4 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-red-500/25 transition-all"
              >
                Explore Creator Tools
              </button>
              <button
                onClick={() =>
                  toast("📧 Free creator webinar coming soon!", { icon: "🎥" })
                }
                className="px-8 py-4 bg-gray-800/50 border border-gray-700 rounded-xl font-bold text-lg hover:bg-gray-700/50 transition-all"
              >
                Free Creator Course
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Creator Resources Banner */}
      <div className="sticky bottom-0 z-40 bg-gradient-to-r from-purple-900/90 via-gray-900/90 to-blue-900/90 border-t border-gray-700/50 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-2 md:mb-0">
              <Zap className="w-5 h-5 text-yellow-400 animate-pulse" />
              <span className="font-bold">CREATOR SPECIAL:</span>
              <span>Get AI Content Generator FREE with any purchase!</span>
            </div>
            <button
              onClick={() => navigate("/products")}
              className="px-6 py-2 bg-white text-purple-700 font-bold rounded-lg hover:bg-purple-50 transition-colors"
            >
              Claim Bonus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
