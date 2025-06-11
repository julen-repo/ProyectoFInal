import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImportService {
  private apiUrl = 'http://187.33.158.55:80/API'; // Ajusta si es necesario

  constructor(private http: HttpClient) {}

  importarProductos(productos: any[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/importar_productos.php`, { productos });
  }
}
