import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import * as S from "./Reservation/ReservationDetail.styled";

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  useEffect(() => {
    if (!email) {
      setError("로그인이 필요합니다.");
      navigate("/");
      return;
    }
    fetchReservations();
  }, [email, navigate]);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://127.0.0.1:5000/api/my-reservations?email=${email}`
      );
      const data = await response.json();
      if (data.success) {
        setReservations(data.reservations);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("예약 내역을 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (reservationId) => {
    if (!window.confirm("정말로 이 예약을 취소하시겠습니까?")) {
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/cancel-reservation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: reservationId,
            email: email,
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        alert(data.message);
        fetchReservations(); // 예약 목록 새로고침
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("예약 취소 중 오류가 발생했습니다.");
    }
  };

  const goMain = () => {
    navigate("/reservation");
  };

  if (loading) {
    return <S.Wrapper>로딩 중...</S.Wrapper>;
  }

  if (error) {
    return <S.Wrapper>{error}</S.Wrapper>;
  }

  return (
    <S.Wrapper style={{ padding: 0 }}>
      {/* 상단 고정 헤더: 높이 고정, 버튼 우측 5% 패딩 */}
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          position: "sticky",
          top: 0,
          background: "#fff",
          zIndex: 10,
          padding: 0,
          minHeight: 60,
          height: 60,
        }}
      >
        <div style={{ flex: 1 }} />
        <S.SectionTitle style={{ margin: 0, textAlign: "center", flex: 1 }}>
          내 예약 내역
        </S.SectionTitle>
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
            paddingRight: "5%",
          }}
        >
          <S.ConfirmButton
            style={{
              width: 80,
              height: 32,
              fontSize: 14,
              padding: 0,
              marginTop: 0,
            }}
            onClick={goMain}
          >
            메인으로
          </S.ConfirmButton>
        </div>
      </div>
      {/* 예약 목록 스크롤 영역: 좌우 5% 패딩, 전체 marginTop 20px */}
      <div
        style={{
          width: "100%",
          flex: 1,
          overflowY: "auto",
          padding: "0 5% 24px 5%",
          marginTop: 20,
        }}
      >
        {reservations.length === 0 ? (
          <div
            style={{
              marginTop: 40,
              color: "#9C9CA1",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            예약 내역이 없습니다.
          </div>
        ) : (
          reservations.map((reservation) => (
            <S.ReservationCard key={reservation.id}>
              <div>테이블 번호: {reservation.table_id}번</div>
              <div>
                예약 날짜: {moment(reservation.date).format("YYYY년 MM월 DD일")}
              </div>
              <div>예약 시간: {reservation.time}</div>
              <div>인원 수: {reservation.guests}명</div>
              <div>이름: {reservation.name}</div>
              <div>이메일: {reservation.email}</div>
              <div>전화번호: {reservation.phone}</div>
              <div>카드번호: {reservation.card}</div>
              <S.ConfirmButton
                style={{ marginTop: 12 }}
                onClick={() => handleCancel(reservation.id)}
              >
                예약 취소
              </S.ConfirmButton>
            </S.ReservationCard>
          ))
        )}
      </div>
    </S.Wrapper>
  );
};

export default MyReservations;
