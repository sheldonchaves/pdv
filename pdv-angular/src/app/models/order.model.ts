import { CartItem } from './cart.model';

export interface Customer {
  id: string;
  name: string;
  cpf: string;
  avatar?: string;
  loyaltyPoints?: number;
}

export interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'pix' | 'cash';
  label: string;
  icon: string;
  description?: string;
  saved?: boolean;
  lastDigits?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  customer: Customer;
  subtotal: number;
  taxes: number;
  discount: number;
  deliveryFee: number;
  total: number;
  paymentMethod?: PaymentMethod;
  installments?: number;
  notes?: string;
  createdAt: Date;
}
