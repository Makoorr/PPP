import { FC } from 'react';
import { Header, Left, Right, WaveWrapper } from './Wave.styled';

interface WaveProps {
   nav: React.ReactNode;
   left: React.ReactNode;
   right: React.ReactNode;
}

const Wave: FC<WaveProps> = ({ nav, left, right }) => (
 <WaveWrapper>
      <div style={{marginBottom: "1em"}}>
         {nav}
      </div>
      <Header>
         <Left>
            {left}
         </Left>
         <Right>
            {right}
         </Right>
      </Header>
      <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
         <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
         </defs>
         <g className="parallax">
         <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7)" />
         <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
         <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
         <use xlinkHref="#gentle-wave" x="48" y="7" fill="aliceblue" />
         </g>
      </svg>
 </WaveWrapper>
);

export default Wave;