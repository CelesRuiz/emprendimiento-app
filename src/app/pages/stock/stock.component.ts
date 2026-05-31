import { Component, inject, OnInit, signal } from '@angular/core';
import { StockService } from './stock.service';
import { MovimientoStock } from '../../core/models/movimiento-stock';
import { StockProducto } from '../../core/models/stock-producto';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-stock',
  imports: [
    MatTableModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatPaginatorModule,
    FormsModule,
    DatePipe,
  ],
  templateUrl: './stock.html',
  styleUrl: './stock.css',
})
export class StockComponent implements OnInit {
  private stockService = inject(StockService);

  stockProductos = signal<StockProducto[]>([]);
  movimientos = signal<MovimientoStock[]>([]);
  productoSeleccionado: StockProducto | null = null;
  filtroTipo: number | undefined = undefined;
  columnas = ['fecha', 'tipo', 'cantidad'];

  tiposMovimiento = [
    { valor: undefined, etiqueta: 'Todos' },
    { valor: 0, etiqueta: 'Producción' },
    { valor: 1, etiqueta: 'Venta' },
  ];

  ngOnInit() {
    this.cargarStock();
  }

  cargarStock() {
    this.stockService.getStockPorProductos().subscribe({
      next: (data) => this.stockProductos.set(data),
      error: (err) => console.error(err),
    });
  }

  verMovimientos(producto: StockProducto) {
    this.productoSeleccionado = producto;
    this.stockService.getAll(this.filtroTipo, undefined, undefined).subscribe({
      next: (data) =>
        this.movimientos.set(data.filter((m) => m.productoId === producto.productoId)),
      error: (err) => console.error(err),
    });
  }

  getTipoLabel(tipo: number): string {
    return tipo === 0 ? 'Producción' : 'Venta';
  }

  esBajoStock(p: StockProducto): boolean {
    return p.stockActual < p.stockMinimo;
  }
}
