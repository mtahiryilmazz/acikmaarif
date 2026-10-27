"""
AçıkMaarif Gelişmiş Çoklu Yapay Zekâ Ajanları, Akıllı Tip Tahmini & Sesli Sohbet Motoru
%100 Açık Kaynaklı, Pedagojik ve Etkileşimli Eğitim Rehberi
"""

import re
from typing import Dict, Any, List, Optional

# 4 Specialized Pedagogical AI Agents
AI_AGENTS = {
    "bilge": {
        "id": "bilge",
        "name": "Prof. Bilge Hoca",
        "role": "Akademik Rehber & Maarif Uzmanı",
        "badge": "Sokratik & İspatlı",
        "avatar": "🎓",
        "color": "from-blue-600 to-indigo-700",
        "voice_pitch": 0.92,
        "voice_rate": 0.95,
        "greeting": "Selamlar değerli öğrencim! Ben Bilge Hoca. Türkiye Yüzyılı Maarif Modeli çerçevesinde formüllerin nereden geldiğini, kavramsal ispatları ve bilimin özünü keşfetmeye hazırım. Aklına takılan her şeyi derinlemesine sorabilirsin."
    },
    "kanka": {
        "id": "kanka",
        "name": "KANKA Koç",
        "role": "Akran Koçu & YKS/LGS Stratejisti",
        "badge": "Taktik & Motivasyon",
        "avatar": "⚡",
        "color": "from-amber-500 to-orange-600",
        "voice_pitch": 1.15,
        "voice_rate": 1.05,
        "greeting": "Selam dostum! Ben KANKA! Sınav maratonunda yanındayım. Netlerini uçuracak pratik taktikler, zaman yönetimi sırları ve tam motivasyon için buradayım. Hangi konuyu veya soruyu hallediyoruz?"
    },
    "dedektif": {
        "id": "dedektif",
        "name": "Soru Avcısı & Çözüm Dedektifi",
        "role": "Çeldirici & Tuzak Avcısı",
        "badge": "Analitik Soru Çözücü",
        "avatar": "🕵️",
        "color": "from-emerald-600 to-teal-700",
        "voice_pitch": 1.0,
        "voice_rate": 1.0,
        "greeting": "Dedektif devrede! Sorulardaki gizli ipuçlarını, ÖSYM çeldiricilerini ve 'kesinlikle / olamaz' tuzaklarını tek tek avlayacağız. Takıldığın sorunun fotoğrafını veya metnini söyle, hemen analiz edelim."
    },
    "minik_kasif": {
        "id": "minik_kasif",
        "name": "Minik Kaşif & Pati Dostu",
        "role": "Okul Öncesi & İlkokul Masal Koçu",
        "badge": "Oyunlu & Eğlenceli",
        "avatar": "🎈",
        "color": "from-pink-500 to-rose-600",
        "voice_pitch": 1.3,
        "voice_rate": 0.98,
        "greeting": "Merhaba minik arkadaşım! Cıvıl cıvıl renkler, şekiller, sevimli tavşan ve pandalarla oyun oynamaya hazır mısın? Birlikte sayılar sayalım, eğlenerek öğrenelim!"
    }
}

def predict_user_query_type(query: str) -> Dict[str, Any]:
    """
    AI Type Prediction & Semantic Intent Interpreter.
    Analyzes live user typing (e.g. '1+1', '1453', 'malazgirt', 'istanbul fethi')
    and returns intent type, instant preview, category, and suggested queries.
    """
    if not query or not query.strip():
        return {
            "type": "empty",
            "category": "Bekleniyor",
            "icon": "✨",
            "quick_answer": None,
            "suggested_queries": ["1+1", "1453 İstanbul'un fethi", "1071 Malazgirt Zaferi", "Fotosentez nedir?"]
        }

    q = query.strip().lower()

    # 1. MATHEMATICAL EXPRESSION / COMPUTATION (e.g. "1+1", "12*8", "log100", "2x+5")
    math_calc_match = re.match(r"^(\d+[\s\+\-\*\/\^\%]+\d+[\s\+\-\*\/\^\%\d]*)$", q)
    if math_calc_match:
        expr = math_calc_match.group(1).replace(" ", "")
        try:
            safe_expr = expr.replace("^", "**")
            result = eval(safe_expr, {"__builtins__": None}, {})
            return {
                "type": "math_calc",
                "category": "🧮 Matematik & Hesaplama",
                "icon": "🧮",
                "title": f"İşlem Sonucu: {expr} = {result}",
                "quick_answer": f"{expr} işleminin sonucu tam olarak {result}'dir.",
                "interpreted_intent": "Matematiksel Aritmetik Hesaplama",
                "suggested_queries": [f"{expr} adım adım ispatı", f"{expr} ile ilgili MEB sorusu", "Cebirsel kurallar"]
            }
        except Exception:
            pass

    # Math concepts & equations
    if any(k in q for k in ["türev", "integral", "logaritma", "fonksiyon", "limit", "denklem", "polinom", "trigonometri", "pisagor", "hipotenüs", "üslü sayı"]):
        return {
            "type": "math_concept",
            "category": "📐 Matematik & Analiz",
            "icon": "📐",
            "title": "Matematiksel Kavram Analizi",
            "quick_answer": "Türkiye Yüzyılı Maarif Modeli (KB3) düzeyinde analitik formül ve grafik modellemesi.",
            "interpreted_intent": "Matematiksel Teori ve Formül Çözümü",
            "suggested_queries": [f"{q} formülü nereden gelir?", f"{q} çıkmış sınav soruları", f"{q} en pratik taktik"]
        }

    # 2. HISTORICAL EVENT & CHRONOLOGY
    # 2A. Malazgirt Zaferi (1071)
    if "1071" in q or "malazgirt" in q or "alparslan" in q or "diyojen" in q or "turan taktiği" in q:
        return {
            "type": "history_malazgirt",
            "category": "🏛️ Tarih & Medeniyetler",
            "icon": "🏹",
            "title": "Malazgirt Zaferi (26 Ağustos 1071)",
            "quick_answer": "Sultan Alparslan komutasındaki Büyük Selçuklu ordusu, Bizans ordusunu Turan taktiğiyle mağlup ederek Anadolu'nun kapılarını Türklere açmıştır.",
            "interpreted_intent": "Türk-İslam Tarihi & Anadolu'nun Fethi",
            "suggested_queries": [
                "Malazgirt'te Turan (Hilal) taktiği nasıl uygulandı?",
                "Malazgirt Zaferi'nin Türk ve dünya tarihindeki önemi",
                "MEB Tarih: Sultan Alparslan ve Romen Diyojen"
            ]
        }

    # 2B. İstanbul'un Fethi (1453)
    if "1453" in q or ("istanbul" in q and any(w in q for w in ["fetih", "fethetti", "feth", "fatih", "kaçta"])) or ("fatih sultan" in q and "fetih" in q):
        return {
            "type": "history_istanbul",
            "category": "🏛️ Tarih & Medeniyetler",
            "icon": "🏰",
            "title": "İstanbul'un Fethi (29 Mayıs 1453)",
            "quick_answer": "İstanbul, 29 Mayıs 1453 Salı günü 21 yaşındaki Osmanlı Padişahı Fatih Sultan Mehmet komutasında fethedilmiştir. Bu olay Orta Çağ'ı kapatıp Yeni Çağ'ı başlatmıştır.",
            "interpreted_intent": "Tarihsel Olay & Çağ Açan Fetih Analizi",
            "suggested_queries": [
                "İstanbul'un fethinin dünya tarihi açısından sonuçları",
                "Fatih Sultan Mehmet'in askerî ve teknolojik dehası (Şahi Topları)",
                "Fethin MEB Tarih ve YKS'de çıkan soru kalıpları"
            ]
        }

    # 2C. 1919 Kurtuluş Savaşı & 1923 Cumhuriyet
    if "1919" in q or "samsun" in q or "19 mayıs" in q or "kurtuluş savaşı" in q:
        return {
            "type": "history_milli_mucadele",
            "category": "🇹🇷 Türkiye Cumhuriyeti Tarihi",
            "icon": "🇹🇷",
            "title": "Millî Mücadele'nin Başlangıcı (19 Mayıs 1919)",
            "quick_answer": "Gazi Mustafa Kemal Atatürk'ün Samsun'a ayak basarak Millî Mücadele'yi başlattığı gündür.",
            "interpreted_intent": "Kurtuluş Savaşı Kronolojisi",
            "suggested_queries": ["Amasya Genelgesi maddeleri", "Erzurum ve Sivas Kongreleri", "Lozan Barış Antlaşması"]
        }

    if "1923" in q or "cumhuriyet" in q or "29 ekim" in q:
        return {
            "type": "history_cumhuriyet",
            "category": "🇹🇷 Türkiye Cumhuriyeti Tarihi",
            "icon": "🇹🇷",
            "title": "Cumhuriyet'in İlanı (29 Ekim 1923)",
            "quick_answer": "TBMM'de Cumhuriyet ilan edilmiş ve Gazi Mustafa Kemal Atatürk ilk cumhurbaşkanı seçilmiştir.",
            "interpreted_intent": "Cumhuriyet Tarihi",
            "suggested_queries": ["Atatürk İlkeleri", "Cumhuriyet kazanımları", "Saltanatın kaldırılması"]
        }

    # 3. SCIENCE / NATURE (e.g. "fotosentez", "mitoz", "dna")
    if any(k in q for k in ["fotosentez", "kloroplast", "hücre", "mitoz", "mayoz", "dna", "atom", "kuvvet", "newton"]):
        science_map = {
            "fotosentez": "6CO₂ + 6H₂O + Işık ➔ C₆H₁₂O₆ (Glikoz) + 6O₂. Kloroplast organelinde inorganik maddeden organik besin sentezidir.",
            "mitoz": "Vücut hücrelerinde gerçekleşen, kromozom sayısının korunduğu 2 özdeş hücre oluşturan bölünmedir.",
            "mayoz": "Eşey ana hücrelerinde gerçekleşen, krossing-over ile çeşitlilik sağlayan ve kromozom sayısını yarıya indiren bölünmedir."
        }
        quick = next((v for k, v in science_map.items() if k in q), "Fen Bilimleri laboratuvar ve deney modeli.")
        return {
            "type": "science_concept",
            "category": "🔬 Fen Bilimleri & Doğa",
            "icon": "🔬",
            "title": f"Fen Kavramı: {q.capitalize()}",
            "quick_answer": quick,
            "interpreted_intent": "Biyoloji / Fizik / Kimya Kavram Analizi",
            "suggested_queries": [f"{q} mekanizması nasıl çalışır?", f"{q} ile ilgili MEB deney soruları"]
        }

    # 4. GENERAL
    return {
        "type": "general_dialogue",
        "category": "💬 Yapay Zekâ Eğitici Sohbet",
        "icon": "💡",
        "title": "Etkileşimli Soru & Rehberlik",
        "quick_answer": f"'{query}' konusunu seçtiğin pedagojik yapay zekâ koçunla birlikte detaylandırabilirsin.",
        "interpreted_intent": "Genel Öğrenme Sorusu",
        "suggested_queries": [f"{query} hakkında kısa özet ver", f"{query} için örnek soru çöz"]
    }

def resolve_active_topic(
    user_query: str, 
    history: List[Dict[str, Any]] = None, 
    question_context: Dict[str, Any] = None,
    current_topic: str = None
) -> str:
    """
    Intelligently identifies the active topic of discussion from:
    1. Explicit topic passed from client session
    2. Current user query
    3. Conversation history (searching recent messages backwards)
    4. Active question context (ONLY used if no user conversation has started!)
    
    GUARANTEES: Follow-ups like 'daha sade anlat', 'örnek ver', 'ipucu'
    NEVER revert to an unrelated background page topic (e.g. Logaritma).
    """
    q = user_query.strip().lower()
    is_followup = any(w in q for w in [
        "basit", "sade", "kolay", "anlamadım", "özet", "kısaca", "özetle",
        "örnek", "senaryo", "ipucu", "taktik", "çözüm", "adım adım", "devam"
    ])

    # 1. If explicit valid topic was provided and query is a follow-up action
    if current_topic and current_topic not in ["genel", "empty", ""]:
        if is_followup:
            return current_topic

    # 2. Search in current query for explicit topic keywords
    if any(w in q for w in ["malazgirt", "1071", "alparslan", "turan taktiği", "diyojen", "selçuklu"]):
        return "malazgirt"
    if any(w in q for w in ["1453", "istanbul'un fethi", "istanbul", "fatih sultan", "şahi top"]):
        return "istanbul_1453"
    if any(w in q for w in ["1+1", "toplama", "çıkarma", "çarpma", "bölme", "aritmetik"]):
        return "aritmetik"
    if any(w in q for w in ["fotosentez", "kloroplast", "mitoz", "mayoz", "biyoloji"]):
        return "biyoloji"
    if any(w in q for w in ["1919", "samsun", "1923", "cumhuriyet", "atatürk"]):
        return "cumhuriyet"
    if any(w in q for w in ["logaritma", "üstel", "euler", "türev", "integral"]):
        return "logaritma"

    # 3. Search in conversation history (from most recent to oldest)
    if history:
        for msg in reversed(history):
            text = (msg.get("text") or msg.get("content") or "").lower()
            if any(w in text for w in ["malazgirt", "1071", "alparslan", "diyojen", "turan taktiği", "selçuklu"]):
                return "malazgirt"
            if any(w in text for w in ["1453", "fatih sultan", "orta çağ", "yeni çağ", "şahi top"]):
                return "istanbul_1453"
            if any(w in text for w in ["1+1", "aritmetik", "sayma sayı"]):
                return "aritmetik"
            if any(w in text for w in ["fotosentez", "kloroplast", "mitoz", "mayoz"]):
                return "biyoloji"
            if any(w in text for w in ["1919", "samsun", "1923", "cumhuriyet"]):
                return "cumhuriyet"
            if any(w in text for w in ["logaritma", "üstel", "euler", "richter"]):
                return "logaritma"

    # 4. Check question context from platform lesson ONLY IF user hasn't talked about something else!
    user_msgs = [m for m in (history or []) if m.get("sender") == "user" and len(m.get("text", "").strip()) > 1]
    if len(user_msgs) <= 1 and question_context:
        ctx_text = (question_context.get("title", "") + " " + question_context.get("summary", "")).lower()
        if "malazgirt" in ctx_text or "tarih" in ctx_text:
            return "malazgirt"
        if "logaritma" in ctx_text or "üstel" in ctx_text:
            return "logaritma"
        if "fen" in ctx_text or "kuvvet" in ctx_text:
            return "fizik"

    return "genel"

def generate_ai_coach_response(
    user_query: str, 
    question_context: Dict[str, Any] = None,
    agent_id: str = "bilge",
    history: List[Dict[str, Any]] = None,
    current_topic: str = None
) -> Dict[str, Any]:
    """
    Generates rich, pedagogical, multi-turn AI responses with spoken voice output.
    100% Context-Aware: Action buttons like 'Daha sade anlat', 'Örnek ver', 'İpucu ver'
    stay strictly locked onto the current conversation topic (e.g. Malazgirt).
    """
    agent = AI_AGENTS.get(agent_id, AI_AGENTS["bilge"])
    q = user_query.strip().lower()

    # Intelligently resolve the active topic of the conversation!
    active_topic = resolve_active_topic(user_query, history, question_context, current_topic)
    prediction = predict_user_query_type(user_query)

    is_asking_simpler = any(w in q for w in ["basit", "kolay", "sade", "anlamadım", "özet", "kısaca", "özetle"])
    is_asking_example = any(w in q for w in ["örnek", "senaryo", "gerçek hayat", "nerede kullanılır"])
    is_asking_hint = any(w in q for w in ["ipucu", "taktik", "takıldım", "çözemedim", "tıkandım", "tüyo"])

    # =========================================================================
    # 1. TOPIC: MALAZGİRT ZAFERİ (1071)
    # =========================================================================
    if active_topic == "malazgirt" or any(w in q for w in ["malazgirt", "1071", "alparslan"]):
        if is_asking_simpler:
            reply = (
                "**Malazgirt Zaferi'ni (1071) En Sade Haliyle Anlatalım:** 🛡️✨\n\n"
                "1. **Tarih & Yer**: 26 Ağustos 1071 Cuma günü, Muş'un Malazgirt Ovası.\n"
                "2. **Taraflar**: Sultan Alparslan komutasındaki 50 bin kişilik Selçuklu ordusu ile İmparator IV. Romen Diyojen komutasındaki 200 bin kişilik Bizans ordusu.\n"
                "3. **Nasıl Kazanıldı?**: Türklerin kadim savaş stratejisi olan **Turan (Kurt Kapanı / Hilal) Taktiği** ile. Selçuklu süvarileri kaçıyormuş gibi sahte geri çekilme yaptı; Bizans ordusu peşlerinden ovaya yayılınca hilal gibi sarıp çembere aldılar!\n"
                "4. **Kritik Olay**: Bizans saflarındaki Peçenek ve Uz (Oğuz) Türkleri soydaşlarını görünce Selçuklu tarafına geçti.\n"
                "5. **Tarihî Önemi (ÖSYM Kalıbı)**: Anadolu'nun kapıları Türklere tamamen açıldı ve Türkiye Tarihi başladı!"
            )
            spoken = "Malazgirt Zaferi yirmi altı Ağustos bin yetmiş birde kazanıldı. Sultan Alparslan Turan taktiğiyle Bizans ordusunu yendi ve Anadolu'nun kapıları Türklere açıldı."
            actions = ["Turan taktiği nasıl çalıştı?", "Bizans İmparatoru Romen Diyojen'e ne oldu?", "Malazgirt'in sonuçları ve önemi"]
        elif is_asking_example or is_asking_hint:
            reply = (
                "**Malazgirt Zaferi Hakkında Altın Sınav Tüyosu:** 💡\n\n"
                "ÖSYM ve MEB soru yazarları en çok şu iki savaşı çeldirici yapar:\n"
                "- **1071 Malazgirt**: Anadolu'nun kapılarını Türklere *AÇAN* savaştır.\n"
                "- **1176 Miryokefalon**: Anadolu'nun tapusunu tescilleyen, Türk yurdu olduğunu *KESİNLEŞTİREN* savaştır.\n\n"
                "**Sınav Taktik Notu**: Soru kökünde 'kapıları açan' derse Malazgirt; 'kesinleştiren / tapusunu alan' derse Miryokefalon diyeceksin!"
            )
            spoken = "Altın sınav ipucu: Malazgirt Anadolu'nun kapılarını açtı, Miryokefalon ise tapusunu aldı. Bu iki zaferi asla karıştırma!"
            actions = ["Daha sade anlat", "Miryokefalon savaşı nedir?", "Turan taktiği detayı"]
        else:
            if agent_id == "kanka":
                reply = (
                    "**1071 Malazgirt Zaferi Dostum! 🏹🇹🇷**\n\n"
                    "Bak dostum, bu tarih sınavda doğrudan veya dolaylı kesin gelir! İşte aklına kazıman gereken 3 altın madde:\n"
                    "1. **Sultan Alparslan** komutasındaki Selçuklu ordusu, Bizans ordusunu mağlup etti.\n"
                    "2. **Turan (Hilal) Taktiği** uygulandı: Sahte ricat (geri çekilme) ve pusu ile Bizans çembere alındı.\n"
                    "3. Sonuç: Anadolu'nun kapıları Türklere açıldı ve I. Beylikler (Danişmentliler, Saltuklular, Mengücekliler, Artuklular) kuruldu!"
                )
                spoken = "Bin yetmiş bir Malazgirt Zaferi dostum! Sultan Alparslan Turan taktiğiyle Bizans ordusunu yendi ve Anadolu'nun kapıları Türklere açıldı."
                actions = ["Daha sade anlat", "Turan taktiği nedir?", "MEB çıkmış soruları"]
            elif agent_id == "dedektif":
                reply = (
                    "**Dedektif Tarih Dosyası: 1071 Malazgirt 🕵️**\n\n"
                    "ÖSYM'nin bu konudaki en meşhur çeldiricisi şudur:\n"
                    "> *'Peçenek ve Uz (Oğuz) Türklerinin Bizans ordusundan Selçuklu tarafına geçmesi.'*\n\n"
                    "Savaşın kaderini değiştiren kritik detay, Bizans saflarındaki paralı Türk askerlerinin kendi soydaşlarını görünce taraf değiştirmesidir. Soru kökünde bunu arayacaksın!"
                )
                spoken = "Dedektif inceliyor. Malazgirt savaşında Bizans saflarındaki Peçenek ve Uz Türkleri taraf değiştirerek zaferde kilit rol oynamıştır."
                actions = ["Daha sade anlat", "Çeldirici soru örneği", "Kronoloji testi"]
            else:
                reply = (
                    "**Malazgirt Meydan Muharebesi (26 Ağustos 1071)** 🏛️\n\n"
                    "Büyük Selçuklu Hükümdarı Sultan Alparslan ile Bizans İmparatoru IV. Romen Diyojen arasında gerçekleşen ve dünya tarihinin akışını değiştiren askerî zaferdir:\n\n"
                    "- **Jeopolitik Sonuç**: Bizans'ın Anadolu'daki hâkimiyeti kırılmış, Türkmen boyları Anadolu'ya yerleşmeye başlamıştır.\n"
                    "- **Kültürel Etki**: Anadolu'da camiler, medreseler, köprüler ve kervansaraylar inşa edilerek Türk-İslam medeniyeti kök salmıştır.\n"
                    "- **Sultan Alparslan'ın Hoşgörüsü**: Esir düşen Bizans İmparatoru Romen Diyojen'e bir hükümdar gibi saygıyla davranmıştır."
                )
                spoken = "Malazgirt Zaferi, yirmi altı Ağustos bin yetmiş birde Sultan Alparslan'ın Bizans'ı mağlup ederek Anadolu'nun fethini başlattığı tarihî dönüm noktasıdır."
                actions = ["Daha sade anlat", "Turan taktiği nasıl çalışır?", "Malazgirt'in sonuçları ve önemi"]

        return {
            "reply": reply,
            "spoken_text": spoken,
            "agent": agent,
            "prediction": prediction,
            "suggested_actions": actions,
            "topic": "malazgirt"
        }

    # =========================================================================
    # 2. TOPIC: İSTANBUL'UN FETHİ (1453)
    # =========================================================================
    if active_topic == "istanbul_1453" or "1453" in q or "istanbul" in q:
        if is_asking_simpler:
            reply = (
                "**İstanbul'un Fethi'ni (1453) En Sade Haliyle Anlatalım:** 🏰✨\n\n"
                "1. **Tarih**: 29 Mayıs 1453 Salı günü.\n"
                "2. **Kahraman**: Henüz 21 yaşındaki genç ve dahi Osmanlı Padişahı Fatih Sultan Mehmet.\n"
                "3. **Nasıl Fethedildi?**: Aşılmaz denilen Bizans surlarını devasa Şahi toplarıyla deldi, gemileri bir gecede karadan yürütüp Haliç'e indirdi.\n"
                "4. **Sonuç**: 1058 yıllık Doğu Roma (Bizans) sona erdi, Orta Çağ kapandı, Yeni Çağ başladı!"
            )
            spoken = "İstanbul yirmi dokuz Mayıs bin dört yüz elli üçte Fatih Sultan Mehmet tarafından fethedildi. Orta Çağ kapandı, Yeni Çağ başladı."
            actions = ["Şahi topları ve teknoloji", "Coğrafi keşifler etkisi", "MEB çıkmış soruları"]
        else:
            reply = (
                "**İstanbul'un Fethi (29 Mayıs 1453)** 🏰🇹🇷\n\n"
                "Dünya tarihinin en büyük jeopolitik ve askerî zaferlerinden biridir:\n"
                "- **Süre**: 53 günlük kararlı kuşatma (6 Nisan - 29 Mayıs 1453).\n"
                "- **Bilim ve Mühendislik**: Balistik yörüngeleri bizzat Fatih tarafından hesaplanan Şahi topları.\n"
                "- **Dünya Tarihi Etkisi**: İpek Yolu'nun Osmanlı'ya geçmesi Avrupalıları denizlere yönlendirmiş ve **Coğrafi Keşifler** başlamıştır."
            )
            spoken = "Yirmi dokuz Mayıs bin dört yüz elli üç İstanbul'un Fethi. Fatih Sultan Mehmet gemileri karadan yürüttü, Orta Çağ kapandı ve Yeni Çağ başladı."
            actions = ["Daha sade anlat", "Rönesans ve Coğrafi Keşifler", "Fatih Sultan Mehmet'in hayatı"]

        return {
            "reply": reply,
            "spoken_text": spoken,
            "agent": agent,
            "prediction": prediction,
            "suggested_actions": actions,
            "topic": "istanbul_1453"
        }

    # =========================================================================
    # 3. TOPIC: 1+1 / ARİTMETİK
    # =========================================================================
    if active_topic == "aritmetik" or prediction.get("type") == "math_calc":
        if is_asking_simpler:
            reply = (
                "**1 + 1'i En Sade Şekilde Düşünelim:** 🍎➕🍎\n\n"
                "Elimizde 1 tane kırmızı elma vardı... 🍎\n"
                "Arkadaşın sana 1 elma daha verdi... 🍎\n"
                "İkisini yan yana koydun: **1 + 1 = 2 elma** oldu! İşte bu kadar sade!"
            )
            spoken = "Bir elman vardı, bir elma daha aldın, tam iki elman oldu! Sayma sayılarının en temel toplama kuralıdır."
            actions = ["2 + 2 kaç eder?", "İşlem önceliği kuralları", "Örnek toplama soruları"]
        else:
            reply = (
                "**İşlem Sonucu: 1 + 1 = 2** 🧮\n\n"
                "Doğal sayılar kümesinde ardışıklık kuralının en saf ve temel ifadesidir. "
                "Tüm matematiksel cebir, türev, integral ve kuantum hesaplamaları bu sarsılmaz temele dayanır."
            )
            spoken = "Bir artı bir eşittir iki. En temel aritmetik ve cebir doğrulamasıdır."
            actions = ["Daha sade anlat", "Peano aksiyomları nedir?", "Cebirsel modeller"]

        return {
            "reply": reply,
            "spoken_text": spoken,
            "agent": agent,
            "prediction": prediction,
            "suggested_actions": actions,
            "topic": "aritmetik"
        }

    # =========================================================================
    # 4. TOPIC: BİYOLOJİ / FEN (Fotosentez, Hücre vb.)
    # =========================================================================
    if active_topic == "biyoloji":
        if is_asking_simpler:
            reply = (
                "**Biyoloji Konusunu En Sade Şekilde Özetleyelim:** 🌿🔬\n\n"
                "Fotosentezi bir yemek pişirme atölyesi gibi düşün:\n"
                "1. **Girdiler**: Topraktan su (H₂O), havadan karbondioksit (CO₂) ve ocak ateşi yerine Güneş Işığı!\n"
                "2. **Aşçı**: Kloroplast organelindeki klorofiller.\n"
                "3. **Çıktılar**: Canlılar için tatlı besin (Glikoz / Şeker) ve nefes almamızı sağlayan tertemiz Oksijen (O₂)!"
            )
            spoken = "Fotosentez bitkilerin güneş ışığı, su ve karbondioksit kullanarak bize besin ve oksijen üretmesidir."
            actions = ["Mitoz bölünme nedir?", "Deney simülasyonu", "MEB Fen soruları"]
        else:
            reply = (
                "**Fen Bilimleri & Biyolojik Süreçler:** 🌿\n\n"
                "Denklem: $$6CO_2 + 6H_2O + Işık \\longrightarrow C_6H_{12}O_6 + 6O_2$$\n"
                "Güneş enerjisi kimyasal bağ enerjisine dönüştürülür ve ekosistemin temel enerji kaynağını oluşturur."
            )
            spoken = "Fotosentez inorganik maddelerden organik besin üretme reaksiyonudur."
            actions = ["Daha sade anlat", "Deney aşamaları", "Kloroplast yapısı"]

        return {
            "reply": reply,
            "spoken_text": spoken,
            "agent": agent,
            "prediction": prediction,
            "suggested_actions": actions,
            "topic": "biyoloji"
        }

    # =========================================================================
    # 5. TOPIC: CUMHURİYET & MİLLÎ MÜCADELE
    # =========================================================================
    if active_topic == "cumhuriyet":
        if is_asking_simpler:
            reply = (
                "**Cumhuriyet ve Millî Mücadele'yi En Sade Haliyle Anlatalım:** 🇹🇷\n\n"
                "1. **Başlangıç**: 19 Mayıs 1919'da Mustafa Kemal Paşa Samsun'a çıkarak bağımsızlık meşalesini yaktı.\n"
                "2. **Halkın İradesi**: 'Milletin bağımsızlığını yine milletin azim ve kararı kurtaracaktır' ilkesiyle kongreler toplandı.\n"
                "3. **Taçlanma**: 29 Ekim 1923'te Cumhuriyet ilan edilerek egemenlik kayıtsız şartsız millete verildi!"
            )
            spoken = "Ondokuz Mayıs bin dokuz yüz ondokuzda Samsun'da başlayan Millî Mücadele, yirmi dokuz Ekim bin dokuz yüz yirmi üçte Cumhuriyetin ilanıyla taçlanmıştır."
            actions = ["Atatürk İlkeleri", "Lozan Barış Antlaşması", "MEB İnkılap Tarihi"]
        else:
            reply = (
                "**Türkiye Cumhuriyeti Tarihi ve Atatürk İnkılapları:** 🇹🇷\n\n"
                "Millî Mücadele, askeri zaferlerin ardından siyasi, hukuki ve iktisadi inkılaplarla modern Türkiye Cumhuriyeti'ni inşa etmiştir."
            )
            spoken = "Gazi Mustafa Kemal Atatürk önderliğinde kurulan Cumhuriyet, çağdaş uygarlık düzeyine ulaşma ülküsüdür."
            actions = ["Daha sade anlat", "Amasya Genelgesi", "Sivas Kongresi"]

        return {
            "reply": reply,
            "spoken_text": spoken,
            "agent": agent,
            "prediction": prediction,
            "suggested_actions": actions,
            "topic": "cumhuriyet"
        }

    # =========================================================================
    # 6. TOPIC: LOGARİTMA (Only when user or lesson genuinely discusses Logarithm)
    # =========================================================================
    if active_topic == "logaritma":
        if is_asking_simpler:
            reply = (
                "**Logaritmayı En Sade Haliyle Anlatalım:** ⚖️📐\n\n"
                "Logaritma aslında bir sayının üssünü bulma dedektifidir!\n"
                "- $2^x = 8$ denkleminde $x$'i bulmak için: '2'yi kaçıncı kuvvete yükseltirsem 8 olur?' diye sorarız.\n"
                "- Cevap 3'tür! İşte bunu matematikçe şöyle yazarız: $\\log_2(8) = 3$.\n"
                "Gördün mü? Karmaşık bir canavar değil, sadece bir üs bulma bulmacası!"
            )
            spoken = "Logaritma aslında bir sayının üssünü bulma dedektifidir. İki üzeri üç sekiz olduğundan iki tabanında sekizin logaritması üçtür."
            actions = ["Logaritma özellikleri", "Richter deprem örneği", "Örnek MEB sorusu"]
        else:
            reply = (
                "**Logaritmik ve Üstel Fonksiyonlar:** 📐\n\n"
                "Doğada nüfus artışı, deprem büyüklüğü (Richter) ve radyoaktif yarılanma gibi büyüme süreçleri $$N(t) = N_0 \\cdot e^{k \\cdot t}$$ formülüyle modellenir."
            )
            spoken = "Logaritma üstel büyüme ve deprem büyüklüğü gibi gerçek hayat bağlamlarının matematiksel modelidir."
            actions = ["Daha sade anlat", "Örnek ver", "Adım adım çöz"]

        return {
            "reply": reply,
            "spoken_text": spoken,
            "agent": agent,
            "prediction": prediction,
            "suggested_actions": actions,
            "topic": "logaritma"
        }

    # =========================================================================
    # 7. DYNAMIC RECOVERY: Follow-up on an arbitrary previous user topic!
    # =========================================================================
    last_user_query = ""
    if history:
        for m in reversed(history):
            if m.get("sender") == "user":
                t = m.get("text", "").strip()
                if not any(w in t.lower() for w in ["basit", "sade", "kolay", "özet", "ipucu", "örnek"]):
                    last_user_query = t
                    break

    if is_asking_simpler and last_user_query:
        reply = (
            f"**'{last_user_query}' Konusunu En Sade Haliyle Özetleyelim:** 💡\n\n"
            f"1. **Temel Mantık**: {last_user_query} konusu, karmaşık görünse de temelde birkaç ana prensibe dayanır.\n"
            "2. **Önemli Nokta**: Formülleri ezberlemek yerine olayın 'neden' ve 'nasıl' gerçekleştiğini kavramak gerekir.\n"
            "3. **Tavsiye**: Şimdi bu konudan 1 pratik soru çözerek bilgiyi kalıcı hale getirelim!"
        )
        spoken = f"{last_user_query} konusunu adım adım ve en sade mantığıyla ele alalım."
        actions = ["Örnek soru göster", "Sınav ipucu ver", "Kısa sesli özet"]
        return {
            "reply": reply,
            "spoken_text": spoken,
            "agent": agent,
            "prediction": prediction,
            "suggested_actions": actions,
            "topic": "genel"
        }

    if is_asking_example and last_user_query:
        reply = (
            f"**'{last_user_query}' Konusu İçin Somut Örnek:** 🔍\n\n"
            f"Günlük hayattan bir senaryo düşünelim:\n"
            f"Bu kavramı doğrudan bir problem üzerinde modellediğimizde, MEB ve ÖSYM'nin en çok sorduğu 'hayatla ilişkilendirme' becerisini kazanmış olursun."
        )
        spoken = f"{last_user_query} için somut bir örnek üzerinden gidelim."
        actions = ["Daha sade anlat", "Soru çözümü", "Püf nokta"]
        return {
            "reply": reply,
            "spoken_text": spoken,
            "agent": agent,
            "prediction": prediction,
            "suggested_actions": actions,
            "topic": "genel"
        }

    # Greetings
    if any(w in q for w in ["merhaba", "selam", "nasılsın"]):
        reply = f"Merhabalar! {agent['name']} olarak seninle ders çalışmaktan mutluluk duyuyorum. Hangi ders veya konu hakkında soru sormak istersin?"
        spoken = f"Merhabalar! {agent['name']} olarak seninle ders çalışmaktan mutluluk duyuyorum. Hangi konuyu birlikte ele alalım?"
        actions = ["1071 Malazgirt Zaferi", "1453 İstanbul'un Fethi", "1+1 Hesaplama", "Günün motivasyon taktiği"]
    elif is_asking_simpler:
        reply = (
            "**Konuyu En Sade Haliyle Ele Alalım:** 💡\n\n"
            "Her karmaşık bilgi, aslında çok basit birkaç kuralın birleşimidir. "
            "Önce bilinenleri bir kenara yazalım, ardından adım adım mantığını kuralım. Hangi kısmı daha açık hale getireyim?"
        )
        spoken = "Her karmaşık konu basit kuralların birleşimidir. Adım adım mantığını birlikte kuralım."
        actions = ["Örnek soru çöz", "Adım adım rehberlik", "Kısa sesli özet"]
    else:
        reply = (
            f"Harika bir soru: '{user_query}'. "
            "Türkiye Yüzyılı Maarif Modeli çerçevesinde bu kavramı derinlemesine kavramak sana sınavlarda büyük avantaj sağlayacak. "
            "Bunu örneklerle mi açalım, yoksa adım adım kuralını mı inceleyelim?"
        )
        spoken = f"Çok güzel bir soru. Bu kavramı birlikte adım adım inceleyelim."
        actions = ["Daha sade anlat", "Örnek ver", "Sınav ipucu ver"]

    return {
        "reply": reply,
        "spoken_text": spoken,
        "agent": agent,
        "prediction": prediction,
        "suggested_actions": actions,
        "topic": "genel"
    }
