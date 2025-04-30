import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private apiUrl = 'http://localhost/API/pedidos.php';

  constructor(private http: HttpClient) {}

  crearPedido(pedido: { producto_id: number; cantidad: number; numero_pedido: string }): Observable<any> {
    return this.http.post(this.apiUrl, pedido);
  }
}
