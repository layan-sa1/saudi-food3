# دليل الإعداد والتشغيل | Setup Guide

## 📋 المحتويات | Contents

- [العربية](#العربية)
  - [المتطلبات الأساسية](#المتطلبات-الأساسية)
  - [التثبيت السريع](#التثبيت-السريع)
  - [إعداد API الذكاء الاصطناعي](#إعداد-api-الذكاء-الاصطناعي)
  - [التشغيل المحلي](#التشغيل-المحلي)
  - [البناء والنشر](#البناء-والنشر)
  - [حل المشاكل الشائعة](#حل-المشاكل-الشائعة)
- [English](#english)
  - [Prerequisites](#prerequisites)
  - [Quick Installation](#quick-installation)
  - [AI API Setup](#ai-api-setup)
  - [Local Development](#local-development)
  - [Build and Deployment](#build-and-deployment)
  - [Troubleshooting](#troubleshooting)

---

## العربية

### المتطلبات الأساسية

قبل البدء بتثبيت المشروع، تأكد من توفر البرامج التالية على جهازك:

#### 1. Node.js و npm

**الإصدار المطلوب:** Node.js 18.0.0 أو أحدث

**التحقق من التثبيت:**

```bash
node --version
npm --version
```

**التثبيت:**

- **Windows/macOS:** قم بتنزيل المثبت من [nodejs.org](https://nodejs.org/)
- **Linux (Ubuntu/Debian):**

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### 2. pnpm (موصى به)

**الإصدار المطلوب:** pnpm 10.0.0 أو أحدث

**التثبيت:**

```bash
npm install -g pnpm
```

**التحقق من التثبيت:**

```bash
pnpm --version
```

> **ملاحظة:** يمكنك استخدام npm أو yarn بدلاً من pnpm، لكن pnpm أسرع ويوفر مساحة التخزين.

#### 3. Git

**التحقق من التثبيت:**

```bash
git --version
```

**التثبيت:**

- **Windows:** قم بتنزيل المثبت من [git-scm.com](https://git-scm.com/)
- **macOS:** `brew install git`
- **Linux:** `sudo apt-get install git`

### التثبيت السريع

#### الخطوة 1: استنساخ المستودع

```bash
# استنساخ المشروع
git clone <repository-url>

# الانتقال إلى مجلد المشروع
cd saudi-healthy-food
```

#### الخطوة 2: تثبيت التبعيات

```bash
# باستخدام pnpm (موصى به)
pnpm install

# أو باستخدام npm
npm install

# أو باستخدام yarn
yarn install
```

**الوقت المتوقع:** 2-5 دقائق حسب سرعة الإنترنت

#### الخطوة 3: التحقق من التثبيت

```bash
# التحقق من عدم وجود أخطاء في TypeScript
pnpm check

# أو
npm run check
```

إذا لم تظهر أي أخطاء، فقد تم التثبيت بنجاح! ✅

### إعداد API الذكاء الاصطناعي

التطبيق يعمل في وضعين:

1. **وضع العرض التوضيحي (Demo Mode):** يستخدم بيانات تجريبية مُعدة مسبقاً
2. **وضع الإنتاج (Production Mode):** يتصل بـ API حقيقي للذكاء الاصطناعي

#### الوضع 1: العرض التوضيحي (بدون API)

لا حاجة لأي إعداد إضافي! يمكنك تشغيل التطبيق مباشرة وسيستخدم بيانات تجريبية.

```bash
pnpm dev
```

#### الوضع 2: الإنتاج (مع API)

##### الخطوة 1: الحصول على مفتاح API

يمكنك استخدام أي من خدمات الذكاء الاصطناعي التالية:

- **OpenAI GPT-4/GPT-3.5:** [platform.openai.com](https://platform.openai.com/)
- **Anthropic Claude:** [console.anthropic.com](https://console.anthropic.com/)
- **Google Gemini:** [makersuite.google.com](https://makersuite.google.com/)
- **أي API متوافق مع OpenAI**

##### الخطوة 2: إنشاء ملف البيئة

أنشئ ملف `.env` في الجذر الرئيسي للمشروع:

```bash
# إنشاء الملف
touch .env
```

##### الخطوة 3: إضافة مفتاح API

افتح ملف `.env` وأضف المفتاح:

```env
# مفتاح API للذكاء الاصطناعي
VITE_AI_API_KEY=sk-your-actual-api-key-here

# (اختياري) نقطة نهاية API مخصصة
VITE_AI_API_ENDPOINT=https://api.openai.com/v1/chat/completions
```

> **⚠️ تحذير أمني:** لا تشارك ملف `.env` أو تضعه في Git. الملف مُضاف بالفعل إلى `.gitignore`.

##### الخطوة 4: تخصيص خدمة API (اختياري)

إذا كنت تريد تخصيص طريقة استدعاء API، عدّل الملف:

```
client/src/lib/ai-service.ts
```

مثال على التخصيص:

```typescript
// تغيير نقطة النهاية
const API_ENDPOINT = import.meta.env.VITE_AI_API_ENDPOINT || 
                     "https://api.openai.com/v1/chat/completions";

// تخصيص الـ prompt
const systemPrompt = `أنت خبير تغذية سعودي متخصص في تحويل الأطباق التقليدية...`;
```

### التشغيل المحلي

#### تشغيل خادم التطوير

```bash
pnpm dev
```

سيعمل التطبيق على:

- **العنوان المحلي:** `http://localhost:3000`
- **عنوان الشبكة:** `http://<your-ip>:3000` (للوصول من أجهزة أخرى)

#### ميزات خادم التطوير

- **Hot Module Replacement (HMR):** التحديث الفوري عند تعديل الملفات
- **Fast Refresh:** الحفاظ على حالة التطبيق عند التحديث
- **Error Overlay:** عرض الأخطاء مباشرة في المتصفح

#### أوامر مفيدة أخرى

```bash
# فحص أخطاء TypeScript
pnpm check

# تنسيق الكود
pnpm format

# بناء النسخة الإنتاجية
pnpm build

# معاينة النسخة الإنتاجية
pnpm preview
```

### البناء والنشر

#### بناء النسخة الإنتاجية

```bash
pnpm build
```

سيتم إنشاء مجلد `dist/` يحتوي على الملفات المُحسّنة للنشر.

#### معاينة النسخة الإنتاجية محلياً

```bash
pnpm preview
```

سيعمل على: `http://localhost:4173`

#### خيارات النشر

##### 1. النشر على Vercel (موصى به)

```bash
# تثبيت Vercel CLI
npm install -g vercel

# النشر
vercel
```

##### 2. النشر على Netlify

```bash
# تثبيت Netlify CLI
npm install -g netlify-cli

# النشر
netlify deploy --prod
```

##### 3. النشر على خادم خاص

```bash
# بناء المشروع
pnpm build

# نسخ محتويات dist/ إلى خادمك
scp -r dist/* user@your-server:/var/www/html/
```

#### إعدادات النشر المهمة

**ملف `vercel.json` (للنشر على Vercel):**

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

**ملف `netlify.toml` (للنشر على Netlify):**

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### حل المشاكل الشائعة

#### المشكلة 1: أخطاء في تثبيت التبعيات

**الأعراض:**

```
ERR_PNPM_FETCH_404
```

**الحل:**

```bash
# حذف ملفات القفل وإعادة التثبيت
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

#### المشكلة 2: الخطوط العربية لا تظهر بشكل صحيح

**الأعراض:** النصوص العربية تظهر بخط افتراضي غير مناسب

**الحل:**

1. تأكد من وجود اتصال بالإنترنت (الخطوط تُحمّل من Google Fonts)
2. تحقق من ملف `client/index.html` أن رابط الخطوط صحيح
3. امسح الـ cache في المتصفح (Ctrl+Shift+Delete)

#### المشكلة 3: التطبيق لا يعمل على المتصفح

**الأعراض:** صفحة بيضاء أو أخطاء في Console

**الحل:**

```bash
# تحقق من الأخطاء في Terminal
pnpm dev

# افتح Developer Tools في المتصفح (F12)
# تحقق من Console للأخطاء
```

#### المشكلة 4: API لا يستجيب

**الأعراض:** رسالة "جاري التحميل..." تستمر بدون نتائج

**الحل:**

1. تحقق من صحة مفتاح API في ملف `.env`
2. تأكد من وجود رصيد في حساب API
3. تحقق من Network tab في Developer Tools للأخطاء
4. جرّب الوضع التجريبي (احذف ملف `.env`)

#### المشكلة 5: الصور لا تظهر

**الأعراض:** مربعات فارغة بدلاً من الصور

**الحل:**

1. تحقق من اتصال الإنترنت
2. الصور مُستضافة على CDN خارجي، تأكد من عدم حظرها
3. جرّب فتح رابط الصورة مباشرة في متصفح جديد

#### المشكلة 6: خطأ في البناء (Build Error)

**الأعراض:**

```
Error: Build failed with X errors
```

**الحل:**

```bash
# تحقق من أخطاء TypeScript
pnpm check

# إصلاح المشاكل المُكتشفة
# ثم أعد البناء
pnpm build
```

#### الحصول على مساعدة إضافية

إذا واجهت مشكلة غير مذكورة هنا:

1. تحقق من ملف `README.md` للمزيد من المعلومات
2. افتح Issue في المستودع مع تفاصيل المشكلة
3. تأكد من تضمين:
   - نظام التشغيل والإصدار
   - إصدار Node.js و pnpm
   - رسالة الخطأ الكاملة
   - الخطوات لإعادة إنتاج المشكلة

---

## English

### Prerequisites

Before installing the project, ensure you have the following software on your machine:

#### 1. Node.js and npm

**Required Version:** Node.js 18.0.0 or newer

**Check Installation:**

```bash
node --version
npm --version
```

**Installation:**

- **Windows/macOS:** Download installer from [nodejs.org](https://nodejs.org/)
- **Linux (Ubuntu/Debian):**

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### 2. pnpm (Recommended)

**Required Version:** pnpm 10.0.0 or newer

**Installation:**

```bash
npm install -g pnpm
```

**Check Installation:**

```bash
pnpm --version
```

> **Note:** You can use npm or yarn instead of pnpm, but pnpm is faster and saves storage space.

#### 3. Git

**Check Installation:**

```bash
git --version
```

**Installation:**

- **Windows:** Download installer from [git-scm.com](https://git-scm.com/)
- **macOS:** `brew install git`
- **Linux:** `sudo apt-get install git`

### Quick Installation

#### Step 1: Clone the Repository

```bash
# Clone the project
git clone <repository-url>

# Navigate to project folder
cd saudi-healthy-food
```

#### Step 2: Install Dependencies

```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install

# Or using yarn
yarn install
```

**Expected Time:** 2-5 minutes depending on internet speed

#### Step 3: Verify Installation

```bash
# Check for TypeScript errors
pnpm check

# Or
npm run check
```

If no errors appear, installation was successful! ✅

### AI API Setup

The application works in two modes:

1. **Demo Mode:** Uses pre-prepared mock data
2. **Production Mode:** Connects to a real AI API

#### Mode 1: Demo (Without API)

No additional setup needed! You can run the application directly and it will use mock data.

```bash
pnpm dev
```

#### Mode 2: Production (With API)

##### Step 1: Get an API Key

You can use any of the following AI services:

- **OpenAI GPT-4/GPT-3.5:** [platform.openai.com](https://platform.openai.com/)
- **Anthropic Claude:** [console.anthropic.com](https://console.anthropic.com/)
- **Google Gemini:** [makersuite.google.com](https://makersuite.google.com/)
- **Any OpenAI-compatible API**

##### Step 2: Create Environment File

Create a `.env` file in the project root:

```bash
# Create the file
touch .env
```

##### Step 3: Add API Key

Open the `.env` file and add your key:

```env
# AI API Key
VITE_AI_API_KEY=sk-your-actual-api-key-here

# (Optional) Custom API endpoint
VITE_AI_API_ENDPOINT=https://api.openai.com/v1/chat/completions
```

> **⚠️ Security Warning:** Do not share your `.env` file or commit it to Git. The file is already added to `.gitignore`.

##### Step 4: Customize API Service (Optional)

If you want to customize how the API is called, edit:

```
client/src/lib/ai-service.ts
```

Example customization:

```typescript
// Change endpoint
const API_ENDPOINT = import.meta.env.VITE_AI_API_ENDPOINT || 
                     "https://api.openai.com/v1/chat/completions";

// Customize prompt
const systemPrompt = `You are a Saudi nutrition expert specialized in transforming traditional dishes...`;
```

### Local Development

#### Run Development Server

```bash
pnpm dev
```

The application will run at:

- **Local URL:** `http://localhost:3000`
- **Network URL:** `http://<your-ip>:3000` (for access from other devices)

#### Development Server Features

- **Hot Module Replacement (HMR):** Instant updates when files are modified
- **Fast Refresh:** Maintains application state on update
- **Error Overlay:** Displays errors directly in the browser

#### Other Useful Commands

```bash
# Check TypeScript errors
pnpm check

# Format code
pnpm format

# Build production version
pnpm build

# Preview production build
pnpm preview
```

### Build and Deployment

#### Build Production Version

```bash
pnpm build
```

A `dist/` folder will be created containing optimized files for deployment.

#### Preview Production Build Locally

```bash
pnpm preview
```

Will run at: `http://localhost:4173`

#### Deployment Options

##### 1. Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

##### 2. Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

##### 3. Deploy to Private Server

```bash
# Build the project
pnpm build

# Copy dist/ contents to your server
scp -r dist/* user@your-server:/var/www/html/
```

#### Important Deployment Settings

**`vercel.json` file (for Vercel deployment):**

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

**`netlify.toml` file (for Netlify deployment):**

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Troubleshooting

#### Issue 1: Dependency Installation Errors

**Symptoms:**

```
ERR_PNPM_FETCH_404
```

**Solution:**

```bash
# Delete lock files and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

#### Issue 2: Arabic Fonts Not Displaying Correctly

**Symptoms:** Arabic text displays with incorrect default font

**Solution:**

1. Ensure internet connection (fonts load from Google Fonts)
2. Check `client/index.html` that font link is correct
3. Clear browser cache (Ctrl+Shift+Delete)

#### Issue 3: Application Not Working in Browser

**Symptoms:** White page or errors in Console

**Solution:**

```bash
# Check for errors in Terminal
pnpm dev

# Open Developer Tools in browser (F12)
# Check Console for errors
```

#### Issue 4: API Not Responding

**Symptoms:** "Loading..." message continues without results

**Solution:**

1. Verify API key correctness in `.env` file
2. Ensure sufficient credits in API account
3. Check Network tab in Developer Tools for errors
4. Try demo mode (delete `.env` file)

#### Issue 5: Images Not Displaying

**Symptoms:** Empty boxes instead of images

**Solution:**

1. Check internet connection
2. Images are hosted on external CDN, ensure they're not blocked
3. Try opening image URL directly in new browser

#### Issue 6: Build Error

**Symptoms:**

```
Error: Build failed with X errors
```

**Solution:**

```bash
# Check TypeScript errors
pnpm check

# Fix discovered issues
# Then rebuild
pnpm build
```

#### Getting Additional Help

If you encounter an issue not listed here:

1. Check `README.md` for more information
2. Open an Issue in the repository with problem details
3. Make sure to include:
   - Operating system and version
   - Node.js and pnpm versions
   - Complete error message
   - Steps to reproduce the issue

---

<div align="center">

**تم إعداده بعناية | Carefully Prepared**

</div>
