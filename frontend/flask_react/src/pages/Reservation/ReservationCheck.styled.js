import styled from "styled-components";

export const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    max-width: 540px;
    align-items: center;
    justify-content: space-around;
    padding: 16px;
`;

export const Title = styled.div`
    font-size: 18px;
    font-weight: bold;
    margin: 20px 0 30px 0;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 5px;
    width: 88%;
    height: 50%;
    gap: 15px;

    background-color: ${({ theme }) => theme.colors.gray01};
    border-radius: 10px;
`

export const Text = styled.div`
    font-size: 15px;
    font-weight: bold;
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