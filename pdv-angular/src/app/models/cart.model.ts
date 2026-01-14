import { Product } from './product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface DiscountCoupon {
  code: string;
  discount: number; // Valor do desconto em reais
  discountPercent?: number; // Percentual de desconto (alternativa)
  type: 'fixed' | 'percent';
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  taxes: number;
  discount: number;
  coupon?: DiscountCoupon;
  deliveryFee: number;
  total: number;
}
