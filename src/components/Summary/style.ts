import styled, { css } from "styled-components";

export const SummaryContainer = styled.section`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  margin-top: -5rem;
  overflow: hidden;

  /* > div {
    text-align: center;
    display: flex;
  } */
`;

interface SummaryCardProps {
  variant?: "green";
}

export const SummaryCard = styled.div<SummaryCardProps>`
  background-color: ${(props) => props.theme["gray-600"]};
  border-radius: 2px;
  padding: 1.5rem;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${(props) => props.theme["gray-300"]};
  }

  strong {
    display: block;
    margin-top: 0.75rem;
    font-size: 2rem;
  }

  ${(props) =>
    props.variant === "green" &&
    css`
      background-color: ${props.theme["green-700"]};
    `}
`;
