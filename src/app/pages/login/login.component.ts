import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';  // Importa el AuthService
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router, private loginService: LoginService) { }

  datos = '';
  loginError: boolean = false;


  loginForm = new FormGroup({
    user: new FormControl(''),
    pass: new FormControl(''),
  });
  ngOnInit(): void {
    const user = localStorage.getItem('user');

    if (user) {
      this.router.navigate(['categories']);
    }
  }
  submit() {
    const user = this.loginForm.value.user ?? '';
    const pass = this.loginForm.value.pass ?? '';
  
    this.loginService.login(user, pass).subscribe({
      next: (response) => {
        if (response.success) {
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('pass', response.user.password);
          localStorage.setItem('role', response.user.role);
          console.log('Login exitoso');
          this.loginError = false;
          this.router.navigate(['categories']);
        } else {
          this.loginError = true;
          console.log('Credenciales incorrectas');
        }
      },
      error: (err) => {
        this.loginError = true;
        console.error('Error en la autenticación', err);
      },
    });
  }
}
