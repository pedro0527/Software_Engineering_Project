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
    c.execute("""
        CREATE TABLE IF NOT EXISTS reservations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            table_id INTEGER NOT NULL,
            date TEXT NOT NULL,
            time TEXT NOT NULL,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            card TEXT NOT NULL,
            guests INTEGER NOT NULL
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

@server.route("/api/create-reservation", methods=["POST"])
def create_reservation():
    data = request.get_json()
    table_id = data.get("tableId")
    date = data.get("date")
    time = data.get("time")
    name = data.get("name")
    email = data.get("email")
    phone = data.get("phone")
    card = data.get("card")
    guests = data.get("guests")

    try:
        conn = sqlite3.connect(DB_PATH)
        c = conn.cursor()
        
        c.execute(
            "INSERT INTO reservations (table_id, date, time, name, email, phone, card, guests) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            (table_id, date, time, name, email, phone, card, guests),
        )
        conn.commit()
        conn.close()
        return jsonify({"success": True, "message": "예약이 완료되었습니다!"})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)})

@server.route("/api/my-reservations", methods=["GET"])
def get_my_reservations():
    email = request.args.get("email")
    if not email:
        return jsonify({"success": False, "message": "이메일 정보가 필요합니다."})

    try:
        conn = sqlite3.connect(DB_PATH)
        c = conn.cursor()
        c.execute("""
            SELECT r.* FROM reservations r
            WHERE r.email = ?
            ORDER BY r.date DESC, r.time DESC
        """, (email,))
        reservations = c.fetchall()
        conn.close()

        # 컬럼 이름 매핑
        columns = ["id", "table_id", "date", "time", "name", "email", "phone", "card", "guests"]
        formatted_reservations = []
        for reservation in reservations:
            formatted_reservations.append(dict(zip(columns, reservation)))

        return jsonify({
            "success": True,
            "reservations": formatted_reservations
        })
    except Exception as e:
        return jsonify({"success": False, "message": str(e)})

@server.route("/api/cancel-reservation", methods=["POST"])
def cancel_reservation():
    data = request.get_json()
    reservation_id = data.get("id")
    username = data.get("username")

    try:
        conn = sqlite3.connect(DB_PATH)
        c = conn.cursor()
        
        # 예약이 해당 사용자의 것인지 확인
        c.execute("SELECT email FROM reservations WHERE id = ?", (reservation_id,))
        reservation = c.fetchone()
        
        if not reservation or reservation[0] != username:
            return jsonify({"success": False, "message": "예약을 취소할 수 없습니다."})
        
        # 예약 삭제
        c.execute("DELETE FROM reservations WHERE id = ?", (reservation_id,))
        conn.commit()
        conn.close()
        
        return jsonify({"success": True, "message": "예약이 취소되었습니다."})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)})

@server.route("/api/reserved-tables", methods=["GET"])
def get_reserved_tables():
    date = request.args.get("date")
    time = request.args.get("time")
    
    if not date or not time:
        return jsonify([])

    try:
        conn = sqlite3.connect(DB_PATH)
        c = conn.cursor()
        c.execute("""
            SELECT table_id FROM reservations 
            WHERE date = ? AND time = ?
        """, (date, time))
        reserved_tables = [row[0] for row in c.fetchall()]
        conn.close()
        return jsonify(reserved_tables)
    except Exception as e:
        return jsonify([])

@server.route("/api/reserved-times", methods=["GET"])
def get_reserved_times():
    date = request.args.get("date")
    table_id = request.args.get("table_id")
    
    if not date or not table_id:
        return jsonify([])

    try:
        conn = sqlite3.connect(DB_PATH)
        c = conn.cursor()
        c.execute("""
            SELECT time FROM reservations 
            WHERE date = ? AND table_id = ?
        """, (date, table_id))
        reserved_times = [row[0] for row in c.fetchall()]
        conn.close()
        return jsonify(reserved_times)
    except Exception as e:
        return jsonify([])

@server.route("/api/reserved-dates", methods=["GET"])
def get_reserved_dates():
    table_id = request.args.get("table_id")
    
    if not table_id:
        return jsonify([])

    try:
        conn = sqlite3.connect(DB_PATH)
        c = conn.cursor()
        c.execute("""
            SELECT DISTINCT date FROM reservations 
            WHERE table_id = ?
        """, (table_id,))
        reserved_dates = [row[0] for row in c.fetchall()]
        conn.close()
        return jsonify(reserved_dates)
    except Exception as e:
        return jsonify([])

if __name__ == "__main__":
    server.run(port=5000, debug=True)