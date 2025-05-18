import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { PedidosService } from '../../services/pedidos.service';
import { MenuComponent } from '../menu/menu.component';
import { CurrencyPipe, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MenuComponent, CurrencyPipe, NgIf, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  productos: any[] = [];
  mostrarModal = false;
  productoSeleccionado: any = null;
  cantidad: number = 1;
  numeroPedido: string = '';
  categoryId: number | null = null;

  constructor(
    private productsService: ProductsService,
    private pedidosService: PedidosService,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.categoryId = navigation?.extras.state?.['categoryId'] ?? null;
  }

  ngOnInit(): void {
    // Si no se recibe el categoryId, redirigir
    if (!this.categoryId) {
      alert('No se ha recibido la categoría. Redirigiendo...');
      this.router.navigate(['/categories']);
      return;
    }

    // Obtener productos
    this.productsService.getProductosPorCategoria(this.categoryId.toString()).subscribe({
      next: (data) => this.productos = data,
      error: (err) => console.error('Error cargando productos', err)
    });
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
      usuario: usuario
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
