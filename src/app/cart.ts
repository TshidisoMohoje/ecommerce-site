import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastService } from './toast';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})

export class CartService {
  private apiUrl = 'https://fakestoreapi.com/products';
  private storageKey = 'ecommerce_cart';
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);

  constructor(private http: HttpClient, private toastService: ToastService) {
    this.loadCartFromStorage();
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getCartItems(): Observable<CartItem[]> {
    return this.cartSubject.asObservable();
  }

  addToCart(product: Product): void {
    const existingItem = this.cartItems.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }
    this.updateCartState();
    this.toastService.showToast(`"${product.title}" added to cart!`, 'success');
  }

  incrementQuantity(productId: number): void {
    const item = this.cartItems.find(item => item.id === productId);
    if (item) {
      item.quantity += 1;
      this.updateCartState();
    }
  }

  decrementQuantity(productId: number): void {
    const item = this.cartItems.find(item => item.id === productId);
    if (item) {
      item.quantity -= 1;
      if (item.quantity === 0) {
        this.removeFromCart(productId);
      } else {
        this.updateCartState();
      }
    }
  }

  removeFromCart(productId: number): void {
    const item = this.cartItems.find(item => item.id === productId);
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.updateCartState();
    if (item) {
      this.toastService.showToast(`"${item.title}" removed from cart.`, 'info');
    }
  }

  clearCart(): void {
    if (this.cartItems.length === 0) return;
    
    const confirmClear = confirm('Are you sure you want to empty your shopping cart?');
    if (confirmClear) {
      this.cartItems = [];
      this.updateCartState();
      this.toastService.showToast('Your cart has been cleared.', 'danger');
    }
  }

  private updateCartState(): void {
    this.saveCartToStorage();
    this.cartSubject.next([...this.cartItems]);
  }

  private saveCartToStorage(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.storageKey, JSON.stringify(this.cartItems));
    }
  }

  private loadCartFromStorage(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedCart = localStorage.getItem(this.storageKey);
      if (savedCart) {
        try {
          this.cartItems = JSON.parse(savedCart);
          this.cartSubject.next([...this.cartItems]);
        } catch (error) {
          console.error('Error parsing cart data from LocalStorage', error);
          this.cartItems = [];
        }
      }
    }
  }
}
