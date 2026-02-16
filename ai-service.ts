/**
 * AI Service for transforming traditional Saudi dishes to healthy versions
 * This service will use the Manus built-in AI API when API key is provided
 */

export interface NutritionalData {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

export interface LocalIngredient {
  name: string;
  benefit: string;
  availability: string;
}

export interface Recipe {
  ingredients: string[];
  steps: string[];
  prepTime: string;
  servings: number;
}

export interface Vision2030Impact {
  healthScore: number;
  localSupportScore: number;
  sustainabilityScore: number;
}

export interface TransformationResult {
  dishName: string;
  traditional: NutritionalData;
  healthy: NutritionalData;
  recipe: Recipe;
  localIngredients: LocalIngredient[];
  wasteReductionTips: string[];
  vision2030Impact: Vision2030Impact;
}

/**
 * Transform a traditional Saudi dish to a healthy version using AI
 * @param dishName - Name of the traditional dish
 * @param apiKey - Optional API key for AI service (can be set in .env as VITE_AI_API_KEY)
 * @returns Transformation result with nutritional data, recipe, and tips
 */
export async function transformDishToHealthy(
  dishName: string,
  apiKey?: string
): Promise<TransformationResult> {
  // Get API key from environment or parameter
  const key = apiKey || import.meta.env.VITE_AI_API_KEY;

  if (!key) {
    // If no API key, return mock data for demonstration
    console.warn("No AI API key provided. Using mock data for demonstration.");
    return getMockTransformation(dishName);
  }

  try {
    // Call the AI API
    const response = await fetch("/api/ai/transform", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        dishName,
        language: "ar",
        includeNutrition: true,
        includeRecipe: true,
        includeLocalIngredients: true,
        includeWasteReduction: true,
        includeVision2030: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error calling AI API:", error);
    // Fallback to mock data if API fails
    return getMockTransformation(dishName);
  }
}

/**
 * Generate mock transformation data for demonstration purposes
 * This is used when no API key is available or API call fails
 */
function getMockTransformation(dishName: string): TransformationResult {
  // Database of Saudi dishes with their specific data
  const dishesDatabase: Record<string, any> = {
    "كبسة": {
      traditional: { calories: 850, protein: 35, carbs: 95, fat: 45, fiber: 3 },
      healthy: { calories: 520, protein: 38, carbs: 65, fat: 18, fiber: 8 },
      ingredients: ["أرز حساوي بني", "صدور دجاج منزوعة الجلد", "زيت زيتون", "بهارات طبيعية", "بصل", "طماطم", "جزر", "فلفل رومي"],
      steps: ["انقع الأرز البني لمدة ساعتين", "اسلق الدجاج بدون جلد مع البهارات", "استخدم زيت الزيتون بدلاً من السمن", "أضف خضروات مشكلة للقيمة الغذائية", "قلل كمية الملح واستخدم بهارات طبيعية"],
      localIngredients: [
        { name: "أرز حساوي", benefit: "غني بالألياف والمعادن", availability: "الأحساء" },
        { name: "دجاج بلدي", benefit: "بروتين عالي الجودة", availability: "الخرج" },
        { name: "طماطم محلية", benefit: "غنية بمضادات الأكسدة", availability: "القصيم" }
      ],
      wasteTips: ["احسب 200g رز للشخص الواحد", "استخدم بقايا الكبسة لعمل شوربة", "جمّد الكميات الزائدة في حصص فردية"]
    },
    
    "مطازيز": {
      traditional: { calories: 720, protein: 25, carbs: 85, fat: 35, fiber: 4 },
      healthy: { calories: 450, protein: 28, carbs: 55, fat: 15, fiber: 9 },
      ingredients: ["طحين قمح كامل", "لحم قليل الدهن", "لبن قليل الدسم", "بصل", "طماطم", "بهارات طبيعية"],
      steps: ["استخدم طحين القمح الكامل بدلاً من الأبيض", "اختر لحم قليل الدهون وأزل الدهون المرئية", "استخدم لبن قليل الدسم", "قلل كمية الدهون في الطبخ", "أضف الخضروات للقيمة الغذائية"],
      localIngredients: [
        { name: "طحين قمح كامل", benefit: "غني بالألياف", availability: "حائل" },
        { name: "لبن بلدي", benefit: "غني بالبروبيوتيك", availability: "الخرج" },
        { name: "لحم ضأن محلي", benefit: "بروتين عالي الجودة", availability: "نجران" }
      ],
      wasteTips: ["احسب 150g عجين للشخص", "استخدم البواقي لعمل فطائر بالخضار", "احفظ العجينة في الثلاجة ليومين"]
    },
    
    "جريش": {
      traditional: { calories: 680, protein: 22, carbs: 75, fat: 38, fiber: 5 },
      healthy: { calories: 420, protein: 25, carbs: 58, fat: 12, fiber: 10 },
      ingredients: ["قمح مجروش كامل", "لحم قليل الدهن", "بصل", "طماطم", "زيت زيتون", "بهارات طبيعية"],
      steps: ["استخدم قمح مجروش كامل", "اختر لحم قليل الدهون", "قلل كمية السمن واستبدلها بزيت الزيتون", "أضف الخضروات المفرومة", "استخدم بهارات طبيعية بدل الملح الزائد"],
      localIngredients: [
        { name: "قمح مجروش", benefit: "غني بالألياف والفيتامينات", availability: "حائل" },
        { name: "لحم غنم محلي", benefit: "بروتين ومعادن", availability: "القصيم" },
        { name: "بصل محلي", benefit: "مضادات الأكسدة", availability: "الجوف" }
      ],
      wasteTips: ["احسب 180g جريش للشخص", "استخدم البواقي لعمل كفتة جريش", "أضف مرق إضافي وحوّله لشوربة"]
    },
    
    "مندي": {
      traditional: { calories: 880, protein: 38, carbs: 92, fat: 48, fiber: 3 },
      healthy: { calories: 550, protein: 40, carbs: 68, fat: 20, fiber: 7 },
      ingredients: ["رز بسمتي بني", "لحم قليل الدهن أو دجاج", "بهارات مندي طبيعية", "بصل", "طماطم", "زيت زيتون"],
      steps: ["استخدم الفرن بدلاً من الطريقة التقليدية", "أزل الدهون من اللحم", "استخدم رز بسمتي بني", "قلل كمية الزيت", "أضف خضروات مشوية"],
      localIngredients: [
        { name: "رز بسمتي", benefit: "كربوهيدرات معتدلة المؤشر الجلايسيمي", availability: "الأحساء" },
        { name: "لحم غنم محلي", benefit: "بروتين وحديد", availability: "نجران" },
        { name: "بهارات طبيعية", benefit: "مضادات أكسدة", availability: "جازان" }
      ],
      wasteTips: ["احسب 200g رز للشخص", "استخدم البواقي لعمل مندي معاد تسخينه بالخضار", "جمّد اللحم المتبقي للاستخدام لاحقاً"]
    },
    
    "حنيني": {
      traditional: { calories: 620, protein: 18, carbs: 78, fat: 32, fiber: 6 },
      healthy: { calories: 380, protein: 20, carbs: 55, fat: 12, fiber: 11 },
      ingredients: ["تمر طبيعي بدون سكر مضاف", "طحين شوفان", "زيت جوز الهند", "قرفة", "هيل", "ماء ورد طبيعي"],
      steps: ["استخدم طحين الشوفان بدلاً من الطحين الأبيض", "قلل كمية السمن واستخدم زيت جوز هند", "استخدم تمر طبيعي بدون سكر إضافي", "أضف القرفة للنكهة والفوائد الصحية", "قلل كمية السكر الإجمالية"],
      localIngredients: [
        { name: "تمر سكري", benefit: "سكر طبيعي وألياف", availability: "القصيم" },
        { name: "تمر عجوة", benefit: "فوائد صحية متعددة", availability: "المدينة المنورة" },
        { name: "هيل محلي", benefit: "يساعد على الهضم", availability: "جازان" }
      ],
      wasteTips: ["احسب 120g للشخص", "استخدم البقايا لعمل كرات طاقة بالتمر", "احفظه في الثلاجة لمدة أسبوع"]
    },
    
    "قرصان": {
      traditional: { calories: 700, protein: 24, carbs: 82, fat: 36, fiber: 4 },
      healthy: { calories: 440, protein: 27, carbs: 60, fat: 14, fiber: 9 },
      ingredients: ["عجين قمح كامل", "لحم قليل الدهن", "بصل", "طماطم", "كوسا", "جزر", "بهارات طبيعية"],
      steps: ["استخدم طحين القمح الكامل", "اختر لحم قليل الدهون", "أضف خضروات متنوعة", "قلل كمية الزيت", "استخدم مرق قليل الدسم"],
      localIngredients: [
        { name: "طحين قمح", benefit: "ألياف وفيتامينات", availability: "حائل" },
        { name: "خضروات موسمية", benefit: "فيتامينات ومعادن", availability: "الخرج" },
        { name: "لحم بقر محلي", benefit: "بروتين وحديد", availability: "القصيم" }
      ],
      wasteTips: ["احسب 160g عجين للشخص", "استخدم البواقي لعمل فطائر", "جمّد العجين الزائد"]
    },
    
    "عصيدة": {
      traditional: { calories: 580, protein: 15, carbs: 72, fat: 28, fiber: 3 },
      healthy: { calories: 360, protein: 18, carbs: 50, fat: 11, fiber: 8 },
      ingredients: ["طحين قمح كامل", "تمر طبيعي", "زيت زيتون", "هيل", "ماء ورد"],
      steps: ["استخدم طحين القمح الكامل", "قلل كمية السمن", "استخدم تمر طبيعي بدل السكر", "أضف القرفة والهيل", "قلل الكمية الإجمالية"],
      localIngredients: [
        { name: "طحين قمح كامل", benefit: "ألياف ومعادن", availability: "حائل" },
        { name: "تمر محلي", benefit: "طاقة طبيعية", availability: "القصيم" },
        { name: "هيل", benefit: "مضادات أكسدة", availability: "جازان" }
      ],
      wasteTips: ["احسب 140g للشخص", "احفظ البقايا في الثلاجة", "أضف حليب وحوّلها لحلى صحي"]
    },
    
    "مرقوق": {
      traditional: { calories: 710, protein: 26, carbs: 80, fat: 37, fiber: 4 },
      healthy: { calories: 450, protein: 29, carbs: 58, fat: 15, fiber: 9 },
      ingredients: ["عجين قمح كامل", "لحم قليل الدهن", "كوسا", "جزر", "طماطم", "بصل", "بهارات طبيعية"],
      steps: ["استخدم طحين القمح الكامل للعجين", "اختر لحم قليل الدهون", "أضف خضروات متنوعة", "قلل الزيت والدهون", "استخدم مرق قليل الملح"],
      localIngredients: [
        { name: "طحين قمح", benefit: "ألياف غذائية", availability: "حائل" },
        { name: "خضروات محلية", benefit: "فيتامينات", availability: "الخرج" },
        { name: "لحم ضأن", benefit: "بروتين عالي", availability: "نجران" }
      ],
      wasteTips: ["احسب 170g عجين للشخص", "استخدم البواقي لعمل شوربة", "جمّد الكميات الزائدة"]
    }
  };

  // Get dish-specific data or use default
  const dishData = dishesDatabase[dishName] || dishesDatabase["كبسة"];
  
  return {
    dishName,
    traditional: dishData.traditional,
    healthy: dishData.healthy,
    recipe: {
      ingredients: dishData.ingredients,
      steps: dishData.steps,
      prepTime: "45-60 دقيقة",
      servings: 6,
    },
    localIngredients: dishData.localIngredients,
    wasteReductionTips: dishData.wasteTips,
    vision2030Impact: {
      healthScore: Math.round(((dishData.traditional.calories - dishData.healthy.calories) / dishData.traditional.calories) * 100),
      localSupportScore: dishData.localIngredients.length * 25,
      sustainabilityScore: 80,
    },
  };
}

/**
 * Validate if the provided API key is valid
 * @param apiKey - API key to validate
 * @returns true if valid, false otherwise
 */
export async function validateApiKey(apiKey: string): Promise<boolean> {
  try {
    const response = await fetch("/api/ai/validate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });

    return response.ok;
  } catch (error) {
    console.error("Error validating API key:", error);
    return false;
  }
}
