import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { generateRecipe } from '../services/aiService';
import { colors, fonts } from '../theme';

const cuisines = ['🇵🇰 Pakistani', '🇮🇳 Indian', '🇮🇹 Italian', '🇨🇳 Chinese', '🇲🇽 Mexican', '🇹🇷 Turkish', '🌍 Arabic', '🌎 American'];
const diets = ['Halal', 'Vegan', 'Vegetarian', 'Keto', 'High Protein', 'No Restriction'];
const times = ['15 min', '30 min', '45 min', '1 hour+'];
const calories = ['Low (under 300)', 'Medium (300-600)', 'High (600+)'];
const meals = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

export default function GenerateScreen() {
  const [cuisine, setCuisine] = useState('');
  const [diet, setDiet] = useState('');
  const [time, setTime] = useState('');
  const [calorie, setCalorie] = useState('');
  const [meal, setMeal] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Changed states to separate recipe data
  const [resultText, setResultText] = useState('');
  const [resultImage, setResultImage] = useState('');

  async function handleGenerate() {
    if (!cuisine) return alert('Please select a cuisine!');
    
    setLoading(true);
    
    const prompt = `Generate a ${cuisine} recipe.
    ${diet ? `Diet: ${diet}.` : ''}
    ${time ? `Cooking time: ${time}.` : ''}
    ${calorie ? `Calories: ${calorie}.` : ''}
    ${meal ? `Meal type: ${meal}.` : ''}
    
    Give me: Recipe name, ingredients list, and step by step instructions.`;

    const recipeData = await generateRecipe(prompt);
    setResultText(recipeData.text);
    setResultImage(recipeData.imageUrl);
    setLoading(false);
  }

  function handleBack() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  }

  return (
    <ScrollView style={styles.container}>

      {/* BACK BUTTON */}
      <Pressable 
        style={({ pressed }) => [
          styles.backBtn, 
          pressed && styles.buttonPressed
        ]} 
        onPress={handleBack}
      >
        <Text style={styles.backBtnText}>← Back</Text>
      </Pressable>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>AI Recipe Generator</Text>
        <Text style={styles.subtitle}>Tell us what you want to cook</Text>
      </View>

      {/* CUISINE - REQUIRED */}
      <Text style={styles.sectionLabel}>Cuisine Type <Text style={styles.required}>*</Text></Text>
      <View style={styles.optionsGrid}>
        {cuisines.map((item) => (
          <Pressable
            key={item}
            style={[styles.optionChip, cuisine === item && styles.selectedChip]}
            onPress={() => setCuisine(item)}
          >
            <Text style={[styles.optionText, cuisine === item && styles.selectedText]}>
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* DIET - OPTIONAL */}
      <Text style={styles.sectionLabel}>Diet Preference <Text style={styles.optional}>(optional)</Text></Text>
      <View style={styles.optionsGrid}>
        {diets.map((item) => (
          <Pressable
            key={item}
            style={[styles.optionChip, diet === item && styles.selectedChip]}
            onPress={() => setDiet(diet === item ? '' : item)}
          >
            <Text style={[styles.optionText, diet === item && styles.selectedText]}>
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* TIME - OPTIONAL */}
      <Text style={styles.sectionLabel}>Cooking Time <Text style={styles.optional}>(optional)</Text></Text>
      <View style={styles.optionsGrid}>
        {times.map((item) => (
          <Pressable
            key={item}
            style={[styles.optionChip, time === item && styles.selectedChip]}
            onPress={() => setTime(time === item ? '' : item)}
          >
            <Text style={[styles.optionText, time === item && styles.selectedText]}>
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* CALORIES - OPTIONAL */}
      <Text style={styles.sectionLabel}>Calories <Text style={styles.optional}>(optional)</Text></Text>
      <View style={styles.optionsGrid}>
        {calories.map((item) => (
          <Pressable
            key={item}
            style={[styles.optionChip, calorie === item && styles.selectedChip]}
            onPress={() => setCalorie(calorie === item ? '' : item)}
          >
            <Text style={[styles.optionText, calorie === item && styles.selectedText]}>
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* MEAL TYPE - OPTIONAL */}
      <Text style={styles.sectionLabel}>Meal Type <Text style={styles.optional}>(optional)</Text></Text>
      <View style={styles.optionsGrid}>
        {meals.map((item) => (
          <Pressable
            key={item}
            style={[styles.optionChip, meal === item && styles.selectedChip]}
            onPress={() => setMeal(meal === item ? '' : item)}
          >
            <Text style={[styles.optionText, meal === item && styles.selectedText]}>
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* GENERATE BUTTON */}
      <Pressable
        style={({ pressed }) => [styles.generateBtn, pressed && styles.buttonPressed]}
        onPress={handleGenerate}
      >
        <Text style={styles.generateBtnText}>
          {loading ? 'Generating...' : '✨ Generate Recipe'}
        </Text>
      </Pressable>

      {/* DYNAMIC RESULT CARD */}
      {resultText ? (
        <View style={styles.resultCard}>
          <Image 
            source={{ uri: resultImage }} 
            style={styles.recipeImage}
            resizeMode="cover"
          />
          <View style={styles.resultContent}>
            <Text style={styles.resultTitle}>Your Recipe</Text>
            <Text style={styles.resultText}>{resultText}</Text>
          </View>
        </View>
      ) : null}

      <View style={{ height: 40 }} />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
  },
  backBtn: {
    marginTop: 60,
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  backBtnText: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: fonts.body,
  },
  header: {
    marginTop: 20,
    marginBottom: 32,
  },
  title: {
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
  sectionLabel: {
    fontSize: 16,
    color: colors.textPrimary,
    fontFamily: fonts.body,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 8,
  },
  required: {
    color: colors.error,
  },
  optional: {
    color: colors.textSecondary,
    fontWeight: 'normal',
    fontSize: 13,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 24,
  },
  optionChip: {
    backgroundColor: colors.card,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  optionText: {
    color: colors.textSecondary,
    fontFamily: fonts.body,
    fontSize: 13,
  },
  selectedText: {
    color: colors.textPrimary,
    fontWeight: 'bold',
  },
  generateBtn: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  generateBtnText: {
    color: colors.textPrimary,
    fontFamily: fonts.body,
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    marginBottom: 20,
  },
  recipeImage: {
    width: '100%',
    height: 200,
  },
  resultContent: {
    padding: 20,
  },
  resultTitle: {
    fontSize: 22,
    color: colors.textPrimary,
    fontFamily: fonts.heading,
    marginBottom: 12,
  },
  resultText: {
    color: colors.textPrimary,
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 22,
  },
});