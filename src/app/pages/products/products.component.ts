import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { PedidosService } from '../../services/pedidos.service';
import { MenuComponent } from '../menu/menu.component';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MenuComponent, CurrencyPipe, NgIf, NgFor, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  productos: any[] = [];
  mostrarModal = false;
  productoSeleccionado: any = null;
  cantidad: number = 1;
  numeroPedido: string = '';

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private pedidosService: PedidosService
  ) { }

  ngOnInit(): void {
    const categoryId = this.route.snapshot.paramMap.get('id');
    if (categoryId) {
      this.productsService.getProductosPorCategoria(categoryId).subscribe({
        next: (data) => this.productos = data,
        error: (err) => console.error('Error cargando productos', err)
      });
    }
  }

  abrirModal(producto: any): void {
    this.productoSeleccionado = producto;
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.productoSeleccionado = null;
    this.cantidad = 1;
    this.numeroPedido = '';
    window.location.reload();
  }
  

  crearPedido(): void {
    if (!this.productoSeleccionado || !this.cantidad || !this.numeroPedido) return;

    const usuario = JSON.parse(localStorage.getItem('user') || '""');

    const pedido = {
      producto_id: this.productoSeleccionado.id,
      cantidad: this.cantidad,
      numero_pedido: this.numeroPedido,
      usuario: usuario // <- Añadir al cuerpo del pedido
    };

    this.pedidosService.crearPedido(pedido).subscribe({
      next: () => {
        alert('Pedido creado exitosamente');
        this.cerrarModal();
      },
      error: err => {
        console.error('Error al crear el pedido', err);
        alert('Hubo un error al crear el pedido.');
      }
    });
  }

}
