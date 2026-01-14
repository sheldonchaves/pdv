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
  filteredProducts = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  searchTerm = signal<string>('');
  selectedCategory = signal<string>('moveis');
  
  // Filtros
  filterInStock = signal<boolean>(false);
  filterBrand = signal<string | null>(null);
  filterOnSale = signal<boolean>(false);
  filterMinPrice = signal<number | null>(null);
  filterMaxPrice = signal<number | null>(null);
  
  // Opções de filtro
  brands = signal<string[]>([]);
  priceRanges = signal<{ label: string; min: number | null; max: number | null }[]>([]);
  
  // Estados dos dropdowns
  showBrandFilter = false;
  showPriceFilter = false;

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
    // Inicializar filteredProducts com products
    this.filteredProducts.set(this.products());
  }

  ngOnDestroy(): void {
    // Effects são automaticamente limpos quando o componente é destruído
  }

  loadProducts(): void {
    const term = this.searchTerm();
    let result: Product[];
    
    if (term) {
      result = this.productService.searchProducts(term);
    } else {
      result = this.productService.getProductsByCategory(this.selectedCategory());
    }
    
    this.products.set(result);
    this.applyFilters();
    
    // Atualizar marcas disponíveis
    const availableBrands = [...new Set(result.map(p => p.brand).filter(b => b))] as string[];
    this.brands.set(availableBrands);
    
    // Definir faixas de preço
    if (result.length > 0) {
      const prices = result.map(p => p.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      this.priceRanges.set([
        { label: 'Até R$ 500', min: null, max: 500 },
        { label: 'R$ 500 - R$ 1.000', min: 500, max: 1000 },
        { label: 'R$ 1.000 - R$ 2.000', min: 1000, max: 2000 },
        { label: 'R$ 2.000 - R$ 5.000', min: 2000, max: 5000 },
        { label: 'Acima de R$ 5.000', min: 5000, max: null }
      ]);
    }
  }

  applyFilters(): void {
    let result = [...this.products()];
    
    // Filtro: Em Estoque
    if (this.filterInStock()) {
      result = result.filter(p => p.stock > 0);
    }
    
    // Filtro: Marca
    if (this.filterBrand()) {
      result = result.filter(p => p.brand === this.filterBrand());
    }
    
    // Filtro: Promoções (produtos com originalPrice maior que price)
    if (this.filterOnSale()) {
      result = result.filter(p => p.originalPrice && p.originalPrice > p.price);
    }
    
    // Filtro: Faixa de Preço
    if (this.filterMinPrice() !== null || this.filterMaxPrice() !== null) {
      result = result.filter(p => {
        const price = p.price;
        const min = this.filterMinPrice() ?? 0;
        const max = this.filterMaxPrice() ?? Infinity;
        return price >= min && price <= max;
      });
    }
    
    this.filteredProducts.set(result.length > 0 ? result : []);
  }

  toggleInStockFilter(): void {
    this.filterInStock.set(!this.filterInStock());
    this.applyFilters();
  }

  selectBrand(brand: string | null): void {
    this.filterBrand.set(this.filterBrand() === brand ? null : brand);
    this.applyFilters();
  }

  toggleOnSaleFilter(): void {
    this.filterOnSale.set(!this.filterOnSale());
    this.applyFilters();
  }

  selectPriceRange(min: number | null, max: number | null): void {
    if (this.filterMinPrice() === min && this.filterMaxPrice() === max) {
      this.filterMinPrice.set(null);
      this.filterMaxPrice.set(null);
    } else {
      this.filterMinPrice.set(min);
      this.filterMaxPrice.set(max);
    }
    this.applyFilters();
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

  isProductOnSale(product: Product): boolean {
    return product.originalPrice !== undefined && product.originalPrice > product.price;
  }

  getDiscountPercentage(product: Product): number {
    if (!product.originalPrice || product.originalPrice <= product.price) return 0;
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  }
}
