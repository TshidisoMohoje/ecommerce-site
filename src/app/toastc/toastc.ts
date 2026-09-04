import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastService, ToastMessage } from '../toast';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-toastc',
  imports: [CommonModule],
  templateUrl: './toastc.html',
  styleUrl: './toastc.css',
})

  export class Toastc implements OnInit, OnDestroy {
  toast: ToastMessage = { message: '', type: 'success', visible: false };
  private subscription!: Subscription;

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.subscription = this.toastService.getToastState().subscribe(state => {
    this.toast = state;
    });
  }

  close(): void {
    this.toastService.hideToast();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
