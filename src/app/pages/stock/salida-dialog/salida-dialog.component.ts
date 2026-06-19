import { Component, inject } from '@angular/core';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

interface SalidaDialogData {
  productoId: number;
  nombreProducto: string;
}

@Component({
  selector: 'app-salida-dialog',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './salida-dialog.html',
  styleUrl: './salida-dialog.css',
})
export class SalidaDialogComponent {
  private dialogRef = inject(MatDialogRef<SalidaDialogComponent>);
  data = inject<SalidaDialogData>(MAT_DIALOG_DATA);

  cantidad: number = 1;
  motivoSalida: string = 'Vencimiento';

  motivos = [
    { valor: 'Vencimiento', etiqueta: 'Vencimiento' },
    { valor: 'Descarte', etiqueta: 'Descarte' },
  ];

  guardar() {
    if (this.cantidad <= 0) return;
    this.dialogRef.close({
      productoId: this.data.productoId,
      cantidad: this.cantidad,
      motivoSalida: this.motivoSalida,
    });
  }

  cancelar() {
    this.dialogRef.close();
  }
}
