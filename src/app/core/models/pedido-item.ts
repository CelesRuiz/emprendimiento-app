import { Producto } from './producto';
import { Combo } from './combo';

export interface PedidoItem {
  id: number;
  pedidoId: number;
  productoId: number | null;
  producto: Producto | null;
  comboId: number | null;
  combo: Combo | null;
  cantidad: number;
  precioUnitario: number;
}
