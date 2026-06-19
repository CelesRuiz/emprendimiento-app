export interface MovimientoStock {
  id: number;
  productoId: number;
  nombreProducto: string;
  tipo: string;
  cantidad: number;
  cantidadActual: number | null;
  fecha: string;
  motivoSalida: string | null;
  fechaVencimiento: string | null;
  estaAnulado: boolean;
  creadoEn: string;
  actualizadoEn: string;
}
