import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../../../services/products.service';
import { CategoriesService, Category } from '../../../../services/categories.service';
import { MenuComponent } from '../../menu.component';
import { Validators } from '@angular/forms'; // <--- Asegúrate de tener esto

@Component({
  selector: 'app-create-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,MenuComponent],
  templateUrl: './create-products.component.html',
  styleUrls: ['./create-products.component.css']
})
export class CreateProductsComponent implements OnInit {
  productForm = new FormGroup({
    name: new FormControl('', Validators.required),
    category_id: new FormControl('', Validators.required),
    quantity: new FormControl('', [Validators.required, Validators.min(1)]),
    price: new FormControl('', [Validators.required, Validators.min(0.01)])
  });

  categories: Category[] = [];

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit() {
    this.categoriesService.getCategories().subscribe({
      next: (data) => (this.categories = data),
      error: (err) => console.error('Error al cargar categorías', err)
    });
  }

  onSubmit() {
    const product = this.productForm.value;
    if (product.name && product.category_id && product.quantity && product.price) {
      this.productsService.createProduct(product).subscribe({
        next: () => {
          alert('Producto creado correctamente');
          this.productForm.reset();
        },
        error: (err) => {
          console.error('Error al crear producto', err);
        }
      });
    }
  }
}
