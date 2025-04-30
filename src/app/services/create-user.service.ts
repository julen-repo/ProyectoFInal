import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {

  private apiUrl = 'http://localhost/API/createUser.php';  // URL de tu archivo PHP

  constructor(private http: HttpClient) { }

  // Función para enviar los datos del formulario al backend
  createUser(userData: any): Observable<any> {
    return this.http.post(this.apiUrl, userData);
  }
}
