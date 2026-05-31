export interface CrearPedidoItem {
  productoId: number | null;
  comboId: number | null;
  cantidad: number;
  precioUnitario: number;
}

export interface CrearPedido {
  origenPedido: string | null;
  items: CrearPedidoItem[];
}
