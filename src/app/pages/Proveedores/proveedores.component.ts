import { Component, inject, OnInit, signal } from '@angular/core';
import { ProveedoresService } from './proveedores.service';
import { Proveedor } from '../../core/models/proveedor';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-proveedores',
  imports: [
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
  ],
  templateUrl: './proveedores.html',
  styleUrl: './proveedores.css',
})
export class ProveedoresComponent implements OnInit {
  private proveedoresService = inject(ProveedoresService);

  proveedores = signal<Proveedor[]>([]);
  filtroNombre = '';
  columnas = ['nombre', 'telefono', 'email', 'direccion', 'acciones'];

  ngOnInit() {
    this.cargarProveedores();
  }

  cargarProveedores() {
    // agrgar console.log para verificar que se llama a la función
    this.proveedoresService.getAll(this.filtroNombre).subscribe({
      next: (data) => this.proveedores.set(data),
      error: (err) => console.error(err),
    });
  }
}
