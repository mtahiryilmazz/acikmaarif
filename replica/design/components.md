# Component Specifications: AçıkMaarif Open Platform

Documented per `/replica-design` standards. All components are built with 100% open-source primitives, zero proprietary dependencies, and full accessibility compliance.

---

### 1. MultiTeacherPlayer
- **Variants:** Video Mode (`Hls.js` live streaming) | Smart Blackboard Mode (SVG + Math LaTeX)
- **Controls:** Play/Pause, 10s Rewind, Dynamic Scrubber with Durak Sorusu Marker, Mute/Unmute, Quality Picker (720p/1080p), Fullscreen
- **Subcomponents:** 
  - `PlainWhiteParachute` (Clean white fabric canopy with suspension lines for wall-apex jumps)
  - `ForensicWatermark` (Dynamic shifting DRM security marker)
  - `CheckpointModal` (In-stream diagnostic question testing active outcome)
- **Tokens Used:** `surface`, `border`, `accent.primary`, `radius.2xl`

---

### 2. WanderingMascots
- **Species Supported:** 🐰 Tavşan (Pamuk), 🐼 Panda (Tonton), 🐱 Kedi (Minnoş), 🐶 Köpek (Karabaş), 🦜 Kuş (Maviş), 🐢 Kaplumbağa (Tosbik), ✨ Anime Yıldızı
- **Behaviors:**
  - `walking`: Calm, adorable cadence with gentle hopping
  - `climbing`: Scrambles up the screen edge to apex
  - `parachuting`: Deployable plain white parachute when leaping from top (land animals only)
  - `flying`: Kuş (Bird) flies freely in 2D space with aerodynamic banking, zero parachute
  - `eating`: Sits and snacks on carrots 🥕, bamboo 🎋, or fish 🐟
  - `jumping`: Joyful high somersault leap
- **Dock Location:** Fixed bottom-left corner (`fixed bottom-6 left-6 z-40`) with studio opener + quick action triggers

---

### 3. MascotStudioPanel
- **Role:** Interactive 3D mascot customizer and fleet manager
- **Features:**
  - Live 3D Chibi preview canvas
  - Species picker (7 animals)
  - Palette picker (4-6 fur varieties per animal)
  - Size slider (Minik to Büyük)
  - Walking speed selector: 🐢 Sakin (0.5x), 🐾 Normal (0.85x), ⚡ Hareketli (1.5x)
  - "➕ Ekrana Ekle" to add multiple wandering mascots
  - Active roaming mascot list with individual "✕" remove buttons
  - Quick presets: Tavşan & Panda 🐰🐼, Tüm Hayvanlar 🐾, Tümünü Kaldır 🧹
- **Tokens Used:** `surface`, `border`, `accent.preschool_warm`, `radius.2xl`

---

### 4. MemoryTechniqueCard
- **Role:** Mnemonic memory anchoring and cognitive dual-coding engine
- **Features:** Interactive mental anchor ("Euler'in Asansörü ve Yer Çekimi Logaritması"), animated visual formula cards, and direct AI Coach questioning
- **Tokens Used:** `surface`, `accent.high_indigo`, `feedback.warning`
