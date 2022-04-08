import styled from "styled-components"

interface IWaveProps {
  words: string[]
}

const animationDelayTemplate = (index: number) => {
  return `
    span:nth-child(${index + 1}) {
      animation-delay: ${`0.${index}s`};
    }
  `
}

/**
 * Creates :nth-child styles for given length
 * @param length amount to create
 * @returns styles
 */
const createWaveDelayForLength = (length: number) => {
  return new Array(length).fill(null).map((_, index) => animationDelayTemplate(index))
}

export const Wave = (props: IWaveProps) => (
  <WaveWrapper>
    {props.words.map((word) => (
      <WaveWord length={word.length} key={word}>
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

export const WaveWord = styled.h1<{ length: number }>`
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

  ${(p) => createWaveDelayForLength(p.length)}
`
