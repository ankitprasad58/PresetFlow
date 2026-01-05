export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  subcategory: string;
  tags: string[];
  rating: number;
  sales: number;
  previewUrl?: string;
  fileUrl: string;
  fileType: "preset" | "template" | "plugin" | "asset";
  compatibleWith: string[];
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  productCount: number;
  subcategories: string[];
}