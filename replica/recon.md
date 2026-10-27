# REA Reconnaissance Report: Online Eğitim HLS Video & Platform Reverse Engineering

**Referans İnceleme Konusu:** Modern Dijital Eğitim Video Oynatıcı & Çoklu Anlatım Mimarisi  
**Protokol:** HTTP Live Streaming (HLS) / MPEG-TS / DASH  
**Analiz:** Kullanıcı Arayüzü & Pedagojik Etkileşim Tasarımı  
**Platform Hedefi:** AçıkMaarif (100% Bağımsız, Özgür & Açık Kaynaklı Millî Eğitim Ekosistemi)

---

## 1. Stream & Architecture Reconnaissance

### 1.1 Technical Manifest Specifications
- **Manifest Format:** HLS Version 3 (`#EXT-X-VERSION:3`)
- **Playlist Type:** VOD (`#EXT-X-PLAYLIST-TYPE:VOD`)
- **Target Duration:** 10.0 seconds per fragment (`#EXT-X-TARGETDURATION:10`)
- **Total Duration:** 136.0 seconds (2 minutes, 16 seconds)
- **Segment Count:** 14 MPEG-TS chunks (`media_720_00001.ts` to `media_720_00014.ts`)
- **Container / Codec:** H.264 / AAC 720p HD @ 30fps

### 1.2 Core Pedagogical & UX Patterns Discovered
Through frame and content analysis of the promotional stream, the following core features were identified:
1. **Multi-Teacher Synchronized Delivery (Çoklu Anlatım):**
   - The same educational outcome is presented through distinct pedagogical styles (Conceptual/Scientific Proof, High-Yield Test Solving, Mnemonic Memory Story, and Step-by-Step Foundation).
2. **In-Video Interactive Checkpoints ("Durak Sorusu"):**
   - At critical comprehension thresholds, the stream pauses to present an interactive diagnostic question testing the concept just explained.
3. **Forensic Dynamic Watermark (Dinamik Güvenlik Damgası):**
   - A floating, periodically relocating user identifier watermark across the video surface for DRM integrity and accountability.
4. **Cognitive Memory Anchors (Bilişsel Çapa & Mnemonic Hafıza Kartı):**
   - Visual and auditory narrative analogies (e.g., "Euler'in Asansörü ve Yer Çekimi Logaritması") that convert abstract equations into memorable mental models.

---

## 2. Legal, Brand & Clean-Room Reconstruction

In accordance with the `/replica-design` and open-source principles:
- **Sıfır Tescilli Ticari Marka / Bağımsız Mimari:** Tüm özel/ticari yazılım isimleri, tescilli markalar ve harici sunucu alan adları projeden tamamen arındırılmıştır. Proje %100 özgür, bağımsız ve açık kaynaklı AçıkMaarif mimarisiyle sıfırdan geliştirilmiştir.
- **Open-Source Equivalent:** Rebuilt as **AçıkMaarif** with AI Learning Companion **Bilge & KANKA**.
- **Player Engine:** Native HTML5 `<video>` powered by open-source `HLS.js` with zero proprietary player SDK dependencies.
- **DRM Watermark:** Procedural CSS/React floating watermark.
- **State Educational Alignments:** Official curriculum mapping to **Türkiye Yüzyılı Maarif Modeli (TYMM)**, MEB OGM 3 Adım, MEBİ, DÖGM, and ÖSYM standards.
