import lang from 'i18n-js';
import React from 'react';
import { Linking } from 'react-native';
import RadialGradient from 'react-native-radial-gradient';
import Divider from './Divider';
import ButtonPressAnimation from './animations/ButtonPressAnimation';
import { CoinIcon } from './coin-icon';
import ChainBadge from './coin-icon/ChainBadge';
import { Column, Row } from './layout';
import { Text } from './text';
import { Box } from '@rainbow-me/design-system';
import networkInfo from '@rainbow-me/helpers/networkInfo';
import { useNavigation } from '@rainbow-me/navigation';
import { ETH_ADDRESS, ETH_SYMBOL } from '@rainbow-me/references';
import Routes from '@rainbow-me/routes';
import { padding, position } from '@rainbow-me/styles';
import { ethereumUtils } from '@rainbow-me/utils';

const AvailableNetworks = ({
  asset,
  networks,
  colors,
  hideDivider,
  marginBottom = 24,
  marginHorizontal = 19,
  prominent,
}) => {
  const { navigate } = useNavigation();

  const radialGradientProps = {
    center: [0, 1],
    colors: colors.gradients.lightGreyWhite,
    pointerEvents: 'none',
    style: {
      ...position.coverAsObject,
      overflow: 'hidden',
    },
  };

  const availableNetworks = Object.keys(networks).map(network => {
    return ethereumUtils.getNetworkFromChainId(Number(network));
  });

  const linkToHop = useCallback(() => {
    Linking.openURL('https://app.hop.exchange/#/send');
  }, []);

  const handleAvailableNetworksPress = useCallback(() => {
    navigate(Routes.EXPLAIN_SHEET, {
      networks: availableNetworks,
      onClose: linkToHop,
      tokenSymbol: asset.symbol,
      type: 'availableNetworks',
    });
  }, [navigate, availableNetworks, linkToHop, asset.symbol]);

  return (
    <>
      <ButtonPressAnimation
        marginBottom={marginBottom}
        onPress={handleAvailableNetworksPress}
        scaleTo={0.95}
      >
        <Row
          borderRadius={16}
          marginHorizontal={marginHorizontal}
          style={padding.object(android ? 6 : 10, 10, android ? 6 : 10, 10)}
        >
          <RadialGradient
            {...radialGradientProps}
            borderRadius={16}
            radius={600}
          />
          <Row justify="center">
            {availableNetworks?.map((network, index) => {
              return (
                <Box
                  background="body"
                  height={{ custom: 22 }}
                  key={`availbleNetwork-${network}`}
                  marginLeft={{ custom: -6 }}
                  style={{
                    borderColor: colors.transparent,
                    borderRadius: 10,
                    borderWidth: 1.5,
                    zIndex: index,
                  }}
                  width={{ custom: 22 }}
                  zIndex={availableNetworks?.length - index}
                >
                  {network !== 'mainnet' ? (
                    <ChainBadge
                      assetType={network}
                      position="relative"
                      size="small"
                    />
                  ) : (
                    <CoinIcon
                      address={ETH_ADDRESS}
                      size={20}
                      symbol={ETH_SYMBOL}
                    />
                  )}
                </Box>
              );
            })}
          </Row>
          <Column flex={1} justify="center" marginHorizontal={8}>
            <Text
              color={
                prominent
                  ? colors.alpha(colors.blueGreyDark, 0.8)
                  : colors.alpha(colors.blueGreyDark, 0.6)
              }
              numberOfLines={2}
              size="smedium"
              weight={prominent ? 'heavy' : 'bold'}
            >
              {availableNetworks?.length > 1
                ? lang.t('expanded_state.asset.available_networks', {
                    availableNetworks: availableNetworks?.length,
                  })
                : lang.t('expanded_state.asset.available_network', {
                    availableNetwork: networkInfo[availableNetworks?.[0]].name,
                  })}
            </Text>
          </Column>
          <Column align="end" justify="center">
            <Text
              align="center"
              color={colors.alpha(colors.blueGreyDark, 0.3)}
              size="smedium"
              weight="heavy"
            >
              􀅵
            </Text>
          </Column>
        </Row>
      </ButtonPressAnimation>
      {hideDivider ? null : <Divider color={colors.rowDividerExtraLight} />}
    </>
  );
};

export default AvailableNetworks;
