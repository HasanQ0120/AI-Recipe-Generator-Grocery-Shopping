import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../theme';

export default function BottomNav() {
  return (
    <View style={styles.container}>

      <Pressable style={styles.tab}>
        <Text style={styles.tabIcon}>🏠</Text>
        <Text style={styles.tabLabel}>Home</Text>
      </Pressable>

      <Pressable style={styles.tab}>
        <Text style={styles.tabIcon}>🔍</Text>
        <Text style={styles.tabLabel}>Search</Text>
      </Pressable>

      <Pressable style={styles.generateTab}>
        <Text style={styles.generateIcon}>✨</Text>
        <Text style={styles.generateLabel}>Generate</Text>
      </Pressable>

      <Pressable style={styles.tab}>
        <Text style={styles.tabIcon}>🛒</Text>
        <Text style={styles.tabLabel}>Grocery</Text>
      </Pressable>

      <Pressable style={styles.tab}>
        <Text style={styles.tabIcon}>👤</Text>
        <Text style={styles.tabLabel}>Profile</Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tab: {
    alignItems: 'center',
    gap: 4,
  },
  tabIcon: {
    fontSize: 22,
  },
  tabLabel: {
    color: colors.textSecondary,
    fontSize: 11,
    fontFamily: fonts.body,
  },
  generateTab: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    gap: 2,
    marginBottom: 10,
  },
  generateIcon: {
    fontSize: 24,
  },
  generateLabel: {
    color: colors.textPrimary,
    fontSize: 10,
    fontFamily: fonts.body,
  },
});