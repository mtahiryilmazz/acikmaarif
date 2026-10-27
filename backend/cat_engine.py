"""
Computer Adaptive Testing (CAT) Engine and Ebbinghaus Error Notebook Manager.
Calculates student ability (theta) using 3-Parameter Logistic (3PL) IRT Model.
"""

import math
from datetime import datetime, timedelta
from typing import Dict, Any, List

def probability_correct(theta: float, a: float, b: float, c: float = 0.2) -> float:
    """
    3PL IRT Model: P(theta) = c + (1 - c) / (1 + exp(-1.7 * a * (theta - b)))
    theta: Student ability estimate (-3.0 to +3.0)
    a: Discrimination parameter
    b: Difficulty parameter
    c: Guessing parameter
    """
    try:
        val = 1.7 * a * (theta - b)
        exp_val = math.exp(-val)
        return c + (1.0 - c) / (1.0 + exp_val)
    except OverflowError:
        return 1.0 if (theta > b) else c

def update_student_ability(current_theta: float, is_correct: bool, difficulty_b: float, step: float = 0.3) -> float:
    """Updates student ability theta estimate adaptively."""
    if is_correct:
        new_theta = current_theta + step * max(0.2, (difficulty_b - current_theta + 1.0))
    else:
        new_theta = current_theta - step * max(0.2, (current_theta - difficulty_b + 1.0))
    return round(max(-3.0, min(3.0, new_theta)), 2)

def calculate_next_ebbinghaus_review(attempt_count: int) -> str:
    """
    Ebbinghaus Spaced Repetition intervals:
    1st fail -> Review tomorrow (+1 day)
    2nd fail -> Review in 3 days (+3 days)
    3rd fail -> Review in 1 week (+7 days)
    4th fail -> Review in 1 month (+30 days)
    """
    now = datetime.now()
    if attempt_count == 1:
        next_date = now + timedelta(days=1)
    elif attempt_count == 2:
        next_date = now + timedelta(days=3)
    elif attempt_count == 3:
        next_date = now + timedelta(days=7)
    else:
        next_date = now + timedelta(days=30)
    return next_date.strftime("%d.%m.%Y")
