import { StyleSheet } from 'react-native';

export const AZUL = '#1E3A8A';

export const estilos = StyleSheet.create({
  titulo: { fontSize: 22, fontWeight: 'bold' },
  texto: { fontSize: 16 },
  textoGris: { fontSize: 14, color: 'gray' },
  aviso: { fontSize: 16, backgroundColor: '#FEF3C7', padding: 12, borderRadius: 8 },
  link: { fontSize: 16, color: AZUL, fontWeight: 'bold' },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  tarjeta: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
  },
  fila: { flexDirection: 'row', justifyContent: 'space-between' },
});
