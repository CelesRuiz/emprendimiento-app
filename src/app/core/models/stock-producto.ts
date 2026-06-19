export interface StockProducto {
  productoId: number;
  nombre: string;
  stockActual: number;
  stockMinimo: number;
  esStockBajo: boolean;
  diasMaxFrescura: number;
  ultimaProduccion: string | null;
}
