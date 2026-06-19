import { Component, inject } from '@angular/core';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CrearProducto } from '../../../core/models/crear-producto';

@Component({
  selector: 'app-producto-dialog',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './producto-dialog.html',
  styleUrl: './producto-dialog.css',
})
export class ProductoDialogComponent {
  private dialogRef = inject(MatDialogRef<ProductoDialogComponent>);
  public data = inject(MAT_DIALOG_DATA);

  producto: CrearProducto = this.data ?? {
    nombre: '',
    descripcion: '',
    precioVenta: 0,
    stockMinimo: 0,
    esCombo: false,
    diasMaxFrescura: 0,
  };

  guardar() {
    this.dialogRef.close(this.producto);
  }

  cancelar() {
    this.dialogRef.close();
  }
}
