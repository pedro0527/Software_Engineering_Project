import * as S from "./ReservationPerson.styled";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import back from "../../assets/icons/back.svg";

export const ReservationPerson = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [card, setCard] = useState("");
  const [phone, setPhone] = useState("");

  const clickBack = () => {
    navigate(-1);
  };

  return (
    <S.Wrapper>
      <S.Back>
        <img src={back} onClick={clickBack} />
      </S.Back>
      <S.SectionTitle>고객 정보</S.SectionTitle>
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
          onChange={(e) => setEmail(e.target.value)}
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
      </S.BtnWrapper>
      <S.ConfirmButton>다음</S.ConfirmButton>
    </S.Wrapper>
  );
};
