# 🎓 AçıkMaarif — Özgür & Açık Kaynaklı Dijital Eğitim Ekosistemi

> **Türkiye Yüzyılı Maarif Modeli (TYMM) & MEBİ Tam Uyumlu Millî Eğitim Teknolojileri Platformu**  
> Okul Öncesinden 12. Sınıfa ve YKS / LGS'ye kadar tüm kademeler için özgür, açık kaynaklı, oyunlaştırılmış ve çok ajanlı yapay zekâ destekli eğitim platformu.

---

## 🌟 Öne Çıkan Özellikler

### 1. 🏛️ Resmî Müfredat & Dijital Ders Kitapları Gezgini
- T.C. Millî Eğitim Bakanlığı (MEB), Talim ve Terbiye Kurulu Başkanlığı (TTKB), EBA, OGM Materyal (3 Adım & Dört Dörtlük) ve MEBİ resmî veritabanlarıyla entegre.
- **Doğrudan Web PDF Önizleme**: Bakanlık ve açık kaynaklı eğitim belgelerini harici sekmeye yönlendirmeden doğrudan tarayıcı içinde canlı olarak görüntüleme (PDF Proxy & Native Viewer).
- TTKB Resmî Kazanım Kodları (KB1 Temel, KB2 Bütünleşik, KB3 Üst Düzey Beceriler).

### 2. 🤖 Pedagojik Çok Ajanlı Yapay Zekâ Koçu (AçıkMaarif AI)
- **Prof. Bilge Hoca**: Sokratik sorgulama ve bilimsel temelli derin anlatım.
- **KANKA Koç**: Genç ve enerjik akran diliyle motive edici rehberlik.
- **Soru Dedektifi**: Çözüm adımlarını ipuçlarıyla keşfettiren tersine mühendislik yaklaşımı.
- **Minik Kaşif**: Okul öncesi ve ilkokul düzeyine özel somutlaştırmalı oyunlu anlatım.
- **AI Type Prediction**: Öğrencinin yazdığı soruyu anında analiz ederek (örn: *1+1*, *1453 İstanbul Fethi*, *fotosentez*, *logaritma*) anlık konu kestirimi ve bağlam korumalı sadeleştirme ("Daha sade anlat").

### 3. 🎨 WinUI 3 & Fluent Tasarım Arayüzü
- Windows 11 / WinUI 3 Mica & Acrylic cam estetiği.
- **Açık ve Koyu Tema Desteği**: Tek tıkla göz yormayan Akrilik Açık Mod veya derin odaklanma sağlayan Koyu Mod geçişi (`localStorage` kalıcılığı ile).
- **Kompakt Gezinme Çubuğu**: Yatay kaydırma çubuğu olmadan ekrana tam oturan Fluent menü butonları ve aktif göstergeler.

### 4. 🎮 Maarif Mini Oyunlar Kulübü (5 Retro Mini Oyun)
- 🏃 **Mario Koşucusu**: Engellerin üzerinden zıplayarak altın ve bilgi toplayan platform oyunu.
- 🟡 **Pacman Labirenti**: Dolaşan renkli hayaletler ve puan labirenti.
- 🃏 **Hafıza Kartları**: Eşleşen kartların kaybolduğu görsel zekâ egzersizi.
- 🔢 **6x6 Sudoku**: Gerçek kare ızgaralı ve anlık doğrulamalı akıl oyunu.
- ❌ **XOX (Tic-Tac-Toe)**: Sabit boyutlu, oynaması keyifli strateji oyunu.
- **Oyun Bitti & Başarı Modalı**: Kazandı/Kaybetti durumunda puan ve süre gösterimi.

### 5. 📖 E-Kitap & Dijital Stylus Kalemli Çalışma Masası
- Sayfa boyuna ve kenarlara kadar uzayabilen tam ekran (Edge-to-Edge) okuma deneyimi.
- HTML5 Canvas tabanlı dijital kalem, fosforlu kalem, silgi, kalınlık ve renk paleti.
- Sayfa üzerinde doğrudan soru çözümü ve not alma.

---

## 🚀 Hızlı Başlangıç

### Gereksinimler
- **Node.js** (v18+)
- **Python** (v3.10+)

### 1. Projeyi Klonlayın
```bash
git clone https://github.com/mtahiryilmazz/acikmaarif.git
cd acikmaarif
```

### 2. Backend Sunucusunu Başlatın
```bash
cd backend
python server.py
# Backend http://127.0.0.1:8000 üzerinde çalışacaktır
```

### 3. Frontend Arayüzünü Başlatın
```bash
cd ../frontend
npm install
npm run dev
# Frontend http://127.0.0.1:5173 üzerinde açılacaktır
```

---

## 🛠️ Mimari & Teknolojiler
- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, Canvas API, Web Audio API
- **Backend**: Standalone Python HTTP Server (Zero External Dependencies), RESTful API, Streaming PDF Proxy
- **Tasarım**: WinUI 3 Fluent Design System (Light/Dark Mode, Mica Acrylics)

---

## 📄 Lisans
Bu proje [MIT Lisansı](LICENSE) ile lisanslanmıştır. 100% Özgür ve Açık Kaynaklıdır.
Telif hakkı kısıtlaması olan hiçbir ticari materyal içermez.
