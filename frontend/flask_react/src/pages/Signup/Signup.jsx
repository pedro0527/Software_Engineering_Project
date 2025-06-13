import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.jpeg";
import * as S from "./Signup.styled";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!username || !password) {
      setIsError(true);
      setErrorMessage("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    const res = await fetch("http://127.0.0.1:5000/api/create-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    setErrorMessage(data.message);

    if (data.success) {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  return (
    <S.Wrapper>
      <S.LogoWrapper>
        <S.Logo src={Logo} alt="메인 로고" />
      </S.LogoWrapper>
      <S.BtnWrapper>
        <S.TitleInfo>아이디</S.TitleInfo>
        <S.InputBox
          type="text"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          $isError={isError && !username}
        />
        <S.TitleInfo>비밀번호</S.TitleInfo>
        <S.InputBox
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          $isError={isError && !password}
        />
        <div style={{ width: "100%", height: "30px" }}>
          {isError && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}
        </div>
        <S.Btn onClick={handleSignUp}>회원가입</S.Btn>
      </S.BtnWrapper>
    </S.Wrapper>
  );
}

export default SignUp;
