/*
 * Design Philosophy: Contemporary Digital Heritage
 * - Asymmetric layout with 8-degree angles
 * - Sandy brown, olive green, royal gold color palette
 * - Smooth animations (400-600ms)
 * - Islamic geometric patterns as decorative elements
 */

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Sparkles, Leaf, TrendingUp, Utensils } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function Home() {
  const [dishName, setDishName] = useState("");
  const [, setLocation] = useLocation();

  const handleSearch = (name: string) => {
    if (name.trim()) {
      setLocation(`/results?dish=${encodeURIComponent(name.trim())}`);
    }
  };

  const handleExampleClick = () => {
    handleSearch("كبسة");
  };

  return (
    <div className="min-h-screen pattern-islamic">
      {/* Hero Section with Background Image */}
      <section 
        className="relative min-h-[85vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url('https://private-us-east-1.manuscdn.com/sessionFile/olNHo2DtlwBoAX8fU8SYb7/sandbox/51jsLb6u7pj7s03lRRJ58k-img-1_1771149515000_na1fn_aGVyby1iYWNrZ3JvdW5k.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvb2xOSG8yRHRsd0JvQVg4ZlU4U1liNy9zYW5kYm94LzUxanNMYjZ1N3BqN3MwM2xSUko1OGstaW1nLTFfMTc3MTE0OTUxNTAwMF9uYTFmbl9hR1Z5YnkxaVlXTnJaM0p2ZFc1ay5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=TQ29Z2XTh527Iv9z4yXCYpCNCcQDKbZ5kV7qgHwfWUNJqDC3znEhe8o8kMFFOApba7xdqZNhJ8MoRuyjFzFXmNhts8M27iKo8hsln0R1X-e8HRhVVeBmaddSwI0sPkVxbD-nhfu4l8QZWtF~vBelvFpNZ5c2DrBc1DyLWeYAgbgiiU2gonbJi9ysTmXp4OQFSwLOEMH4rA1TyaZTucPA5IuSFCeQ3dpkzSKs2ToTB59tkiGzMTDzuzKlKD-r1f~79D2-I3BTsS3yh3IfcoZSgDQnMxnw8cMjHqe6hCAO0Vl~b4EUaxO6dpYG04BnO~LTroe9yxb5IFrhtkDQQ1ZxzQ__')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background/90"></div>
        
        <div className="container relative z-10 text-center animate-fade-in-up">
          {/* Logo/Icon */}
          <div className="flex justify-center mb-8">
            <div className="bg-primary/10 backdrop-blur-sm p-6 rounded-2xl border-2 border-primary/20">
              <Utensils className="w-16 h-16 text-primary" strokeWidth={1.5} />
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="font-display text-5xl md:text-7xl mb-6 text-foreground leading-tight">
            محوّل الأكلات السعودية
            <span className="block text-primary mt-2">إلى نسخ صحية</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto leading-relaxed">
            اكتشف كيف تحوّل أطباقك التقليدية المفضلة إلى وجبات صحية ومغذية
          </p>
          
          {/* AI Badge */}
          <div className="flex items-center justify-center gap-2 mb-12">
            <Sparkles className="w-5 h-5 text-accent" />
            <span className="text-sm text-muted-foreground font-medium">
              مدعوم بالذكاء الاصطناعي
            </span>
          </div>

          {/* Search Box */}
          <Card className="max-w-2xl mx-auto p-8 bg-card/95 backdrop-blur-md border-2 border-border shadow-2xl">
            <div className="space-y-6">
              <div className="space-y-3">
                <label htmlFor="dish-input" className="block text-right text-lg font-semibold text-foreground">
                  ما هي الأكلة التي تريد تحويلها؟
                </label>
                <Input
                  id="dish-input"
                  type="text"
                  placeholder="مثال: كبسة، مندي، كليجا..."
                  value={dishName}
                  onChange={(e) => setDishName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch(dishName);
                    }
                  }}
                  className="text-lg h-14 text-right border-2 focus:border-primary transition-desert"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => handleSearch(dishName)}
                  disabled={!dishName.trim()}
                  size="lg"
                  className="flex-1 h-14 text-lg font-bold transition-desert hover:scale-105"
                >
                  <Sparkles className="ml-2 w-5 h-5" />
                  ابدأ التحويل
                </Button>
                
                <Button
                  onClick={handleExampleClick}
                  variant="outline"
                  size="lg"
                  className="h-14 text-lg font-semibold border-2 transition-desert hover:scale-105 hover:bg-secondary"
                >
                  جرّب مثال: كبسة
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
        <div className="container">
          <h2 className="font-display text-4xl md:text-5xl text-center mb-16 text-foreground">
            ماذا ستحصل عليه؟
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <Card className="p-8 text-center transition-desert hover:scale-105 hover:shadow-2xl border-2 bg-card">
              <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-10 h-10 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">مقارنة القيم الغذائية</h3>
              <p className="text-muted-foreground leading-relaxed">
                قارن بين النسخة التقليدية والنسخة الصحية من حيث السعرات الحرارية والبروتين والدهون والكربوهيدرات
              </p>
            </Card>

            {/* Feature 2 */}
            <Card className="p-8 text-center transition-desert hover:scale-105 hover:shadow-2xl border-2 bg-card">
              <div className="bg-accent/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="w-10 h-10 text-accent" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">مكونات محلية سعودية</h3>
              <p className="text-muted-foreground leading-relaxed">
                اقتراحات لمكونات محلية طازجة ومتوفرة في الأسواق السعودية لتحضير النسخة الصحية
              </p>
            </Card>

            {/* Feature 3 */}
            <Card className="p-8 text-center transition-desert hover:scale-105 hover:shadow-2xl border-2 bg-card">
              <div className="bg-secondary/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Utensils className="w-10 h-10 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">نصائح تقليل الهدر</h3>
              <p className="text-muted-foreground leading-relaxed">
                نصائح عملية لتقليل هدر الطعام والاستفادة من جميع المكونات بما يتماشى مع رؤية 2030
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Vision 2030 Section */}
      <section 
        className="py-24 relative overflow-hidden"
        style={{
          backgroundImage: `url('https://private-us-east-1.manuscdn.com/sessionFile/olNHo2DtlwBoAX8fU8SYb7/sandbox/51jsLb6u7pj7s03lRRJ58k-img-5_1771149513000_na1fn_dmlzaW9uLTIwMzA.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvb2xOSG8yRHRsd0JvQVg4ZlU4U1liNy9zYW5kYm94LzUxanNMYjZ1N3BqN3MwM2xSUko1OGstaW1nLTVfMTc3MTE0OTUxMzAwMF9uYTFmbl9kbWx6YVc5dUxUSXdNekEucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=d9ePcIpkFV4CRRc8cxTu~qg46o7gy8CW0bt9rtWn5yNB9ggKessHnEfqSInTEH6VtyimJ1w7m9cviNf0R2hLjatlM6fEio3W2MLg9dSl4vGYP4-mPtllJV7icA~ymJHmo6-ZZYUBKMAyAR8PxeBMlqlvpms8F-2oUlN9mZxJ1Fye--5V9RjXGE68BDpChZCG-6TORLyPNTtpveHFC~FDl~qhDV1rTBzUd2pO0IVvKjglcPiufVIZW3IaFSrwuxbqd~ekJJ9cD2NTKHf9MJyFjQxRdXpex-~DR5anH9php~588wS5TqyjVT0TgsQyF5BoGojWr42kxvHYvByyO1bZ6A__')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/95"></div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-4xl md:text-5xl mb-8 text-foreground">
              متوافق مع رؤية السعودية 2030
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
              نساهم في تحقيق أهداف الرؤية من خلال تعزيز الصحة العامة، دعم المنتجات المحلية، وتقليل هدر الطعام لمستقبل مستدام
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-lg font-semibold">
              <span className="px-6 py-3 bg-primary/10 text-primary rounded-full border-2 border-primary/20">
                🌱 الصحة والعافية
              </span>
              <span className="px-6 py-3 bg-accent/10 text-accent rounded-full border-2 border-accent/20">
                🇸🇦 دعم المنتجات المحلية
              </span>
              <span className="px-6 py-3 bg-secondary/30 text-foreground rounded-full border-2 border-secondary">
                ♻️ الاستدامة البيئية
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-secondary/30 border-t-2 border-border">
        <div className="container text-center">
          <p className="text-muted-foreground text-lg mb-4">
            محوّل الأكلات السعودية الصحية - مدعوم بالذكاء الاصطناعي
          </p>
          <p className="text-sm text-muted-foreground">
            جميع التوصيات الغذائية مُولّدة بواسطة الذكاء الاصطناعي ويُنصح باستشارة أخصائي تغذية للحالات الخاصة
          </p>
        </div>
      </footer>
    </div>
  );
}
