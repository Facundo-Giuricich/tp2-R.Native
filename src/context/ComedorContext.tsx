import { createContext, useContext, useState } from 'react';

import { Plato, PLATOS } from '@/data/platos';
import { Cola } from '@/estructuras/Cola';
import { Pila } from '@/estructuras/Pila';

export const USUARIO = 'cocina';
export const CLAVE = '1234';

export type ItemCarrito = {
  uid: number;
  plato: Plato;
};

export type Pedido = {
  numero: number;
  platos: Plato[];
  total: number;
  nota: string;
};

type DatosComedor = {
  usuario: string | null;
  carrito: ItemCarrito[];
  nota: string;
  pilaDeshacer: Pila<number>;
  colaPedidos: Cola<Pedido>;
  pilaAtendidos: Pila<Pedido>;
  iniciarSesion: (usuario: string, clave: string) => boolean;
  cerrarSesion: () => void;
  agregarAlCarrito: (idPlato: number) => void;
  deshacerUltimo: () => void;
  setNota: (nota: string) => void;
  confirmarPedido: () => number;
  atenderSiguiente: () => void;
};

const ComedorContext = createContext<DatosComedor | null>(null);

export function ComedorProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<string | null>(null);
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
  const [nota, setNota] = useState('');
  const [proximoUid, setProximoUid] = useState(1);
  const [proximoNumero, setProximoNumero] = useState(1);

  // Las pilas y la cola se crean una sola vez y se modifican con sus metodos.
  const [pilaDeshacer] = useState(new Pila<number>());
  const [colaPedidos] = useState(new Cola<Pedido>());
  const [pilaAtendidos] = useState(new Pila<Pedido>());

  // Como las clases cambian por dentro, uso este contador para que React vuelva a dibujar.
  const [, setCambios] = useState(0);
  function actualizar() {
    setCambios((n) => n + 1);
  }

  function iniciarSesion(u: string, c: string) {
    if (u === USUARIO && c === CLAVE) {
      setUsuario(u);
      return true;
    }
    return false;
  }

  function cerrarSesion() {
    setUsuario(null);
  }

  function agregarAlCarrito(idPlato: number) {
    const plato = PLATOS.find((p) => p.id === idPlato);
    if (!plato) return;
    setCarrito([...carrito, { uid: proximoUid, plato }]);
    pilaDeshacer.push(proximoUid);
    setProximoUid(proximoUid + 1);
  }

  function deshacerUltimo() {
    const uid = pilaDeshacer.pop();
    setCarrito(carrito.filter((item) => item.uid !== uid));
  }

  function confirmarPedido() {
    const platos = carrito.map((item) => item.plato);
    let total = 0;
    for (const p of platos) total += p.precio;

    const numero = proximoNumero;
    colaPedidos.encolar({ numero, platos, total, nota });
    setProximoNumero(numero + 1);

    setCarrito([]);
    setNota('');
    while (!pilaDeshacer.vacia) pilaDeshacer.pop();
    return numero;
  }

  function atenderSiguiente() {
    const pedido = colaPedidos.desencolar();
    if (pedido) pilaAtendidos.push(pedido);
    actualizar();
  }

  return (
    <ComedorContext.Provider
      value={{
        usuario,
        carrito,
        nota,
        pilaDeshacer,
        colaPedidos,
        pilaAtendidos,
        iniciarSesion,
        cerrarSesion,
        agregarAlCarrito,
        deshacerUltimo,
        setNota,
        confirmarPedido,
        atenderSiguiente,
      }}>
      {children}
    </ComedorContext.Provider>
  );
}

export function useComedor() {
  const datos = useContext(ComedorContext);
  if (!datos) throw new Error('useComedor tiene que estar dentro de ComedorProvider');
  return datos;
}
