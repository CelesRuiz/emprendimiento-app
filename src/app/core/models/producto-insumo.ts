import { Insumo } from './insumo';

export interface ProductoInsumo {
  productoId: number;
  insumoId: number;
  cantidad: number;
  insumo: Insumo;
}
