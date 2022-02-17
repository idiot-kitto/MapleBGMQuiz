import styled from 'styled-components';
import background from 'images/background.png';

const Background = styled.img.attrs({
    src: background
  })`
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: -1;
  `;

export default Background;