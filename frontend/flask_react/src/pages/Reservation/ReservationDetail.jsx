import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as S from "./ReservationDetail.styled";
import back from "../../assets/icons/back.svg";

const CalendarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 55vh;

  .react-calendar {
    width: 100%;
    border-radius: 14.576px;
    border: 1px solid var(--Color-Gray-Gray01, #eaeaea);
    background: #fff;
    padding: 15px;
  }

  .react-calendar__navigation__label > span {
    color: var(--Gray-Black, #333333);
    font-family: SUIT;
    font-weight: 600;
  }

  .react-calendar__navigation {
    pointer-events: none;
  }

  .react-calendar__month-view__weekdays__weekday {
    color: #333333;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .react-calendar__month-view__days__day--weekend {
    color: ${({ theme }) => theme.colors.mainColor};
    font-weight: bold;
    width: 44px;
    height: 44px;
    text-align: center;
  }

  .react-calendar__month-view__weekdays__weekday--weekend abbr {
    color: #5c80ff;
  }

  .react-calendar__month-view__weekdays__weekday--weekend:last-of-type abbr {
    color: #ff6969;
  }

  .react-calendar__tile {
    color: #333333;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    color: #333333;
    font-weight: bold;
    width: 44px;
    height: 44px;
  }

  .react-calendar__tile--now {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    color: #333333;
    font-weight: bold;
    border-radius: 50px;
  }

  .react-calendar__tile--active {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.mainColor};
    color: #ffffff;
    border-radius: 50%;
    font-family: SUIT;
    font-weight: 600;
  }

  .react-calendar__tile--hasActive {
    background: ${({ theme }) => theme.colors.mainColor};
  }

  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: ${({ theme }) => theme.colors.mainColor};
  }

  .react-calendar__navigation__arrow {
    background: none !important;
    border: none;
    cursor: pointer;
    pointer-events: auto;
  }

  .react-calendar__navigation__arrow:hover {
    background: none !important;
  }

  .react-calendar__navigation__arrow:active {
    background: none !important;
  }

  .react-calendar__tile--holiday {
    color: #ff6969;
  }

  .react-calendar__tile--holiday.react-calendar__tile--active {
    color: #fff;
  }

  .react-calendar__tile--reserved {
    /* background-color: ${({ theme }) => theme.colors.gray01}; */
    /* color: #9c9ca1; */
  }

  .dot {
    height: 8px;
    width: 8px;
    background-color: #ff6969;
    border-radius: 50%;
    text-align: center;
    margin-top: 3px;
  }
`;

export const ReservationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeTime, setActiveTime] = useState(null);
  const [isReserved, setIsReserved] = useState(false);
  const [reservedTimes, setReservedTimes] = useState([]);
  const [reservedDates, setReservedDates] = useState([]);
  const [seatCounts] = useState([4, 2, 6, 4, 2, 4]);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  // 예약된 시간 목록 받아오기
  useEffect(() => {
    const fetchReservedTimes = async () => {
      if (!selectedDate) {
        setReservedTimes([]);
        return;
      }
      const res = await fetch(
        `http://127.0.0.1:5000/api/reserved-times?date=${moment(
          selectedDate
        ).format("YYYY-MM-DD")}&table_id=${id}`
      );
      const data = await res.json();
      setReservedTimes(data);
    };
    fetchReservedTimes();
  }, [selectedDate, id]);

  // 예약된 날짜 목록 받아오기
  useEffect(() => {
    const fetchReservedDates = async () => {
      const res = await fetch(
        `http://127.0.0.1:5000/api/reserved-dates?table_id=${id}`
      );
      const data = await res.json();
      setReservedDates(data);
    };
    fetchReservedDates();
  }, [id]);

  useEffect(() => {
    // 날짜/시간/테이블이 바뀔 때마다 예약 여부 확인
    const checkReserved = async () => {
      if (!selectedDate || !activeTime) {
        setIsReserved(false);
        return;
      }
      const res = await fetch(
        `http://127.0.0.1:5000/api/reserved-tables?date=${moment(
          selectedDate
        ).format("YYYY-MM-DD")}&time=${encodeURIComponent(activeTime)}`
      );
      const data = await res.json();
      setIsReserved(data.includes(Number(id)));
    };
    checkReserved();
  }, [selectedDate, activeTime, id]);

  const isButtonDisabled = !selectedDate || !activeTime || isReserved;

  const handleNext = () => {
    if (selectedDate && activeTime) {
      navigate(
        `/person?tableId=${id}&date=${moment(selectedDate).format(
          "YYYY-MM-DD"
        )}&time=${activeTime}&maxSeats=${seatCounts[id - 1]}`
      );
    }
  };

  const clickBack = () => {
    navigate(-1);
  };

  // 시간 버튼 렌더링 함수
  const renderTimeButton = (label, timeStr) => (
    <S.TimeButton
      active={activeTime === timeStr ? "true" : undefined}
      onClick={() => !reservedTimes.includes(timeStr) && setActiveTime(timeStr)}
      disabled={reservedTimes.includes(timeStr)}
      style={{
        color: reservedTimes.includes(timeStr) ? "#9C9CA1" : undefined,
        borderColor: reservedTimes.includes(timeStr) ? "#9C9CA1" : undefined,
        cursor: reservedTimes.includes(timeStr) ? "not-allowed" : "pointer",
        backgroundColor: reservedTimes.includes(timeStr)
          ? "#F5F5F5"
          : undefined,
      }}
    >
      {label}
    </S.TimeButton>
  );

  return (
    <S.Wrapper>
      {/* 예약 날짜와 백버튼을 같은 행에 배치, 타이틀은 중앙 */}
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
          <S.SectionTitle style={{ margin: 0 }}>예약 날짜</S.SectionTitle>
        </div>
      </div>

      <CalendarContainer>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          formatDay={(local, date) => moment(date).format("D")}
          next2Label={null}
          prev2Label={null}
          minDate={moment().toDate()}
          maxDate={moment().add(2, "months").endOf("month").toDate()}
          tileClassName={({ date, view }) => {
            if (view === "month") {
              const dateStr = moment(date).format("YYYY-MM-DD");
              if (moment(date).day() === 0) {
                return "react-calendar__tile--holiday";
              }
              if (reservedDates.includes(dateStr)) {
                return "react-calendar__tile--reserved";
              }
              if (moment(date).isSame(selectedDate, "day")) {
                return "react-calendar__tile--active";
              }
            }
            return null;
          }}
        />
      </CalendarContainer>

      <S.SectionTitle>예약 시간</S.SectionTitle>
      <S.TimeContainer>
        <S.TimeGroup>
          <S.TimeLabel>오전</S.TimeLabel>
          {renderTimeButton("11:00", "오전 11시")}
          {renderTimeButton("12:00", "오전 12시")}
        </S.TimeGroup>

        <S.TimeGroup>
          <S.TimeLabel>오후</S.TimeLabel>
          {renderTimeButton("13:00", "오후 1시")}
          {renderTimeButton("14:00", "오후 2시")}
          {renderTimeButton("17:00", "오후 5시")}
          {renderTimeButton("18:00", "오후 6시")}
          {renderTimeButton("19:00", "오후 7시")}
        </S.TimeGroup>
      </S.TimeContainer>

      <S.ConfirmButton disabled={isButtonDisabled} onClick={handleNext}>
        {isReserved ? "이미 예약됨" : "다음"}
      </S.ConfirmButton>
      {isReserved && (
        <div style={{ color: "#9C9CA1", marginTop: 8, fontWeight: "bold" }}>
          이 테이블은 해당 날짜/시간에 이미 예약되었습니다.
        </div>
      )}
    </S.Wrapper>
  );
};
