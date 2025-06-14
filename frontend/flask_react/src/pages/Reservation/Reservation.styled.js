import styled from "styled-components";

export const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    max-width: 540px;
    align-items: center;
    justify-content: end;
`;

export const TopBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 16px 24px 0 0;

  span {
    margin-right: 12px;
    font-weight: bold;
  }

  button {
    background: #ff6e3f;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 6px 16px;
    cursor: pointer;
  }
`;


export const TableContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); 
  grid-template-rows: repeat(3, 1fr);    
  gap: 16px;                              
  width: 100%;
  height: 80%;
  justify-items: center;                 
  align-items: center;                   
`;

export const Door = styled.div`
    display: flex;
    width: 30%;
    height: 8%;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.gray01};
    margin-top: 8%;

    span {
        color: ${({ theme }) => theme.colors.black};
    }
`