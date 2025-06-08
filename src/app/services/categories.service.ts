import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Category {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private apiUrl = 'http://localhost:80/API/'; // ajusta la URL

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/get_categories.php`);
  }
  createCategory(categoria: { name: string }) {
    return this.http.post<any>(`${this.apiUrl}create_category.php`, categoria);
  }
  deleteCategory(id: number) {
    console.log(`${this.apiUrl}/delete_category.php?id=${id}`);
    return this.http.delete<any>(`${this.apiUrl}/delete_category.php?id=${id}`);
  }
  updateCategory(id: number, name: string) {
    return this.http.put<any>(`${this.apiUrl}update_category.php`, {
      id,
      name
    });
  }
}
