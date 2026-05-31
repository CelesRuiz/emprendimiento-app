import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovimientoStock } from '../../core/models/movimiento-stock';
import { StockProducto } from '../../core/models/stock-producto';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5157/api/MovimientosStock';

  getStockPorProductos() {
    return this.http.get<StockProducto[]>(`http://localhost:5157/api/Productos/stock`);
  }

  getAll(tipo?: number, desde?: string, hasta?: string) {
    const params: any = {};
    if (tipo !== undefined) params['tipo'] = tipo;
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
}
