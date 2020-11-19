import React from 'react';
import styled, {
  createGlobalStyle,
  DefaultTheme,
  css,
  ThemeProvider as StyledComponentsThemeProvider
} from 'styled-components';
import { Text, TextProps } from 'rebass';
import { Colors } from './styled';

const MEDIA_WIDTHS = {
  upToExtraSmall: 500,
  upToSmall: 720,
  upToMedium: 960,
  upToLarge: 1280
};

const mediaWidthTemplates: {
  [width in keyof typeof MEDIA_WIDTHS]: typeof css;
} = Object.keys(MEDIA_WIDTHS).reduce((accumulator, size) => {
  (accumulator as any)[size] = (a: any, b: any, c: any) => css`
    @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
      ${css(a, b, c)}
    }
  `;
  return accumulator;
}, {}) as any;

const white = '#FFFFFF';
const black = '#000000';

export const colors: Colors = {
  white,
  black,

  text1: '#FFFFFF',
  text2: '#C3C5CB',
  text3: '#B4B4B4',
  text4: '#565A69',
  text5: '#2C2F36',

  bg1: '#232628',
  bg2: '#484E5A',
  bg3: '#CFD6E2',
  bg4: '#F9FAFB',
  bg5: '#B4B4B4',

  border: '#dadada',

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
};

export const theme: DefaultTheme = {
  ...colors,

  grids: {
    sm: 8,
    md: 12,
    lg: 24
  },

  //shadows
  shadow1: '#2F80ED',

  // media queries
  mediaWidth: mediaWidthTemplates,

  // css snippets
  flexColumnNoWrap: css`
    display: flex;
    flex-flow: column nowrap;
  `,
  flexRowNoWrap: css`
    display: flex;
    flex-flow: row nowrap;
  `
};

export default function ThemeProvider({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <StyledComponentsThemeProvider theme={theme}>
      {children}
    </StyledComponentsThemeProvider>
  );
}

const TextWrapper = styled(Text)<{ color: keyof Colors }>`
  color: ${({ color, theme }) => (theme as any)[color]};
`;

export const StyledBody = styled.div<{ color: keyof Colors }>`
  padding: 2rem;
  background-color: ${({ color, theme }) => (theme as any)[color]};
  ${({ theme }) => theme.mediaWidth.upToSmall`
  padding: 1rem 1.25rem;`};
`;

export const StyledContainer = styled.div<{ sWidth: keyof string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: ${({ sWidth }) => `${sWidth}px`};
  margin: auto;
`;

export const TYPE = {
  LargeHeader(props: TextProps) {
    return <TextWrapper fontWeight={700} fontSize="24px" {...props} />;
  },
  Header(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize="16px" {...props} />;
  },
  Body(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize="14px" {...props} />;
  },
  Small(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize="12px" {...props} />;
  }
};

export const ThemedGlobalStyle = createGlobalStyle`
html {
  color: ${({ theme }) => theme.text1};
}
body {
  margin: 0;
  padding: 0;
  font-family: 'Open Sans', sans-serif;
}

* {
  box-sizing: border-box;
}
 
table {
  width: 100%;
  td, th {
    text-align: left;
    padding: 1rem;
  }
  }
  tr:nth-child(odd) {
    background-color: ${({ theme }) => theme.bg4}
  }
`;
