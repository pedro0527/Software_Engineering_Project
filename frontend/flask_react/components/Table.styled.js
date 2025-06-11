import styled from "styled-components";

export const Reactangle = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.mainColor};
  border-radius: 15px;
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
`;

export const Person = styled.div`
    font-size: 10px;
    color: ${({ theme }) => theme.colors.gray04}
`;
