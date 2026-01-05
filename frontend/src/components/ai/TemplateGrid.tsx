// components/ai/TemplateGrid.tsx
import React from "react";
import { motion } from "framer-motion";
import {
  Video,
  Hash,
  FileText,
  Mic,
  Sparkles,
  MessageSquare,
  Share2,
  Calendar,
  Brain,
} from "lucide-react";

interface AITemplate {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  prompt: string;
  category: string;
  color: string;
}

interface TemplateGridProps {
  onSelectTemplate: (prompt: string, templateId?: string) => void;
}

export const TemplateGrid: React.FC<TemplateGridProps> = ({
  onSelectTemplate,
}) => {
  const aiTemplates: AITemplate[] = [
    {
      id: "youtube-script",
      name: "YouTube Script",
      description: "Generate engaging YouTube video scripts",
      icon: <Video className="w-6 h-6" />,
      prompt:
        "Write a YouTube script about [topic] with hooks, main content, and call-to-action",
      category: "video",
      color: "from-red-500 to-orange-500",
    },
    {
      id: "instagram-caption",
      name: "Instagram Caption",
      description: "Create viral Instagram captions with hashtags",
      icon: <Hash className="w-6 h-6" />,
      prompt:
        "Write an Instagram caption for [type of post] with relevant hashtags",
      category: "social",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "blog-post",
      name: "Blog Article",
      description: "Generate SEO-optimized blog posts",
      icon: <FileText className="w-6 h-6" />,
      prompt:
        "Write a blog post about [topic] with introduction, body, and conclusion",
      category: "writing",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "podcast-script",
      name: "Podcast Script",
      description: "Create podcast episode scripts",
      icon: <Mic className="w-6 h-6" />,
      prompt:
        "Write a podcast script about [topic] with intro, discussion points, and outro",
      category: "audio",
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "video-ideas",
      name: "Video Ideas",
      description: "Generate viral video content ideas",
      icon: <Sparkles className="w-6 h-6" />,
      prompt: "Generate 10 viral video ideas about [topic] for [platform]",
      category: "ideas",
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: "email-newsletter",
      name: "Email Newsletter",
      description: "Create engaging email newsletters",
      icon: <MessageSquare className="w-6 h-6" />,
      prompt:
        "Write an email newsletter about [topic] with subject line and body",
      category: "marketing",
      color: "from-indigo-500 to-purple-500",
    },
    {
      id: "social-posts",
      name: "Social Media Posts",
      description: "Generate posts for all platforms",
      icon: <Share2 className="w-6 h-6" />,
      prompt: "Create a week's worth of social media posts about [topic]",
      category: "social",
      color: "from-pink-500 to-rose-500",
    },
    {
      id: "content-calendar",
      name: "Content Calendar",
      description: "Plan your content strategy",
      icon: <Calendar className="w-6 h-6" />,
      prompt: "Create a monthly content calendar for [platform] about [niche]",
      category: "planning",
      color: "from-teal-500 to-green-500",
    },
  ];

  return (
    <div className="py-8">
      <div className="text-center mb-8">
        <Brain className="w-16 h-16 text-purple-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">Choose a Template</h3>
        <p className="text-gray-400">Select a content type to get started</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {aiTemplates.map((template) => (
          <motion.button
            key={template.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectTemplate(template.prompt, template.id)}
            className={`bg-gradient-to-br ${template.color} rounded-xl p-4 text-left group`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 bg-white/20 rounded-lg">{template.icon}</div>
              <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h4 className="font-bold mb-1">{template.name}</h4>
            <p className="text-sm text-white/80">{template.description}</p>
          </motion.button>
        ))}
      </div>
    </div>
  );
};
