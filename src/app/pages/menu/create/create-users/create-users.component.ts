import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateUserService } from '../../../../services/create-user.service';
import { Router } from '@angular/router';
import { MenuComponent } from '../../menu.component';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-create-user',
  imports: [MenuComponent, ReactiveFormsModule],
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.css']
})
export class CreateUsersComponent {

  createUserForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private createUserService: CreateUserService,
    private router: Router
  ) {
    this.createUserForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.createUserForm.valid) {
      this.createUserService.createUser(this.createUserForm.value).subscribe({
        next: (response) => {
          if (response.success) {
            console.log('Usuario creado con éxito', response);
            this.router.navigate(['categories']);  // Redirigir a una lista de usuarios o página deseada
          } else {
            alert('Error al crear usuario:' + response.message);
          }

        },
        error: (err) => {
          console.error('Error al crear usuario', err);
        }
      });
    }
  }
}
