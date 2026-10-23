import { Pressable, PressableProps, StyleSheet, Text } from 'react-native';

import { AZUL } from './estilos';

type Props = PressableProps & {
  titulo: string;
};

export function Boton({ titulo, disabled, ...props }: Props) {
  return (
    <Pressable {...props} disabled={disabled} style={disabled ? styles.botonDeshabilitado : styles.boton}>
      <Text style={styles.texto}>{titulo}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  boton: { backgroundColor: AZUL, padding: 12, borderRadius: 8, alignItems: 'center' },
  botonDeshabilitado: { backgroundColor: 'gray', padding: 12, borderRadius: 8, alignItems: 'center' },
  texto: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});
