import { Producto } from './producto';

export interface MovimientoStock {
  id: number;
  productoId: number;
  producto: Producto;
  tipo: number;
  cantidad: number;
  fecha: string;
  creadoEn: string;
  actualizadoEn: string;
}
