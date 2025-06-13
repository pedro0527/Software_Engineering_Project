import styled from "styled-components";

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  max-width: 540px;
  align-items: center;
  justify-content: center;
`;

export const BtnWrapper = styled.div`
  width: 88%;
  height: 80%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 13px;
`;

export const SectionTitle = styled.div`
    font-size: 18px;
    font-weight: bold;
    margin: 20px 0 10px 0;
`;

export const TitleInfo = styled.div`
  display: flex;
  width: 100%;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.mainColor};
  font-family: ${({ theme }) => theme.fonts.SUITMedium['font-family']};
`;

export const InputBox = styled.input`
  display: flex;
  height: 51px;
  width: 100%;
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

export const ConfirmButton = styled.button`
    width: 88%;
    margin-top: 24px;
    padding: 10px 20px;
    background-color: ${({ disabled, theme }) => disabled ? '#ccc' : theme.colors.mainColor};
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 6px;

    cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
`;

export const Back = styled.div`
    display: flex;
    justify-content: flex-start;
    width: 88%;
`;