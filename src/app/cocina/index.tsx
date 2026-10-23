import { router } from 'expo-router';
import { Text, View } from 'react-native';

import { Boton } from '@/components/Boton';
import { estilos } from '@/components/estilos';
import { Pantalla } from '@/components/Pantalla';
import { useComedor } from '@/context/ComedorContext';

export default function Cocina() {
  const { colaPedidos, atenderSiguiente, cerrarSesion } = useComedor();
  const pedido = colaPedidos.frente();

  return (
    <Pantalla>
      <Text style={estilos.texto}>Pedidos en espera: {colaPedidos.tamanio}</Text>

      {pedido ? (
        <View style={estilos.tarjeta}>
          <Text style={estilos.titulo}>Turno {pedido.numero}</Text>
          {pedido.platos.map((plato, i) => (
            <Text key={i} style={estilos.texto}>
              - {plato.nombre}
            </Text>
          ))}
          {pedido.nota !== '' && <Text style={estilos.texto}>Nota: {pedido.nota}</Text>}
          <Text style={estilos.texto}>Total: ${pedido.total}</Text>
        </View>
      ) : (
        <Text style={estilos.aviso}>No hay pedidos en la cola</Text>
      )}

      <Boton titulo="Atender siguiente" disabled={!pedido} onPress={atenderSiguiente} />
      <Boton titulo="Volver a la app" onPress={() => router.dismissTo('/')} />
      <Boton titulo="Cerrar sesion" onPress={cerrarSesion} />
    </Pantalla>
  );
}
