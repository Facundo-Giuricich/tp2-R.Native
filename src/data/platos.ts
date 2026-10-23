export type Plato = {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  categoria: string;
};

export const CATEGORIAS = ['desayuno', 'almuerzo', 'bebidas', 'kiosco'];

export const PLATOS: Plato[] = [
  { id: 1, nombre: 'Cafe con leche', precio: 1200, descripcion: 'Taza grande de cafe con leche.', categoria: 'desayuno' },
  { id: 2, nombre: 'Medialunas x3', precio: 1500, descripcion: 'Tres medialunas de manteca.', categoria: 'desayuno' },
  { id: 3, nombre: 'Chipa', precio: 1000, descripcion: 'Porcion de chipa calentito.', categoria: 'desayuno' },
  { id: 4, nombre: 'Tostado', precio: 2200, descripcion: 'Tostado de jamon y queso.', categoria: 'desayuno' },
  { id: 5, nombre: 'Milanesa con pure', precio: 4500, descripcion: 'Milanesa de carne con pure de papas.', categoria: 'almuerzo' },
  { id: 6, nombre: 'Guiso de arroz', precio: 3800, descripcion: 'Guiso casero con carne y verduras.', categoria: 'almuerzo' },
  { id: 7, nombre: 'Sopa paraguaya', precio: 3000, descripcion: 'Porcion de sopa paraguaya con ensalada.', categoria: 'almuerzo' },
  { id: 8, nombre: 'Empanadas x3', precio: 3300, descripcion: 'Tres empanadas de carne al horno.', categoria: 'almuerzo' },
  { id: 9, nombre: 'Agua mineral', precio: 900, descripcion: 'Botella de 500 ml.', categoria: 'bebidas' },
  { id: 10, nombre: 'Jugo de naranja', precio: 1400, descripcion: 'Jugo exprimido en el momento.', categoria: 'bebidas' },
  { id: 11, nombre: 'Terere', precio: 1100, descripcion: 'Terere con yuyos y hielo.', categoria: 'bebidas' },
  { id: 12, nombre: 'Gaseosa', precio: 1300, descripcion: 'Gaseosa de 500 ml.', categoria: 'bebidas' },
  { id: 13, nombre: 'Alfajor', precio: 800, descripcion: 'Alfajor de chocolate.', categoria: 'kiosco' },
  { id: 14, nombre: 'Barra de cereal', precio: 700, descripcion: 'Barra de cereal con frutas.', categoria: 'kiosco' },
  { id: 15, nombre: 'Papas fritas', precio: 1200, descripcion: 'Paquete chico de papas fritas.', categoria: 'kiosco' },
];
