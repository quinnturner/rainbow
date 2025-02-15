import lang from 'i18n-js';
import React, { useMemo } from 'react';
import { useTheme } from '../../theme/ThemeContext';
import { ButtonPressAnimation } from '../animations';
import { InnerBorder, RowWithMargins } from '../layout';
import { TruncatedText } from '../text';
import CaretImageSource from '@rainbow-me/assets/family-dropdown-arrow.png';
import { AssetType } from '@rainbow-me/entities';
import { useColorForAsset } from '@rainbow-me/hooks';
import { ImgixImage } from '@rainbow-me/images';
import styled from '@rainbow-me/styled-components';
import { padding, position } from '@rainbow-me/styles';
import ShadowStack from 'react-native-shadow-stack';

const TokenSelectionButtonHeight = 46;
const TokenSelectionButtonMaxWidth = 130;
const TokenSelectionButtonElevation = ios ? 0 : 8;

const Content = styled(RowWithMargins).attrs({
  align: 'center',
  margin: 7,
})({
  ...padding.object(11.5, 14, 13.5, 16),
  height: TokenSelectionButtonHeight,
  zIndex: 1,
});

const CaretIcon = styled(ImgixImage).attrs(({ theme: { colors } }) => ({
  resizeMode: ImgixImage.resizeMode.contain,
  source: CaretImageSource,
  tintColor: colors.whiteLabel,
}))({
  height: 18,
  top: 0.5,
  width: 8,
});

export default function TokenSelectionButton({
  address,
  mainnetAddress,
  borderRadius = 30,
  onPress,
  symbol,
  testID,
  type,
}) {
  const { isDarkMode, colors } = useTheme();

  const colorForAsset = useColorForAsset(
    {
      address,
      mainnet_address: mainnetAddress,
      type: mainnetAddress ? AssetType.token : type,
    },
    address ? undefined : colors.appleBlue
  );

  const shadowsForAsset = useMemo(
    () => [
      [0, 10, 30, colors.shadow, 0.2],
      [0, 5, 15, colorForAsset, isDarkMode ? 0 : 0.4],
    ],
    [colorForAsset, colors.shadow, isDarkMode]
  );

  return (
    <ButtonPressAnimation
      borderRadius={borderRadius}
      contentContainerStyle={{
        backgroundColor: colorForAsset,
        borderRadius,
      }}
      {...(symbol && { maxWidth: TokenSelectionButtonMaxWidth })}
      onPress={onPress}
      radiusAndroid={borderRadius}
      testID={testID}
    >
      <ShadowStack
        {...position.coverAsObject}
        backgroundColor={colorForAsset}
        borderRadius={borderRadius}
        elevation={TokenSelectionButtonElevation}
        shadows={shadowsForAsset}
      />
      <Content>
        <TruncatedText
          align="center"
          color={colors.whiteLabel}
          {...(android && { lineHeight: 21 })}
          size="large"
          testID={testID + '-text'}
          weight="bold"
        >
          {symbol ?? lang.t('swap.choose_token')}
        </TruncatedText>
        <CaretIcon />
      </Content>
      <InnerBorder radius={borderRadius} />
    </ButtonPressAnimation>
  );
}
