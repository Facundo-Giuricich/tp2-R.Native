import { Link } from 'expo-router';
import { Text, View } from 'react-native';

import { Boton } from '@/components/Boton';
import { estilos } from '@/components/estilos';
import { Pantalla } from '@/components/Pantalla';
import { useComedor } from '@/context/ComedorContext';

export default function Carrito() {
  const { carrito, nota, pilaDeshacer, deshacerUltimo } = useComedor();

  let total = 0;
  for (const item of carrito) total += item.plato.precio;

  return (
    <Pantalla>
      {carrito.length === 0 && <Text style={estilos.aviso}>El carrito esta vacio</Text>}

      {carrito.map((item) => (
        <View key={item.uid} style={[estilos.tarjeta, estilos.fila]}>
          <Text style={estilos.texto}>{item.plato.nombre}</Text>
          <Text style={estilos.texto}>${item.plato.precio}</Text>
        </View>
      ))}

      <Text style={estilos.titulo}>Total: ${total}</Text>
      {nota !== '' && <Text style={estilos.texto}>Nota: {nota}</Text>}

      <Boton titulo="Deshacer ultimo" disabled={pilaDeshacer.vacia} onPress={deshacerUltimo} />

      <Link href="/carrito/nota" asChild>
        <Boton titulo="Agregar nota" />
      </Link>

      <Link href="/confirmar" asChild>
        <Boton titulo="Confirmar pedido" disabled={carrito.length === 0} />
      </Link>
    </Pantalla>
  );
}
