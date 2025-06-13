import * as S from "./Reservation.styled";
import { Table } from "../../../components/Table";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";

export const Reservation = () => {
  const navigate = useNavigate();
  const seatCounts = [4, 2, 6, 4, 2, 4];
  const [username, setUsername] = useState("");
  const [reserved, setReserved] = useState([]);
  const [date] = useState(moment().format("YYYY-MM-DD"));
  const [time] = useState("오전 11시");

  useEffect(() => {
    setUsername(localStorage.getItem("username") || "");
  }, []);

  useEffect(() => {
    const fetchReserved = async () => {
      const res = await fetch(
        `http://127.0.0.1:5000/api/reserved-tables?date=${date}&time=${encodeURIComponent(
          time
        )}`
      );
      const data = await res.json();
      setReserved(data);
    };
    fetchReserved();
  }, [date, time]);

  const clickDetail = (id) => {
    if (reserved.includes(id)) return;
    navigate(`/reservation/${id}`);
  };

  const goMyPage = () => {
    navigate("/my-reservations");
  };

  return (
    <S.Wrapper>
      <S.TopBar>
        {username && (
          <>
            <span>{username} 님</span>
            <button onClick={goMyPage}>마이페이지</button>
          </>
        )}
      </S.TopBar>
      <S.TableContainer>
        {Array.from({ length: 6 }, (_, i) => (
          <Table
            key={i}
            num={i + 1}
            person={seatCounts[i]}
            onClick={() => clickDetail(i + 1)}
            disabled={reserved.includes(i + 1)}
          />
        ))}
      </S.TableContainer>
      <S.Door>
        <span>입구</span>
      </S.Door>
    </S.Wrapper>
  );
};
