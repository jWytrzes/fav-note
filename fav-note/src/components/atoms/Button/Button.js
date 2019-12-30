import styled, { css } from 'styled-components';

const Button = styled.button`
  padding: 0;
  background-color: ${({ theme }) => theme.primary};
  width: 220px;
  height: 47px;
  border: 0;
  border-radius: 50px;
  font-family: Montserrat, sans-serif;
  font-weight: ${({ theme }) => theme.bold};
  font-size: 16px;
  text-transform: uppercase;

  ${({ secondary }) => {
    return (
      secondary &&
      css`
        background-color: ${({ theme }) => theme.grey200};
        width: 105px;
        height: 30px;
        font-size: 10px;
      `
    );
  }}
`;

export default Button;
