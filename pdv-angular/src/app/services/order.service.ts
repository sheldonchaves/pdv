import { Injectable, signal } from '@angular/core';
import { Order, Customer, PaymentMethod } from '../models/order.model';
import { CartItem } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders = signal<Order[]>([]);
  private currentOrder = signal<Order | null>(null);

  private defaultCustomer: Customer = {
    id: '1',
    name: 'João Silva',
    cpf: '123.456.789-00',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnsmEth3gyRnj_fla6Y_neiU_N9PtkDoklq-jFvtC-WXpj3vqqHQrv6HE0rDIwgVolltr0y5p9ZyWGEqtQ4y8ai_xopQe7uH2hymNFXcjA7r2jY7BA5TA7RB2Sg0VSvqURIxBWhbx98pG-oBPx5x7HIIe90A8nNgVv0g79ol9sHDrQ5_d6ilKMBQxRgEVYIsucoWXjK5LFRXayfNlvE7gNv15G_J42Le4EpjcpXH9pIIs9AwXiytDhkeQB1HWgn8AXfJqTFd9nJGw',
    loyaltyPoints: 1250
  };

  private paymentMethods: PaymentMethod[] = [
    {
      id: '1',
      type: 'credit_card',
      label: 'Cartão de Crédito (Salvo)',
      icon: 'credit_card',
      description: 'Visa final 4242',
      saved: true,
      lastDigits: '4242'
    },
    {
      id: '2',
      type: 'pix',
      label: 'Pix',
      icon: 'qr_code_2',
      description: 'Pagamento instantâneo',
      saved: false
    }
  ];

  createOrder(items: CartItem[], deliveryFee: number = 150, discount: number = 200): Order {
    const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const taxes = subtotal * 0.08;
    const total = subtotal + taxes + deliveryFee - discount;

    const order: Order = {
      id: Date.now().toString(),
      orderNumber: '77421',
      items,
      customer: this.defaultCustomer,
      subtotal,
      taxes,
      discount,
      deliveryFee,
      total,
      createdAt: new Date()
    };

    this.currentOrder.set(order);
    return order;
  }

  getCurrentOrder(): Order | null {
    return this.currentOrder();
  }

  getPaymentMethods(): PaymentMethod[] {
    return this.paymentMethods;
  }

  finalizeOrder(paymentMethod: PaymentMethod, installments: number = 1, notes?: string): void {
    const order = this.currentOrder();
    if (order) {
      order.paymentMethod = paymentMethod;
      order.installments = installments;
      order.notes = notes;
      this.orders.set([...this.orders(), order]);
      this.currentOrder.set(null);
    }
  }

  getAllOrders(): Order[] {
    return this.orders();
  }
}
