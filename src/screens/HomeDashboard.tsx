import { useRouter } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import BottomNav from '../components/BottomNav';
import { colors, fonts } from '../theme';

const recipes = [
  {
    id: '1',
    title: 'Grilled Salmon with Herbs',
    calories: '420 kcal',
    time: '25 min',
    tag: 'High Protein',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400',
  },
  {
    id: '2',
    title: 'Creamy Mushroom Pasta',
    calories: '380 kcal',
    time: '20 min',
    tag: 'Vegetarian',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400',
  },
  {
    id: '3',
    title: 'Chicken Tikka Masala',
    calories: '520 kcal',
    time: '35 min',
    tag: 'Halal',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400',
  },
];

export default function HomeDashboard() {
  const router = useRouter();

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container}>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Good Evening, Chef</Text>
          <Text style={styles.subtitle}>What would you like to cook today?</Text>
        </View>

        {/* SEARCH BAR */}
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <Text style={styles.searchText}>Search recipes, ingredients...</Text>
        </View>

        {/* FILTER CHIPS */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
        >
          {['All', 'Vegan', 'Quick', 'High Protein', 'Halal', 'Keto'].map((filter) => (
            <View key={filter} style={styles.chip}>
              <Text style={styles.chipText}>{filter}</Text>
            </View>
          ))}
        </ScrollView>

        {/* TWO BUTTONS */}
        <View style={styles.buttonsRow}>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              styles.pantryButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.buttonIcon}>🥘</Text>
            <Text style={styles.buttonText}>Use My Pantry</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.button,
              styles.aiButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => router.push('/generate')}
          >
            <Text style={styles.buttonIcon}>✨</Text>
            <Text style={styles.buttonText}>AI Generation</Text>
          </Pressable>
        </View>

        {/* RECOMMENDED */}
        <Text style={styles.sectionTitle}>Recommended for You</Text>

        {recipes.slice(0, 1).map((recipe) => (
          <Pressable key={recipe.id} style={styles.recipeCard}>
            <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
            <View style={styles.recipeInfo}>
              <View style={styles.tagBadge}>
                <Text style={styles.tagText}>{recipe.tag}</Text>
              </View>
              <Text style={styles.recipeTitle}>{recipe.title}</Text>
              <View style={styles.recipeMeta}>
                <Text style={styles.metaText}>🔥 {recipe.calories}</Text>
                <Text style={styles.metaText}>⏱ {recipe.time}</Text>
              </View>
            </View>
          </Pressable>
        ))}

        <Text style={styles.sectionTitle}>Alternatives</Text>

        {recipes.slice(1).map((recipe) => (
          <Pressable key={recipe.id} style={styles.recipeCard}>
            <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
            <View style={styles.recipeInfo}>
              <View style={styles.tagBadge}>
                <Text style={styles.tagText}>{recipe.tag}</Text>
              </View>
              <Text style={styles.recipeTitle}>{recipe.title}</Text>
              <View style={styles.recipeMeta}>
                <Text style={styles.metaText}>🔥 {recipe.calories}</Text>
                <Text style={styles.metaText}>⏱ {recipe.time}</Text>
              </View>
            </View>
          </Pressable>
        ))}

      </ScrollView>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 60,
    marginBottom: 24,
  },
  greeting: {
    fontSize: 32,
    color: colors.textPrimary,
    fontFamily: fonts.heading,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: fonts.body,
    marginTop: 4,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  searchText: {
    color: colors.textSecondary,
    fontFamily: fonts.body,
    fontSize: 14,
  },
  filterContainer: {
    marginBottom: 24,
  },
  chip: {
    backgroundColor: colors.card,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipText: {
    color: colors.textPrimary,
    fontFamily: fonts.body,
    fontSize: 13,
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  button: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  pantryButton: {
    backgroundColor: colors.primary,
  },
  aiButton: {
    backgroundColor: colors.secondary,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonIcon: {
    fontSize: 20,
  },
  buttonText: {
    color: colors.textPrimary,
    fontFamily: fonts.body,
    fontSize: 14,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 22,
    color: colors.textPrimary,
    fontFamily: fonts.heading,
    marginBottom: 16,
  },
  recipeCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  recipeImage: {
    width: '100%',
    height: 180,
  },
  recipeInfo: {
    padding: 14,
  },
  tagBadge: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  tagText: {
    color: colors.textPrimary,
    fontSize: 11,
    fontFamily: fonts.body,
  },
  recipeTitle: {
    fontSize: 18,
    color: colors.textPrimary,
    fontFamily: fonts.heading,
    marginBottom: 8,
  },
  recipeMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  metaText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontFamily: fonts.body,
  },
});