import { Component, inject, OnInit, signal } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../../Productos/productos.service';
import { Producto } from '../../../core/models/producto';

@Component({
  selector: 'app-produccion-dialog',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './produccion-dialog.html',
  styleUrl: './produccion-dialog.css',
})
export class ProduccionDialogComponent implements OnInit {
  private dialogRef = inject(MatDialogRef<ProduccionDialogComponent>);
  private productosService = inject(ProductosService);

  productos = signal<Producto[]>([]);
  productoId: number | null = null;
  cantidad: number = 1;

  ngOnInit() {
    this.productosService.getAll().subscribe({
      next: (data) => this.productos.set(data),
      error: (err) => console.error(err),
    });
  }

  guardar() {
    if (!this.productoId || this.cantidad <= 0) return;
    this.dialogRef.close({ productoId: this.productoId, cantidad: this.cantidad });
  }

  cancelar() {
    this.dialogRef.close();
  }
}
