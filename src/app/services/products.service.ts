import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://localhost:80/API/'; // Ajusta si usas otra ruta base

  constructor(private http: HttpClient) { }

  getProductosPorCategoria(categoryId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/get_products_by_category.php?category_id=${categoryId}`);
  }
  createProduct(producto: any) {
    return this.http.post<any>(`${this.apiUrl}/create_product.php`, producto);
  }
  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/get_allProducts.php`);
  }
  updateProduct(product: any) {
    console.log(product);
    return this.http.put<any>(`${this.apiUrl}/update_product.php`, product);
  }
  deleteProduct(id: number) {
    return this.http.delete<any>(`${this.apiUrl}/delete_product.php?id=${id}`);
  }

}
