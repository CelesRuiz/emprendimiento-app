import { Producto } from './producto';

export interface ComboOpcionProducto {
  comboOpcionId: number;
  productoId: number;
  producto: Producto;
}
