import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { UserService } from '../../services/user.service';
import { Category } from '../../models/product.model';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent implements OnInit {
  categories = signal<Category[]>([]);
  searchTerm = signal<string>('');
  selectedCategory = signal<string>('moveis');
  sidebarMinimized = signal<boolean>(true); // Fechado por padrão para tablet
  showBarcodeScanner = signal<boolean>(false);
  scanningBarcode = signal<boolean>(false);
  
  // Cart signals
  cart = computed(() => this.cartService.cart());
  itemCount = computed(() => this.cartService.itemCount());
  showCartDropdown = signal<boolean>(false);
  couponCode = signal<string>('');
  couponError = signal<string>('');
  couponSuccess = signal<string>('');

  constructor(
    private productService: ProductService,
    public cartService: CartService,
    public userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categories.set(this.productService.getCategories());
    this.selectedCategory.set(this.productService.selectedCategory());
    this.searchTerm.set(this.productService.searchTerm());
  }

  onCategorySelect(categoryId: string): void {
    this.selectedCategory.set(categoryId);
    this.productService.selectedCategory.set(categoryId);
    // Navegar para home quando selecionar categoria
    if (this.router.url !== '/') {
      this.router.navigate(['/']);
    }
  }

  onSearchChange(term: string): void {
    this.searchTerm.set(term);
    this.productService.searchTerm.set(term);
    // Navegar para home quando buscar
    if (this.router.url !== '/') {
      this.router.navigate(['/']);
    }
  }

  toggleSidebar(): void {
    this.sidebarMinimized.set(!this.sidebarMinimized());
  }

  toggleCartDropdown(): void {
    this.showCartDropdown.set(!this.showCartDropdown());
  }

  openBarcodeScanner(): void {
    this.showBarcodeScanner.set(true);
    this.scanningBarcode.set(true);
    
    // Simular escaneamento após 2 segundos
    setTimeout(() => {
      this.scanningBarcode.set(false);
      
      // Selecionar produto aleatório
      const products = this.productService.getProducts();
      if (products.length > 0) {
        const randomIndex = Math.floor(Math.random() * products.length);
        const randomProduct = products[randomIndex];
        
        setTimeout(() => {
          this.showBarcodeScanner.set(false);
          // Navegar para a página do produto aleatório
          this.router.navigate(['/product', randomProduct.id]);
        }, 1000);
      } else {
        setTimeout(() => {
          this.showBarcodeScanner.set(false);
        }, 1000);
      }
    }, 2000);
  }

  closeBarcodeScanner(): void {
    this.showBarcodeScanner.set(false);
    this.scanningBarcode.set(false);
  }

  formatPrice(price: number): string {
    return price.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  }

  increaseQuantity(productId: string, currentQuantity: number): void {
    this.cartService.updateQuantity(productId, currentQuantity + 1);
  }

  decreaseQuantity(productId: string, currentQuantity: number): void {
    this.cartService.updateQuantity(productId, currentQuantity - 1);
  }

  removeItem(productId: string): void {
    this.cartService.removeFromCart(productId);
  }

  goToCheckout(): void {
    this.showCartDropdown.set(false);
    this.router.navigate(['/checkout']);
  }

  goToProduct(productId: string): void {
    this.showCartDropdown.set(false);
    this.router.navigate(['/product', productId]);
  }

  applyCoupon(): void {
    const code = this.couponCode().trim();
    if (!code) {
      this.couponError.set('Digite um código de cupom');
      this.couponSuccess.set('');
      return;
    }

    const result = this.cartService.applyCoupon(code);
    if (result.success) {
      this.couponError.set('');
      this.couponSuccess.set(result.message);
      this.couponCode.set('');
      setTimeout(() => {
        this.couponSuccess.set('');
      }, 3000);
    } else {
      this.couponError.set(result.message);
      this.couponSuccess.set('');
    }
  }

  removeCoupon(): void {
    this.cartService.removeCoupon();
    this.couponCode.set('');
    this.couponError.set('');
    this.couponSuccess.set('');
  }
}
