import { Component, inject } from '@angular/core';
import { MenuComponent } from '../menu.component';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '../../../services/categories.service';
import { ProductsService } from '../../../services/products.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-remove-and-modify',
  imports: [MenuComponent, CurrencyPipe],
  templateUrl: './remove-and-modify.component.html',
  styleUrl: './remove-and-modify.component.css'
})
export class RemoveAndModifyComponent {
  private router = inject(Router);
  categories: Category[] = [];
  productos: any[] = [];

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    const user = localStorage.getItem('user');

    if (!user) {
      this.router.navigate(['']);
    }
    this.categoriesService.getCategories().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error('Error cargando categorías', err)
    });
    this.productsService.getAllProducts().subscribe({
      next: (data) => this.productos = data,
      error: (err) => console.error('Error cargando productos', err)
    });
  }
  selectedCategory: Category | null = null;

  abrirModalCategoria(category: Category): void {
    this.selectedCategory = category;
  }

}
