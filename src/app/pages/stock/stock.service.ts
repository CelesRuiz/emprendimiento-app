import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovimientoStock } from '../../core/models/movimiento-stock';
import { StockProducto } from '../../core/models/stock-producto';
import { AnulacionResponse } from '../../core/models/anulacion-response';
import { LoteProducto } from '../../core/models/lote-producto';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5157/api/MovimientosStock';

  getStockPorProductos() {
    return this.http.get<StockProducto[]>(`http://localhost:5157/api/Productos/stock`);
  }
  registrarProduccion(productoId: number, cantidad: number) {
    return this.http.post<any>('http://localhost:5157/api/Produccion', {
      productoId,
      cantidad,
    });
  }

  getAll(tipo?: string, motivo?: string, desde?: string, hasta?: string) {
    const params: any = {};
    if (tipo) params['tipo'] = tipo;
    if (motivo) params['motivo'] = motivo;
    if (desde) params['desde'] = desde;
    if (hasta) params['hasta'] = hasta;
    return this.http.get<MovimientoStock[]>(this.apiUrl, { params });
  }

  registrarMovimiento(productoId: number, cantidad: number, tipo: number) {
    return this.http.post<MovimientoStock>(this.apiUrl, { productoId, cantidad, tipo });
  }

  getStockActual(productoId: number) {
    return this.http.get<number>(`${this.apiUrl}/stock/${productoId}`);
  }

  anularMovimiento(movimientoId: number) {
    return this.http.post<AnulacionResponse>(`${this.apiUrl}/anular/${movimientoId}`, {});
  }

  getLotes(productoId: number, historial: boolean = false) {
    const params: any = {};
    if (historial) params['historial'] = true;
    return this.http.get<LoteProducto[]>(
      `http://localhost:5157/api/Productos/${productoId}/lotes`,
      { params },
    );
  }
  registrarSalida(productoId: number, cantidad: number, motivoSalida: string) {
    return this.http.post<any>(`${this.apiUrl}/salida`, {
      productoId,
      cantidad,
      motivoSalida,
    });
  }
}
