"""
Official Curriculum & Digital Textbook Database (Resmî Kaynak Veritabanı)
AçıkMaarif Platform - Türkiye Yüzyılı Maarif Modeli ve Millî Eğitim Bakanlığı Resmî Kaynakları
Veri Kaynakları:
- Talim ve Terbiye Kurulu Başkanlığı (TTKB - Müfredat Programları)
- Millî Eğitim Bakanlığı EBA (Eğitim Bilişim Ağı)
- Ortaöğretim Genel Müdürlüğü (OGM Materyal - 3 Adım & Dört Dörtlük)
- Temel Eğitim Genel Müdürlüğü (TEGM - Beceri Temelli Kaynaklar)
- MEBİ Bireysel Öğrenme Platformu
100% Açık Kaynak ve Resmî Devlet Eğitim Veritabanı İndeksleri.
"""

from typing import List, Dict, Any

OFFICIAL_RESOURCES_DATABASE: List[Dict[str, Any]] = [
    # ------------------ OKUL ÖNCESİ ------------------
    {
        "id": "res_okul_oncesi_etkinlik",
        "grade_level": 0,
        "grade_name": "Okul Öncesi (3-6 Yaş)",
        "subject": "Gelişim ve Erken Çocukluk Becerileri",
        "curriculum_version": "Türkiye Yüzyılı Maarif Modeli (2024-2028)",
        "official_publisher": "MEB Temel Eğitim Genel Müdürlüğü (TEGM)",
        "ttkb_approval": "TTKB Karar No: 2024/18 - Tebliğler Dergisi: 2798",
        "source_repository": "EBA & TEGM Resmî Sunucusu",
        "textbook_title": "Okul Öncesi Eğitim Etkinlik Kitabı (3-6 Yaş Maarif Uyumlu)",
        "total_pages": 180,
        "pdf_url": "https://tegmmateryal.eba.gov.tr/okuloncesi/etkinlik_kitabi.pdf",
        "units": [
            {
                "unit_number": 1,
                "unit_title": "Kendimi ve Çevremi Keşfediyorum",
                "topics": ["Duyu Organları", "Temel Renkler", "Daire ve Kare Kavramı"],
                "outcomes": [
                    {"code": "OKUL.0.1.1", "desc": "Nesneleri renk ve geometrik şekil özelliklerine göre gruplandırır.", "skill": "KB1 (Temel Beceri)"},
                    {"code": "OKUL.0.1.2", "desc": "Kendi duygularını ve çevresindeki canlıların ihtiyaçlarını fark eder.", "skill": "Değer: Merhamet & Sorumluluk"}
                ]
            },
            {
                "unit_number": 2,
                "unit_title": "Doğa, Sayılar ve Ritim",
                "topics": ["1'den 10'a Sayma", "Doğadaki Sesler", "Mevsimler ve Bitkiler"],
                "outcomes": [
                    {"code": "OKUL.0.2.1", "desc": "1-10 arası nesneleri sayarak birebir eşleme yapar.", "skill": "KB1"},
                    {"code": "OKUL.0.2.2", "desc": "Doğadaki ritmik sesleri taklit ederek bedensel koordinasyon kurar.", "skill": "Sanat & Ritim"}
                ]
            }
        ]
    },

    # ------------------ 1. SINIF ------------------
    {
        "id": "res_sinif_1_turkce",
        "grade_level": 1,
        "grade_name": "1. Sınıf",
        "subject": "Türkçe (İlk Okuma Yazma)",
        "curriculum_version": "Türkiye Yüzyılı Maarif Modeli",
        "official_publisher": "Devlet Kitapları - MEB Yayınları",
        "ttkb_approval": "TTKB Karar No: 2024/22 - Tebliğler Dergisi: 2801",
        "source_repository": "EBA Ders Kitapları Portalı",
        "textbook_title": "1. Sınıf Türkçe İlk Okuma Yazma Ders Kitabı (1 ve 2. Fasikül)",
        "total_pages": 192,
        "pdf_url": "https://eba.gov.tr/ders-kitaplari/1_sinif_turkce.pdf",
        "units": [
            {
                "unit_number": 1,
                "unit_title": "Çizgi Çalışmaları ve Seslerin Dünyası",
                "topics": ["Hazırlık Çizgileri", "A-N-E-T-İ-L Ses Grubu", "Hece ve Kelime Üretimi"],
                "outcomes": [
                    {"code": "TUR.1.1.1", "desc": "Temel sesleri doğru telaffuz eder ve harf sembolleriyle eşleştirir.", "skill": "KB1 (Okuryazarlık)"},
                    {"code": "TUR.1.1.2", "desc": "Açık ve kapalı heceleri birleştirerek anlamlı sözcükler türetir.", "skill": "KB2 (Bütünleşik)"}
                ]
            },
            {
                "unit_number": 2,
                "unit_title": "Okuyorum, Anlıyorum, Yazıyorum",
                "topics": ["O-K-U-R-I-M Ses Grubu", "Cümle Oluşturma", "Görsel Okuma"],
                "outcomes": [
                    {"code": "TUR.1.2.1", "desc": "Okuduğu kısa metinlerdeki ana unsurları (kim, nerede, ne zaman) söyler.", "skill": "KB2"},
                    {"code": "TUR.1.2.2", "desc": "Kelimeler arasında uygun boşluk bırakarak kuralına uygun yazar.", "skill": "KB1"}
                ]
            }
        ]
    },
    {
        "id": "res_sinif_1_mat",
        "grade_level": 1,
        "grade_name": "1. Sınıf",
        "subject": "Matematik",
        "curriculum_version": "Türkiye Yüzyılı Maarif Modeli",
        "official_publisher": "Devlet Kitapları - MEB Yayınları",
        "ttkb_approval": "TTKB Karar No: 2024/23",
        "source_repository": "EBA Kütüphanesi",
        "textbook_title": "1. Sınıf Matematik Ders Kitabı (Somuttan Soyuta)",
        "total_pages": 164,
        "pdf_url": "https://eba.gov.tr/ders-kitaplari/1_sinif_matematik.pdf",
        "units": [
            {
                "unit_number": 1,
                "unit_title": "Doğal Sayılar (1-20)",
                "topics": ["Nesne Sayma", "Rakamların Yazılışı", "Onluk ve Birlikler"],
                "outcomes": [
                    {"code": "MAT.1.1.1", "desc": "20'ye kadar olan doğal sayıları modellerle gösterir ve yazar.", "skill": "KB1"}
                ]
            },
            {
                "unit_number": 2,
                "unit_title": "Doğal Sayılarla Toplama ve Çıkarma",
                "topics": ["Toplam Anlamı (Ekleme)", "Fark Anlamı (Eksilme)", "Zihinden İşlemler"],
                "outcomes": [
                    {"code": "MAT.1.2.1", "desc": "Toplamları 20'yi geçmeyen iki doğal sayıyı somut modellerle toplar.", "skill": "KB2"}
                ]
            }
        ]
    },

    # ------------------ 2. SINIF ------------------
    {
        "id": "res_sinif_2_mat",
        "grade_level": 2,
        "grade_name": "2. Sınıf",
        "subject": "Matematik",
        "curriculum_version": "MEB Maarif Müfredatı",
        "official_publisher": "MEB Devlet Kitapları",
        "ttkb_approval": "TTKB Karar No: 2023/104",
        "source_repository": "EBA Ders Kitapları",
        "textbook_title": "2. Sınıf Matematik Ders Kitabı",
        "total_pages": 210,
        "pdf_url": "https://eba.gov.tr/ders-kitaplari/2_sinif_matematik.pdf",
        "units": [
            {
                "unit_number": 1,
                "unit_title": "Doğal Sayılar ve Basamak Değeri",
                "topics": ["100'e Kadar Sayılar", "Basamak ve Sayı Değeri", "En Yakın Onluğa Yuvarlama"],
                "outcomes": [
                    {"code": "MAT.2.1.1", "desc": "İki basamaklı doğal sayıların basamak adlarını ve değerlerini belirtir.", "skill": "KB1"}
                ]
            },
            {
                "unit_number": 2,
                "unit_title": "Çarpma ve Bölmeye Hazırlık",
                "topics": ["Ritmik Saymalar (2, 3, 4, 5)", "Çarpım Tablosu Modelleri", "Eşit Paylaştırma"],
                "outcomes": [
                    {"code": "MAT.2.2.3", "desc": "Çarpma işleminin tekrarlı toplama anlamına geldiğini fark eder.", "skill": "KB2"}
                ]
            }
        ]
    },

    # ------------------ 3. SINIF ------------------
    {
        "id": "res_sinif_3_fen",
        "grade_level": 3,
        "grade_name": "3. Sınıf",
        "subject": "Fen Bilimleri",
        "curriculum_version": "MEB Öğretim Programı",
        "official_publisher": "MEB Yayınları",
        "ttkb_approval": "TTKB Karar No: 2023/88",
        "source_repository": "EBA Fen Portalı",
        "textbook_title": "3. Sınıf Fen Bilimleri Ders Kitabı (Deney & Keşif)",
        "total_pages": 178,
        "pdf_url": "https://eba.gov.tr/ders-kitaplari/3_sinif_fen.pdf",
        "units": [
            {
                "unit_number": 1,
                "unit_title": "Gezegenimizi Tanıyalım",
                "topics": ["Dünya'nın Katmanları", "Hava, Su ve Kara Katmanı"],
                "outcomes": [
                    {"code": "FEN.3.1.1", "desc": "Dünya'nın küreye benzer şekilde olduğunu ve katmanlardan oluştuğunu model üzerinde gösterir.", "skill": "KB1"}
                ]
            },
            {
                "unit_number": 2,
                "unit_title": "Kuvveti Tanıyalım ve Hareket",
                "topics": ["İtme ve Çekme Kuvveti", "Hızlanma, Yavaşlama ve Dönme"],
                "outcomes": [
                    {"code": "FEN.3.3.1", "desc": "Hareket eden cisimleri durdurmak veya yönünü değiştirmek için kuvvet gerektiğini deneyle açıklar.", "skill": "KB2"}
                ]
            }
        ]
    },

    # ------------------ 4. SINIF ------------------
    {
        "id": "res_sinif_4_sosyal",
        "grade_level": 4,
        "grade_name": "4. Sınıf",
        "subject": "Sosyal Bilgiler",
        "curriculum_version": "MEB Maarif Müfredatı",
        "official_publisher": "Devlet Kitapları",
        "ttkb_approval": "TTKB Karar No: 2023/112",
        "source_repository": "EBA & TEGM",
        "textbook_title": "4. Sınıf Sosyal Bilgiler Ders Kitabı",
        "total_pages": 196,
        "pdf_url": "https://eba.gov.tr/ders-kitaplari/4_sinif_sosyal.pdf",
        "units": [
            {
                "unit_number": 1,
                "unit_title": "Birey ve Toplum: Herkesin Bir Kimliği Var",
                "topics": ["T.C. Kimlik Kartı", "Farklılıklara Saygı", "Kronolojik Özgeçmiş"],
                "outcomes": [
                    {"code": "SOS.4.1.1", "desc": "Resmî kimlik belgesini inceleyerek kişisel kimliğine ilişkin çıkarımlarda bulunur.", "skill": "KB1"}
                ]
            },
            {
                "unit_number": 2,
                "unit_title": "Kültür ve Miras: Millî Mücadele",
                "topics": ["19 Mayıs 1919 Samsun", "Kongreler ve TBMM'nin Açılışı", "Cepheler ve Kahramanlarımız"],
                "outcomes": [
                    {"code": "SOS.4.2.3", "desc": "Millî Mücadele kahramanlarının hayatlarından hareketle vatanseverlik ve bağımsızlık bilincini açıklar.", "skill": "Değer: Vatanseverlik"}
                ]
            }
        ]
    },

    # ------------------ 5. SINIF ------------------
    {
        "id": "res_sinif_5_maarif_fen",
        "grade_level": 5,
        "grade_name": "5. Sınıf (Maarif Modeli)",
        "subject": "Fen Bilimleri",
        "curriculum_version": "Türkiye Yüzyılı Maarif Modeli (2024)",
        "official_publisher": "MEB Yayınları - TTKB",
        "ttkb_approval": "TTKB Karar No: 2024/29",
        "source_repository": "EBA Maarif Portalı",
        "textbook_title": "5. Sınıf Fen Bilimleri Maarif Modeli Ders Kitabı",
        "total_pages": 224,
        "pdf_url": "https://eba.gov.tr/ders-kitaplari/5_sinif_fen_maarif.pdf",
        "units": [
            {
                "unit_number": 1,
                "unit_title": "Güneş, Dünya ve Ay Sistemi",
                "topics": ["Güneş'in Yapısı ve Dönmesi", "Ay'ın Evreleri", "Güneş ve Ay Tutulmaları"],
                "outcomes": [
                    {"code": "FEN.5.1.1", "desc": "Güneş'in geometrik yapısını, katmanlarını ve dönme hareketini açıklar.", "skill": "KB2"},
                    {"code": "FEN.5.1.2", "desc": "Ay'ın evrelerinin Dünya'dan görünümünü modellerle canlandırır.", "skill": "KB3"}
                ]
            }
        ]
    },

    # ------------------ 8. SINIF (LGS) ------------------
    {
        "id": "res_sinif_8_lgs_matematik",
        "grade_level": 8,
        "grade_name": "8. Sınıf (LGS Hazırlık)",
        "subject": "Matematik (LGS & PISA Tarzı)",
        "curriculum_version": "MEB LGS Sınav Müfredatı & Maarif Modeli",
        "official_publisher": "MEB Ölçme ve Değerlendirme (ÖDSGM) & TEGM",
        "ttkb_approval": "TTKB Karar No: 2024/05",
        "source_repository": "ÖDSGM & OGM Materyal LGS Portalı",
        "textbook_title": "8. Sınıf LGS Matematik Beceri Temelli Resmi Kaynak Kitabı",
        "total_pages": 312,
        "pdf_url": "https://odsgm.meb.gov.tr/kurslar/kazanimtestleri/8_matematik_lgs.pdf",
        "units": [
            {
                "unit_number": 1,
                "unit_title": "Çarpanlar ve Katlar / Üslü İfadeler",
                "topics": ["EBOB - EKOK Problemleri", "Aralarında Asal Sayılar", "Çözümleme ve Bilimsel Gösterim"],
                "outcomes": [
                    {"code": "MAT.8.1.1.1", "desc": "Verilen pozitif tam sayıların çarpanlarını bulur, EBOB ve EKOK problemlerini günlük hayat senaryolarında çözer.", "skill": "KB3 (Üst Düzey Muhakeme)"},
                    {"code": "MAT.8.1.2.2", "desc": "Çok büyük ve çok küçük sayıları bilimsel gösterimle ifade eder ve karşılaştırır.", "skill": "KB2"}
                ]
            },
            {
                "unit_number": 2,
                "unit_title": "Kareköklü İfadeler ve Veri Analizi",
                "topics": ["Tam Kare Sayılar", "Kareköklü İfadelerde Dört İşlem", "Daire ve Sütun Grafiği Dönüşümleri"],
                "outcomes": [
                    {"code": "MAT.8.1.3.1", "desc": "Kareköklü bir ifadeyi a√b şeklinde yazar ve katsayıyı kök içine alır.", "skill": "KB2"},
                    {"code": "MAT.8.4.1.2", "desc": "Verileri grafiklerle gösterir ve iki farklı grafik türünü birbirine dönüştürerek tahminlerde bulunur.", "skill": "KB3"}
                ]
            }
        ]
    },

    # ------------------ 9. SINIF (MAARİF LİSE) ------------------
    {
        "id": "res_sinif_9_maarif_mat",
        "grade_level": 9,
        "grade_name": "9. Sınıf (Maarif Modeli)",
        "subject": "Matematik",
        "curriculum_version": "Türkiye Yüzyılı Maarif Modeli (Kademeli 9. Sınıf)",
        "official_publisher": "MEB Ortaöğretim Genel Müdürlüğü (OGM)",
        "ttkb_approval": "TTKB Karar No: 2024/15 - Tebliğler Dergisi: 2795",
        "source_repository": "OGM Materyal & MEBİ",
        "textbook_title": "9. Sınıf Matematik Maarif Modeli Ders Kitabı (1. ve 2. Dönem)",
        "total_pages": 340,
        "pdf_url": "https://ogmmateryal.eba.gov.tr/panel/upload/etkilesimli/kitap/matematik/9/ders_kitabi.pdf",
        "units": [
            {
                "unit_number": 1,
                "unit_title": "Mantık ve Algoritmik Çıkarımlar",
                "topics": ["Önermeler ve Doğruluk Değerleri", "Bileşik Önermeler (ve, veya, ise, ancak ve ancak)", "Algoritma Akış Şemalarında Koşul Yapısı"],
                "outcomes": [
                    {"code": "MAT.9.1.1.1", "desc": "Önerme kavramını açıklar ve önermelerin doğruluk değerlerini belirler.", "skill": "KB1"},
                    {"code": "MAT.9.1.1.2", "desc": "Koşullu önermelerin karşıtını, tersini ve karşıt tersini algoritmik mantıkla ilişkilendirir.", "skill": "KB2"},
                    {"code": "MAT.9.1.1.3", "desc": "Niceleyicileri (her, bazı) kullanarak açık önermelerin doğruluğunu ispatlar.", "skill": "KB3"}
                ]
            },
            {
                "unit_number": 2,
                "unit_title": "Kümeler ve Gerçek Sayılar",
                "topics": ["Kümelerde Temel İşlemler", "Kartezyen Çarpım", "Aralık Kavramı ve Sayı Doğrusu"],
                "outcomes": [
                    {"code": "MAT.9.2.1.1", "desc": "Kümeler arasındaki birleşim, kesişim, fark ve tümleme işlemlerini Venn şemasıyla modeller.", "skill": "KB2"}
                ]
            }
        ]
    },

    # ------------------ 11. SINIF ------------------
    {
        "id": "res_sinif_11_ogm_matematik",
        "grade_level": 11,
        "grade_name": "11. Sınıf",
        "subject": "Matematik",
        "curriculum_version": "MEB OGM İleri Düzey Müfredat",
        "official_publisher": "MEB Ortaöğretim Genel Müdürlüğü (OGM)",
        "ttkb_approval": "TTKB Karar No: 2023/56",
        "source_repository": "OGM Materyal 3 Adım & Dört Dörtlük",
        "textbook_title": "11. Sınıf Matematik Ders Kitabı & OGM Dört Dörtlük Konu Anlatımı",
        "total_pages": 384,
        "pdf_url": "https://ogmmateryal.eba.gov.tr/panel/upload/etkilesimli/kitap/matematik/11/ders_kitabi.pdf",
        "units": [
            {
                "unit_number": 1,
                "unit_title": "Trigonometri",
                "topics": ["Yönlü Açılar ve Birim Çember", "Trigonometrik Fonksiyonlar", "Sinüs ve Kosinüs Teoremleri", "Trigonometrik Grafikler"],
                "outcomes": [
                    {"code": "MAT.11.1.1.1", "desc": "Açı ölçü birimlerini (derece, radyan) birbirine dönüştürür.", "skill": "KB1"},
                    {"code": "MAT.11.1.2.1", "desc": "Trigonometrik fonksiyonların birim çember üzerindeki işaret ve değer aralıklarını analiz eder.", "skill": "KB2"},
                    {"code": "MAT.11.1.3.1", "desc": "Kosinüs ve Sinüs teoremleriyle üçgen problemlerini çözümler.", "skill": "KB3"}
                ]
            },
            {
                "unit_number": 2,
                "unit_title": "Analitik Geometri",
                "topics": ["Noktanın ve Doğrunun Analitiği", "Eğim ve Doğru Denklemleri", "Noktanın Doğruya Uzaklığı"],
                "outcomes": [
                    {"code": "MAT.11.2.1.1", "desc": "Analitik düzlemde iki nokta arasındaki uzaklığı formüle eder ve uygular.", "skill": "KB2"}
                ]
            }
        ]
    },

    # ------------------ 12. SINIF & YKS (TYT/AYT) ------------------
    {
        "id": "res_sinif_12_ogm_3adim_yks",
        "grade_level": 12,
        "grade_name": "12. Sınıf & YKS (TYT / AYT)",
        "subject": "Matematik (AYT & YKS)",
        "curriculum_version": "MEB OGM 3 Adım & MEBİ YKS Sınav Modeli",
        "official_publisher": "MEB Ortaöğretim Genel Müdürlüğü (OGM) & MEBİ",
        "ttkb_approval": "TTKB ve ÖSYM YKS Güncel Çerçeve Protokolü",
        "source_repository": "OGM Materyal 3 Adım Soru Bankası Portalı",
        "textbook_title": "MEB OGM 3 Adım AYT Matematik ve Formül El Kitabı",
        "total_pages": 448,
        "pdf_url": "https://ogmmateryal.eba.gov.tr/panel/upload/etkilesimli/kitap/matematik/3adim/ayt.pdf",
        "units": [
            {
                "unit_number": 1,
                "unit_title": "Üstel ve Logaritmik Fonksiyonlar",
                "topics": ["Üstel Fonksiyon ve Grafiği", "Logaritma Fonksiyonu ve Özellikleri", "Doğal Logaritma (ln) ve Taban Değiştirme", "Gerçek Hayat Modellemeleri (Deprem, pH, Radyoaktivite)"],
                "outcomes": [
                    {"code": "MAT.12.1.1.1", "desc": "Üstel fonksiyonu açıklar ve f(x)=a^x grafiğinin bire bir ve örtenliğini inceler.", "skill": "KB2"},
                    {"code": "MAT.12.1.2.1", "desc": "Logaritma fonksiyonunun özelliklerini kullanarak denklemleri ve eşitsizlikleri çözer.", "skill": "KB2"},
                    {"code": "MAT.12.1.3.1", "desc": "Üstel ve logaritmik modelleri Richter deprem ölçeği, ses şiddeti ve radyoaktif bozunma problemlerinde uygular.", "skill": "KB3 (Mühendislik & Fen Entegrasyonu)"}
                ]
            },
            {
                "unit_number": 2,
                "unit_title": "Diziler (Aritmetik ve Geometrik Diziler)",
                "topics": ["Dizi Kavramı ve Genel Terim", "Aritmetik Dizi Özellikleri ve Toplamı", "Geometrik Dizi ve Sonsuz Geometrik Seri"],
                "outcomes": [
                    {"code": "MAT.12.2.1.1", "desc": "Aritmetik ve geometrik dizilerin genel terimini bulur, ilk n terim toplamını hesaplar.", "skill": "KB2"}
                ]
            },
            {
                "unit_number": 3,
                "unit_title": "Türev ve Uygulamaları",
                "topics": ["Limit ve Süreklilik", "Türev Alma Kuralları ve Zincir Kuralı", "Geometrik Yorum (Teğetin Eğimi)", "Maksimum ve Minimum Optimizasyon Problemleri"],
                "outcomes": [
                    {"code": "MAT.12.3.1.1", "desc": "Türevin anlık değişim oranı anlamını grafiksel olarak yorumlar.", "skill": "KB3"},
                    {"code": "MAT.12.3.2.1", "desc": "Bir fonksiyonun yerel ekstremum noktalarını belirler ve maksimum-minimum problemlerini modeller.", "skill": "KB3"}
                ]
            },
            {
                "unit_number": 4,
                "unit_title": "İntegral ve Alan Hesabı",
                "topics": ["Belirsiz İntegral ve Değişken Değiştirme", "Belirli İntegral", "Riemann Toplamı ve Eğri Altında Kalan Alan"],
                "outcomes": [
                    {"code": "MAT.12.4.1.1", "desc": "İntegral hesabını diferansiyelin tersi olarak kurar ve eğriler arasındaki net alanı hesaplar.", "skill": "KB3"}
                ]
            }
        ]
    },
    {
        "id": "res_sinif_12_yks_fen_mebi",
        "grade_level": 12,
        "grade_name": "12. Sınıf & YKS",
        "subject": "Fen Bilimleri (Fizik, Kimya, Biyoloji)",
        "curriculum_version": "MEBİ Bireysel Öğrenme Sistemi",
        "official_publisher": "MEB Bilgi İşlem Genel Müdürlüğü & OGM",
        "ttkb_approval": "MEBİ 2024/2025 Resmî Sınav İçerik Paketi",
        "source_repository": "MEBİ Portalı (mebi.eba.gov.tr)",
        "textbook_title": "MEBİ YKS Sayısal Konu Özetleri ve Formül Atlası",
        "total_pages": 320,
        "pdf_url": "https://mebi.eba.gov.tr/content/docs/yks_sayisal_atlas.pdf",
        "units": [
            {
                "unit_number": 1,
                "unit_title": "Modern Fizik ve Atom Teorisi",
                "topics": ["Fotoelektrik Olay", "Compton Saçılması", "De Broglie Dalga Boyu"],
                "outcomes": [
                    {"code": "FIZ.12.5.1", "desc": "Fotoelektrik denklemiyle fotonun enerjisi ve eşik frekansı arasındaki bağıntıyı yorumlar.", "skill": "KB3"}
                ]
            },
            {
                "unit_number": 2,
                "unit_title": "Hücresel Solunum ve Fotosentez",
                "topics": ["Glikoliz ve Krebs Döngüsü", "ETS ve Kemiozmoz", "Işığa Bağımlı ve Bağımsız Reaksiyonlar"],
                "outcomes": [
                    {"code": "BIY.12.2.1", "desc": "Fotosentez ve hücresel solunum reaksiyonlarını enerji ve madde döngüsü açısından karşılaştırır.", "skill": "KB3"}
                ]
            }
        ]
    }
]

def get_official_resources(grade_level: int = None, subject: str = None) -> List[Dict[str, Any]]:
    """Filter official resources by grade level and/or subject."""
    results = OFFICIAL_RESOURCES_DATABASE
    if grade_level is not None:
        results = [r for r in results if r["grade_level"] == grade_level]
    if subject:
        sub_lower = subject.lower()
        results = [r for r in results if sub_lower in r["subject"].lower() or sub_lower in r["textbook_title"].lower()]
    return results

def search_official_curriculum(query: str) -> List[Dict[str, Any]]:
    """Search through units, topics, textbook titles and learning outcomes."""
    q = query.lower().strip()
    if not q:
        return OFFICIAL_RESOURCES_DATABASE
        
    matches = []
    for item in OFFICIAL_RESOURCES_DATABASE:
        score = 0
        if q in item["textbook_title"].lower():
            score += 10
        if q in item["subject"].lower():
            score += 8
        if q in item["official_publisher"].lower():
            score += 5
            
        matching_units = []
        for unit in item.get("units", []):
            unit_matched = False
            if q in unit["unit_title"].lower():
                unit_matched = True
            for topic in unit.get("topics", []):
                if q in topic.lower():
                    unit_matched = True
            for outcome in unit.get("outcomes", []):
                if q in outcome["code"].lower() or q in outcome["desc"].lower():
                    unit_matched = True
            if unit_matched:
                matching_units.append(unit)
                score += 5
                
        if score > 0 or matching_units:
            match_item = dict(item)
            if matching_units:
                match_item["filtered_units"] = matching_units
            matches.append(match_item)
            
    return matches
