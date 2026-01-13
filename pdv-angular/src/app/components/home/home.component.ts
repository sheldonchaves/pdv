import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { UserService } from '../../services/user.service';
import { CartSidebarComponent } from '../shared/cart-sidebar.component';
import { IconComponent } from '../shared/icon.component';
import { Product } from '../../models/product.model';
import { Category } from '../../models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, CartSidebarComponent, IconComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  searchTerm = signal<string>('');
  selectedCategory = signal<string>('moveis');
  sidebarMinimized = signal<boolean>(false);

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    public userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categories.set(this.productService.getCategories());
    this.loadProducts();
  }

  loadProducts(): void {
    const term = this.searchTerm();
    if (term) {
      this.products.set(this.productService.searchProducts(term));
    } else {
      this.products.set(this.productService.getProductsByCategory(this.selectedCategory()));
    }
  }

  onCategorySelect(categoryId: string): void {
    this.selectedCategory.set(categoryId);
    this.productService.selectedCategory.set(categoryId);
    this.loadProducts();
  }

  onSearchChange(term: string): void {
    this.searchTerm.set(term);
    this.productService.searchTerm.set(term);
    this.loadProducts();
  }

  addToCart(product: Product): void {
    if (product.stock > 0) {
      this.cartService.addToCart(product);
    }
  }

  goToProductDetail(productId: string): void {
    this.router.navigate(['/product', productId]);
  }

  getStockStatus(stock: number): { text: string; class: string } {
    if (stock === 0) {
      return { text: 'Sem estoque', class: 'text-slate-400' };
    } else if (stock < 5) {
      return { text: `${stock} em estoque`, class: 'text-brand-orange' };
    } else {
      return { text: `${stock} em estoque`, class: 'text-green-600' };
    }
  }

  getCategoryName(): string {
    const category = this.categories().find(c => c.id === this.selectedCategory());
    return category?.name || 'Produtos';
  }

  toggleSidebar(): void {
    this.sidebarMinimized.set(!this.sidebarMinimized());
  }
}
