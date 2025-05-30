import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private baseUrl = 'http://localhost:80/API';

  constructor(private http: HttpClient) { }

  crearPedido(pedido: { producto_id: number; cantidad: number; numero_pedido: string; usuario: string }): Observable<any> {
    console.log(pedido);
    return this.http.post(`${this.baseUrl}/pedidos.php`, pedido);
  }

  getPedidos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/get_pedidos.php`);
  }

  getDetallesPedido(numeroPedido: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/get_pedido_detalle.php?numero_pedido=${numeroPedido}`);
  }
  eliminarPedidosPorNumeroPedido(numeroPedido: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/eliminar_pedido.php?numero_pedido=${numeroPedido}`);
  }

}
