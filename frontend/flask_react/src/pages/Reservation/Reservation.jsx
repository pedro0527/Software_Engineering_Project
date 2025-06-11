import * as S from "./Reservation.styled";
import { Table } from "../../../components/Table";
import { useNavigate } from "react-router-dom";

export const Reservation = () => {
  const navigate = useNavigate();
  const seatCounts = [4, 2, 6, 4, 2, 4];

  const clickDetail = (id) => {
    navigate(`/reservation/${id}`);
  };

  return (
    <S.Wrapper>
      <S.TableContainer>
        {Array.from({ length: 6 }, (_, i) => (
          <Table
            key={i}
            num={i + 1}
            person={seatCounts[i]}
            onClick={() => clickDetail(i + 1)}
          />
        ))}
      </S.TableContainer>
      <S.Door>
        <span>입구</span>
      </S.Door>
    </S.Wrapper>
  );
};
