import { Product } from './product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  taxes: number;
  discount: number;
  deliveryFee: number;
  total: number;
}
