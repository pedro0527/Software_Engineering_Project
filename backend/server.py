import sqlite3
from flask import Flask, request, jsonify
from flask_cors import CORS

server = Flask(__name__)
CORS(server)

# DB 파일 경로
DB_PATH = "users.db"

# 서버 시작 시 DB 및 테이블 자동 생성
def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    """)
    conn.commit()
    conn.close()

init_db()

# 로그인
@server.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("SELECT password FROM users WHERE username = ?", (username,))
    row = c.fetchone()
    conn.close()

    if row and row[0] == password:
        return jsonify({"success": True, "message": "로그인 성공!"})
    else:
        return jsonify({"success": False, "message": "아이디 또는 비밀번호 오류"})

# 사용자 생성
@server.route("/api/create-user", methods=["POST"])
def create_user():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    try:
        conn = sqlite3.connect(DB_PATH)
        c = conn.cursor()
        c.execute("INSERT INTO users (username, password) VALUES (?, ?)", (username, password))
        conn.commit()
        conn.close()
        return jsonify({"success": True, "message": "사용자 생성 완료!"})
    except sqlite3.IntegrityError:
        return jsonify({"success": False, "message": "이미 존재하는 사용자입니다."})

# 사용자 삭제
@server.route("/api/delete-user", methods=["POST"])
def delete_user():
    data = request.get_json()
    username = data.get("username")

    conn = sqlite3.connect("users.db")
    c = conn.cursor()
    c.execute("DELETE FROM users WHERE username = ?", (username,))
    conn.commit()
    conn.close()

    return jsonify({"success": True, "message": f"{username} 삭제 완료!"})

if __name__ == "__main__":
    server.run(port=5000, debug=True)