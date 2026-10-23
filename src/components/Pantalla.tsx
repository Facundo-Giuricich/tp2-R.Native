import { ScrollView } from 'react-native';

import { DondeEstoy } from './DondeEstoy';

export function Pantalla({ children }: { children: React.ReactNode }) {
  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
      {children}
      <DondeEstoy />
    </ScrollView>
  );
}
