import { Routes } from '@angular/router';
import { Cart } from './cart/cart';
import { Products } from './products/products';

export const routes: Routes = [
    {
        path:'',
        redirectTo: 'products',
        pathMatch: 'full'
    },
    {
        path: 'products',
        component:Products
    },
    {
        path: 'cart',
        component:Cart
    },
];
