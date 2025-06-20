import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../menu.component';
import { PedidosService } from '../../../services/pedidos.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { CurrencyPipe } from '@angular/common';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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
    const dataSinId = this.pedidoSeleccionado.map(({ id, ...rest }) => rest);

    // 1. Crear Excel
    const worksheet = XLSX.utils.json_to_sheet(dataSinId);
    const workbook = { Sheets: { 'Pedido': worksheet }, SheetNames: ['Pedido'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    FileSaver.saveAs(blob, `Pedido_${this.numeroPedidoActual}.xlsx`);

    // 2. Crear PDF tipo factura
    if (dataSinId.length === 0) return;

    const headers = Object.keys(dataSinId[0]);
    const data = dataSinId.map(obj => headers.map(h => obj[h]));

    let total = 0;
    dataSinId.forEach(item => {
      console.log(dataSinId);
      const cantidad = Number(item['cantidad']) || 0;
      const precio = Number(item['price']) || 0;
      total += cantidad * precio;
    });

    const doc = new jsPDF();
    doc.text('Factura de Pedido', 14, 20);
    doc.text(`Pedido Nº: ${this.numeroPedidoActual}`, 14, 28);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 150, 28);

    autoTable(doc, {
      head: [headers],
      body: data,
      startY: 35,
    });

    // Añadir total al final
    const finalY = (doc as any).lastAutoTable.finalY || 40;
    doc.text(`Total: ${total.toFixed(2)} €`, 14, finalY + 10);

    doc.save(`Factura_${this.numeroPedidoActual}.pdf`);
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.pedidoSeleccionado = [];
    this.numeroPedidoActual = '';
  }

  borrarPedido(): void {
    console.log(this.pedidoSeleccionado.toString());
    if (!confirm(`¿Estás seguro de que deseas eliminar el pedido #${this.numeroPedidoActual.toString()}?`)) return;

    this.pedidosService.eliminarPedidosPorNumeroPedido(this.numeroPedidoActual.toString()).subscribe({
      next: (res) => {
        if (res.success) {
          alert(res.message || 'Pedido eliminado correctamente');
          this.ngOnInit();
        } else {
          alert(res.message || 'No se pudo eliminar el pedido');
        }
        this.cerrarModal();
      },
      error: (err) => {
        console.error('Error eliminando pedido:', err);
        alert('Ocurrió un error al intentar eliminar el pedido');
        this.cerrarModal();
      }
    });
  }
}