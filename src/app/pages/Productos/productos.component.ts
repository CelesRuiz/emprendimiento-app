import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductosService } from './productos.service';
import { Producto } from '../../core/models/producto';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { ProductoDialogComponent } from './producto-dialog/producto-dialog.component';

@Component({
  selector: 'app-productos',
  imports: [
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatDialogModule,
    MatMenuModule,
  ],
  templateUrl: './productos.html',
  styleUrl: './productos.css',
})
export class ProductosComponent implements OnInit {
  private productosService = inject(ProductosService);

  productos = signal<Producto[]>([]);
  filtroNombre = '';
  columnas = ['nombre', 'descripcion', 'precioVenta', 'stockMinimo', 'acciones'];

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productosService.getAll(this.filtroNombre).subscribe({
      next: (data) => this.productos.set(data),
      error: (err) => console.error(err),
    });
  }

  private dialog = inject(MatDialog);

  eliminarProducto(id: number) {
    if (confirm('¿Estás segura de que querés eliminar este producto?')) {
      this.productosService.deleteProducto(id).subscribe({
        next: () => this.cargarProductos(),
        error: (err) => console.error(err),
      });
    }
  }

  abrirDialog(producto?: Producto) {
    const dialogRef = this.dialog.open(ProductoDialogComponent, {
      data: producto ?? null,
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        if (producto) {
          this.productosService.updateProducto(producto.id, resultado).subscribe({
            next: () => this.cargarProductos(),
            error: (err) => console.error(err),
          });
        } else {
          this.productosService.createProducto(resultado).subscribe({
            next: () => this.cargarProductos(),
            error: (err) => console.error(err),
          });
        }
      }
    });
  }
}
