"""
Standalone Production-Grade Python HTTP Server (Zero-Dependency).
Serves all REST API endpoints for the EdTech Maarif & Sentez Platform.
Compatible with standard library http.server and JSON.
"""

import json
import urllib.parse
import urllib.request
import ssl
from http.server import HTTPServer, BaseHTTPRequestHandler
from curriculum_data import CURRICULUM_GRADES, CURRICULUM_TOPICS
from question_bank import get_all_questions, get_question_by_id
from cat_engine import update_student_ability, calculate_next_ebbinghaus_review
from arena_engine import open_blooket_chest, get_powerup_shop, calculate_kahoot_score
from audio_ebook_data import EBOOKS_DATA, PODCASTS_DATA
from ai_engine import AI_AGENTS, predict_user_query_type, generate_ai_coach_response
from official_curriculum_data import OFFICIAL_RESOURCES_DATABASE, get_official_resources, search_official_curriculum

PORT = 8000

class EdTechRequestHandler(BaseHTTPRequestHandler):
    def _send_cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")

    def do_OPTIONS(self):
        self.send_response(200)
        self._send_cors_headers()
        self.end_headers()

    def _send_json(self, status_code: int, data: Any):
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self._send_cors_headers()
        self.end_headers()
        response_bytes = json.dumps(data, ensure_ascii=False).encode("utf-8")
        self.wfile.write(response_bytes)

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        query_params = urllib.parse.parse_qs(parsed.query)

        if path == "/api/health":
            self._send_json(200, {"status": "ok", "platform": "EdTech Maarif Sentez Platform", "version": "2.0.0"})
        elif path == "/api/curriculum/grades":
            self._send_json(200, {"grades": CURRICULUM_GRADES})
        elif path == "/api/curriculum/topics":
            self._send_json(200, {"topics": CURRICULUM_TOPICS})
        elif path == "/api/curriculum/official-resources":
            grade_param = query_params.get("grade", [None])[0]
            subject_param = query_params.get("subject", [None])[0]
            search_param = query_params.get("q", [None])[0]
            
            if search_param:
                results = search_official_curriculum(search_param)
            else:
                grade_int = int(grade_param) if grade_param is not None and grade_param.isdigit() else None
                results = get_official_resources(grade_level=grade_int, subject=subject_param)
            self._send_json(200, {
                "source": "T.C. Millî Eğitim Bakanlığı & Talim Terbiye Kurulu Resmî Veritabanı",
                "verified": True,
                "total": len(results),
                "resources": results
            })
        elif path == "/api/proxy-pdf":
            target_url = query_params.get("url", [None])[0]
            if not target_url:
                self._send_json(400, {"error": "Missing url parameter"})
                return
            try:
                ctx = ssl.create_default_context()
                ctx.check_hostname = False
                ctx.verify_mode = ssl.CERT_NONE
                
                req = urllib.request.Request(
                    target_url,
                    headers={
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                        "Accept": "application/pdf,application/octet-stream,*/*"
                    }
                )
                with urllib.request.urlopen(req, context=ctx, timeout=15) as remote_resp:
                    content_bytes = remote_resp.read()
                    content_type = "application/pdf"

                    self.send_response(200)
                    self.send_header("Content-Type", content_type)
                    self.send_header("Content-Disposition", "inline")
                    self.send_header("Content-Length", str(len(content_bytes)))
                    self._send_cors_headers()
                    self.end_headers()
                    self.wfile.write(content_bytes)
            except Exception as e:
                self._send_json(502, {"error": f"Failed to fetch remote PDF: {str(e)}", "target_url": target_url})
        elif path == "/api/questions":
            self._send_json(200, {"questions": get_all_questions()})
        elif path == "/api/arena/powerups":
            self._send_json(200, {"powerups": get_powerup_shop()})
        elif path == "/api/arena/chest":
            self._send_json(200, {"chest": open_blooket_chest()})
        elif path == "/api/ebooks":
            self._send_json(200, {"ebooks": EBOOKS_DATA})
        elif path == "/api/podcasts":
            self._send_json(200, {"podcasts": PODCASTS_DATA})
        elif path == "/api/ai/agents":
            self._send_json(200, {"agents": list(AI_AGENTS.values())})
        elif path.startswith("/api/questions/"):
            q_id = path.replace("/api/questions/", "")
            self._send_json(200, {"question": get_question_by_id(q_id)})
        else:
            self._send_json(404, {"error": "Endpoint not found"})

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        content_length = int(self.headers.get("Content-Length", 0))
        post_body = self.rfile.read(content_length)
        body = json.loads(post_body.decode("utf-8")) if post_body else {}

        if path == "/api/exam/cat-evaluate":
            current_theta = float(body.get("current_theta", 0.0))
            is_correct = bool(body.get("is_correct", False))
            difficulty_b = float(body.get("difficulty_b", 0.0))
            new_theta = update_student_ability(current_theta, is_correct, difficulty_b)
            review_date = calculate_next_ebbinghaus_review(int(body.get("attempt_count", 1))) if not is_correct else None
            self._send_json(200, {
                "previous_theta": current_theta,
                "new_theta": new_theta,
                "is_correct": is_correct,
                "scheduled_review_date": review_date
            })
        elif path == "/api/arena/score":
            time_left = float(body.get("time_left_sec", 15.0))
            streak = int(body.get("streak", 1))
            score = calculate_kahoot_score(time_left, streak=streak)
            self._send_json(200, {"points": score, "streak": streak})
        elif path == "/api/ai/predict":
            query = str(body.get("query", ""))
            prediction = predict_user_query_type(query)
            self._send_json(200, prediction)
        elif path == "/api/ai/coach":
            user_msg = str(body.get("message", ""))
            q_ctx = body.get("question_context", None)
            agent_id = str(body.get("agent_id", "bilge"))
            history = body.get("history", [])
            current_topic = body.get("topic", None)
            reply = generate_ai_coach_response(user_msg, q_ctx, agent_id, history, current_topic)
            self._send_json(200, reply)
        else:
            self._send_json(404, {"error": "Endpoint not found"})

def run_server():
    server_address = ("", PORT)
    httpd = HTTPServer(server_address, EdTechRequestHandler)
    print(f"EdTech Platform Backend Server running on http://127.0.0.1:{PORT}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        httpd.server_close()

if __name__ == "__main__":
    run_server()
