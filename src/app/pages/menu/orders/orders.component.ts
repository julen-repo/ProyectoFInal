import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../menu.component';
import { PedidosService } from '../../../services/pedidos.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { NgFor, NgIf, CurrencyPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-orders',
  imports: [MenuComponent, NgFor, NgIf, NgClass, CurrencyPipe],
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
    return 123.45; // prueba fija
  }

  exportarAExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet(this.pedidoSeleccionado);
    const workbook = { Sheets: { 'Pedido': worksheet }, SheetNames: ['Pedido'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    FileSaver.saveAs(blob, `Pedido_${this.numeroPedidoActual}.xlsx`);
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.pedidoSeleccionado = [];
    this.numeroPedidoActual = '';
  }
}