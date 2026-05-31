import { ComboOpcionProducto } from './combo-opcion-producto';
import { Producto } from './producto';

export interface ComboOpcion {
  id: number;
  comboId: number;
  nombre: string;
  esEleccion: boolean;
  productoFijoId: number | null;
  productoFijo: Producto | null;
  productos: ComboOpcionProducto[];
  creadoEn: string;
  actualizadoEn: string;
}
