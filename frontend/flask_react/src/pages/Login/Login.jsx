import { useState } from "react";
import * as S from "./Login.styled";
import Logo from "../../assets/images/logo.jpeg";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedPassword) {
      setErrorMessage("이름과 비밀번호를 입력해주세요.");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: trimmedUsername,
          password: trimmedPassword,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setErrorMessage("로그인 성공!");
      } else {
        setErrorMessage(data.message || "로그인 실패");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("서버 오류가 발생했습니다.");
    }
  };

  const goSignUp = () => {
    navigate("/signup");
  };

  return (
    <S.Wrapper>
      <S.LogoWrapper>
        <S.Logo src={Logo} alt="메인 로고" />
      </S.LogoWrapper>
      <S.BtnWrapper>
        <S.TitleInfo>이름</S.TitleInfo>
        <S.InputBox
          type="text"
          placeholder="이름"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setErrorMessage("");
          }}
          $isError={!username && errorMessage}
        />
        <S.TitleInfo>비밀번호</S.TitleInfo>
        <S.InputBox
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrorMessage("");
          }}
          $isError={!password && errorMessage}
        />
        <div style={{ width: "100%", height: "30px" }}>
          {errorMessage && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}
        </div>
        <S.Btn onClick={handleLogin}>로그인</S.Btn>
        <S.SignUp>
          <span>아직 회원이 아니신가요?</span>
          <S.Text onClick={goSignUp}>회원가입하기</S.Text>
        </S.SignUp>
      </S.BtnWrapper>
    </S.Wrapper>
  );
};
