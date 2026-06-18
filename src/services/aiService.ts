// src/services/aiService.ts

interface RecipeResponse {
  text: string;
  imageUrl: string;
}

export async function generateRecipe(prompt: string): Promise<RecipeResponse> {
  // Simulate rapid AI calculation delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const lowerPrompt = prompt.toLowerCase();
  
  // Randomization pools to ensure a brand new recipe text every single time
  const adjectives = ['Premium', 'Smoky', 'Authentic', 'Chef\'s Special', 'Fiery', 'Rustic', 'Zesty', 'Homestyle'];
  const techniques = ['slow-simmered perfection', 'seared to release maximum aroma', 'infused with secret spices', 'charred beautifully over high heat'];
  const secrets = ['a splash of fresh citrus lime right at the finish', 'a secret pinch of roasted cumin powder', 'a garnish of toasted aromatics', 'a drizzle of cold-pressed oil'];

  const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomTech = techniques[Math.floor(Math.random() * techniques.length)];
  const randomSecret = secrets[Math.floor(Math.random() * secrets.length)];
  const randomId = Math.floor(Math.random() * 900) + 100;

  // 1. MEXICAN IMAGE & TEXT
  if (lowerPrompt.includes('mexican')) {
    const dishes = ['Street Tacos', 'Burrito Bowl', 'Enchiladas Rojas', 'Quesadillas Grande'];
    const selectedDish = dishes[Math.floor(Math.random() * dishes.length)];
    const images = [
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1534352591642-45e48486c368?auto=format&fit=crop&w=600&q=80'
    ];
    
    return {
      imageUrl: images[Math.floor(Math.random() * images.length)],
      text: `✨ AI Generated Recipe: ${randomAdj} Mexican ${selectedDish} (Batch #${randomId}) ✨

Ingredients:
• 500g Choice of Protein (Marinated)
• 12 Warm Corn Tortillas / Rice Base
• 1 Fine White Onion (diced)
• 1 bunch Fresh Cilantro & Jalapeños
• 2 Fresh Limes (wedges)
• 1 tbsp Smoked Cumin & Ancho Chili blend
• Homemade Pico de Gallo salsa

Instructions:
1. Prep your ingredients carefully. Ensure the protein is ${randomTech}.
2. Fire up your heavy skillet to maximum heat. Sear the base elements until beautifully caramelized.
3. Warm your tortillas or layer your base. Assemble with a sharp contrast of hot ingredients and cold chopped greens.
4. Elevate the final profile by applying ${randomSecret}. Serve immediately while steaming hot!`
    };
  }

  // 2. ITALIAN IMAGE & TEXT
  if (lowerPrompt.includes('italian')) {
    const dishes = ['Fettuccine Al Burro', 'Penne Alla Arrabbiata', 'Tuscan Garlic Pasta', 'Risotto Milanese'];
    const selectedDish = dishes[Math.floor(Math.random() * dishes.length)];
    const images = [
      'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=600&q=80'
    ];

    return {
      imageUrl: images[Math.floor(Math.random() * images.length)],
      text: `✨ AI Generated Recipe: ${randomAdj} Italian ${selectedDish} (Batch #${randomId}) ✨

Ingredients:
• 400g Fresh Pasta / Arborio Rice
• 3 tbsp High-quality Extra Virgin Olive Oil
• 1 cup Parmigiano-Reggiano (freshly grated)
• 4 Cloves of Garlic (crushed)
• Fresh Basil leaves & Cracked Black Pepper
• Sea Salt to taste

Instructions:
1. Bring a heavy pot of water to a rolling sea-salt boil. Cook your base until perfectly al dente.
2. In a separate warm pan, render the garlic and oil gently until it is ${randomTech}.
3. Toss the drained base directly into the emulsified sauce, building a rich texture.
4. For that ultimate premium finish, incorporate ${randomSecret}. Serve immediately on warm plates.`
    };
  }

  // 3. CHINESE IMAGE & TEXT
  if (lowerPrompt.includes('chinese')) {
    const dishes = ['Szechuan Chilli Stir-Fry', 'Kung Pao Twist', 'Garlic Ginger Noodles', 'Cantonese Fried Feast'];
    const selectedDish = dishes[Math.floor(Math.random() * dishes.length)];
    const images = [
      'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80'
    ];

    return {
      imageUrl: images[Math.floor(Math.random() * images.length)],
      text: `✨ AI Generated Recipe: ${randomAdj} Chinese ${selectedDish} (Batch #${randomId}) ✨

Ingredients:
• 500g Protein or Textured Tofu (cubed)
• 10-12 Dried Red Chillies & Green Scallions
• 2 tbsp Ginger-Garlic paste
• 2 tbsp Dark Soy Sauce & Sesame Oil
• 1 cup Crisp Bell Peppers & Snap Peas

Instructions:
1. Toss your key protein elements with cornstarch and flash fry until incredibly crisp.
2. Smoke your wok until smoking hot. Stir fry the aromatics until they are ${randomTech}.
3. Toss everything together rapidly on high heat, combining with the soy-sesame glaze.
4. Complete the experience by adding ${randomSecret}. Serve instantly over white rice.`
    };
  }

  // 4. DEFAULT FALLBACK (PAKISTANI / INDIAN / ARABIC ETC.)
  const dishes = ['Handi Masala', 'Tikka Platter', 'Biryani Rice Bowl'];
  const selectedDish = dishes[Math.floor(Math.random() * dishes.length)];
  
  // Set accurate image fallbacks per dish
  let selectedImageUrl = 'https://images.unsplash.com/photo-1606471191009-63994c53433b?auto=format&fit=crop&w=600&q=80'; // Curry default
  
  let dynamicIngredients = `• 1 kg Protein pieces
• 4 Large Tomatoes (chopped fine)
• 2 tbsp Ginger-Garlic aromatics paste
• 4-5 Green Chilies (slit horizontally)
• 1 tbsp Red Chili flakes & Turmeric
• 1/2 cup Ghee or Clarified Butter`;

  let dynamicInstructions = `1. Heat your traditional oil base in a deep wok over medium-high heat.
2. Sear your main protein elements alongside ginger-garlic until ${randomTech}.
3. Drop in the fresh tomatoes, cover tightly, and allow the natural juices to construct a rich gravy base.
4. Uncover, crank the heat, and stir fry fiercely (bhunno) while applying ${randomSecret}. Serve with hot fresh naan!`;

  if (selectedDish === 'Biryani Rice Bowl') {
    selectedImageUrl = 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80'; // Biryani Rice photo
    dynamicIngredients = `• 500g Basmati Rice (soaked for 30 mins)
• 750g Chicken or Mutton pieces
• 3 Large Onions (thinly sliced & fried crispy)
• 1 cup Thick Yogurt & mint leaves
• 2 tbsp Biryani Spices (Kewra essence & Saffron)
• 4 tbsp Ghee or Oil`;

    dynamicInstructions = `1. Boil the soaked Basmati rice with whole spices until 70% cooked, then drain and set aside.
2. Cook your protein base in a separate pot with yogurt and your aromatic spice mix until perfectly tender and juicy.
3. Layer the par-boiled rice over the cooked meat base. Top with fried onions, fresh mint, and saffron-infused milk.
4. Seal the pot tightly (Dum cooking) and cook on low heat for 15 minutes to let the flavors fuse beautifully. Serve hot!`;
  } else if (selectedDish === 'Tikka Platter') {
    selectedImageUrl = 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80'; // Clean Skewered Tikka Kebab photo
    dynamicIngredients = `• 1 kg Chicken breast (cubed)
• 1 cup Thick hung yogurt
• 2 tbsp Tandoori Masala spice blend
• 2 tbsp Lemon juice
• 2 Cloves of garlic (minced)
• Melted butter for basting`;

    dynamicInstructions = `1. Whisk the yogurt, lemon juice, aromatics, and Tandoori spices in a bowl. Marinate the chicken cubes for at least 2 hours.
2. Skewer the chicken pieces evenly, leaving small spaces between them.
3. Grill or roast at high heat, turning occasionally, until the edges are beautifully charred and caramelized.
4. Baste generously with melted butter right before taking them off the heat. Serve with mint chutney!`;
  }

  return {
    imageUrl: selectedImageUrl,
    text: `✨ AI Generated Recipe: ${randomAdj} ${selectedDish} (Batch #${randomId}) ✨

Ingredients:
${dynamicIngredients}

Instructions:
${dynamicInstructions}`
  };
}