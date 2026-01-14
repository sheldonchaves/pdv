import { Injectable, signal } from '@angular/core';
import { Order, Customer, PaymentMethod, SavedCard, Address } from '../models/order.model';
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
    loyaltyPoints: 1250,
    savedCards: [
      {
        id: '1',
        lastDigits: '4242',
        brand: 'Visa',
        cardholderName: 'JOÃO SILVA',
        expiryMonth: 12,
        expiryYear: 2026
      },
      {
        id: '2',
        lastDigits: '8888',
        brand: 'Mastercard',
        cardholderName: 'JOÃO SILVA',
        expiryMonth: 6,
        expiryYear: 2027
      },
      {
        id: '3',
        lastDigits: '1234',
        brand: 'Elo',
        cardholderName: 'JOÃO SILVA',
        expiryMonth: 3,
        expiryYear: 2025
      }
    ],
    addresses: [
      {
        id: '1',
        street: 'Rua das Flores',
        number: '123',
        complement: 'Apto 101',
        neighborhood: 'Centro',
        city: 'Recife',
        state: 'PE',
        zipCode: '50000-000',
        isDefault: true
      },
      {
        id: '2',
        street: 'Avenida Boa Viagem',
        number: '4567',
        complement: 'Casa',
        neighborhood: 'Boa Viagem',
        city: 'Recife',
        state: 'PE',
        zipCode: '51021-000',
        isDefault: false
      }
    ]
  };

  private paymentMethods: PaymentMethod[] = [
    {
      id: '1',
      type: 'credit_card',
      label: 'Cartão de Crédito (Salvo)',
      icon: 'credit-card',
      description: 'Visa final 4242',
      saved: true,
      lastDigits: '4242'
    },
    {
      id: '2',
      type: 'pix',
      label: 'Pix',
      icon: 'qr-code',
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

  finalizeOrder(paymentMethod: PaymentMethod, installments: number = 1, address?: Address, notes?: string): Order | null {
    const order = this.currentOrder();
    if (order) {
      order.paymentMethod = paymentMethod;
      order.installments = installments;
      order.deliveryAddress = address;
      order.notes = notes;
      order.status = 'confirmed';
      this.orders.set([...this.orders(), order]);
      const finalizedOrder = { ...order };
      this.currentOrder.set(null);
      return finalizedOrder;
    }
    return null;
  }

  getAllOrders(): Order[] {
    return this.orders();
  }

  getCustomerSavedCards(): SavedCard[] {
    return this.defaultCustomer.savedCards || [];
  }

  getCustomerAddresses(): Address[] {
    return this.defaultCustomer.addresses || [];
  }

  getOrderById(orderId: string): Order | undefined {
    return this.orders().find(order => order.id === orderId);
  }
}
