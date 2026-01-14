import { CartItem } from './cart.model';

export interface SavedCard {
  id: string;
  lastDigits: string;
  brand: string; // 'Visa', 'Mastercard', 'Elo', etc
  cardholderName: string;
  expiryMonth: number;
  expiryYear: number;
}

export interface Address {
  id: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault?: boolean;
}

export interface Customer {
  id: string;
  name: string;
  cpf: string;
  avatar?: string;
  loyaltyPoints?: number;
  savedCards?: SavedCard[];
  addresses?: Address[];
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
  deliveryAddress?: Address;
  subtotal: number;
  taxes: number;
  discount: number;
  deliveryFee: number;
  total: number;
  paymentMethod?: PaymentMethod;
  installments?: number;
  notes?: string;
  createdAt: Date;
  status?: string;
}
