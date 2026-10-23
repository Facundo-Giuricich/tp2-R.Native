import { router } from 'expo-router';
import { Text, View } from 'react-native';

import { Boton } from '@/components/Boton';
import { estilos } from '@/components/estilos';
import { Pantalla } from '@/components/Pantalla';
import { useComedor } from '@/context/ComedorContext';

export default function Confirmar() {
  const { carrito, nota, confirmarPedido } = useComedor();

  let total = 0;
  for (const item of carrito) total += item.plato.precio;

  function confirmar() {
    const numero = confirmarPedido();
    // replace para que "atras" no vuelva a esta pantalla
    router.replace({ pathname: '/turno/[numero]', params: { numero } });
  }

  return (
    <Pantalla>
      <Text style={estilos.titulo}>Resumen del pedido</Text>

      {carrito.map((item) => (
        <View key={item.uid} style={estilos.fila}>
          <Text style={estilos.texto}>{item.plato.nombre}</Text>
          <Text style={estilos.texto}>${item.plato.precio}</Text>
        </View>
      ))}

      <Text style={estilos.titulo}>Total: ${total}</Text>
      {nota !== '' && <Text style={estilos.texto}>Nota: {nota}</Text>}

      <Boton titulo="Confirmar" disabled={carrito.length === 0} onPress={confirmar} />
      <Boton titulo="Cancelar" onPress={() => router.back()} />
    </Pantalla>
  );
}
