import React from 'react';
import FastImage from 'react-native-fast-image';
import { useTheme } from '../../theme/ThemeContext';
import { Row } from '../layout';
import ExchangeNotchLeft from '@rainbow-me/assets/exchangeNotchLeft.png';
import ExchangeNotchLeftDark from '@rainbow-me/assets/exchangeNotchLeftDark.png';
import ExchangeNotchMiddle from '@rainbow-me/assets/exchangeNotchMiddle.png';
import ExchangeNotchMiddleDark from '@rainbow-me/assets/exchangeNotchMiddleDark.png';
import ExchangeNotchRight from '@rainbow-me/assets/exchangeNotchRight.png';
import ExchangeNotchRightDark from '@rainbow-me/assets/exchangeNotchRightDark.png';
import { useDimensions } from '@rainbow-me/hooks';
import styled from '@rainbow-me/styled-components';

const notchHeight = 48;
const notchSideWidth = 78;
const ANDROID_NOTCH_OFFSET = 8;

const Container = styled(Row).attrs({
  pointerEvents: 'none',
})({
  height: notchHeight,
  left: 0,
  position: 'absolute',
  top: 132,
});

const NotchMiddle = styled(FastImage).attrs(({ isDarkMode }) => ({
  resizeMode: FastImage.resizeMode.stretch,
  source: isDarkMode ? ExchangeNotchMiddleDark : ExchangeNotchMiddle,
}))({
  height: notchHeight,
  left: android ? -ANDROID_NOTCH_OFFSET : 0,
  width: ({ deviceWidth }) => deviceWidth - notchSideWidth * 2.11,
});

const NotchSide = styled(FastImage)({
  height: android ? notchHeight + 2 : notchHeight,
  left: android ? -ANDROID_NOTCH_OFFSET : 0,
  width: android ? notchSideWidth + ANDROID_NOTCH_OFFSET : notchSideWidth,
});

export default function ExchangeNotch({ testID }) {
  const { width: deviceWidth } = useDimensions();
  const { isDarkMode } = useTheme();
  return (
    <Container testID={`${testID}-notch`}>
      <NotchSide
        source={isDarkMode ? ExchangeNotchLeftDark : ExchangeNotchLeft}
      />
      <NotchMiddle deviceWidth={deviceWidth} isDarkMode={isDarkMode} />
      <NotchSide
        source={isDarkMode ? ExchangeNotchRightDark : ExchangeNotchRight}
      />
    </Container>
  );
}
