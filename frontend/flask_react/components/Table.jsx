import * as S from "./Table.styled";

export const Table = ({ num, person, onClick }) => {
  return (
    <S.Reactangle onClick={onClick}>
      <S.Text>
        <S.Num>테이블{num}</S.Num>
        <S.Person>좌석수 : {person}</S.Person>
      </S.Text>
    </S.Reactangle>
  );
};
