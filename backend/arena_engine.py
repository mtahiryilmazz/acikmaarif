"""
Gamified Quiz Arena Engine (Hybrid of Kahoot, Blooket, Gimkit, and Quizizz).
Provides fast speed scoring, chest mystery rewards, and power-up shop mechanics.
"""

import random
from typing import Dict, Any, List

ARENA_POWERUPS = [
    {
        "id": "freeze_time",
        "name": "Süre Dondurucu (Freeze Time)",
        "cost": 150,
        "description": "Sonraki soruda geri sayım sayacını 10 saniye durdurur.",
        "icon": "Snowflake"
    },
    {
        "id": "fifty_fifty",
        "name": "%50 Joker (50/50)",
        "cost": 100,
        "description": "Yanlış 2 seçeneği otomatik eler.",
        "icon": "Scissors"
    },
    {
        "id": "double_multiplier",
        "name": "Puan Katlayıcı (x2 Multiplier)",
        "cost": 250,
        "description": "Sonraki soruda kazanılacak puan ve altını 2 katına çıkarır.",
        "icon": "Zap"
    },
    {
        "id": "shield",
        "name": "Kalkan Koruması (Shield)",
        "cost": 200,
        "description": "Diğer oyunculardan gelebilecek altın çalma hamlelerini engeller.",
        "icon": "Shield"
    }
]

CHEST_OUTCOMES = [
    {"type": "gold", "amount": 100, "message": "Küçük Hazine! +100 Altın kazandın!"},
    {"type": "gold", "amount": 250, "message": "Büyük Hazine! +250 Altın kazandın!"},
    {"type": "double", "amount": 0, "message": "Çifte Şans! Mevcut altının %50 arttı!"},
    {"type": "swap", "amount": 0, "message": "Liderle Takas! Liderin puan havuzundan altın çektin!"},
    {"type": "shield", "amount": 0, "message": "Gizemli Kalkan! Bir sonraki saldırıdan korundun!"}
]

def calculate_kahoot_score(time_left_sec: float, total_time_sec: float = 20.0, streak: int = 1) -> int:
    """Calculates Kahoot/Quizizz style speed score."""
    base_points = 1000
    speed_factor = max(0.2, time_left_sec / total_time_sec)
    streak_multiplier = min(2.5, 1.0 + (streak * 0.2))
    return int(base_points * speed_factor * streak_multiplier)

def open_blooket_chest() -> Dict[str, Any]:
    """Generates 3 mystery chests and randomly picks an outcome."""
    selected = random.choice(CHEST_OUTCOMES)
    return selected

def get_powerup_shop() -> List[Dict[str, Any]]:
    return ARENA_POWERUPS
