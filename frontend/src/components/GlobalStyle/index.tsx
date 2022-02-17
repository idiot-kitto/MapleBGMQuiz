import { createGlobalStyle, css } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  ${() => {
    return css`
      * {
        font-weight: bold;
        font-family: 'Noto Sans KR';
        ::placeholder,
        ::-webkit-input-placeholder {
          font-weight: bold;
          font-family: 'Noto Sans KR';
        }
        :-ms-input-placeholder {
          font-weight: bold;
          font-family: 'Noto Sans KR';
        }
      }
      body {
        margin: 0;
      }
    `;
  }}
`;

export default GlobalStyle;
