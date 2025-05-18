import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../menu.component';
import { PedidosService } from '../../../services/pedidos.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-orders',
  imports: [MenuComponent, CurrencyPipe],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  pedidos: any[] = [];
  pedidoSeleccionado: any[] = [];
  mostrarModal = false;
  numeroPedidoActual = '';

  constructor(private pedidosService: PedidosService) { }

  ngOnInit(): void {
    this.pedidosService.getPedidos().subscribe(data => {
      this.pedidos = data;
    });
  }

  abrirDetalle(numeroPedido: string): void {
    this.numeroPedidoActual = numeroPedido;
    this.pedidosService.getDetallesPedido(numeroPedido).subscribe(detalle => {
      this.pedidoSeleccionado = detalle;
      this.mostrarModal = true;
    });
  }

  getTotal(): number {
    return this.pedidoSeleccionado.reduce((acc, item) => acc + (item.cantidad * item.price), 0);
  }

  exportarAExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet(this.pedidoSeleccionado);
    const workbook = { Sheets: { 'Pedido': worksheet }, SheetNames: ['Pedido'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    FileSaver.saveAs(blob, `Pedido_${this.numeroPedidoActual}.xlsx`);

    // Lógica para eliminar el pedido después de exportar
    this.pedidosService.eliminarPedidosPorNumeroPedido(this.numeroPedidoActual).subscribe({
      next: () => {
        // Eliminar visualmente el pedido de la lista
        this.pedidos = this.pedidos.filter(p => p.numero_pedido !== this.numeroPedidoActual);
        this.cerrarModal();
      },
      error: (err) => {
        console.error('Error eliminando pedido:', err);
      }
    });
  }


  cerrarModal(): void {
    this.mostrarModal = false;
    this.pedidoSeleccionado = [];
    this.numeroPedidoActual = '';
  }
}