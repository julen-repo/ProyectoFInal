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
  private apiUrl = 'http://192.168.1.34/API/get_categories.php'; // ajusta la URL

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }
  createCategory(categoria: { name: string }) {
    return this.http.post<any>('http://192.168.1.34/API/create_category.php', categoria);
  }
}
