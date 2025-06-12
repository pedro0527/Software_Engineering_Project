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
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "16px 24px 0 0",
        }}
      >
        {username && (
          <>
            <span style={{ marginRight: 12, fontWeight: "bold" }}>
              {username} 님
            </span>
            <button
              onClick={goMyPage}
              style={{
                background: "#FF6E3F",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "6px 16px",
                cursor: "pointer",
              }}
            >
              마이페이지
            </button>
          </>
        )}
      </div>
      <S.Wrapper>
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
    </>
  );
};
