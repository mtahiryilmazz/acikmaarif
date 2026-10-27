"""
AçıkMaarif E-Book and Audio Podcast Library.
100% Open-Source & Copyright-Clean.
Covers Primary, Middle, and High School levels from official state educational repositories.
"""

from typing import List, Dict, Any

EBOOKS_DATA: List[Dict[str, Any]] = [
    {
        "id": "ebook_1_ilkokul_okuma",
        "title": "MEB 1. Sınıf İlk Okuma Yazma Etkileşimli Fasikülü",
        "source": "eba.gov.tr",
        "grade_level": 1,
        "subject": "Türkçe",
        "cover_color": "from-amber-600 to-rose-700",
        "total_pages": 96,
        "current_page": 14,
        "toc": [
            {"title": "1. Bölüm: Sesleri Tanıma ve Çizgi Çalışmaları", "page": 6},
            {"title": "2. Bölüm: Hece Birleştirme ve Kelime Havuzu", "page": 14},
            {"title": "3. Bölüm: Resimli Cümle Tamamlama", "page": 40}
        ],
        "pdf_download_url": "https://eba.gov.tr/ders-kitaplari/1_sinif_turkce.pdf"
    },
    {
        "id": "ebook_8_lgs_meb",
        "title": "MEB 8. Sınıf LGS Beceri Temelli Sorular Kitabı",
        "source": "ogmmateryal.eba.gov.tr",
        "grade_level": 8,
        "subject": "Matematik & Fen",
        "cover_color": "from-purple-600 to-indigo-900",
        "total_pages": 280,
        "current_page": 32,
        "toc": [
            {"title": "Çarpanlar ve Katlar / EBOB-EKOK Senaryoları", "page": 12},
            {"title": "Kareköklü İfadeler ve Sayısal Mantık", "page": 32},
            {"title": "Mevsimler ve İklim / DNA ve Genetik Kod", "page": 84}
        ],
        "pdf_download_url": "https://ogmmateryal.eba.gov.tr/lgs/beceri_temelli_8.pdf"
    },
    {
        "id": "ebook_ogm_3adim_mat",
        "title": "MEB OGM 3 Adım TYT & AYT Matematik Soru Bankası",
        "source": "ogmmateryal.eba.gov.tr",
        "grade_level": 11,
        "subject": "Matematik",
        "cover_color": "from-blue-600 to-indigo-900",
        "total_pages": 384,
        "current_page": 42,
        "toc": [
            {"title": "1. Ünite: Sayılar ve Basamak Kavramı", "page": 12},
            {"title": "2. Ünite: Bölme ve Bölünebilme", "page": 28},
            {"title": "3. Ünite: Fonksiyonlar ve Grafik Okuma (Maarif Uyumlu)", "page": 42},
            {"title": "4. Ünite: Üstel ve Logaritmik Modeller", "page": 78}
        ],
        "pdf_download_url": "https://ogmmateryal.eba.gov.tr/panel/upload/etkilesimli/kitap/matematik/3adim/tyt.pdf"
    },
    {
        "id": "ebook_mebi_yks_ozet",
        "title": "MEBİ YKS Bireysel Konu Özeti & Formül El Kitabı",
        "source": "mebi.eba.gov.tr",
        "grade_level": 12,
        "subject": "Fizik & Kimya & Biyoloji",
        "cover_color": "from-emerald-600 to-teal-900",
        "total_pages": 240,
        "current_page": 18,
        "toc": [
            {"title": "Fizik: Dalgalar ve Young Deneyi Özeti", "page": 18},
            {"title": "Kimya: Modern Atom Teorisi ve Hibritleşme", "page": 64},
            {"title": "Biyoloji: Hücresel Solunum ve Fotosentez", "page": 112}
        ],
        "pdf_download_url": "https://mebi.eba.gov.tr/content/docs/yks_fen_ozet.pdf"
    }
]

PODCASTS_DATA: List[Dict[str, Any]] = [
    {
        "id": "pod_mat_logaritma",
        "title": "15 Dakikada Logaritma ve Gerçek Hayatın Matematiği",
        "speaker": "Prof. Dr. Selim Hoca",
        "subject": "Matematik (Lise)",
        "duration": "14:20",
        "duration_sec": 860,
        "waveform_pattern": [20, 45, 60, 30, 80, 95, 40, 70, 85, 30, 65, 90, 50, 40, 85, 95, 60],
        "transcript_preview": "Merhaba arkadaşlar, bugün depremlerin büyüklüğünden sesin desibel değerine kadar doğanın logaritmik dilini konuşuyoruz..."
    },
    {
        "id": "pod_tur_paragraf_taktik",
        "title": "ÖSYM Paragraf Sorularında Çeldiricileri Eleme Sanatı",
        "speaker": "Yelda Hoca (Edebiyat Araştırmacısı)",
        "subject": "Türkçe (TYT & LGS)",
        "duration": "18:45",
        "duration_sec": 1125,
        "waveform_pattern": [30, 55, 75, 40, 85, 90, 65, 80, 70, 45, 90, 85, 60, 55, 70, 95, 40],
        "transcript_preview": "Paragraf çözerken en sık düşülen tuzak, metnin bütünü yerine kendi ön bilgimizle şıklara yaklaşmaktır..."
    },
    {
        "id": "pod_fen_gunes_sistemi",
        "title": "Uzayın Derinlikleri: Güneş, Gezegenler ve Yörüngeler",
        "speaker": "Uzay Bilimci Erdem",
        "subject": "Fen Bilimleri (Ortaokul)",
        "duration": "12:30",
        "duration_sec": 750,
        "waveform_pattern": [15, 35, 70, 80, 65, 90, 75, 60, 40, 75, 95, 80, 65, 50, 75, 85, 70],
        "transcript_preview": "Güneş sistemimizdeki büyüleyici düzen ve kütleçekim kuvvetinin gezegenler üzerindeki etkisi..."
    }
]
