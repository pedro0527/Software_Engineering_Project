import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as S from "./ReservationDetail.styled";
import back from "../../assets/icons/back.svg";

export const ReservationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeTime, setActiveTime] = useState(null);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const isButtonDisabled = !selectedDate || !activeTime;

  const handleNext = () => {
    if (!isButtonDisabled) {
      navigate(
        `/confirm/${id}?date=${moment(selectedDate).format(
          "YYYY-MM-DD"
        )}&time=${activeTime}`
      );
    }
  };

  const clickBack = () => {
    navigate(-1);
  };

  return (
    <S.Wrapper>
      <S.Back>
        <img src={back} onClick={clickBack} />
      </S.Back>

      <S.SectionTitle>예약 날짜</S.SectionTitle>
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
            if (view === "month" && moment(date).day() === 0) {
              return "react-calendar__tile--holiday";
            }
            if (moment(date).isSame(selectedDate, "day")) {
              return "react-calendar__tile--active";
            }
            return null;
          }}
        />
      </CalendarContainer>

      <S.SectionTitle>예약 시간</S.SectionTitle>
      <S.TimeContainer>
        <S.TimeGroup>
          <S.TimeLabel>오전</S.TimeLabel>
          <S.TimeButton
            active={activeTime === "오전 11시"}
            onClick={() => setActiveTime("오전 11시")}
          >
            11:00
          </S.TimeButton>
          <S.TimeButton
            active={activeTime === "오전 12시"}
            onClick={() => setActiveTime("오전 12시")}
          >
            12:00
          </S.TimeButton>
        </S.TimeGroup>

        <S.TimeGroup>
          <S.TimeLabel>오후</S.TimeLabel>
          <S.TimeButton
            active={activeTime === "오후 1시"}
            onClick={() => setActiveTime("오후 1시")}
          >
            13:00
          </S.TimeButton>
          <S.TimeButton
            active={activeTime === "오후 2시"}
            onClick={() => setActiveTime("오후 2시")}
          >
            14:00
          </S.TimeButton>
          <S.TimeButton
            active={activeTime === "오후 5시"}
            onClick={() => setActiveTime("오후 5시")}
          >
            17:00
          </S.TimeButton>
          <S.TimeButton
            active={activeTime === "오후 6시"}
            onClick={() => setActiveTime("오후 6시")}
          >
            18:00
          </S.TimeButton>
          <S.TimeButton
            active={activeTime === "오후 7시"}
            onClick={() => setActiveTime("오후 7시")}
          >
            19:00
          </S.TimeButton>
        </S.TimeGroup>
      </S.TimeContainer>

      <S.ConfirmButton disabled={isButtonDisabled} onClick={handleNext}>
        다음
      </S.ConfirmButton>
    </S.Wrapper>
  );
};

const CalendarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 65vh;

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

  .dot {
    height: 8px;
    width: 8px;
    background-color: #ff6969;
    border-radius: 50%;
    text-align: center;
    margin-top: 3px;
  }
`;
