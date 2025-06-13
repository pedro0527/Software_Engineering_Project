import * as S from "./ReservationCheck.styled";
import { useSearchParams, useNavigate } from "react-router-dom";
import back from "../../assets/icons/back.svg";
import { useState } from "react";
import moment from "moment";

export const ReservationCheck = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const tableId = searchParams.get("tableId");
  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const name = searchParams.get("name");
  const email = searchParams.get("email");
  const phone = searchParams.get("phone");
  const card = searchParams.get("card");
  const guests = searchParams.get("guests");

  const formattedDate = moment(date).format("YYYY년 MM월 DD일");

  // 예약 시간 표기 보정
  let displayTime = time;
  if (time === "오전 12시") displayTime = "오후 12시";
  else if (time === "오후 12시") displayTime = "오전 12시";

  const clickBack = () => {
    navigate(-1);
  };

  const handleReservation = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "http://127.0.0.1:5000/api/create-reservation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tableId,
            date,
            time,
            name,
            email,
            phone,
            card,
            guests,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert(data.message);
        navigate("/reservation"); // 예약 완료 후 예약 페이지로 이동
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("예약 중 오류가 발생했습니다.");
      console.error("예약 오류:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.Wrapper>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          position: "relative",
          marginBottom: 10,
        }}
      >
        <div style={{ position: "absolute", left: 0 }}>
          <S.Back style={{ marginBottom: 0, width: 40 }}>
            <img src={back} onClick={clickBack} />
          </S.Back>
        </div>
        <div style={{ flex: 1, textAlign: "center" }}>
          <S.Title style={{ margin: 0 }}>예약 확인</S.Title>
        </div>
      </div>
      <S.Container>
        <S.Text>테이블 번호: {tableId}번</S.Text>
        <S.Text>예약 날짜: {formattedDate}</S.Text>
        <S.Text>예약 시간: {displayTime}</S.Text>
        <S.Text>인원 수: {guests}명</S.Text>
        <S.Text>이름: {name}</S.Text>
        <S.Text>전화번호: {phone}</S.Text>
        <S.Text>카드번호: {card}</S.Text>
      </S.Container>
      <S.ConfirmButton onClick={handleReservation} disabled={isLoading}>
        {isLoading ? "처리중..." : "예약하기"}
      </S.ConfirmButton>
    </S.Wrapper>
  );
};
