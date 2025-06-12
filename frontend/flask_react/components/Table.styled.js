import styled from "styled-components";

export const Reactangle = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme, $disabled }) => $disabled ? theme.colors.gray01 : theme.colors.mainColor};
  border-radius: 15px;
  cursor: ${({ $disabled }) => $disabled ? 'not-allowed' : 'pointer'};
`;

export const Text = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 5px;
`;

export const Num = styled.div`
    font-size: 20px;
    color: ${({ theme, $disabled }) => $disabled ? theme.colors.gray01 : theme.colors.black};
`;

export const Person = styled.div`
    font-size: 10px;
    color: ${({ theme, $disabled }) => $disabled ? theme.colors.gray01 : theme.colors.gray04};
`;
