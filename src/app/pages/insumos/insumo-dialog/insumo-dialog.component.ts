import { Component, inject } from '@angular/core';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CrearInsumo } from '../../../core/models/crear-insumo';

@Component({
  selector: 'app-insumo-dialog',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './insumo-dialog.html',
  styleUrl: './insumo-dialog.css',
})
export class InsumoDialogComponent {
  public data = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<InsumoDialogComponent>);

  insumo: CrearInsumo = this.data ?? {
    nombre: '',
    precioPorUnidad: 0,
    unidadMedida: '',
    stockMinimo: 0,
  };

  unidades = ['Gramos', 'Kilogramos', 'Litros', 'Mililitros', 'Unidad', 'Porcion'];

  guardar() {
    this.dialogRef.close(this.insumo);
  }

  cancelar() {
    this.dialogRef.close();
  }
}
