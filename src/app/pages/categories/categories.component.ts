import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { CategoriesService, Category } from '../../services/categories.service';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-logout',
  imports: [MenuComponent],
  templateUrl: './categories.component.html',
})
export class CategoriesComponent {
  private router = inject(Router);
  categories: Category[] = [];

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    const user = localStorage.getItem('user');

    if (!user) {
      this.router.navigate(['']);
    }
    this.categoriesService.getCategories().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error('Error cargando categorías', err)
    });
    const role = localStorage.getItem('role');
    console.log('Rol del usuario:',role);
  }

  cerrarSesion(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('pass');
    this.router.navigate(['']);
  }
  verProductos(categoryId: number): void {
    this.router.navigate(['products', categoryId]);
  }
}
