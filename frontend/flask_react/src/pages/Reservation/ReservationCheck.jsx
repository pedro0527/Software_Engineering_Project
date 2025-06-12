import * as S from "./ReservationCheck.styled";

export const ReservationCheck = () => {
  return (
    <S.Wrapper>
      <S.Title>예약 확인</S.Title>
      <S.Container>
        <S.Text>이름 : </S.Text>
        <S.Text>이메일 : </S.Text>
        <S.Text>전화번호 : </S.Text>
        <S.Text>카드번호 : </S.Text>
      </S.Container>
      <S.ConfirmButton>다음</S.ConfirmButton>
    </S.Wrapper>
  );
};
