import { StyleSheet, Text, View } from 'react-native';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Recipe App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1612',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#F5EFE6',
    fontSize: 32,
  },
});