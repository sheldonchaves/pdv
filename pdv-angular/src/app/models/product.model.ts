export interface Product {
  id: string;
  name: string;
  sku: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
  specifications?: ProductSpecification;
  stockByStore?: StoreStock[];
}

export interface ProductSpecification {
  material?: string;
  dimensions?: string;
  warranty?: string;
  color?: string;
}

export interface StoreStock {
  storeName: string;
  address: string;
  quantity: number;
  available: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}
