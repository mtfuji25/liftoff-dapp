import React from 'react'
import {createGlobalStyle, DefaultTheme, css, ThemeProvider as StyledComponentsThemeProvider} from 'styled-components'
import { Colors } from './styled'

const white = '#FFFFFF'
const black = '#000000'

export const colors: Colors = {
    white,
    black,

    text1: '#FFFFFF',
    text2: '#C3C5CB',
    text3: '#B4B4B4',
    text4: '#565A69',
    text5: '#2C2F36',

    bg1: '#232628',
    bg2: '#2C2F36',
    bg3: '#40444F',
    bg4: '#565A69',
    bg5: '#B4B4B4',

    primary1: '#2A7CEA',
    primary2: '#FF8CC3',
    primary3: '#FF99C9',
    primary4: '#F6DDE8',
    primary5: '#FDEAF1',

    primaryText1: '#ff007a',

    secondary1: '#ff007a',
    secondary2: '#F6DDE8',
    secondary3: '#FDEAF1',

    red1: '#FF6871',
    red2: '#F82D3A',
    green1: '#27AE60',
    yellow1: '#FFE270',
    yellow2: '#F3841E',
    blue1: '#2A7CEA'
}

export const theme: DefaultTheme = {
    ...colors,

    grids: {
      sm: 8,
      md: 12,
      lg: 24
    },

    //shadows
    shadow1: '#2F80ED',

    // css snippets
    flexColumnNoWrap: css`
      display: flex;
      flex-flow: column nowrap;
    `,
    flexRowNoWrap: css`
      display: flex;
      flex-flow: row nowrap;
    `
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <StyledComponentsThemeProvider theme={theme}>{children}</StyledComponentsThemeProvider>
}


export const ThemedGlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,600;1,400&display=swap');
html {
  color: ${({ theme }) => theme.text1};
  background-color: ${({ theme }) => theme.bg2};
}
body {
  margin: 0;
  padding: 0;
  font-family: 'Open Sans', sans-serif;
}
`