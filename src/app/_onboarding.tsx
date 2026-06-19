// Onboarding screen — shown after signup to collect food preferences

import { useEffect, useRef, useState } from 'react';
import { Animated, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Props = what this screen receives from _layout.tsx
type Props = {
  onFinish: () => void; // Called when user clicks "Let's Cook!"
};

// All the options for each category
const DIETS = ['Vegan', 'Vegetarian', 'Non-Veg'];                    // Diet options
const CUISINES = ['Desi', 'Arabic', 'Italian', 'Asian', 'Mexican', 'Any']; // Cuisine options
const ALLERGIES = ['Nuts', 'Dairy', 'Gluten', 'None'];               // Allergy options
const SKILLS = ['Beginner', 'Intermediate', 'Pro Chef'];              // Skill level options

export default function OnboardingScreen({ onFinish }: Props) {
  const [diet, setDiet] = useState('');              // Stores selected diet (single)
  const [cuisine, setCuisine] = useState<string[]>([]); // Stores selected cuisines (multiple)
  const [allergies, setAllergies] = useState<string[]>([]); // Stores selected allergies (multiple)
  const [skill, setSkill] = useState('');            // Stores selected skill level (single)

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;   // For fade in
  const slideAnim = useRef(new Animated.Value(40)).current; // For slide up

  // Run animations when screen loads
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 800, useNativeDriver: true }),
    ]).start();
  }, []);

  // Toggle cuisine selection — can select MULTIPLE
  const toggleCuisine = (item: string) => {
    setCuisine(prev =>
      prev.includes(item)
        ? prev.filter(c => c !== item) // If already selected → remove it
        : [...prev, item]              // If not selected → add it
    );
  };

  // Toggle allergy selection — can select MULTIPLE
  // Special case: if "None" selected → clear everything else
  const toggleAllergy = (item: string) => {
    if (item === 'None') {
      setAllergies(['None']); // Clear all other selections
      return;
    }
    setAllergies(prev =>
      prev.includes(item)
        ? prev.filter(a => a !== item)              // Remove if already selected
        : [...prev.filter(a => a !== 'None'), item]  // Add but remove "None" if present
    );
  };

  // Button is only enabled when ALL 4 categories have at least one selection
  const isReady = diet && cuisine.length > 0 && allergies.length > 0 && skill;

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800' }}
      style={styles.screen}
      blurRadius={6}
    >
      <View style={styles.overlay} />
      {/* ScrollView so user can scroll if content is too long */}
      <ScrollView contentContainerStyle={styles.scroll}>
        <Animated.View style={[styles.card, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>

          <Text style={styles.title}>One Last Step! 🍽️</Text>
          <Text style={styles.subtitle}>Help us personalize your recipes</Text>

          {/* DIET SECTION — single select */}
          <Text style={styles.sectionTitle}>Your Diet</Text>
          <View style={styles.chips}>
            {DIETS.map(item => (
              <TouchableOpacity
                key={item}
                style={[styles.chip, diet === item && styles.chipSelected]} // Orange if selected
                onPress={() => setDiet(item)} // Select this diet
              >
                <Text style={[styles.chipText, diet === item && styles.chipTextSelected]}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* CUISINE SECTION — multi select */}
          <Text style={styles.sectionTitle}>Favourite Cuisine</Text>
          <View style={styles.chips}>
            {CUISINES.map(item => (
              <TouchableOpacity
                key={item}
                style={[styles.chip, cuisine.includes(item) && styles.chipSelected]} // Orange if in array
                onPress={() => toggleCuisine(item)} // Toggle selection
              >
                <Text style={[styles.chipText, cuisine.includes(item) && styles.chipTextSelected]}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* ALLERGIES SECTION — multi select */}
          <Text style={styles.sectionTitle}>Allergies</Text>
          <View style={styles.chips}>
            {ALLERGIES.map(item => (
              <TouchableOpacity
                key={item}
                style={[styles.chip, allergies.includes(item) && styles.chipSelected]}
                onPress={() => toggleAllergy(item)}
              >
                <Text style={[styles.chipText, allergies.includes(item) && styles.chipTextSelected]}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* SKILL LEVEL SECTION — single select */}
          <Text style={styles.sectionTitle}>Skill Level</Text>
          <View style={styles.chips}>
            {SKILLS.map(item => (
              <TouchableOpacity
                key={item}
                style={[styles.chip, skill === item && styles.chipSelected]}
                onPress={() => setSkill(item)}
              >
                <Text style={[styles.chipText, skill === item && styles.chipTextSelected]}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Button — grey/disabled until all 4 sections are filled */}
          <TouchableOpacity
            style={[styles.button, !isReady && styles.buttonDisabled]}
            onPress={() => isReady && onFinish()} // Only works if isReady is true
          >
            <Text style={styles.buttonText}>Let's Cook! 🍳</Text>
          </TouchableOpacity>

        </Animated.View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.75)' },
  scroll: { flexGrow: 1, justifyContent: 'center', padding: 24, width: '100%' },
  card: { width: '100%', maxWidth: 400, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 24, padding: 28, borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)', alignSelf: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#888', marginBottom: 24, textAlign: 'center' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 12, marginTop: 8 },
  hint: { fontSize: 12, color: '#888', fontWeight: 'normal' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 }, // Chips wrap to next line if too many
  chip: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', backgroundColor: 'rgba(255,255,255,0.05)' }, // Default chip style
  chipSelected: { backgroundColor: '#C1622F', borderColor: '#C1622F' }, // Orange when selected
  chipText: { color: '#888', fontSize: 14 },
  chipTextSelected: { color: '#FFFFFF', fontWeight: 'bold' },
  button: { backgroundColor: '#C1622F', borderRadius: 12, padding: 15, alignItems: 'center', marginTop: 16, shadowColor: '#C1622F', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.5, shadowRadius: 12, elevation: 8 },
  buttonDisabled: { backgroundColor: '#555', shadowOpacity: 0 }, // Grey when not ready
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold', letterSpacing: 1 },
});