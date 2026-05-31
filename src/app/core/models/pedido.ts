import { PedidoItem } from './pedido-item';
import { EstadoPedido } from './estado-pedido';

export interface Pedido {
  id: number;
  estado: EstadoPedido;
  fechaPedido: string;
  origenPedido: string | null;
  items: PedidoItem[];
  creadoEn: string;
  actualizadoEn: string;
}
