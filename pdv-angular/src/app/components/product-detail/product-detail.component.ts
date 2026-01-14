import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  product = signal<Product | null>(null);
  selectedImageIndex = signal<number>(0);
  private routeSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // Carregar produto inicial
    this.loadProduct();
    
    // Escutar mudanças nos parâmetros da rota
    this.routeSubscription = this.route.paramMap.subscribe(() => {
      this.loadProduct();
    });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  private loadProduct(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      const product = this.productService.getProductById(productId);
      if (product) {
        this.product.set(product);
        this.selectedImageIndex.set(0); // Resetar índice da imagem ao trocar produto
      } else {
        this.router.navigate(['/']);
      }
    }
  }

  selectImage(index: number): void {
    this.selectedImageIndex.set(index);
  }

  addToCart(): void {
    const product = this.product();
    if (product && product.stock > 0) {
      this.cartService.addToCart(product);
    }
  }

  formatPrice(price: number): string {
    return price.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  }

  getInstallmentPrice(price: number, installments: number): string {
    const total = price * 1.12; // 12% de juros
    return (total / installments).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  }

  getTotalPrice(price: number, installments: number): string {
    const total = price * 1.12;
    return total.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  }
}
