import { Component, inject, OnInit, signal } from '@angular/core';
import { InsumosService } from './insumos.service';
import { Insumo } from '../../core/models/insumo';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { InsumoDialogComponent } from './insumo-dialog/insumo-dialog.component';

@Component({
  selector: 'app-insumos',
  imports: [
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    DatePipe,
    MatDialogModule,
  ],
  templateUrl: './insumos.html',
  styleUrl: './insumos.css',
})
export class InsumosComponent implements OnInit {
  private insumosService = inject(InsumosService);

  insumos = signal<Insumo[]>([]);
  filtroNombre = '';
  columnas = [
    'nombre',
    'precioPorUnidad',
    'unidadMedida',
    'stockMinimo',
    'creadoEn',
    'actualizadoEn',
    'acciones',
  ];

  ngOnInit() {
    this.cargarInsumos();
  }

  cargarInsumos() {
    this.insumosService.getAll(this.filtroNombre).subscribe({
      next: (data) => this.insumos.set(data),
      error: (err) => console.error(err),
    });
  }
  private dialog = inject(MatDialog);

  abrirDialog(insumo?: Insumo) {
    const dialogRef = this.dialog.open(InsumoDialogComponent, {
      data: insumo ?? null,
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        if (insumo) {
          this.insumosService.updateInsumo(insumo.id, resultado).subscribe({
            next: () => this.cargarInsumos(),
            error: (err) => console.error(err),
          });
        } else {
          this.insumosService.createInsumo(resultado).subscribe({
            next: () => this.cargarInsumos(),
            error: (err) => console.error(err),
          });
        }
      }
    });
  }

  eliminarInsumo(id: number) {
    if (confirm('¿Estás segura de que querés eliminar este insumo?')) {
      this.insumosService.deleteInsumo(id).subscribe({
        next: () => this.cargarInsumos(),
        error: (err) => console.error(err),
      });
    }
  }
}
