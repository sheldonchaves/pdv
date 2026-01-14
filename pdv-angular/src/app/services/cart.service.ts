import { Injectable, signal, computed } from '@angular/core';
import { Cart, CartItem, DiscountCoupon } from '../models/cart.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = signal<CartItem[]>([]);
  private appliedCoupon = signal<DiscountCoupon | null>(null);

  // Cupons mockados para demonstração
  private validCoupons: DiscountCoupon[] = [
    { code: 'DESCONTO10', discount: 0, discountPercent: 10, type: 'percent' },
    { code: 'CUPOM50', discount: 50, type: 'fixed' },
    { code: 'PROMO20', discount: 0, discountPercent: 20, type: 'percent' },
    { code: 'FREEGRATIS', discount: 100, type: 'fixed' }
  ];

  cart = computed(() => {
    const items = this.cartItems();
    const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const taxes = subtotal * 0.08; // 8% de impostos
    const coupon = this.appliedCoupon();
    
    let discount = 0;
    if (coupon) {
      if (coupon.type === 'fixed') {
        discount = coupon.discount;
      } else if (coupon.type === 'percent' && coupon.discountPercent) {
        discount = (subtotal * coupon.discountPercent) / 100;
      }
    }
    
    const deliveryFee = 0;
    const total = Math.max(0, subtotal + taxes + deliveryFee - discount);

    return {
      items,
      subtotal,
      taxes,
      discount,
      coupon: coupon || undefined,
      deliveryFee,
      total
    } as Cart;
  });

  itemCount = computed(() => {
    return this.cartItems().reduce((sum, item) => sum + item.quantity, 0);
  });

  addToCart(product: Product, quantity: number = 1): void {
    const currentItems = this.cartItems();
    const existingItem = currentItems.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
      this.cartItems.set([...currentItems]);
    } else {
      this.cartItems.set([...currentItems, { product, quantity }]);
    }
  }

  removeFromCart(productId: string): void {
    this.cartItems.set(this.cartItems().filter(item => item.product.id !== productId));
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const currentItems = this.cartItems();
    const item = currentItems.find(item => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
      this.cartItems.set([...currentItems]);
    }
  }

  clearCart(): void {
    this.cartItems.set([]);
    this.appliedCoupon.set(null);
  }

  getCartItems(): CartItem[] {
    return this.cartItems();
  }

  applyCoupon(code: string): { success: boolean; message: string } {
    const upperCode = code.toUpperCase().trim();
    const coupon = this.validCoupons.find(c => c.code === upperCode);
    
    if (!coupon) {
      return { success: false, message: 'Cupom inválido' };
    }
    
    this.appliedCoupon.set(coupon);
    return { success: true, message: 'Cupom aplicado com sucesso!' };
  }

  removeCoupon(): void {
    this.appliedCoupon.set(null);
  }

  getAppliedCoupon(): DiscountCoupon | null {
    return this.appliedCoupon();
  }
}
