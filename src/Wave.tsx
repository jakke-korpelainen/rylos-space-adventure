import styled from "styled-components"

interface IWaveProps {
  words: string[]
}

export const Wave = (props: IWaveProps) => (
  <WaveWrapper>
    {props.words.map((word) => (
      <WaveWord key={word}>
        {[...word].map((char, index) => (
          <span key={`${char}-${index}`}>{char}</span>
        ))}
      </WaveWord>
    ))}
  </WaveWrapper>
)

export const WaveWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 900px) {
    flex-direction: column;
    margin-top: 1rem;
  }
`

export const WaveWord = styled.h1`
  display: flex;
  flex-wrap: nowrap;

  &:first-of-type {
    margin-right: 2rem;

    @media only screen and (max-width: 900px) {
      margin-bottom: -1rem;
      margin-right: 0;
    }
  }

  span {
    text-shadow: 0 0 5px #fff, 0 0 60px #9b51e0;
    display: inline-block;
    animation: wave-text 1s ease-in-out infinite;
  }

  span:nth-of-type(1) {
    animation-delay: 0s;
  }
  span:nth-of-type(2) {
    animation-delay: 0.1s;
  }
  span:nth-of-type(3) {
    animation-delay: 0.2s;
  }
  span:nth-of-type(4) {
    animation-delay: 0.3s;
  }
  span:nth-of-type(5) {
    animation-delay: 0.4s;
  }
  span:nth-of-type(6) {
    animation-delay: 0.5s;
  }
  span:nth-of-type(7) {
    animation-delay: 0.6s;
  }
  span:nth-of-type(8) {
    animation-delay: 0.7s;
  }
  span:nth-of-type(9) {
    animation-delay: 0.8s;
  }
`
