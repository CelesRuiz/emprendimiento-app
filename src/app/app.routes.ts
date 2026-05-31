import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '',
    loadComponent: () =>
      import('./shared/components/layout/layout.component').then((m) => m.LayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'inicio',
        loadComponent: () =>
          import('./pages/inicio/inicio.component').then((m) => m.InicioComponent),
      },
      {
        path: 'productos',
        loadComponent: () =>
          import('./pages/Productos/productos.component').then((m) => m.ProductosComponent),
      },
      {
        path: 'insumos',
        loadComponent: () =>
          import('./pages/insumos/insumos.component').then((m) => m.InsumosComponent),
      },
      {
        path: 'pedidos',
        loadComponent: () =>
          import('./pages/pedidos/pedidos.component').then((m) => m.PedidosComponent),
      },
      {
        path: 'stock',
        loadComponent: () => import('./pages/stock/stock.component').then((m) => m.StockComponent),
      },
      {
        path: 'proveedores',
        loadComponent: () =>
          import('./pages/Proveedores/proveedores.component').then((m) => m.ProveedoresComponent),
      },
    ],
  },
];
