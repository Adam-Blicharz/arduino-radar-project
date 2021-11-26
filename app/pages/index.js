import {useState, useEffect} from 'react';
import styled from 'styled-components';

const Main = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #212121;
`;

const Radar = styled.div`
  position: relative;
  width: 1600px;
  height: 800px;
  background-color: black;
  overflow: hidden;
  transform: scaleX(-1);
`;

const XScala = styled.div`
  position: absolute;
  width: ${props => props.diameter}px;
  height: ${props => props.diameter}px;
  border: 1px solid green;
  border-radius: 50%;
  top: 0;
  left: 50%;
`;

const YScala = styled.div`
  position: absolute;
  width: 3px;
  background-color: green;
  height: 1600px;
  top: 0;
  left: 50%;
  transform: translateX(${props => props.translate}%) rotate(${props => props.rotate}deg);
`;

const ScalaInfo = styled.h1`
  position: absolute;
  left: 180px;
  top: 10px;
  color: #2196F3;
`;

const Pointer = styled.div`
  position: absolute;
  width: 1600px;
  bottom: 0;
  height: 2px;
  background-color: #1B5E20;
  transition: opacity 0.2s ease;
`;

const Obstacle = styled.span`
  position: absolute;
  left: 0%;
  height: 2px;
  background-color: #f44336;

`;

export default function Home({socket}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if(socket){
      socket.on("radar", updateData);

      return () => {
        socket.off("radar", updateData);
      };
    }
  }, [socket]);

  const updateData = newAngle => {
    setData(dt => [...dt, newAngle].slice(-45));
  }

  return (
    <Main>
       <Radar>
         <XScala diameter={1600} style={{transform: 'translate(-50%, 0)'}}/>
         <XScala diameter={800} style={{transform: 'translate(-50%, 50%)'}}/>
         <YScala translate={-50} rotate={0}/>
         <YScala translate={-50} rotate={45} />
         <YScala translate={-50} rotate={-45}/>
         {
            data.map(({deg, distance}, i) =>
            { const d = 50 - (((distance/50)*100)/2); //don't observer anything beyond 50cm
              return(
              <Pointer key={i} style={{opacity: (i * 2)/100, transform: `rotate(${deg}deg)`}}>
                <Obstacle style={d ? {width: `${d}%`} : {}}/>
              </Pointer>
              )
            })
         }
       </Radar>
       <ScalaInfo>50cm</ScalaInfo>
    </Main>
  )
}