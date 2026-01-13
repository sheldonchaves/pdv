import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { UserService } from '../../services/user.service';
import { CartSidebarComponent } from '../shared/cart-sidebar.component';
import { Category } from '../../models/product.model';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, CartSidebarComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent implements OnInit {
  categories = signal<Category[]>([]);
  searchTerm = signal<string>('');
  selectedCategory = signal<string>('moveis');
  sidebarMinimized = signal<boolean>(false);

  constructor(
    private productService: ProductService,
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
}
