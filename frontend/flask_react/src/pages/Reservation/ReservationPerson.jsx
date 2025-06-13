import * as S from "./ReservationPerson.styled";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import back from "../../assets/icons/back.svg";

export const ReservationPerson = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tableId = searchParams.get("tableId");
  const date = searchParams.get("date");
  const time = searchParams.get("time");

  const [name, setName] = useState("");
  const [card, setCard] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) {
      navigate("/");
    }
  }, [navigate]);

  const clickBack = () => {
    navigate(-1);
  };

  const handleNext = () => {
    if (name && phone && card && guests && email) {
      navigate(
        `/check?tableId=${tableId}&date=${date}&time=${time}&name=${name}&email=${email}&phone=${phone}&card=${card}&guests=${guests}`
      );
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
          marginLeft: 20,
        }}
      >
        <div style={{ position: "absolute", left: 0 }}>
          <S.Back style={{ marginBottom: 0, width: 40 }}>
            <img src={back} onClick={clickBack} />
          </S.Back>
        </div>
        <div style={{ flex: 1, textAlign: "center" }}>
          <S.SectionTitle style={{ margin: 0 }}>고객 정보</S.SectionTitle>
        </div>
      </div>
      <S.BtnWrapper>
        <S.TitleInfo>이름</S.TitleInfo>
        <S.InputBox
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <S.TitleInfo>이메일</S.TitleInfo>
        <S.InputBox
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            localStorage.setItem("email", e.target.value);
          }}
        />
        <S.TitleInfo>전화번호</S.TitleInfo>
        <S.InputBox
          type="text"
          placeholder="전화번호"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <S.TitleInfo>카드번호</S.TitleInfo>
        <S.InputBox
          type="text"
          placeholder="카드번호"
          value={card}
          onChange={(e) => setCard(e.target.value)}
        />
        <S.TitleInfo>인원 수</S.TitleInfo>
        <S.InputBox
          type="text"
          placeholder="인원 수"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
        />
      </S.BtnWrapper>
      <S.ConfirmButton
        disabled={!name || !phone || !card || !guests || !email}
        onClick={handleNext}
      >
        다음
      </S.ConfirmButton>
    </S.Wrapper>
  );
};
