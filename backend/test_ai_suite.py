import urllib.request
import json

url_coach = 'http://127.0.0.1:8000/api/ai/coach'
url_predict = 'http://127.0.0.1:8000/api/ai/predict'

test_cases = [
    {
        'topic_name': 'Tarih: 1453 İstanbul Fethi',
        'query': '1453 istanbul fethi',
        'follow_up': 'Daha sade anlat',
        'agent': 'bilge'
    },
    {
        'topic_name': 'Matematik: 1+1 Aritmetik',
        'query': '1+1',
        'follow_up': 'Daha sade anlat',
        'agent': 'minik_kasif'
    },
    {
        'topic_name': 'Fen Bilimleri: Fotosentez',
        'query': 'fotosentez nedir',
        'follow_up': 'Daha sade anlat',
        'agent': 'dedektif'
    },
    {
        'topic_name': 'Tarih: Millî Mücadele 1919',
        'query': '19 mayıs 1919 kurtuluş savaşı',
        'follow_up': 'Daha sade anlat',
        'agent': 'kanka'
    },
    {
        'topic_name': 'Matematik: Logaritma (Gerçek Logaritma Sorusu)',
        'query': 'logaritma özellikleri nelerdir',
        'follow_up': 'Daha sade anlat',
        'agent': 'bilge'
    }
]

print('=============================================')
print('AÇIKMAARİF YAPAY ZEKÂ ÇOKLU KONU TEST SUITE')
print('=============================================\n')

for tc in test_cases:
    # 1. Prediction test
    p_req = urllib.request.Request(
        url_predict, 
        data=json.dumps({'query': tc['query']}).encode('utf-8'), 
        headers={'Content-Type': 'application/json'}
    )
    p_res = json.loads(urllib.request.urlopen(p_req).read().decode('utf-8'))
    
    # 2. Coach Turn 1
    c1_req = urllib.request.Request(
        url_coach, 
        data=json.dumps({'message': tc['query'], 'agent_id': tc['agent']}).encode('utf-8'), 
        headers={'Content-Type': 'application/json'}
    )
    c1_res = json.loads(urllib.request.urlopen(c1_req).read().decode('utf-8'))
    
    # 3. Coach Turn 2 (Follow-up)
    hist = [{'sender': 'user', 'text': tc['query']}, {'sender': 'ai', 'text': c1_res.get('reply')}]
    c2_req = urllib.request.Request(
        url_coach, 
        data=json.dumps({
            'message': tc['follow_up'], 
            'history': hist, 
            'topic': c1_res.get('topic'), 
            'agent_id': tc['agent']
        }).encode('utf-8'), 
        headers={'Content-Type': 'application/json'}
    )
    c2_res = json.loads(urllib.request.urlopen(c2_req).read().decode('utf-8'))
    
    print(f"📌 TEST KONUSU: {tc['topic_name']} (Ajan: {tc['agent']})")
    print(f"   ✦ AI Type Prediction: {p_res.get('category')} - {p_res.get('title')}")
    print(f"   ✦ Soru 1: '{tc['query']}' -> Topic: {c1_res.get('topic')}")
    print(f"   ✦ İlk Cevap Başlığı: {c1_res.get('reply').splitlines()[0] if c1_res.get('reply') else ''}")
    print(f"   ✦ Takip Sorusu: '{tc['follow_up']}' -> Topic: {c2_res.get('topic')}")
    print(f"   ✦ Sadeleştirilmiş Cevap:")
    for line in c2_res.get('reply', '').splitlines()[:5]:
        if line.strip():
            print(f"      {line}")
    print(f"   ✦ Önerilen Butonlar: {c2_res.get('suggested_actions')}")
    print('-' * 60 + '\n')
