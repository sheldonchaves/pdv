import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { PaymentMethod } from '../../models/order.model';

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
  selectedInstallments = signal<number>(10);
  paymentAmount = signal<string>('0,00');
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
    const order = this.orderService.createOrder(
      this.cartService.cart().items,
      150,
      200
    );
    this.paymentAmount.set(order.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 }));
  }

  selectPaymentMethod(method: PaymentMethod): void {
    this.selectedPaymentMethod.set(method);
  }

  onNumberClick(number: string): void {
    let current = this.paymentAmount().replace(/[^\d]/g, '');
    if (number === 'C') {
      current = '0';
    } else if (number === 'backspace') {
      current = current.slice(0, -1) || '0';
    } else {
      current = current === '0' ? number : current + number;
    }
    
    const value = parseInt(current) / 100;
    this.paymentAmount.set(value.toLocaleString('pt-BR', { minimumFractionDigits: 2 }));
  }

  finalizeOrder(): void {
    const paymentMethod = this.selectedPaymentMethod();
    if (!paymentMethod) {
      alert('Selecione uma forma de pagamento');
      return;
    }

    const amount = parseFloat(this.paymentAmount().replace(/\./g, '').replace(',', '.'));
    const order = this.orderService.getCurrentOrder();
    
    if (order && amount >= order.total) {
      this.orderService.finalizeOrder(
        paymentMethod,
        this.selectedInstallments(),
        this.transactionNotes()
      );
      this.cartService.clearCart();
      alert('Pedido finalizado com sucesso!');
      this.router.navigate(['/']);
    } else {
      alert('Valor insuficiente para finalizar o pedido');
    }
  }

  formatPrice(price: number): string {
    return price.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  }

  getRemainingAmount(): number {
    const order = this.orderService.getCurrentOrder();
    if (!order) return 0;
    const paid = parseFloat(this.paymentAmount().replace(/\./g, '').replace(',', '.'));
    return Math.max(0, order.total - paid);
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
