import styled from 'styled-components';

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  max-width: 540px;
  align-items: center;
`;

export const LogoWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex: 3.46;
`;
export const Logo = styled.img`
  display: flex;
  justify-content: center;
  width: 300px;
  height: 300px;
`;

export const TitleInfo = styled.div`
  display: flex;
  width: 100%;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.mainColor};
  font-family: ${({ theme }) =>
    theme.fonts.SUITMedium['font-family']};
  margin-left: 70px;
`;
export const InputBox = styled.input`
  display: flex;
  height: 51px;
  width: 85.33%;
  padding: 0px 218px 0px 13px;
  align-items: center;

  border-radius: 20px;
  border: 1px solid
    ${(props) => (props.$isError ? '#FF6E3F' : '#e7e8eb')};
  background: #fff;

  &::placeholder {
    color: #dcdcdc;
    opacity: 1;
  }

  &:focus::placeholder {
    color: transparent;
  }

  &:focus {
    border: 1px solid
      ${(props) => (props.$isError ? '#FF6E3F' : '#e7e8eb')};
    outline: none;
  }
`;


export const BtnWrapper = styled.div`
  flex: 3;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 13px;
`;

export const Btn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 85.33%;
  height: 53px;
  border-radius: 50px;

  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.SUITSemiBold};

  background-color: ${({ theme }) => theme.colors.mainColor};
  color: #ffffff;
`;

export const ErrorMessage = styled.div`
  color: #FF6E3F;
  font-size: 14px;
  margin-top: 5px;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.SUITMedium};
`;
