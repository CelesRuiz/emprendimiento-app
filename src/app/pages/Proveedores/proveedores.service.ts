import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Proveedor } from '../../core/models/proveedor';
import { CrearProveedor } from '../../core/models/crear-proveedor';
import { ActualizarProveedor } from '../../core/models/actualizar-proveedor';

@Injectable({
  providedIn: 'root',
})
export class ProveedoresService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5157/api/Proveedores';

  getAll(nombre?: string) {
    const params: any = {};
    if (nombre) params['nombre'] = nombre;
    return this.http.get<Proveedor[]>(this.apiUrl, { params });
  }

  getProveedor(id: number) {
    return this.http.get<Proveedor>(`${this.apiUrl}/${id}`);
  }

  createProveedor(proveedor: CrearProveedor) {
    return this.http.post<Proveedor>(this.apiUrl, proveedor);
  }

  updateProveedor(id: number, proveedor: ActualizarProveedor) {
    return this.http.put<Proveedor>(`${this.apiUrl}/${id}`, proveedor);
  }

  deleteProveedor(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
