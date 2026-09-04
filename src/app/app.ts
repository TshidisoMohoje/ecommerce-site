import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Toastc } from './toastc/toastc';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink, Toastc],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
}
