import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyReservations() {
  const [email, setEmail] = useState("");
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchReservations = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/api/my-reservations?email=${email}`
      );
      if (!res.ok) throw new Error("서버 오류");
      const data = await res.json();
      setReservations(data);
    } catch {
      setError("예약 내역을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (reservation) => {
    if (!window.confirm("정말 예약을 취소하시겠습니까?")) return;
    const res = await fetch("http://127.0.0.1:5000/api/delete-reservation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        table_id: reservation.table_id,
        date: reservation.date,
        time: reservation.time,
        email: email,
      }),
    });
    const data = await res.json();
    if (data.success) {
      alert("예약이 취소되었습니다.");
      setReservations((prev) =>
        prev.filter(
          (r) =>
            !(
              r.table_id === reservation.table_id &&
              r.date === reservation.date &&
              r.time === reservation.time
            )
        )
      );
    } else {
      alert("취소 실패: " + data.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/");
  };

  const goMain = () => {
    navigate("/reservation");
  };

  return (
    <div style={{ maxWidth: 540, margin: "0 auto", padding: 24 }}>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 16,
        }}
      >
        <button
          onClick={goMain}
          style={{
            background: "#FF6E3F",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "6px 16px",
            cursor: "pointer",
          }}
        >
          메인으로
        </button>
      </div>
      <h2>나의 예약 확인</h2>
      <input
        type="email"
        placeholder="이메일 입력"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: 8, width: "70%", marginRight: 8 }}
      />
      <button onClick={fetchReservations} style={{ padding: 8 }}>
        조회
      </button>
      <button
        onClick={handleLogout}
        style={{
          padding: 8,
          marginLeft: 8,
          background: "#ccc",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        로그아웃
      </button>
      {loading && <div>불러오는 중...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      <ul style={{ marginTop: 24 }}>
        {reservations.length === 0 && !loading && (
          <li>예약 내역이 없습니다.</li>
        )}
        {reservations.map((r, idx) => (
          <li
            key={idx}
            style={{
              marginBottom: 16,
              background: "#eee",
              padding: 12,
              borderRadius: 8,
            }}
          >
            <div>
              예약일: {r.date} {r.time}
            </div>
            <div>테이블 번호: {r.table_id}번</div>
            <div>이름: {r.name}</div>
            <div>전화번호: {r.phone}</div>
            <div>카드번호: {r.card}</div>
            <div>예약일시(등록): {r.created_at}</div>
            <button
              onClick={() => handleCancel(r)}
              style={{
                marginTop: 8,
                background: "#FF6E3F",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                padding: "6px 16px",
                cursor: "pointer",
              }}
            >
              예약 취소
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
