# Implementation Plan: EdTech Maarif & Sentez Platform

## Overview
Comprehensive, 100% free and open-source digital learning ecosystem integrating mnemonic cognitive memory techniques, animated concept anchors, multi-teacher pedagogical perspective modes, error-frequency analysis, and official Turkish educational content (MEB EBA, MEBİ, OGM Materyal, DÖGM, ÖSYM archives) aligned with the Türkiye Yüzyılı Maarif Modeli (TYMM) and 2028 YKS standards.

## Architecture Decisions
1. **Vertical Slicing Execution**: Deliver working, testable functional slices from foundation through complete end-to-end interactive modules.
2. **Modular Microservice / Fullstack Architecture**:
   - Backend ETL & Curriculum Engine (Python / FastAPI / SQLite / JSON Datastore)
   - Intelligent Adaptive Test (CAT) & AI Coach / OCR Solver simulation
   - Rich, modern, interactive web client (Vite / React / Tailwind / Lucide Icons / KaTeX) delivering the complete user experience:
     - Curriculum hierarchy navigation (Grade 0-12, YKS, LGS, KPSS, DGS)
     - Türkiye Yüzyılı Maarif Modeli (KB1, KB2, KB3 skill layers) toggle & context-based questions
     - "Moduna Göre Öğren" (multi-teacher video player with live mode switching)
     - "Reflekslerle Öğrenme & Hafıza Animasyonları" (interactive mnemonic module)
     - Soru Bankası & Çözüm Ekosistemi (MEB OGM 3 Adım, MEBİ, ÖSYM Çıkmış Sorular)
     - Mini Oyunlar & Gamification (XP, Rozet, Lig, Can, Streak, mini oyunlar)
     - Akıllı Hata Defteri & Ebbinghaus Aralıklı Tekrar Modülü
     - Yapay Zeka Koç & Soru Çözücü (Bilge & KANKA AI Chat & Step-by-Step Solver)

## Task List & Checkpoints
See `tasks/todo.md` for task breakdown, acceptance criteria, and status.
