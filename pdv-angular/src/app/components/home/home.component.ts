import { Component, OnInit, OnDestroy, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { UserService } from '../../services/user.service';
import { Product } from '../../models/product.model';
import { Category } from '../../models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  searchTerm = signal<string>('');
  selectedCategory = signal<string>('moveis');

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    public userService: UserService,
    private router: Router
  ) {}

  private categoryEffect = effect(() => {
    const category = this.productService.selectedCategory();
    if (category !== this.selectedCategory()) {
      this.selectedCategory.set(category);
      this.loadProducts();
    }
  });

  private searchEffect = effect(() => {
    const search = this.productService.searchTerm();
    if (search !== this.searchTerm()) {
      this.searchTerm.set(search);
      this.loadProducts();
    }
  });

  ngOnInit(): void {
    this.categories.set(this.productService.getCategories());
    this.selectedCategory.set(this.productService.selectedCategory());
    this.searchTerm.set(this.productService.searchTerm());
    this.loadProducts();
  }

  ngOnDestroy(): void {
    // Effects são automaticamente limpos quando o componente é destruído
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
}
