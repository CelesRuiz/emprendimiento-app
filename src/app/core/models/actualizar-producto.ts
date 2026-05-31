export interface ActualizarProducto {
  id: number;
  nombre: string;
  descripcion: string;
  precioVenta: number;
  stockMinimo: number;
  esCombo: boolean;
  diasMaxFrescura: number;
}
