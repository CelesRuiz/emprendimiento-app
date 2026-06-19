export interface LoteProducto {
  id: number;
  fecha: string;
  cantidad: number;
  cantidadActual: number | null;
  fechaVencimiento: string | null;
  estado: string;
  estaAnulado: boolean;
}
