"""
Core Data Models for AçıkMaarif (OpenMaarif) Platform.
100% Open-Source & Copyright-Clean Architecture.
Compliant with Türkiye Yüzyılı Maarif Modeli (TYMM) and State Educational Sources.
"""

from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field
from enum import Enum

class CurriculumMode(str, Enum):
    MAARIF_2028 = "maarif_2028"      # Türkiye Yüzyılı Maarif Modeli (KB1, KB2, KB3)
    KLASIK_MEZUN = "klasik_mezun"    # Klasik Müfredat (Mezun Grubu)

class SkillLayer(str, Enum):
    KB1 = "KB1"  # Temel Beceriler (Tanıma, hatırlama, doğrudan uygulama)
    KB2 = "KB2"  # Bütünleşik Beceriler (Grafik okuma, çözümleme, yorumlama)
    KB3 = "KB3"  # Üst Düzey Beceriler (Bağlam temelli, gerçek yaşam, PISA/TIMSS)

class SourceType(str, Enum):
    MEB_OGM_3ADIM = "MEB_OGM_3ADIM"
    MEB_OGM_DORTDORTLUK = "MEB_OGM_DORTDORTLUK"
    MEBI_BIREYSEL = "MEBI_BIREYSEL"
    MEB_DOGM_DIN = "MEB_DOGM_DIN"
    OSYM_CIKMIS = "OSYM_CIKMIS"
    ACIK_KAYNAK = "ACIK_KAYNAK"

class QuestionOption(BaseModel):
    key: str  # "A", "B", "C", "D", "E"
    text: str

class Question(BaseModel):
    id: str
    source_type: SourceType
    source_exam: str  # e.g., "MEB OGM 3 Adım", "ÖSYM Çıkmış", "MEB Örnek"
    grade_level: int  # 0 (Okul Öncesi), 1-12
    subject: str      # e.g., "Matematik", "Türkçe", "Fen Bilimleri", "Tarih"
    unit: str
    topic: str
    sub_outcome_code: str
    skill_layer: SkillLayer
    difficulty_irt: float = 0.0
    discrimination_irt: float = 1.0
    question_text: str
    question_latex: Optional[str] = None
    diagram_svg: Optional[str] = None
    options: List[QuestionOption]
    correct_option: str
    solution_video_url: Optional[str] = None
    solution_steps: List[str]
    ai_hint: str
    is_maarif_compliant: bool = True

class TeacherMode(BaseModel):
    id: str
    teacher_name: str
    mode_name: str  # "İspatlı & Bilimsel", "Derece Odaklı / Pratik", "Bilişsel Hafıza & Hikaye", "Başlangıç / Adım Adım"
    avatar_url: str
    quote: str
