import { Insumo } from './insumo';

export interface Lote {
  id: number;
  insumoId: number;
  insumo: Insumo;
  cantidadInicial: number;
  cantidadActual: number;
  fechaVencimiento: string;
  fechaIngreso: string;
  cerrado: boolean;
  motivoCierre: string | null;
  creadoEn: string;
  actualizadoEn: string;
}
