import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [NgIf], 
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  private router = inject(Router);
  role: string | null = localStorage.getItem('role');

  cerrarSesion(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('pass');
    localStorage.removeItem('role');
    this.router.navigate(['']);
  }
  go_createUsers(): void {
    this.router.navigate(['createUsers']);
  }
  go_createCategories(): void {
    this.router.navigate(['createCategories']);
  }
  go_createProducts(): void {
    this.router.navigate(['createProducts']);
  }
  go_orders(): void {
    this.router.navigate(['orders']);
  }
  go_remove_and_modify(): void {
    this.router.navigate(['remove_and_modify']);
  }
}
