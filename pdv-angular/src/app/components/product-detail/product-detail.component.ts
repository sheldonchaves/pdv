import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
export class ProductDetailComponent implements OnInit {
  product = signal<Product | null>(null);
  selectedImageIndex = signal<number>(0);

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      const product = this.productService.getProductById(productId);
      if (product) {
        this.product.set(product);
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
