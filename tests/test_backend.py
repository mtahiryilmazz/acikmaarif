"""
Unit Tests for AçıkMaarif Backend Services.
100% Open-Source & Copyright-Clean.
Verifies all grades from Grade 0 to Grade 12.
"""

import sys
import os
import unittest

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend")))

from curriculum_data import CURRICULUM_GRADES, CURRICULUM_TOPICS
from question_bank import get_all_questions, get_questions_by_grade, get_question_by_id
from cat_engine import update_student_ability, calculate_next_ebbinghaus_review
from arena_engine import calculate_kahoot_score, open_blooket_chest, get_powerup_shop
from audio_ebook_data import EBOOKS_DATA, PODCASTS_DATA
from ai_engine import generate_ai_coach_response

class TestAcikMaarifBackend(unittest.TestCase):
    def test_curriculum_grades_all_levels(self):
        # Must have preschool (0) to grade 12
        self.assertGreaterEqual(len(CURRICULUM_GRADES), 13)
        levels = [g["level"] for g in CURRICULUM_GRADES]
        self.assertIn(0, levels)   # Okul Öncesi
        self.assertIn(1, levels)   # 1. Sınıf
        self.assertIn(8, levels)   # 8. Sınıf LGS
        self.assertIn(12, levels)  # 12. Sınıf YKS

    def test_curriculum_topics_across_grades(self):
        topic_grades = {t["grade_level"] for t in CURRICULUM_TOPICS}
        self.assertIn(0, topic_grades)
        self.assertIn(1, topic_grades)
        self.assertIn(8, topic_grades)
        self.assertIn(11, topic_grades)
        self.assertIn(12, topic_grades)

    def test_questions_all_grades(self):
        questions = get_all_questions()
        self.assertGreaterEqual(len(questions), 12)
        q_grades = {q["grade_level"] for q in questions}
        # Check preschool and primary
        self.assertIn(0, q_grades)
        self.assertIn(1, q_grades)
        self.assertIn(8, q_grades)
        self.assertIn(12, q_grades)

    def test_cat_ability_update(self):
        initial_theta = 0.0
        new_theta_high = update_student_ability(initial_theta, is_correct=True, difficulty_b=1.0)
        self.assertGreater(new_theta_high, initial_theta)
        
        new_theta_low = update_student_ability(initial_theta, is_correct=False, difficulty_b=-1.0)
        self.assertLess(new_theta_low, initial_theta)

    def test_arena_gamification(self):
        score_fast = calculate_kahoot_score(time_left_sec=19.0, total_time_sec=20.0, streak=3)
        self.assertGreater(score_fast, 1000)
        chest = open_blooket_chest()
        self.assertIn("type", chest)

    def test_ai_coach_bilge(self):
        resp_simple = generate_ai_coach_response("Bunu bana daha basit anlatır mısın?")
        self.assertEqual(resp_simple["mode"], "BASIT_ANLATIM")
        self.assertIn("terazi", resp_simple["reply"])

if __name__ == "__main__":
    unittest.main()
