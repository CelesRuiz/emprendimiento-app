export interface CrearProducto {
  nombre: string;
  descripcion: string;
  precioVenta: number;
  stockMinimo: number;
  esCombo: boolean;
  diasMaxFrescura: number;
}
