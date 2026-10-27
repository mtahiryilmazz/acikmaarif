"""
AçıkMaarif Question Bank Engine (100% Open-Source).
Contains questions across Grade 0 (Okul Öncesi) through Grade 12 (YKS).
State sources: MEB OGM 3 Adım, MEBİ, DÖGM, EBA, ÖSYM Çıkmış Sorular.
"""

from typing import List, Dict, Any

QUESTIONS: List[Dict[str, Any]] = [
    # Okul Öncesi (Grade 0)
    {
        "id": "q_0_sekiller",
        "source_type": "MEB_EBA",
        "source_exam": "MEB Erken Çocukluk Eğitim Seti",
        "grade_level": 0,
        "subject": "Görsel Algı & Sayılar",
        "unit": "Şekiller ve Renkler",
        "topic": "Temel Geometrik Şekiller",
        "sub_outcome_code": "OKUL.0.1.1",
        "skill_layer": "KB1",
        "difficulty_irt": -1.5,
        "discrimination_irt": 0.8,
        "question_text": "Aşağıdaki şekillerden hangisi üç köşeye ve üç kenara sahip olan 'Üçgen'dir?",
        "options": [
            {"key": "A", "text": "Daire (Köşesiz yuvarlak)"},
            {"key": "B", "text": "Üçgen (3 kenarlı)"},
            {"key": "C", "text": "Kare (4 eşit kenarlı)"},
            {"key": "D", "text": "Dikdörtgen (2 uzun 2 kısa kenarlı)"}
        ],
        "correct_option": "B",
        "solution_steps": [
            "1. Adım: Üçgen adı üzerinde 3 tane açı ve 3 tane kenara sahiptir.",
            "2. Adım: Dairenin köşesi yoktur, karenin 4 köşesi vardır.",
            "3. Adım: Doğru cevap B seçeneğidir."
        ],
        "ai_hint": "Trafik uyarı levhalarını veya çatıyı hatırla; 3 köşesi olan şekli seç!",
        "video_solution_url": "https://assets.acikmaarif.org/solutions/0_ucgen.mp4",
        "is_maarif_compliant": True,
        "blooket_gold_reward": 50,
        "speed_bonus_points": 500
    },

    # 1. Sınıf
    {
        "id": "q_1_turkce_hece",
        "source_type": "MEB_EBA",
        "source_exam": "MEB 1. Sınıf Kazanım Değerlendirme",
        "grade_level": 1,
        "subject": "Türkçe",
        "unit": "İlk Okuma Yazma",
        "topic": "Hece ve Kelime Bilgisi",
        "sub_outcome_code": "TUR.1.1.1",
        "skill_layer": "KB1",
        "difficulty_irt": -1.2,
        "discrimination_irt": 0.9,
        "question_text": "'A-TA-TÜRK' kelimesinde kaç tane hece bulunmaktadır?",
        "options": [
            {"key": "A", "text": "2 Hece"},
            {"key": "B", "text": "3 Hece"},
            {"key": "C", "text": "4 Hece"},
            {"key": "D", "text": "5 Hece"}
        ],
        "correct_option": "B",
        "solution_steps": [
            "1. Adım: Bir kelimedeki hece sayısı, o kelimedeki sesli harf sayısına eşittir.",
            "2. Adım: A-TA-TÜRK kelimesinde 'A', 'A' ve 'Ü' olmak üzere 3 ünlü harf vardır.",
            "3. Adım: Kelimemiz 3 hecelidir (A - TA - TÜRK)."
        ],
        "ai_hint": "Kelimeyi söylerken kaç kere çenenin aşağı indiğini veya elini çırptığını say: A - TA - TÜRK!",
        "video_solution_url": "https://assets.acikmaarif.org/solutions/1_hece.mp4",
        "is_maarif_compliant": True,
        "blooket_gold_reward": 60,
        "speed_bonus_points": 600
    },

    # 2. Sınıf
    {
        "id": "q_2_mat_carpim",
        "source_type": "MEB_EBA",
        "source_exam": "MEB 2. Sınıf Matematik Pekiştirme",
        "grade_level": 2,
        "subject": "Matematik",
        "unit": "Çarpma İşlemi",
        "topic": "Ritmik Sayma ve Çarpma",
        "sub_outcome_code": "MAT.2.2.3",
        "skill_layer": "KB1",
        "difficulty_irt": -0.8,
        "discrimination_irt": 1.0,
        "question_text": "Her birinde 4 elma bulunan 5 sepetimiz vardır. Toplam kaç elmamız olur? (4 × 5 = ?)",
        "options": [
            {"key": "A", "text": "16"},
            {"key": "B", "text": "18"},
            {"key": "C", "text": "20"},
            {"key": "D", "text": "24"}
        ],
        "correct_option": "C",
        "solution_steps": [
            "1. Adım: 4'er ritmik sayalım: 4, 8, 12, 16, 20.",
            "2. Adım: 5 defa 4 eklemek 4 × 5 = 20 eder.",
            "3. Adım: Doğru cevap C seçeneğidir."
        ],
        "ai_hint": "4'er 4'er 5 kere ileriye doğru say: 4, 8, 12, 16...!",
        "video_solution_url": "https://assets.acikmaarif.org/solutions/2_carpma.mp4",
        "is_maarif_compliant": True,
        "blooket_gold_reward": 70,
        "speed_bonus_points": 700
    },

    # 3. Sınıf
    {
        "id": "q_3_fen_kuvvet",
        "source_type": "MEB_EBA",
        "source_exam": "MEB 3. Sınıf Fen Bilimleri Testi",
        "grade_level": 3,
        "subject": "Fen Bilimleri",
        "unit": "Kuvveti Tanıyalım",
        "topic": "İtme ve Çekme Hareketleri",
        "sub_outcome_code": "FEN.3.3.1",
        "skill_layer": "KB2",
        "difficulty_irt": -0.5,
        "discrimination_irt": 1.1,
        "question_text": "Aşağıdaki günlük yaşam eylemlerinden hangisinde cisme 'Çekme Kuvveti' uygulanmaktadır?",
        "options": [
            {"key": "A", "text": "Açık olan çekmeceyi kapatmak"},
            {"key": "B", "text": "Yerdeki valizi kulpundan tutup kendimize doğru sürüklemek"},
            {"key": "C", "text": "Futbol topuna ayakla vurmak"},
            {"key": "D", "text": "Masadaki bardağı ileriye doğru itmek"}
        ],
        "correct_option": "B",
        "solution_steps": [
            "1. Adım: Çekmeceyi kapatmak, topa vurmak ve bardağı sürmek nesneyi kendimizden uzaklaştıran 'İtme' hareketleridir.",
            "2. Adım: Valizi kulpundan tutup kendimize doğru çekmek ise 'Çekme' kuvvetidir.",
            "3. Adım: Doğru yanıt B'dir."
        ],
        "ai_hint": "Cismin sana doğru yaklaştığı eylemi ara!",
        "video_solution_url": "https://assets.acikmaarif.org/solutions/3_kuvvet.mp4",
        "is_maarif_compliant": True,
        "blooket_gold_reward": 80,
        "speed_bonus_points": 750
    },

    # 4. Sınıf
    {
        "id": "q_4_sosyal_milli",
        "source_type": "MEB_EBA",
        "source_exam": "MEB 4. Sınıf Sosyal Bilgiler",
        "grade_level": 4,
        "subject": "Sosyal Bilgiler",
        "unit": "Kültür ve Miras",
        "topic": "Milli Mücadele",
        "sub_outcome_code": "SOS.4.2.3",
        "skill_layer": "KB2",
        "difficulty_irt": -0.3,
        "discrimination_irt": 1.2,
        "question_text": "Mustafa Kemal Paşa'nın Milli Mücadele'yi fiilen başlatmak üzere Bandırma Vapuru ile Samsun'a ayak bastığı tarihi gün hangisidir?",
        "options": [
            {"key": "A", "text": "23 Nisan 1920"},
            {"key": "B", "text": "19 Mayıs 1919"},
            {"key": "C", "text": "29 Ekim 1923"},
            {"key": "D", "text": "30 Ağustos 1922"}
        ],
        "correct_option": "B",
        "solution_steps": [
            "1. Adım: Mustafa Kemal Atatürk 19 Mayıs 1919'da Samsun'a çıkarak Kurtuluş Savaşı'nı başlattı.",
            "2. Adım: Bu tarih aynı zamanda Gençlik ve Spor Bayramı olarak kutlanmaktadır.",
            "3. Adım: Doğru cevap B seçeneğidir."
        ],
        "ai_hint": "Gençlik ve Spor Bayramı olarak kutladığımız Mayıs ayındaki tarihi hatırla!",
        "video_solution_url": "https://assets.acikmaarif.org/solutions/4_milli.mp4",
        "is_maarif_compliant": True,
        "blooket_gold_reward": 90,
        "speed_bonus_points": 800
    },

    # 5. Sınıf
    {
        "id": "q_5_fen_ay_evre",
        "source_type": "MEB_OGM_DORTDORTLUK",
        "source_exam": "MEB 5. Sınıf Fen Bilimleri Kazanım Testi",
        "grade_level": 5,
        "subject": "Fen Bilimleri",
        "unit": "Güneş, Dünya ve Ay",
        "topic": "Ay'ın Evreleri",
        "sub_outcome_code": "FEN.5.1.1",
        "skill_layer": "KB2",
        "difficulty_irt": -0.1,
        "discrimination_irt": 1.2,
        "question_text": "Ay'ın Dünya'ya bakan yüzünün tamamen aydınlık ve dairesel bir tepsi gibi parlak göründüğü ana evre hangisidir?",
        "options": [
            {"key": "A", "text": "Yeni Ay"},
            {"key": "B", "text": "İlk Dördün"},
            {"key": "C", "text": "Dolunay"},
            {"key": "D", "text": "Son Dördün"}
        ],
        "correct_option": "C",
        "solution_steps": [
            "1. Adım: Yeni Ay'da Ay görünmez, İlk Dördün'de 'D' harfi gibi yarım aydınlıktır.",
            "2. Adım: Dolunay evresinde Dünya Güneş ile Ay arasındadır ve Ay'ın Dünya'ya bakan yüzü tamamen aydınlanır.",
            "3. Adım: Doğru cevap C'dir."
        ],
        "ai_hint": "Gökyüzünde pırıl pırıl parlayan yuvarlak Ay evresi hangisidir?",
        "video_solution_url": "https://assets.acikmaarif.org/solutions/5_dolunay.mp4",
        "is_maarif_compliant": True,
        "blooket_gold_reward": 100,
        "speed_bonus_points": 850
    },

    # 6. Sınıf
    {
        "id": "q_6_mat_asal",
        "source_type": "MEB_EBA",
        "source_exam": "MEB 6. Sınıf Matematik Tarama Testi",
        "grade_level": 6,
        "subject": "Matematik",
        "unit": "Çarpanlar ve Katlar",
        "topic": "Asal Sayılar",
        "sub_outcome_code": "MAT.6.1.2",
        "skill_layer": "KB2",
        "difficulty_irt": 0.1,
        "discrimination_irt": 1.3,
        "question_text": "Aşağıdaki ifadelerden hangisi asal sayılar için her zaman doğrudur?",
        "options": [
            {"key": "A", "text": "Bütün asal sayılar tektir."},
            {"key": "B", "text": "En küçük asal sayı 1'dir."},
            {"key": "C", "text": "2 sayısı çift olan tek asal sayıdır."},
            {"key": "D", "text": "İki basamaklı en küçük asal sayı 13'tür."}
        ],
        "correct_option": "C",
        "solution_steps": [
            "1. Adım: 1 asal sayı değildir (en küçük asal sayı 2'dir).",
            "2. Adım: 2 çift bir sayıdır ve asal sayıdır; dolayısıyla bütün asal sayılar tek değildir.",
            "3. Adım: 2, çift olan yegane asal sayıdır. C seçeneği doğrudur."
        ],
        "ai_hint": "Çift olduğu halde sadece 1'e ve kendisine bölünen özel sayıyı hatırla: 2!",
        "video_solution_url": "https://assets.acikmaarif.org/solutions/6_asal.mp4",
        "is_maarif_compliant": True,
        "blooket_gold_reward": 110,
        "speed_bonus_points": 900
    },

    # 7. Sınıf
    {
        "id": "q_7_fen_mayoz",
        "source_type": "MEB_EBA",
        "source_exam": "MEB 7. Sınıf Fen Bilimleri",
        "grade_level": 7,
        "subject": "Fen Bilimleri",
        "unit": "Hücre ve Bölünmeler",
        "topic": "Mayoz Bölünme ve Genetik Çeşitlilik",
        "sub_outcome_code": "FEN.7.2.1",
        "skill_layer": "KB2",
        "difficulty_irt": 0.25,
        "discrimination_irt": 1.4,
        "question_text": "Mayoz bölünme sırasında homolog kromozomlar arasında gerçekleşen ve canlılar arasında kalıtsal çeşitliliği (varyasyonu) sağlayan kritik biyolojik olay hangisidir?",
        "options": [
            {"key": "A", "text": "Sentromer bölünmesi"},
            {"key": "B", "text": "Parça Değişimi (Krossing-over)"},
            {"key": "C", "text": "DNA replikasyonunun durması"},
            {"key": "D", "text": "Sitoplazma bölünmesi (Sitokinez)"}
        ],
        "correct_option": "B",
        "solution_steps": [
            "1. Adım: Mayoz I Profaz I evresinde homolog kromozomlar kiyazma noktalarında sarılır (sinapsis).",
            "2. Adım: Gen alışverişi (krossing-over / parça değişimi) gerçekleşerek kardeş olmayan kromatitler genetik materyali çeşitlendirir.",
            "3. Adım: Doğru cevap B seçeneğidir."
        ],
        "ai_hint": "Kromozomların birbirine sarılıp gen takası yaptığı olayı hatırla!",
        "video_solution_url": "https://assets.acikmaarif.org/solutions/7_mayoz.mp4",
        "is_maarif_compliant": True,
        "blooket_gold_reward": 130,
        "speed_bonus_points": 950
    },

    # 8. Sınıf (LGS)
    {
        "id": "q_8_lgs_mantik",
        "source_type": "MEB_OGM_3ADIM",
        "source_exam": "MEB 8. Sınıf LGS Örnek Soru Kitapçığı",
        "grade_level": 8,
        "subject": "Matematik (LGS)",
        "unit": "Kareköklü İfadeler & Grafikler",
        "topic": "Gerçek Yaşam Bağlamlı LGS Mantık",
        "sub_outcome_code": "LGS.8.4.1",
        "skill_layer": "KB3",
        "difficulty_irt": 0.60,
        "discrimination_irt": 1.5,
        "question_text": "Kenar uzunlukları $\\sqrt{72}$ metre ve $\\sqrt{128}$ metre olan dikdörtgen biçimindeki bir okul bahçesi, kare şeklindeki eş parsellere ayrılarak robotik tarım deney alanına dönüştürülecektir. Parsel kenarları metre cinsinden tam sayı olacağına göre, en az kaç parsel elde edilebilir?",
        "question_latex": "\\sqrt{72} = 6\\sqrt{2}, \\quad \\sqrt{128} = 8\\sqrt{2}",
        "options": [
            {"key": "A", "text": "12"},
            {"key": "B", "text": "24"},
            {"key": "C", "text": "48"},
            {"key": "D", "text": "96"}
        ],
        "correct_option": "B",
        "solution_steps": [
            "1. Adım: $\\sqrt{72} = 6\\sqrt{2}$ metre, $\\sqrt{128} = 8\\sqrt{2}$ metre.",
            "2. Adım: Alan = $6\\sqrt{2} \\times 8\\sqrt{2} = 48 \\times 2 = 96\\text{ m}^2$.",
            "3. Adım: Parsellerin kenarı tam sayı olacak: Kenar $a = 2$ metre alınırsa kare alan $4\\text{ m}^2$.",
            "4. Adım: $96 / 4 = 24$ parsel oluşur."
        ],
        "ai_hint": "Önce karekökleri kök dışına çıkar: $\\sqrt{72} = 6\\sqrt{2}$ ve $\\sqrt{128} = 8\\sqrt{2}$, ardından toplam alanı hesapla.",
        "video_solution_url": "https://assets.acikmaarif.org/solutions/lgs_mat_05.mp4",
        "is_maarif_compliant": True,
        "blooket_gold_reward": 180,
        "speed_bonus_points": 1100
    },

    # 9. Sınıf (Maarif Modeli)
    {
        "id": "q_9_maarif_mantik",
        "source_type": "MEB_OGM_3ADIM",
        "source_exam": "MEB OGM 9. Sınıf Maarif Modeli",
        "grade_level": 9,
        "subject": "Matematik",
        "unit": "Mantık ve Kümeler",
        "topic": "Koşullu Önermeler ve Doğruluk Değeri",
        "sub_outcome_code": "MAT.9.1.1.2",
        "skill_layer": "KB2",
        "difficulty_irt": 0.35,
        "discrimination_irt": 1.3,
        "question_text": "$p \\equiv 1$ ve $q \\equiv 0$ olduğuna göre, $[p \\implies (p \\wedge q')]'$ bileşik önermesinin en sade doğruluk değeri nedir?",
        "options": [
            {"key": "A", "text": "0"},
            {"key": "B", "text": "1"},
            {"key": "C", "text": "p"},
            {"key": "D", "text": "q'"},
            {"key": "E", "text": "p'"}
        ],
        "correct_option": "A",
        "solution_steps": [
            "1. Adım: $q \\equiv 0 \\implies q' \\equiv 1$.",
            "2. Adım: $p \\wedge q' \\equiv 1 \\wedge 1 \\equiv 1$.",
            "3. Adım: $p \\implies 1 \\equiv 1 \\implies 1 \\equiv 1$.",
            "4. Adım: Köşeli parantezin değili: $[1]' \\equiv 0$ bulunur. Doğru seçenek A'dır."
        ],
        "ai_hint": "Önce içteki parantezleri adım adım çöz, en son dıştaki tümleyen işaretini uygula!",
        "video_solution_url": "https://assets.acikmaarif.org/solutions/9_mantik.mp4",
        "is_maarif_compliant": True,
        "blooket_gold_reward": 140,
        "speed_bonus_points": 950
    },

    # 10. Sınıf (Maarif Modeli)
    {
        "id": "q_10_maarif_fizik",
        "source_type": "MEB_OGM_DORTDORTLUK",
        "source_exam": "MEB OGM 10. Sınıf Dört Dörtlük Testleri",
        "grade_level": 10,
        "subject": "Fizik",
        "unit": "Elektrik ve Manyetizma",
        "topic": "Ohm Yasası ve Dirençler",
        "sub_outcome_code": "FIZ.10.1.2",
        "skill_layer": "KB2",
        "difficulty_irt": 0.40,
        "discrimination_irt": 1.4,
        "question_text": "Özdeş üç direnç seri bağlandığında eşdeğer direnç $R_1$, paralel bağlandığında $R_2$ olmaktadır. Buna göre $R_1 / R_2$ oranı kaçtır?",
        "options": [
            {"key": "A", "text": "1"},
            {"key": "B", "text": "3"},
            {"key": "C", "text": "6"},
            {"key": "D", "text": "9"},
            {"key": "E", "text": "12"}
        ],
        "correct_option": "D",
        "solution_steps": [
            "1. Adım: Seri bağlı 3 özdeş direnç: $R_1 = R + R + R = 3R$.",
            "2. Adım: Paralel bağlı 3 özdeş direnç: $1/R_2 = 1/R + 1/R + 1/R = 3/R \\implies R_2 = R/3$.",
            "3. Adım: $R_1 / R_2 = (3R) / (R/3) = 9$ bulunur. Doğru seçenek D'dir."
        ],
        "ai_hint": "Seride doğrudan toplanır ($3R$), paralelde ise $R/3$ olur. Oranlarını bul!",
        "video_solution_url": "https://assets.acikmaarif.org/solutions/10_direnc.mp4",
        "is_maarif_compliant": True,
        "blooket_gold_reward": 160,
        "speed_bonus_points": 1000
    },

    # 11. Sınıf (Maarif Modeli)
    {
        "id": "q_11_maarif_logaritma",
        "source_type": "MEB_OGM_3ADIM",
        "source_exam": "OGM 3 Adım TYT/AYT Matematik - 2. Adım",
        "grade_level": 11,
        "subject": "Matematik",
        "unit": "Fonksiyonlar & Logaritma",
        "topic": "Üstel ve Logaritmik Fonksiyonlar",
        "sub_outcome_code": "MAT.11.1.2.1",
        "skill_layer": "KB3",
        "difficulty_irt": 0.45,
        "discrimination_irt": 1.4,
        "question_text": "Bir laboratuvarda çoğalan bakteri türünün $t$ saat sonundaki sayısı $N(t) = N_0 \\cdot e^{0.4t}$ formülüyle modellenmektedir. Başlangıçta 500 bakteri bulunan bu kapta bakteri sayısının 2000'e ulaşması için kaç saat geçmesi gerekir? ($\\ln 2 \\approx 0.69$ alınız)",
        "question_latex": "N(t) = N_0 \\cdot e^{0.4t}, \\quad N_0 = 500, \\quad N(t) = 2000",
        "options": [
            {"key": "A", "text": "2.12"},
            {"key": "B", "text": "3.45"},
            {"key": "C", "text": "4.20"},
            {"key": "D", "text": "5.10"},
            {"key": "E", "text": "6.80"}
        ],
        "correct_option": "B",
        "solution_steps": [
            "1. Adım: $2000 = 500 \\cdot e^{0.4t} \\implies 4 = e^{0.4t}$",
            "2. Adım: Her iki tarafın doğal logaritmasını alalım: $\\ln 4 = 0.4t$",
            "3. Adım: $\\ln(2^2) = 2 \\ln 2 = 2 \\times 0.69 = 1.38$",
            "4. Adım: $0.4t = 1.38 \\implies t = 3.45$ saat bulunur."
        ],
        "ai_hint": "Önce $N_0$ katsayısını sadeleştirip $e^{0.4t} = 4$ eşitliğini yakala, ardından $\\ln$ almayı unutma!",
        "video_solution_url": "https://assets.acikmaarif.org/solutions/11_log.mp4",
        "is_maarif_compliant": True,
        "blooket_gold_reward": 150,
        "speed_bonus_points": 1000
    },

    # 12. Sınıf & YKS
    {
        "id": "q_12_osym_turkce",
        "source_type": "OSYM_CIKMIS",
        "source_exam": "ÖSYM TYT Türkçe Çıkmış Soru Arşivi",
        "grade_level": 12,
        "subject": "Türkçe",
        "unit": "Anlambilim",
        "topic": "Paragrafta Yapı ve Düşünce Akışı",
        "sub_outcome_code": "TUR.12.2.1.1",
        "skill_layer": "KB3",
        "difficulty_irt": 0.50,
        "discrimination_irt": 1.5,
        "question_text": "(I) Yapay zekâ sistemleri insan beyninin nöronal bağlantılarını taklit ederek öğrenir. (II) Ancak beynimiz sadece hesaplama yapan bir biyolojik işlemci değildir. (III) Duygular, sezgiler ve yaşantısal deneyimler bilincin en karmaşık katmanını oluşturur. (IV) Oysa makineler sadece kendilerine verilen matematiksel matrisler üzerinden örüntü yakalar. (V) Günümüz bilgisayar donanımları transistör yoğunluğu açısından insan beynine yaklaşmıştır.\n\nBu parçada numaralanmış cümlelerden hangisi düşüncenin akışını bozmaktadır?",
        "options": [
            {"key": "A", "text": "I"},
            {"key": "B", "text": "II"},
            {"key": "C", "text": "III"},
            {"key": "D", "text": "IV"},
            {"key": "E", "text": "V"}
        ],
        "correct_option": "E",
        "solution_steps": [
            "1. Adım: I, II, III ve IV. cümleler insan bilincinin duygusal-sezgisel yönü ile yapay zekânın farklarını işler.",
            "2. Adım: V. cümle donanımsal transistör sayısından bahsederek anlam akışını saptırmaktadır.",
            "3. Adım: Doğru seçenek E'dir."
        ],
        "ai_hint": "Bilinç ve duygu teması işlenirken, donanımsal transistör sayısına geçen cümleyi yakala.",
        "video_solution_url": "https://assets.acikmaarif.org/solutions/12_turkce.mp4",
        "is_maarif_compliant": True,
        "blooket_gold_reward": 120,
        "speed_bonus_points": 900
    }
]

def get_all_questions() -> List[Dict[str, Any]]:
    return QUESTIONS

def get_questions_by_grade(grade_level: int) -> List[Dict[str, Any]]:
    matched = [q for q in QUESTIONS if q["grade_level"] == grade_level]
    return matched if matched else [q for q in QUESTIONS if q["grade_level"] == 11 or q["grade_level"] == 12]

def get_question_by_id(question_id: str) -> Dict[str, Any]:
    for q in QUESTIONS:
        if q["id"] == question_id:
            return q
    return QUESTIONS[0]
