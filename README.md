# 🧑‍🍳 AI Chef Companion

Project ini merupakan tugas proyek akhir dari Intermediate Class yang diselenggarakan oleh Primakara Developers. Website ini dibuat sebagai sarana pembelajaran dan eksplorasi dalam membangun aplikasi modern menggunakan Vue.js, Tailwind CSS, serta integrasi AI pada beberapa fitur tertentu.

Masih banyak fitur yang dapat dikembangkan dan dieksplorasi lebih lanjut seiring proses pembelajaran dan pengembangan proyek. Website ini juga dibuat dengan bantuan pendekatan vibe coding untuk membantu proses implementasi, eksplorasi ide, serta pengembangan fitur selama pengerjaan proyek. Intinya full nge-vibe lah :v

---

# ✨ Fitur Utama

* 📚 **Global Recipe Catalogue**
  Eksplorasi ribuan resep dari seluruh dunia menggunakan TheMealDB API dengan tampilan kartu bergaya Bento Grid dan efek hover sinematik.

* 🪄 **Leftover Snapshot (AI Generative)**
  Masukkan bahan makanan yang tersedia dan AI akan menghasilkan resep lengkap beserta langkah memasak dan takaran bahan.

* 📊 **Smart Nutrition Scanner**
  Analisis nutrisi resep secara real-time menggunakan AI, termasuk kalori, protein, karbohidrat, lemak, dan health insight.

* 🎬 **Premium Micro-interactions**
  Dilengkapi animasi transisi halaman, efek shimmer loading, spring animation, dan auto retry system untuk pengalaman pengguna yang lebih halus.

---

# 🛠️ Teknologi & Arsitektur

Proyek ini dibangun menggunakan teknologi frontend modern untuk memastikan performa dan skalabilitas yang optimal.

* **Framework:** Vue 3 (Composition API & `<script setup>`)
* **Build Tool:** Vite
* **Styling:** Tailwind CSS v4
* **Routing:** Vue Router 4
* **Icons:** Lucide Vue
* **AI Engine:** Google Gemini API
* **Recipe API:** TheMealDB API

---

# 🎨 Filosofi Desain

Mengusung tema **Editorial Dark Kitchen**, desain aplikasi berfokus pada:

* **Tipografi Modern Editorial**
  Menggunakan kombinasi font serif dan sans-serif untuk menciptakan kesan premium dan mudah dibaca.

* **Warna Earthy & Warm**
  Dominasi warna gelap dengan aksen warm glow untuk menciptakan suasana elegan dan nyaman.

* **Layout Modular Bento Grid**
  Struktur layout modular dengan border tipis untuk tampilan yang bersih dan terorganisir.

---

# 🚀 Cara Instalasi & Menjalankan Proyek

## 1. Prasyarat

Pastikan sudah menginstal:

* Node.js versi 18 atau lebih baru
* npm atau pnpm

---

## 2. Clone Repository

```bash
git clone https://github.com/username-anda/ai-chef-companion.git
cd ai-chef-companion
```

## 3. Install Dependencies

```bash
npm install
```

atau

```bash
pnpm install
```

---

## 4. Setup Environment Variable

Buat file `.env` di root project:

```env
VITE_GEMINI_API_KEY=your_api_key_here
```

---

## 5. Jalankan Development Server

```bash
npm run dev
```

---

# 📦 Build Production

```bash
npm run build
```

---

# 📁 Struktur Folder

```bash
src/
├── assets/
├── components/
├── composables/
├── layouts/
├── pages/
├── router/
├── services/
├── stores/
```

---

# 🤖 Dokumentasi Penggunaan AI

Project ini dikembangkan dengan bantuan AI pada beberapa bagian implementasi, terutama untuk integrasi API, eksplorasi ide fitur, debugging, serta percepatan proses development.

Sebagian tampilan dan komponen antarmuka dibuat serta dikustomisasi secara manual, sementara beberapa bagian lainnya dikembangkan dengan bantuan AI lalu disesuaikan kembali agar sesuai dengan kebutuhan aplikasi dan design system yang digunakan.

AI digunakan sebagai alat bantu pengembangan, referensi implementasi, serta troubleshooting selama proses pengerjaan proyek.

---

# 📄 License

Project ini dibuat untuk kebutuhan pembelajaran dan pengembangan portofolio.
