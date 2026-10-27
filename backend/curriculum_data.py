"""
Curriculum Database & Knowledge Graph for AçıkMaarif Platform.
100% Open-Source & Copyright-Clean.
Complete coverage from Preschool (Okul Öncesi) through Grade 12 (YKS).
Türkiye Yüzyılı Maarif Modeli (TYMM) Uyumlu.
"""

from typing import List, Dict, Any

CURRICULUM_GRADES = [
    {"id": "okul_oncesi", "name": "Okul Öncesi (3-6 Yaş)", "category": "Temel Eğitim", "level": 0},
    {"id": "sinif_1", "name": "1. Sınıf (İlk Okuma & Sayılar)", "category": "İlkokul", "level": 1},
    {"id": "sinif_2", "name": "2. Sınıf", "category": "İlkokul", "level": 2},
    {"id": "sinif_3", "name": "3. Sınıf", "category": "İlkokul", "level": 3},
    {"id": "sinif_4", "name": "4. Sınıf", "category": "İlkokul", "level": 4},
    {"id": "sinif_5", "name": "5. Sınıf", "category": "Ortaokul", "level": 5},
    {"id": "sinif_6", "name": "6. Sınıf", "category": "Ortaokul", "level": 6},
    {"id": "sinif_7", "name": "7. Sınıf", "category": "Ortaokul", "level": 7},
    {"id": "sinif_8", "name": "8. Sınıf (LGS Hazırlık)", "category": "LGS", "level": 8},
    {"id": "sinif_9", "name": "9. Sınıf (Maarif Modeli)", "category": "Lise", "level": 9},
    {"id": "sinif_10", "name": "10. Sınıf (Maarif Modeli)", "category": "Lise", "level": 10},
    {"id": "sinif_11", "name": "11. Sınıf (Maarif Modeli)", "category": "Lise", "level": 11},
    {"id": "sinif_12", "name": "12. Sınıf & Mezun - YKS (TYT/AYT/YDT)", "category": "YKS", "level": 12},
]

CURRICULUM_TOPICS: List[Dict[str, Any]] = [
    # 0. Sınıf - Okul Öncesi
    {
        "id": "top_0_okul_oncesi",
        "subject": "Görsel Algı & Sayılar",
        "grade_level": 0,
        "curriculum_mode": "maarif_2028",
        "unit": "Erken Çocukluk Becerileri",
        "title": "Geometrik Şekiller, Renkler ve 1'den 10'a Sayı Sayma",
        "sub_outcome_code": "OKUL.0.1.1",
        "skill_layer": "KB1",
        "sources": ["MEB_EBA", "ACIK_KAYNAK"],
        "summary": "Daire, üçgen, kare ve dikdörtgeni tanıma; nesneleri sayarak eşleştirme ve sesli masallarla kavram öğrenimi.",
        "teachers": [
            {"id": "t_0_1", "name": "Gülfem Öğretmen", "mode": "Masallı & Şarkılı", "quote": "Şekilleri oyunlarla keşfediyor, sayılarla şarkılar söylüyoruz!"},
            {"id": "t_0_2", "name": "Ali Öğretmen", "mode": "Görsel & İnteraktif", "quote": "Nesneleri rengine göre ayırarak zihinsel sınıflandırma yapıyoruz."}
        ]
    },

    # 1. Sınıf
    {
        "id": "top_1_okuma_yazma",
        "subject": "Türkçe",
        "grade_level": 1,
        "curriculum_mode": "maarif_2028",
        "unit": "İlk Okuma Yazma",
        "title": "Sesleri Tanıma, Hece Birleştirme ve Akıcı Okuma",
        "sub_outcome_code": "TUR.1.1.1",
        "skill_layer": "KB1",
        "sources": ["MEB_EBA"],
        "summary": "ANETİL ses grubuyla hece ve kelime oluşturma, cümle tamamlama ve temel harf çizgileri.",
        "teachers": [
            {"id": "t_1_1", "name": "Zeynep Öğretmen", "mode": "Adım Adım & Eğlenceli", "quote": "Her ses bir macera! Harfleri birleştirip ilk kelimelerimizi oluşturuyoruz."},
            {"id": "t_1_2", "name": "Hasan Öğretmen", "mode": "Görsel Hafıza", "quote": "Resimli kelime kartlarıyla okumayı hızlandırıyoruz."}
        ]
    },

    # 2. Sınıf
    {
        "id": "top_2_mat_carpim",
        "subject": "Matematik",
        "grade_level": 2,
        "curriculum_mode": "maarif_2028",
        "unit": "Doğal Sayılarla Çarpma",
        "title": "Çarpım Tablosuna Ritmik Sayma ile Giriş",
        "sub_outcome_code": "MAT.2.2.3",
        "skill_layer": "KB1",
        "sources": ["MEB_EBA"],
        "summary": "2'şer, 3'er, 4'er ve 5'er ritmik saymalar ile çarpma işleminin toplamanın kısa yolu olduğunu kavrama.",
        "teachers": [
            {"id": "t_2_1", "name": "Emel Öğretmen", "mode": "Ritmik & Şarkılı", "quote": "Çarpım tablosunu ezberlemeden ritmik saymalarla zihnimize işliyoruz."},
            {"id": "t_2_2", "name": "Murat Öğretmen", "mode": "Pratik Modeller", "quote": "Nesne grupları oluşturarak çarpmayı görselleştiriyoruz."}
        ]
    },

    # 3. Sınıf
    {
        "id": "top_3_fen_kuvvet",
        "subject": "Fen Bilimleri",
        "grade_level": 3,
        "curriculum_mode": "maarif_2028",
        "unit": "Kuvveti Tanıyalım",
        "title": "İtme ve Çekme Kuvveti ve Cisimlerin Hareket Özellikleri",
        "sub_outcome_code": "FEN.3.3.1",
        "skill_layer": "KB2",
        "sources": ["MEB_EBA"],
        "summary": "Hızlanma, yavaşlama, yön değiştirme ve dönme hareketlerinin günlük hayattaki gözlemleri.",
        "teachers": [
            {"id": "t_3_1", "name": "Canan Öğretmen", "mode": "Deneyli & Canlandırmalı", "quote": "Kuvvetin etkilerini evimizdeki eşyalarla test ederek öğreniyoruz."},
            {"id": "t_3_2", "name": "Kemal Hoca", "mode": "Kavramsal", "quote": "Kuvvet ile hareket arasındaki sebep-sonuç ilişkisini keşfediyoruz."}
        ]
    },

    # 4. Sınıf
    {
        "id": "top_4_sosyal_milli",
        "subject": "Sosyal Bilgiler",
        "grade_level": 4,
        "curriculum_mode": "maarif_2028",
        "unit": "Kültür ve Miras",
        "title": "Milli Mücadele Kahramanları ve Kurtuluş Savaşı Tarihi",
        "sub_outcome_code": "SOS.4.2.3",
        "skill_layer": "KB2",
        "sources": ["MEB_EBA"],
        "summary": "Mustafa Kemal Atatürk'ün Samsun'a çıkışı, Doğu, Güney ve Batı cephelerindeki destansı kahramanlarımız.",
        "teachers": [
            {"id": "t_4_1", "name": "Tarihçi İlker", "mode": "Hikayeli & Belgesel", "quote": "Milli Mücadele kahramanlarımızın izinde bir tarih yolculuğuna çıkıyoruz."},
            {"id": "t_4_2", "name": "Sevgi Öğretmen", "mode": "Zaman Çizelgeli", "quote": "Tarihsel kronolojiyi görsel haritalarla kodluyoruz."}
        ]
    },

    # 5. Sınıf
    {
        "id": "top_5_fen_gunes",
        "subject": "Fen Bilimleri",
        "grade_level": 5,
        "curriculum_mode": "maarif_2028",
        "unit": "Güneş, Dünya ve Ay",
        "title": "Güneş'in Yapısı, Dönme ve Dolanma Hareketleri",
        "sub_outcome_code": "FEN.5.1.1",
        "skill_layer": "KB2",
        "sources": ["MEB_EBA", "MEB_OGM_DORTDORTLUK"],
        "summary": "Güneş'in katmanları, Ay'ın evreleri ve Dünya'nın yıllık hareketiyle oluşan mevsimsel değişimler.",
        "teachers": [
            {"id": "t_5_1", "name": "Uzay Bilimci Erdem", "mode": "3D Simülasyonlu", "quote": "Gezegenlerin yörüngelerini 3 boyutlu canlandırmalarla inceliyoruz."},
            {"id": "t_5_2", "name": "Aylin Hoca", "mode": "Soru Çözümlü", "quote": "MEB kazanım testlerinde çıkan yanıltıcı soru kalıplarını eliyoruz."}
        ]
    },

    # 6. Sınıf
    {
        "id": "top_6_mat_asal",
        "subject": "Matematik",
        "grade_level": 6,
        "curriculum_mode": "maarif_2028",
        "unit": "Sayılar ve İşlemler",
        "title": "Asal Sayılar, Çarpanlar ve Bölünebilme Kuralları",
        "sub_outcome_code": "MAT.6.1.2",
        "skill_layer": "KB2",
        "sources": ["MEB_EBA"],
        "summary": "Eratosthenes Kalburu ile asal sayıları bulma; 2, 3, 4, 5, 6, 9 ve 10 ile bölünebilme pratikleri.",
        "teachers": [
            {"id": "t_6_1", "name": "Matematikçi Taner", "mode": "Pratik Taktikler", "quote": "Bölünebilme kurallarını son basamak ve rakamlar toplamı mantığıyla hızla kavrıyoruz."},
            {"id": "t_6_2", "name": "Dilek Hoca", "mode": "Kavramsal", "quote": "Asal sayıların kriptografi ve bilimdeki büyüleyici yerini keşfediyoruz."}
        ]
    },

    # 7. Sınıf
    {
        "id": "top_7_fen_hucre",
        "subject": "Fen Bilimleri",
        "grade_level": 7,
        "curriculum_mode": "maarif_2028",
        "unit": "Hücre ve Bölünmeler",
        "title": "Mitoz ve Mayoz Bölünme Karşılaştırmalı Analizi",
        "sub_outcome_code": "FEN.7.2.1",
        "skill_layer": "KB2",
        "sources": ["MEB_EBA"],
        "summary": "Kromozom sayısı değişimi, krossing-over (parça değişimi) ile genetik çeşitlilik ve hücre döngüsü.",
        "teachers": [
            {"id": "t_7_1", "name": "Biyolog Şebnem", "mode": "Mikroskopik & Görsel", "quote": "Mitoz ve mayozun evrelerini mikroskop görüntüleriyle netleştiriyoruz."},
            {"id": "t_7_2", "name": "Serkan Hoca", "mode": "Karşılaştırma Tablolu", "quote": "İki bölünme türü arasındaki temel 5 farkı zihnimize kazıyoruz."}
        ]
    },

    # 8. Sınıf (LGS)
    {
        "id": "top_8_lgs_mantik",
        "subject": "Matematik (LGS)",
        "grade_level": 8,
        "curriculum_mode": "maarif_2028",
        "unit": "Veri Analizi ve Sayısal Mantık",
        "title": "Yeni Nesil Beceri Temelli PISA Tarzı Grafik ve Mantık Soruları",
        "sub_outcome_code": "LGS.8.4.1",
        "skill_layer": "KB3",
        "sources": ["MEB_OGM_3ADIM", "MEB_EBA", "OSYM_CIKMIS"],
        "summary": "Daire ve sütun grafiklerinin birbirine dönüşümü, bağlam temelli LGS sayısal muhakeme stratejileri.",
        "teachers": [
            {"id": "t_8_1", "name": "Engin Hoca (LGS Koçu)", "mode": "Derece Odaklı / Hızlı", "quote": "Yeni nesil LGS sorularını uzun metinlere takılmadan 1 dakikada çözme sanatı."},
            {"id": "t_8_2", "name": "Sibel Hoca", "mode": "Bilişsel & Görsel", "quote": "Sayısal mantık tablolarını görsel ipuçlarıyla puzzle çözer gibi çözüyoruz."}
        ]
    },

    # 9. Sınıf (Maarif Modeli)
    {
        "id": "top_9_maarif_mat",
        "subject": "Matematik",
        "grade_level": 9,
        "curriculum_mode": "maarif_2028",
        "unit": "Mantık ve Kümeler",
        "title": "Önermeler, Doğruluk Değerleri ve Algoritmik Düşünme",
        "sub_outcome_code": "MAT.9.1.1.2",
        "skill_layer": "KB2",
        "sources": ["MEB_OGM_3ADIM", "MEBI_BIREYSEL"],
        "summary": "Türkiye Yüzyılı Maarif Modeli uyumlu: Mantık ilkelerinin bilgisayar algoritmaları ve koşullu karar mekanizmalarıyla entegrasyonu.",
        "teachers": [
            {"id": "t_9_1", "name": "Prof. Dr. Selim Hoca", "mode": "İspatlı & Bilimsel", "quote": "Mantık ve Boole cebirinin modern bilişimin temeli olduğunu görerek kavrayacağız."},
            {"id": "t_9_2", "name": "Melis Hoca", "mode": "Adım Adım", "quote": "Koşullu önermelerin doğruluk tablolarını sıfırdan kuruyoruz."}
        ]
    },

    # 10. Sınıf (Maarif Modeli)
    {
        "id": "top_10_maarif_fiz",
        "subject": "Fizik",
        "grade_level": 10,
        "curriculum_mode": "maarif_2028",
        "unit": "Elektrik ve Manyetizma",
        "title": "Elektrik Akımı, Dirençlerin Bağlanması ve Ohm Yasası",
        "sub_outcome_code": "FIZ.10.1.2",
        "skill_layer": "KB2",
        "sources": ["MEB_OGM_DORTDORTLUK", "MEBI_BIREYSEL"],
        "summary": "Seri ve paralel bağlı devrelerde eşdeğer direnç, potansiyel fark ve akım paylaşımı deneyleri.",
        "teachers": [
            {"id": "t_10_1", "name": "Kenan Hoca", "mode": "Derece Odaklı / Pratik", "quote": "Harflendirme yöntemi ile karmaşık devreleri tek satırda çözüyoruz."},
            {"id": "t_10_2", "name": "Derya Hoca", "mode": "Laboratuvar & Deney", "quote": "Devre elemanlarının davranışını interaktif ampermetre ve voltmetre ile gözlemliyoruz."}
        ]
    },

    # 11. Sınıf (Maarif Modeli)
    {
        "id": "top_11_maarif_mat_log",
        "subject": "Matematik",
        "grade_level": 11,
        "curriculum_mode": "maarif_2028",
        "unit": "Fonksiyonlarda Uygulamalar",
        "title": "Üstel ve Logaritmik Fonksiyonların Hayat Modelleri",
        "sub_outcome_code": "MAT.11.1.2.1",
        "skill_layer": "KB3",
        "sources": ["MEB_OGM_3ADIM", "MEBI_BIREYSEL", "OSYM_CIKMIS"],
        "summary": "Richter ölçeği, desibel ve radyoaktif yarılanma süreçlerinde logaritmanın üstel büyüme ile ilişkisi.",
        "teachers": [
            {"id": "t_11_1", "name": "Prof. Dr. Selim Hoca", "mode": "İspatlı & Bilimsel", "quote": "Euler logaritması kökenlerine inerek formülleri zihnimize kazıyoruz."},
            {"id": "t_11_2", "name": "Burak Hoca", "mode": "Derece Odaklı / Pratik", "quote": "ÖSYM'nin ters fonksiyon ve taban tuzaklarını 15 saniyede eliyoruz."},
            {"id": "t_11_3", "name": "Ayşe Hoca", "mode": "Bilişsel Hafıza & Hikaye", "quote": "Görsel hafıza kartlarıyla taban ve üssün bağını unutmuyoruz."},
            {"id": "t_11_4", "name": "Mehmet Hoca", "mode": "Başlangıç / Adım Adım", "quote": "Temel üslü sayılardan başlayarak adım adım inşa ediyoruz."}
        ]
    },

    # 12. Sınıf & YKS
    {
        "id": "top_12_yks_turev_turkce",
        "subject": "Matematik & Türkçe",
        "grade_level": 12,
        "curriculum_mode": "maarif_2028",
        "unit": "Türev Uygulamaları & Paragraf Analizi",
        "title": "Maksimum-Minimum Problemleri ve Metinler Arası Sözel Muhakeme",
        "sub_outcome_code": "MAT.12.3.1",
        "skill_layer": "KB3",
        "sources": ["OSYM_CIKMIS", "MEB_OGM_3ADIM", "MEBI_BIREYSEL"],
        "summary": "Türev yardımıyla optimizasyon, maliyet-kar fonksiyonlarının tepe noktası ve felsefi paragraflarda ana düşünce taktikleri.",
        "teachers": [
            {"id": "t_12_1", "name": "Burak Hoca (YKS Başarı Koçu)", "mode": "Derece Odaklı", "quote": "AYT Matematik ve TYT Türkçe'de fulleme stratejilerini uyguluyoruz."},
            {"id": "t_12_2", "name": "Yelda Hoca", "mode": "Bilişsel Analiz", "quote": "Paragrafın röntgenini çekip çeldiricileri hızla eliyoruz."}
        ]
    }
]
