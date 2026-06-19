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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProduccionDialogComponent } from './produccion-dialog/produccion-dialog.component';
import { MatMenuModule } from '@angular/material/menu';
import { LoteProducto } from '../../core/models/lote-producto';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SalidaDialogComponent } from './salida-dialog/salida-dialog.component';

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
    MatDialogModule,
    MatMenuModule,
    MatSlideToggleModule,
  ],
  templateUrl: './stock.html',
  styleUrl: './stock.css',
})
export class StockComponent implements OnInit {
  private stockService = inject(StockService);
  private dialog = inject(MatDialog);

  stockProductos = signal<StockProducto[]>([]);
  movimientos = signal<MovimientoStock[]>([]);
  productoSeleccionado: StockProducto | null = null;
  lotes = signal<LoteProducto[]>([]);
  verHistorial = false;
  columnas = ['fecha', 'tipo', 'cantidad', 'acciones'];
  filtroDesde: string | null = null;
  filtroHasta: string | null = null;

  tiposMovimiento = [
    { valor: undefined, etiqueta: 'Todos', tipo: undefined, motivo: undefined },
    { valor: 'produccion', etiqueta: 'Producción', tipo: 'Entrada', motivo: undefined },
    { valor: 'venta', etiqueta: 'Venta', tipo: 'Salida', motivo: 'Venta' },
    { valor: 'vencimiento', etiqueta: 'Vencimiento', tipo: 'Salida', motivo: 'Vencimiento' },
    { valor: 'descarte', etiqueta: 'Descarte', tipo: 'Salida', motivo: 'Descarte' },
  ];

  filtroSeleccionado: string | undefined = undefined;

  motivosSalida = [
    { valor: undefined, etiqueta: 'Todos' },
    { valor: 'Venta', etiqueta: 'Venta' },
    { valor: 'Vencimiento', etiqueta: 'Vencimiento' },
    { valor: 'Descarte', etiqueta: 'Descarte' },
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

    const seleccion = this.tiposMovimiento.find((t) => t.valor === this.filtroSeleccionado);
    const tipo = seleccion?.tipo;
    const motivo = seleccion?.motivo;

    this.stockService
      .getAll(tipo, motivo, this.filtroDesde || undefined, this.filtroHasta || undefined)
      .subscribe({
        next: (data) =>
          this.movimientos.set(data.filter((m) => m.productoId === producto.productoId)),
        error: (err) => console.error(err),
      });
    this.cargarLotes();
  }

  getTipoLabel(tipo: string): string {
    return tipo === 'Entrada' ? 'Producción' : 'Venta';
  }

  esBajoStock(p: StockProducto): boolean {
    return p.stockActual < p.stockMinimo;
  }

  abrirProduccionDialog() {
    const dialogRef = this.dialog.open(ProduccionDialogComponent);

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        this.stockService.registrarProduccion(resultado.productoId, resultado.cantidad).subscribe({
          next: () => {
            this.cargarStock();
            if (this.productoSeleccionado) {
              this.verMovimientos(this.productoSeleccionado);
            }
          },
          error: (err) => console.error(err),
        });
      }
    });
  }

  getBadgeClass(m: MovimientoStock): string {
    if (m.estaAnulado) return 'badge-anulacion';
    if (m.tipo === 'Entrada') return 'badge-produccion';
    if (m.motivoSalida === 'Venta') return 'badge-venta';
    if (m.motivoSalida === 'Vencimiento') return 'badge-vencimiento';
    if (m.motivoSalida === 'Descarte') return 'badge-descarte';
    return '';
  }

  getMovimientoLabel(m: MovimientoStock): string {
    if (m.estaAnulado) {
      if (m.tipo === 'Entrada') return 'Producción (Anulada)';
      return `${m.motivoSalida || 'Salida'} (Anulada)`;
    }
    if (m.tipo === 'Entrada') return 'Producción';
    return m.motivoSalida || 'Salida';
  }

  estaPosiblementeVencido(p: StockProducto): boolean {
    if (!p.ultimaProduccion || p.diasMaxFrescura === 0 || p.stockActual <= 0) return false;

    const fechaProduccion = new Date(p.ultimaProduccion);
    const hoy = new Date();
    const diasTranscurridos = Math.floor(
      (hoy.getTime() - fechaProduccion.getTime()) / (1000 * 60 * 60 * 24),
    );

    return diasTranscurridos >= p.diasMaxFrescura;
  }

  anularMovimiento(id: number) {
    if (
      confirm(
        '¿Estás segura de que querés anular este movimiento? Esta acción no se puede deshacer.',
      )
    ) {
      this.stockService.anularMovimiento(id).subscribe({
        next: () => {
          this.verMovimientos(this.productoSeleccionado!);
          this.cargarStock();
        },
        error: (err) => console.error(err),
      });
    }
  }
  cargarLotes() {
    if (!this.productoSeleccionado) return;
    console.log('verHistorial:', this.verHistorial);
    this.stockService.getLotes(this.productoSeleccionado.productoId, this.verHistorial).subscribe({
      next: (data) => this.lotes.set(data),
      error: (err) => console.error(err),
    });
  }
  abrirSalidaDialog() {
    if (!this.productoSeleccionado) return;

    const dialogRef = this.dialog.open(SalidaDialogComponent, {
      data: {
        productoId: this.productoSeleccionado.productoId,
        nombreProducto: this.productoSeleccionado.nombre,
      },
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        this.stockService
          .registrarSalida(resultado.productoId, resultado.cantidad, resultado.motivoSalida)
          .subscribe({
            next: () => {
              this.cargarStock();
              this.verMovimientos(this.productoSeleccionado!);
            },
            error: (err) => console.error(err),
          });
      }
    });
  }
}
