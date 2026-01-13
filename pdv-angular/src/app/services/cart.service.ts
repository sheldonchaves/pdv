import { Injectable, signal, computed } from '@angular/core';
import { Cart, CartItem } from '../models/cart.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = signal<CartItem[]>([]);

  cart = computed(() => {
    const items = this.cartItems();
    const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const taxes = subtotal * 0.08; // 8% de impostos
    const discount = 0;
    const deliveryFee = 0;
    const total = subtotal + taxes + deliveryFee - discount;

    return {
      items,
      subtotal,
      taxes,
      discount,
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
  }

  getCartItems(): CartItem[] {
    return this.cartItems();
  }
}
