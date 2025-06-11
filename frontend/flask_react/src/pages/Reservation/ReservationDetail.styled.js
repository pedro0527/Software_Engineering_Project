import styled from "styled-components";

export const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    max-width: 540px;
    align-items: center;
    justify-content: start;
    padding: 16px;
`;

export const Back = styled.div`
    display: flex;
    justify-content: flex-start;
    width: 100%;
    margin: 20px 0;

    img {

    }
`;

export const SectionTitle = styled.div`
    font-size: 18px;
    font-weight: bold;
    margin: 20px 0 10px 0;
`;

export const TimeContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 16px;
`;

export const TimeGroup = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
`;

export const TimeLabel = styled.div`
    min-width: 50px;
    font-weight: bold;
`;

export const TimeButton = styled.button`
    padding: 8px 14px;
    border: 1px solid ${({ active, theme }) => active ? theme.colors.mainColor : '#ccc'};
    background-color: ${({ active, theme }) => active ? theme.colors.mainColor : '#fff'};
    color: ${({ active, theme }) => active ? theme.colors.white : theme.colors.black};
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;

    &:hover {
    opacity: 0.9;
    }
`;

export const ConfirmButton = styled.button`
    width: 100%;
    margin-top: 24px;
    padding: 10px 20px;
    background-color: ${({ disabled, theme }) => disabled ? '#ccc' : theme.colors.mainColor};
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 6px;

    cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
`;