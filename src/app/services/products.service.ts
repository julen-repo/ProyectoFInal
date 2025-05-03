import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://192.168.1.34/API/'; // Ajusta si usas otra ruta base

  constructor(private http: HttpClient) {}

  getProductosPorCategoria(categoryId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/get_products_by_category.php?category_id=${categoryId}`);
  }
  createProduct(producto: any) {
    return this.http.post<any>('http://192.168.1.34/API/create_product.php', producto);
  }
  
}
