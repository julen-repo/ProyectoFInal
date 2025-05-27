import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoriesService } from '../../../../services/categories.service';
import { MenuComponent } from '../../menu.component';
import { Validators } from '@angular/forms'; // <--- Asegúrate de tener esto

@Component({
  selector: 'app-create-categories',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MenuComponent],
  templateUrl: './create-categories.component.html',
  styleUrls: ['./create-categories.component.css']
})
export class CreateCategoriesComponent {
  categoryForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  constructor(private categoriesService: CategoriesService) { }

  onSubmit() {
    const name = this.categoryForm.value.name;
    if (name) {
      this.categoriesService.createCategory({ name }).subscribe({
        next: (res) => {
          if (res.success) {
            alert(res.message); // Por ejemplo: 'Categoría creada exitosamente'
            this.categoryForm.reset();
          } else {
            alert('Error: ' + res.message); // Por ejemplo: 'La categoría ya existe'
          }
        },
        error: (err) => {
          console.error('Error al crear categoría', err);
          alert('Error en la conexión con el servidor');
        }
      });
    }
  }

}
