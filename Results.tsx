/*
 * Design Philosophy: Contemporary Digital Heritage
 * - Display AI-generated healthy transformation results with high-quality images
 * - Visual comparison of traditional vs healthy dishes
 * - Nutritional comparison, local ingredients, waste reduction tips
 * - Vision 2030 impact section
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Sparkles, Loader2, TrendingDown, Leaf, Recycle, Target, ChefHat, Lightbulb } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useSearch } from "wouter";
import { toast } from "sonner";
import { transformDishToHealthy, type TransformationResult } from "@/lib/ai-service";

export default function Results() {
  const [, setLocation] = useLocation();
  const searchParams = useSearch();
  const dishName = new URLSearchParams(searchParams).get("dish") || "";
  
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<TransformationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!dishName) {
      setLocation("/");
      return;
    }

    const fetchTransformation = async () => {
      setLoading(true);
      setError(null);

      try {
        const transformationResult = await transformDishToHealthy(dishName);
        setResult(transformationResult);
      } catch (err) {
        setError("عذراً، حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى.");
        toast.error("فشل في تحميل النتائج");
      } finally {
        setLoading(false);
      }
    };

    fetchTransformation();
  }, [dishName, setLocation]);

  const calculateReduction = (traditional: number, healthy: number) => {
    return Math.round(((traditional - healthy) / traditional) * 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen pattern-islamic flex items-center justify-center">
        <Card className="p-12 text-center max-w-md bg-card/95 backdrop-blur-md">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Loader2 className="w-16 h-16 text-primary animate-spin" />
              <Sparkles className="w-8 h-8 text-accent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-foreground">جاري التحويل...</h2>
          <p className="text-muted-foreground leading-relaxed">
            الذكاء الاصطناعي يعمل على تحليل <span className="font-bold text-primary">{dishName}</span> وإنشاء نسخة صحية مخصصة لك
          </p>
          <div className="mt-6">
            <div className="animate-shimmer h-2 bg-gradient-to-r from-transparent via-primary/30 to-transparent rounded-full"></div>
          </div>
        </Card>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="min-h-screen pattern-islamic flex items-center justify-center p-4">
        <Card className="p-12 text-center max-w-md bg-card/95 backdrop-blur-md">
          <div className="text-6xl mb-6">😔</div>
          <h2 className="text-2xl font-bold mb-4 text-destructive">حدث خطأ</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            {error || "لم نتمكن من تحميل النتائج"}
          </p>
          <Button onClick={() => setLocation("/")} size="lg">
            <ArrowLeft className="ml-2 w-5 h-5" />
            العودة للرئيسية
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pattern-islamic py-12">
      <div className="container max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => setLocation("/")}
            className="mb-4 hover:bg-secondary transition-desert"
          >
            <ArrowLeft className="ml-2 w-5 h-5" />
            العودة للبحث
          </Button>

          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-8 h-8 text-accent" />
            <h1 className="font-display text-4xl md:text-5xl text-foreground">
              {result.dishName} الصحية
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            تم إنشاء هذه التوصيات بواسطة الذكاء الاصطناعي
          </p>
        </div>

        {/* Visual Comparison Section */}
        <Card className="mb-8 border-2 overflow-hidden animate-fade-in-up">
          <CardHeader className="bg-gradient-to-l from-primary/5 to-accent/5">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <ChefHat className="w-7 h-7 text-primary" />
              المقارنة البصرية
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Traditional Dish */}
              <div className="space-y-4">
                <div className="relative rounded-lg overflow-hidden shadow-lg h-80">
                  <img 
                    src="https://private-us-east-1.manuscdn.com/sessionFile/olNHo2DtlwBoAX8fU8SYb7/sandbox/vs7VI8kZ9bMFXVPg38gBn4-img-2_1771151753000_na1fn_dHJhZGl0aW9uYWwta2Fic2EtZGlzaA.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvb2xOSG8yRHRsd0JvQVg4ZlU4U1liNy9zYW5kYm94L3ZzN1ZJOGtaOWJNRlhWUGczOGdCbjQtaW1nLTJfMTc3MTE1MTc1MzAwMF9uYTFmbl9kSEpoWkdsMGFXOXVZV3d0YTJGaWMyRXRaR2x6YUEucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=jF1ouICD6iQ2i4ta-7OYsWQR~C7vkrgUy~m74VWaUcUe759ImaP08j9iOo5skmQX6Kvg9mVWXoIeACHh5b4buH9fPw2rG~8erBaklqbE8BHLg59Cvt2UluoSQ~VHYxq-ecd-igC6wkeQYaRwXQfkNdziQ7okjt93JQrxLvl5tRA--qtr78U1oxEysmp5Jg71BZE41aRd9jHVKJogYtSbqD63QZwrX1HQw3ithnkgHqn6g01-0NowL6Nvcr~alTynos1D2ryuy1EQSWff90zaunmAaEoEvJJxmevHGUGunHZE6RD6zfdcMuZU2z8VqCWK5o0nhE39CCgR~bWBLphhUg__"
                    alt="الطبق التقليدي"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2 text-muted-foreground">الطبق التقليدي</h3>
                  <p className="text-sm text-muted-foreground">النسخة الأصلية الغنية بالسعرات الحرارية</p>
                </div>
              </div>

              {/* Healthy Dish */}
              <div className="space-y-4">
                <div className="relative rounded-lg overflow-hidden shadow-lg h-80 ring-2 ring-primary/30">
                  <img 
                    src="https://private-us-east-1.manuscdn.com/sessionFile/olNHo2DtlwBoAX8fU8SYb7/sandbox/vs7VI8kZ9bMFXVPg38gBn4-img-1_1771151752000_na1fn_aGVhbHRoeS1rYWJzYS1kaXNo.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvb2xOSG8yRHRsd0JvQVg4ZlU4U1liNy9zYW5kYm94L3ZzN1ZJOGtaOWJNRlhWUGczOGdCbjQtaW1nLTFfMTc3MTE1MTc1MjAwMF9uYTFmbl9hR1ZoYkhSb2VTMXJZV0p6WVMxa2FYTm8ucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=kLtzaPvg8P1IWb9AVobE1MdGjNGg9jnFV1WKNYky1bQfVOFSIs9Ak3sMGggWB9z3pthmQvlqkYnbfVUvJA8c1nmbCqmfcrhIL3X1YFdsWQQn494V0PmpkgThmzooYebFvuES7KVbu42tS4nnxLooJ7O5-MmbajUQmM8lDhs2VO2MkZtlYVQrjg0OAUU2H578VADyS4AVtmoFus55lhmwYc04F25CF0UUoIxlA0wVXqp-r95LslrXRvVDakC6GcJaHkbOjzYubCq-wbFkmNY6UJC1RdqzfYWapXoVdPaL1q-VWmN0kMNw26TWJo4-uwzFeERTN-xQB3q26ihtLFU2dA__"
                    alt="الطبق الصحي"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2 text-primary">الطبق الصحي ✨</h3>
                  <p className="text-sm text-muted-foreground">نسخة محسّنة غنية بالعناصر الغذائية</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Nutritional Comparison */}
        <Card className="mb-8 border-2 animate-fade-in-up">
          <CardHeader className="bg-gradient-to-l from-primary/5 to-accent/5">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <TrendingDown className="w-7 h-7 text-primary" />
              مقارنة القيم الغذائية (لكل حصة)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Traditional */}
              <div>
                <h3 className="text-xl font-bold mb-6 text-muted-foreground">النسخة التقليدية</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">السعرات الحرارية</span>
                      <span className="text-lg font-bold">{result.traditional.calories} سعرة</span>
                    </div>
                    <Progress value={100} className="h-3 bg-muted" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">البروتين</span>
                      <span className="text-lg font-bold">{result.traditional.protein} جم</span>
                    </div>
                    <Progress value={100} className="h-3 bg-muted" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">الكربوهيدرات</span>
                      <span className="text-lg font-bold">{result.traditional.carbs} جم</span>
                    </div>
                    <Progress value={100} className="h-3 bg-muted" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">الدهون</span>
                      <span className="text-lg font-bold">{result.traditional.fat} جم</span>
                    </div>
                    <Progress value={100} className="h-3 bg-muted" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">الألياف</span>
                      <span className="text-lg font-bold">{result.traditional.fiber} جم</span>
                    </div>
                    <Progress value={100} className="h-3 bg-muted" />
                  </div>
                </div>
              </div>

              {/* Healthy */}
              <div>
                <h3 className="text-xl font-bold mb-6 text-primary">النسخة الصحية ✨</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">السعرات الحرارية</span>
                      <span className="text-lg font-bold text-primary">
                        {result.healthy.calories} سعرة
                        <span className="text-sm mr-2 text-green-600">
                          (↓ {calculateReduction(result.traditional.calories, result.healthy.calories)}%)
                        </span>
                      </span>
                    </div>
                    <Progress 
                      value={(result.healthy.calories / result.traditional.calories) * 100} 
                      className="h-3" 
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">البروتين</span>
                      <span className="text-lg font-bold text-primary">
                        {result.healthy.protein} جم
                        <span className="text-sm mr-2 text-green-600">
                          (↑ {Math.abs(calculateReduction(result.traditional.protein, result.healthy.protein))}%)
                        </span>
                      </span>
                    </div>
                    <Progress 
                      value={(result.healthy.protein / result.traditional.protein) * 100} 
                      className="h-3" 
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">الكربوهيدرات</span>
                      <span className="text-lg font-bold text-primary">
                        {result.healthy.carbs} جم
                        <span className="text-sm mr-2 text-green-600">
                          (↓ {calculateReduction(result.traditional.carbs, result.healthy.carbs)}%)
                        </span>
                      </span>
                    </div>
                    <Progress 
                      value={(result.healthy.carbs / result.traditional.carbs) * 100} 
                      className="h-3" 
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">الدهون</span>
                      <span className="text-lg font-bold text-primary">
                        {result.healthy.fat} جم
                        <span className="text-sm mr-2 text-green-600">
                          (↓ {calculateReduction(result.traditional.fat, result.healthy.fat)}%)
                        </span>
                      </span>
                    </div>
                    <Progress 
                      value={(result.healthy.fat / result.traditional.fat) * 100} 
                      className="h-3" 
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">الألياف</span>
                      <span className="text-lg font-bold text-primary">
                        {result.healthy.fiber} جم
                        <span className="text-sm mr-2 text-green-600">
                          (↑ {Math.abs(calculateReduction(result.traditional.fiber, result.healthy.fiber))}%)
                        </span>
                      </span>
                    </div>
                    <Progress 
                      value={(result.healthy.fiber / result.traditional.fiber) * 100} 
                      className="h-3" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Local Ingredients Section */}
        <Card className="mb-8 border-2 animate-fade-in-up">
          <CardHeader className="bg-gradient-to-l from-accent/5 to-primary/5">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Leaf className="w-7 h-7 text-accent" />
              المكونات المحلية السعودية
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="mb-6">
              <img 
                src="https://private-us-east-1.manuscdn.com/sessionFile/olNHo2DtlwBoAX8fU8SYb7/sandbox/vs7VI8kZ9bMFXVPg38gBn4-img-5_1771151756000_na1fn_bG9jYWwtaW5ncmVkaWVudHMtc2hvd2Nhc2U.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvb2xOSG8yRHRsd0JvQVg4ZlU4U1liNy9zYW5kYm94L3ZzN1ZJOGtaOWJNRlhWUGczOGdCbjQtaW1nLTVfMTc3MTE1MTc1NjAwMF9uYTFmbl9iRzlqWVd3dGFXNW5jbVZrYVdWdWRITXRjMmh2ZDJOaGMyVS5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=sbJ-ws3gU2ziuoUhtC2gt~xfP6vwUjrlXRqeetx8ql6IfU4lrt25hK2y3HVTUDSUdyTkEHAgDvqZB9-A0JkRyoEy90p0A1nMW-IJZGPuzEJMMXn8XA3dHxha~QcrhEKUUFITsJFsRG68LxREkG-SHFrjkILiA2Pe6I89yllnYWHxigQytFeLmHawzhltuWen3adGuZQHlr4Eq8tQp2OHw2F2Fi2awfIzsW68~eDLUy4Gr4SrI8BH8WvFs89fa5djqAPoFeYMyvy7YgaVDSLHsbWzYhT1LC21et24ciZUlwN~pbtO0ieAeRmqk3A5rJm2apMDk4sD4ohrATRaQ0HRlA__"
                alt="المكونات المحلية السعودية"
                className="w-full h-auto rounded-lg shadow-lg mb-6"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {result.localIngredients.map((ingredient, index) => (
                <div key={index} className="p-4 bg-secondary/30 rounded-lg border border-primary/20 hover:border-primary/50 transition-colors">
                  <h4 className="font-bold text-lg text-primary mb-2">{ingredient.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{ingredient.benefit}</p>
                  <p className="text-xs text-accent font-semibold">📍 {ingredient.availability}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recipe Section */}
        <Card className="mb-8 border-2 animate-fade-in-up">
          <CardHeader className="bg-gradient-to-l from-primary/5 to-accent/5">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <ChefHat className="w-7 h-7 text-primary" />
              الوصفة الصحية
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Ingredients */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-primary">المقادير</h3>
                <ul className="space-y-2">
                  {result.recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-accent font-bold mt-1">•</span>
                      <span className="text-muted-foreground">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-primary">خطوات التحضير</h3>
                <ol className="space-y-3">
                  {result.recipe.steps.map((step, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">
                        {index + 1}
                      </span>
                      <span className="text-muted-foreground pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-secondary/30 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">وقت التحضير</p>
                <p className="font-bold text-primary">{result.recipe.prepTime}</p>
              </div>
              <div className="p-4 bg-secondary/30 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">عدد الحصص</p>
                <p className="font-bold text-primary">{result.recipe.servings} أشخاص</p>
              </div>
              <div className="p-4 bg-secondary/30 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">السعرات</p>
                <p className="font-bold text-primary">{result.healthy.calories} سعرة</p>
              </div>
              <div className="p-4 bg-secondary/30 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">البروتين</p>
                <p className="font-bold text-primary">{result.healthy.protein} جم</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Waste Reduction Tips */}
        <Card className="mb-8 border-2 animate-fade-in-up">
          <CardHeader className="bg-gradient-to-l from-accent/5 to-primary/5">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Recycle className="w-7 h-7 text-accent" />
              نصائح تقليل هدر الطعام
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-4">
              {result.wasteReductionTips.map((tip, index) => (
                <div key={index} className="flex gap-3 p-4 bg-secondary/20 rounded-lg border border-accent/20 hover:border-accent/50 transition-colors">
                  <Lightbulb className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                  <p className="text-muted-foreground">{tip}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Vision 2030 Impact */}
        <Card className="mb-8 border-2 border-accent/50 bg-gradient-to-br from-accent/5 to-primary/5 animate-fade-in-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Target className="w-7 h-7 text-accent" />
              تأثير رؤية السعودية 2030
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent/50 opacity-20"></div>
                  <div className="absolute inset-2 rounded-full bg-background flex items-center justify-center">
                    <span className="text-3xl font-bold text-primary">{result.vision2030Impact.healthScore}%</span>
                  </div>
                </div>
                <h4 className="font-bold text-lg text-primary mb-2">الصحة والعافية</h4>
                <p className="text-sm text-muted-foreground">تحسين الصحة العامة والوقاية من الأمراض المزمنة</p>
              </div>

              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent to-primary/50 opacity-20"></div>
                  <div className="absolute inset-2 rounded-full bg-background flex items-center justify-center">
                    <span className="text-3xl font-bold text-accent">{result.vision2030Impact.localSupportScore}%</span>
                  </div>
                </div>
                <h4 className="font-bold text-lg text-accent mb-2">دعم المنتجات المحلية</h4>
                <p className="text-sm text-muted-foreground">دعم الاقتصاد المحلي والأمن الغذائي الوطني</p>
              </div>

              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/70 to-accent opacity-20"></div>
                  <div className="absolute inset-2 rounded-full bg-background flex items-center justify-center">
                    <span className="text-3xl font-bold text-primary/70">{result.vision2030Impact.sustainabilityScore}%</span>
                  </div>
                </div>
                <h4 className="font-bold text-lg text-primary/70 mb-2">الاستدامة البيئية</h4>
                <p className="text-sm text-muted-foreground">تقليل الهدر والحفاظ على الموارد الطبيعية</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Disclosure */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center">
          <Sparkles className="w-6 h-6 text-primary mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">
            تم إنشاء هذه التوصيات والنصائح بواسطة <span className="font-bold text-primary">الذكاء الاصطناعي</span>. 
            النتائج تعتمد على معايير التغذية العلمية والممارسات الصحية الموصى بها.
          </p>
        </div>
      </div>
    </div>
  );
}
