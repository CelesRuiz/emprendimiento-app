import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductosService } from './productos.service';
import { Producto } from '../../core/models/producto';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-productos',
  imports: [
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
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
}
