import * as S from "./Table.styled";

export const Table = ({ num, person, onClick, disabled }) => {
  return (
    <S.Reactangle onClick={disabled ? undefined : onClick} $disabled={disabled}>
      <S.Text>
        <S.Num $disabled={disabled}>테이블{num}</S.Num>
        <S.Person $disabled={disabled}>좌석수 : {person}</S.Person>
        {disabled && (
          <div style={{ color: "#9C9CA1", fontSize: 12, marginTop: 4 }}>
            이미 예약됨
          </div>
        )}
      </S.Text>
    </S.Reactangle>
  );
};
