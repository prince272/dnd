import React from 'react';
import styled from '@emotion/styled';
import { colors } from '@atlaskit/theme';

// $ExpectError - not sure why
const GlobalStyles = styled.div`
  min-height: 100vh;
  color: ${colors.N900};
`;

const GlobalStylesDecorator = (storyFn) => (
  <GlobalStyles>{storyFn()}</GlobalStyles>
);

export default GlobalStylesDecorator;
