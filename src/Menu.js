import React from 'react'
import styled from 'styled-components'

export const Menu = (props) => {
  return (
    <MenuWrapper>
      <MenuContent>{props.children}</MenuContent>
    </MenuWrapper>
  )
}

const MenuWrapper = styled.div`
  background-repeat: no-repeat;
  background-position: center 10%;
  background-color: #16161d;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  color: white;

  * {
    cursor: default;
  }

  a {
    cursor: pointer;
  }

  h1 {
    font-size: 6rem;
    font-family: 'Sedgwick Ave';
    text-transform: uppercase;
    margin-bottom: 0;
    margin-top: 0;
    text-align: center;
  }

  div + p {
    font-size: 2rem;
    width: 1200px;
    max-width: 100%;
    text-align: center;
    margin-bottom: 5rem;
    margin-top: 0;
  }

  @media only screen and (max-width: 900px) {
    h1 {
      font-size: 2.5rem;
    }

    div + p {
      font-size: 1.2rem;
    }
  }
`

export const MenuAction = styled.button`
  border: 3px solid orangered;
  pointer-events: all;
  background: linear-gradient(#4f0158, #000000);
  cursor: pointer;
  color: white;
  font-weight: 900;
  text-transform: uppercase;
  font-size: 3rem;
  font-family: 'Sedgwick Ave';
  min-width: 300px;
  padding: 0 2rem;
  margin-top: 1rem;

  @media only screen and (max-width: 900px) {
    font-size: 2rem;
  }
`

const MenuContent = styled.div`
  height: 100%;
  min-width: 80vw;
  max-width: 90vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    max-width: 100%;
  }
`
