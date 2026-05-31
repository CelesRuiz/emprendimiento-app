import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Insumo } from '../../core/models/insumo';
import { CrearInsumo } from '../../core/models/crear-insumo';

@Injectable({
  providedIn: 'root',
})
export class InsumosService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5157/api/Insumos';

  getAll(nombre?: string) {
    const params: any = {};
    if (nombre) params['nombre'] = nombre;
    return this.http.get<Insumo[]>(this.apiUrl, { params });
  }

  getInsumo(id: number) {
    return this.http.get<Insumo>(`${this.apiUrl}/${id}`);
  }

  createInsumo(insumo: CrearInsumo) {
    return this.http.post<Insumo>(this.apiUrl, insumo);
  }

  updateInsumo(id: number, insumo: CrearInsumo) {
    return this.http.put<Insumo>(`${this.apiUrl}/${id}`, insumo);
  }

  deleteInsumo(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
