import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService, CartItem } from '../cart';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})

export class Cart implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  totalPrice = 0;
  totalQuantity = 0;
  private subscription!: Subscription;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.subscription = this.cartService.getCartItems().subscribe(items => {
    this.cartItems = items;
    this.calculateTotals();
    });
  }

  increment(id: number): void {
    this.cartService.incrementQuantity(id);
  }

  decrement(id: number): void {
    this.cartService.decrementQuantity(id);
  }

  removeItem(id: number): void {
    this.cartService.removeFromCart(id);
  }

  private calculateTotals(): void {
    this.totalPrice = this.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    this.totalQuantity = this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  clearCart(): void {
  this.cartService.clearCart();
  }
}
 