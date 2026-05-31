import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../../core/models/producto';
import { CrearProducto } from '../../core/models/crear-producto';
import { ActualizarProducto } from '../../core/models/actualizar-producto';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5157/api/Productos';

  getAll(nombre?: string) {
    const params: any = {};
    if (nombre) params['nombre'] = nombre;
    return this.http.get<Producto[]>(this.apiUrl, { params });
  }

  getProducto(id: number) {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  createProducto(producto: CrearProducto) {
    return this.http.post<Producto>(this.apiUrl, producto);
  }

  updateProducto(id: number, producto: ActualizarProducto) {
    return this.http.put<Producto>(`${this.apiUrl}/${id}`, producto);
  }

  deleteProducto(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
