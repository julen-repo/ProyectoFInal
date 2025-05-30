import { Component, inject } from '@angular/core';
import { MenuComponent } from '../menu.component';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '../../../services/categories.service';
import { ProductsService } from '../../../services/products.service';
import { CurrencyPipe } from '@angular/common';
declare var bootstrap: any;
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

  borrarCategoria(): void {
    if (!this.selectedCategory) {
      return;
    }

    const confirmacion = confirm(
      `¿Estás seguro de que quieres eliminar la categoría "${this.selectedCategory.name}"?\nEsto también eliminará sus productos y los productos de pedidos.`
    );

    if (!confirmacion) return;
    console.log(this.selectedCategory.id)
    this.categoriesService.deleteCategory(this.selectedCategory.id).subscribe({
      next: (res) => {
        alert(res.message || 'Categoría eliminada exitosamente');
        this.selectedCategory = null;
        // Vuelve a cargar categorías y productos actualizados
        this.ngOnInit();
        // Cierra el modal
        const modalElement = document.getElementById('categoryModal');
        const modal = bootstrap.Modal.getInstance(modalElement!);
        modal?.hide();
        document.body.focus();
      },
      error: (err) => {
        console.error('Error al eliminar la categoría', err);
        alert('Error: ' + (err.error?.message || err.message || 'No se pudo eliminar la categoría'));
      }
    });
  }
  modificarCategoria(nuevoNombre: string): void {
    if (!this.selectedCategory || !nuevoNombre.trim()) {
      alert('El nombre no puede estar vacío.');
      return;
    }

    this.categoriesService.updateCategory(this.selectedCategory.id, nuevoNombre).subscribe({
      next: (res) => {
        alert(res.message || 'Categoría modificada correctamente');
        this.selectedCategory = null;
        this.ngOnInit(); // recargar categorías
        const modalElement = document.getElementById('categoryModal');
        const modal = bootstrap.Modal.getInstance(modalElement!);
        modal?.hide();
      },
      error: (err) => {
        console.error('Error al modificar la categoría', err);
        alert('No se pudo modificar la categoría');
      }
    });
  }

  selectedProduct: any = null;

  abrirModalProducto(producto: any): void {
    this.selectedProduct = { ...producto }; // Clonamos el producto
  }

  borrarProducto(): void {
    if (!this.selectedProduct) return;

    const confirmacion = confirm(`¿Eliminar el producto "${this.selectedProduct.name}"?`);

    if (!confirmacion) return;

    this.productsService.deleteProduct(this.selectedProduct.id).subscribe({
      next: (res) => {
        alert(res.message || 'Producto eliminado correctamente');
        this.selectedProduct = null;
        this.ngOnInit();
        const modalElement = document.getElementById('productModal');
        const modal = bootstrap.Modal.getInstance(modalElement!);
        modal?.hide();
      },
      error: (err) => {
        console.error('Error al eliminar producto', err);
        alert('No se pudo eliminar el producto');
      }
    });
  }

  modificarProducto(nombre: string, cantidad: string, precio: string): void {
    if (!this.selectedProduct) return;

    const body = {
      id: this.selectedProduct.id,
      name: nombre.trim(),
      quantity: parseInt(cantidad, 10),
      price: parseFloat(precio)
    };

    // Validación opcional
    if (!body.name || isNaN(body.quantity) || isNaN(body.price)) {
      alert('Rellena todos los campos correctamente.');
      return;
    }

    console.log(body);

    this.productsService.updateProduct(body).subscribe({
      next: (res) => {
        alert((res as any).message || 'Producto modificado correctamente');
        this.selectedProduct = null;
        this.ngOnInit();
        const modalElement = document.getElementById('productModal');
        const modal = bootstrap.Modal.getInstance(modalElement!);
        modal?.hide();
      },
      error: (err) => {
        console.error('Error al modificar producto', err);
        alert('Error al modificar el producto');
      }
    });
  }


}
