import { ComboOpcion } from './combo-opcion';

export interface Combo {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  esActivo: boolean;
  opciones: ComboOpcion[];
  creadoEn: string;
  actualizadoEn: string;
}
