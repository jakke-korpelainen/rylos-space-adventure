import React from "react"
import styled from "styled-components"

export const Menu = (props: { children: React.ReactNode }) => {
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
  padding: 2rem;
  cursor: default;

  h1 {
    font-size: 6rem;
    font-family: "Sedgwick Ave";
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

export const MenuActions = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;

  @media only screen and (max-width: 900px) {
    flex-direction: column;
  }
`

export const MenuActionItem = styled.button`
  border: 3px solid orangered;
  pointer-events: all;
  background: linear-gradient(#4f0158, #000000);
  cursor: pointer;
  color: white;
  font-weight: 900;
  text-transform: uppercase;
  font-size: 3rem;
  font-family: "Sedgwick Ave";
  min-width: 300px;
  padding: 0 2rem;
  margin-top: 1rem;
  margin-right: 1rem;

  transition: background linear 0.2s;

  &:last-of-type {
    margin-right: 0;
  }

  &:hover {
    background: linear-gradient(#740181, #000000);
  }

  &:focus {
    background: linear-gradient(#47004f, #000000);
  }

  @media only screen and (max-width: 900px) {
    font-size: 2rem;

    &:first-of-type {
      margin-right: 0;
    }
  }
`

const MenuContent = styled.div`
  height: 100%;
  width: 1024px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img#logo {
    margin-top: -4rem;
    margin-bottom: -4rem;

    @media only screen and (max-width: 900px) {
      margin-top: -2rem;
      margin-bottom: -2rem;
    }
  }

  img {
    max-width: 100%;
  }
`
