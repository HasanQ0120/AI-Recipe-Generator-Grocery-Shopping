import { useEffect, useRef, useState } from 'react';
import { Animated, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  onFinish: () => void;
};

const DIETS = ['Vegan', 'Vegetarian', 'Non-Veg'];
const CUISINES = ['Italian', 'Asian', 'Arabic', 'Mexican', 'Any'];
const ALLERGIES = ['Nuts', 'Dairy', 'Gluten', 'None'];
const SKILLS = ['Beginner', 'Intermediate', 'Pro Chef'];

export default function OnboardingScreen({ onFinish }: Props) {
  const [diet, setDiet] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [allergies, setAllergies] = useState<string[]>([]);
  const [skill, setSkill] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 800, useNativeDriver: true }),
    ]).start();
  }, []);

  const toggleAllergy = (item: string) => {
    if (item === 'None') {
      setAllergies(['None']);
      return;
    }
    setAllergies(prev =>
      prev.includes(item)
        ? prev.filter(a => a !== item)
        : [...prev.filter(a => a !== 'None'), item]
    );
  };

  const isReady = diet && cuisine && allergies.length > 0 && skill;

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800' }}
      style={styles.screen}
      blurRadius={6}
    >
      <View style={styles.overlay} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Animated.View style={[styles.card, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>

          <Text style={styles.title}>One Last Step! 🍽️</Text>
          <Text style={styles.subtitle}>Help us personalize your recipes</Text>

          <Text style={styles.sectionTitle}>Your Diet</Text>
          <View style={styles.chips}>
            {DIETS.map(item => (
              <TouchableOpacity
                key={item}
                style={[styles.chip, diet === item && styles.chipSelected]}
                onPress={() => setDiet(item)}
              >
                <Text style={[styles.chipText, diet === item && styles.chipTextSelected]}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Favourite Cuisine</Text>
          <View style={styles.chips}>
            {CUISINES.map(item => (
              <TouchableOpacity
                key={item}
                style={[styles.chip, cuisine === item && styles.chipSelected]}
                onPress={() => setCuisine(item)}
              >
                <Text style={[styles.chipText, cuisine === item && styles.chipTextSelected]}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>

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

          <TouchableOpacity
            style={[styles.button, !isReady && styles.buttonDisabled]}
            onPress={() => isReady && onFinish()}
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
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  chip: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', backgroundColor: 'rgba(255,255,255,0.05)' },
  chipSelected: { backgroundColor: '#C1622F', borderColor: '#C1622F' },
  chipText: { color: '#888', fontSize: 14 },
  chipTextSelected: { color: '#FFFFFF', fontWeight: 'bold' },
  button: { backgroundColor: '#C1622F', borderRadius: 12, padding: 15, alignItems: 'center', marginTop: 16, shadowColor: '#C1622F', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.5, shadowRadius: 12, elevation: 8 },
  buttonDisabled: { backgroundColor: '#555', shadowOpacity: 0 },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold', letterSpacing: 1 },
});