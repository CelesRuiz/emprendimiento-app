import { ProductoInsumo } from './producto-insumo';

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precioVenta: number;
  stockMinimo: number;
  esCombo: boolean;
  diasMaxFrescura: number;
  costoProduccion: number;
  creadoEn: string;
  actualizadoEn: string;
  productoInsumos: ProductoInsumo[];
}
