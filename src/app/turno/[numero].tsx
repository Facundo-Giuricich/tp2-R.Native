import { router, useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';

import { Boton } from '@/components/Boton';
import { estilos } from '@/components/estilos';
import { Pantalla } from '@/components/Pantalla';
import { useComedor } from '@/context/ComedorContext';

export default function Turno() {
  const { numero } = useLocalSearchParams<{ numero: string }>();
  const { colaPedidos } = useComedor();

  const pedidos = colaPedidos.aArray();
  const posicion = pedidos.findIndex((p) => p.numero === Number(numero));

  return (
    <Pantalla>
      <Text style={estilos.titulo}>Turno numero {numero}</Text>

      {posicion === -1 ? (
        <Text style={estilos.aviso}>Este turno no esta en la cola (ya fue atendido o no existe)</Text>
      ) : (
        <>
          <Text style={estilos.texto}>Pedidos adelante tuyo: {posicion}</Text>
          <Text style={estilos.texto}>Tiempo estimado: {(posicion + 1) * 3} minutos</Text>
        </>
      )}

      <Boton titulo="Volver al inicio" onPress={() => router.dismissTo('/')} />
    </Pantalla>
  );
}
