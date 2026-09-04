import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ToastMessage {
  message: string;
  type: 'success' | 'info' | 'danger';
  visible: boolean;
}

@Injectable({
  providedIn: 'root',
})

export class ToastService {

  private toastSubject = new BehaviorSubject<ToastMessage>({ message: '', type: 'success', visible: false });

  getToastState(): Observable<ToastMessage> {
    return this.toastSubject.asObservable();
  }

  showToast(message: string, type: 'success' | 'info' | 'danger' = 'success'): void {
    this.toastSubject.next({ message, type, visible: true });
    
    // Automatically hide toast after 3 seconds
    setTimeout(() => {
      this.hideToast();
    }, 3000);
  }

  hideToast(): void {
    this.toastSubject.next({ message: '', type: 'success', visible: false });
  }
  
}
