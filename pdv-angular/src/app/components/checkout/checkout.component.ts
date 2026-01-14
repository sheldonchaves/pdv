import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { PaymentMethod, SavedCard, Address } from '../../models/order.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  paymentMethods = signal<PaymentMethod[]>([]);
  selectedPaymentMethod = signal<PaymentMethod | null>(null);
  selectedCard = signal<SavedCard | null>(null);
  selectedAddress = signal<Address | null>(null);
  selectedInstallments = signal<number>(10);
  transactionNotes = signal<string>('');

  constructor(
    public cartService: CartService,
    public orderService: OrderService,
    public router: Router
  ) {}

  ngOnInit(): void {
    if (this.cartService.cart().items.length === 0) {
      this.router.navigate(['/']);
      return;
    }

    this.paymentMethods.set(this.orderService.getPaymentMethods());
    this.orderService.createOrder(
      this.cartService.cart().items,
      150,
      200
    );
    
    // Selecionar endereço padrão
    const addresses = this.orderService.getCustomerAddresses();
    const defaultAddress = addresses.find(addr => addr.isDefault) || addresses[0];
    if (defaultAddress) {
      this.selectedAddress.set(defaultAddress);
    }
  }

  getSavedCards(): SavedCard[] {
    return this.orderService.getCustomerSavedCards();
  }

  getAddresses(): Address[] {
    return this.orderService.getCustomerAddresses();
  }

  selectAddress(address: Address): void {
    this.selectedAddress.set(address);
  }

  selectPaymentMethod(method: PaymentMethod): void {
    this.selectedPaymentMethod.set(method);
    // Se o método selecionado não for cartão de crédito, limpa o cartão selecionado
    if (method.type !== 'credit_card') {
      this.selectedCard.set(null);
    }
  }

  selectCard(card: SavedCard): void {
    this.selectedCard.set(card);
    // Seleciona automaticamente o método de pagamento cartão de crédito se não estiver selecionado
    const creditCardMethod = this.paymentMethods().find(m => m.type === 'credit_card');
    if (creditCardMethod && this.selectedPaymentMethod()?.type !== 'credit_card') {
      this.selectPaymentMethod(creditCardMethod);
    }
  }

  finalizeOrder(): void {
    const paymentMethod = this.selectedPaymentMethod();
    if (!paymentMethod) {
      alert('Selecione uma forma de pagamento');
      return;
    }

    // Se for cartão de crédito, verifica se um cartão foi selecionado
    if (paymentMethod.type === 'credit_card' && !this.selectedCard()) {
      alert('Selecione um cartão pré-cadastrado');
      return;
    }

    if (!this.selectedAddress()) {
      alert('Selecione um endereço de entrega');
      return;
    }

    const order = this.orderService.getCurrentOrder();
    if (order) {
      const finalizedOrder = this.orderService.finalizeOrder(
        paymentMethod,
        this.selectedInstallments(),
        this.selectedAddress() || undefined,
        this.transactionNotes()
      );
      
      if (finalizedOrder) {
        this.cartService.clearCart();
        this.router.navigate(['/order-summary', finalizedOrder.id]);
      }
    }
  }

  formatPrice(price: number): string {
    return price.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  }

  formatCardExpiry(month: number, year: number): string {
    return `${month.toString().padStart(2, '0')}/${year}`;
  }

  getCardBrandIcon(brand: string): string {
    // Todos os cartões usam o mesmo ícone do Bootstrap Icons
    return 'credit-card';
  }

  getInstallmentOptions(): { value: number; label: string }[] {
    const order = this.orderService.getCurrentOrder();
    if (!order) return [];
    
    const total = order.total;
    return [
      { value: 1, label: `1x (À Vista) - R$ ${this.formatPrice(total)}` },
      { value: 2, label: `2x - R$ ${this.formatPrice(total / 2)}` },
      { value: 6, label: `6x - R$ ${this.formatPrice(total / 6)}` },
      { value: 10, label: `10x - R$ ${this.formatPrice(total / 10)} (Sem Juros)` },
      { value: 12, label: `12x - R$ ${this.formatPrice(total / 12)} (Com Juros)` }
    ];
  }
}
