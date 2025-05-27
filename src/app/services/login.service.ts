import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:80/API/login.php';

  constructor(private http: HttpClient) {}

  login(user: string, pass: string): Observable<any> {
    const credentials = { user, pass };
    return this.http.post(this.apiUrl, credentials);
  }
}
