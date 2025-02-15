import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Spinner from '../Spinner';
import { Icon } from '../icons';
import { Text } from '@rainbow-me/design-system';
import { TransactionStatusTypes } from '@rainbow-me/entities';
import { position } from '@rainbow-me/styles';
import { ThemeContextProps } from '@rainbow-me/theme';

const StatusProps = {
  [TransactionStatusTypes.approved]: {
    marginRight: 4,
    marginTop: ios ? 1 : 0,
    name: 'dot',
  },
  [TransactionStatusTypes.cancelled]: {
    marginRight: 4,
    marginTop: ios ? 1 : 0,
  },
  [TransactionStatusTypes.cancelling]: {
    marginRight: 4,
    marginTop: ios ? 1 : 0,
  },
  [TransactionStatusTypes.deposited]: {
    name: 'sunflower',
    style: {
      fontSize: 11,
      left: -1.3,
      marginRight: 1,
      marginTop: ios ? -3 : -5,
    },
  },
  [TransactionStatusTypes.depositing]: {
    marginRight: 4,
    marginTop: ios ? 1 : 0,
  },
  [TransactionStatusTypes.approving]: {
    marginRight: 4,
    marginTop: ios ? 1 : 0,
  },
  [TransactionStatusTypes.swapping]: {
    marginRight: 4,
    marginTop: ios ? 1 : 0,
  },
  [TransactionStatusTypes.speeding_up]: {
    marginRight: 4,
    marginTop: ios ? 1 : 0,
  },
  [TransactionStatusTypes.failed]: {
    marginRight: 4,
    marginTop: ios ? -1 : -2,
    name: 'closeCircled',
    style: position.maxSizeAsObject(12),
  },
  [TransactionStatusTypes.purchased]: {
    marginRight: 2,
    marginTop: ios ? 0 : -1,
    name: 'arrow',
  },
  [TransactionStatusTypes.purchasing]: {
    marginRight: 4,
    marginTop: ios ? 0 : -1,
  },
  [TransactionStatusTypes.received]: {
    marginRight: 2,
    marginTop: ios ? 0 : -1,
    name: 'arrow',
  },
  [TransactionStatusTypes.self]: {
    marginRight: 4,
    marginTop: ios ? 0 : -1,
    name: 'dot',
  },
  [TransactionStatusTypes.sending]: {
    marginRight: 4,
    marginTop: ios ? 0 : -1,
  },
  [TransactionStatusTypes.sent]: {
    marginRight: 3,
    marginTop: ios ? 0 : -1,
    name: 'sendSmall',
  },
  [TransactionStatusTypes.swapped]: {
    marginRight: 3,
    marginTop: ios ? -1 : -2,
    name: 'swap',
    small: true,
    style: position.maxSizeAsObject(12),
  },
  [TransactionStatusTypes.contract_interaction]: {
    name: 'robot',
    style: {
      fontSize: 11,
      left: -1.3,
      marginRight: 1,
      marginTop: ios ? -3 : -5,
    },
  },
  [TransactionStatusTypes.withdrawing]: {
    marginRight: 4,
  },
  [TransactionStatusTypes.withdrew]: {
    name: 'sunflower',
    style: {
      fontSize: 11,
      left: -1.3,
      marginRight: 1,
      marginTop: ios ? -3 : -5,
    },
  },
};

const sx = StyleSheet.create({
  icon: {
    ...position.maxSizeAsObject(10),
  },
  row: {
    flexDirection: 'row',
  },
});

export default React.memo(function FastTransactionStatusBadge({
  pending,
  status,
  style,
  title,
  colors,
}: {
  colors: ThemeContextProps['colors'];
  pending: boolean;
  status: keyof typeof TransactionStatusTypes;
  title: string;
  style?: StyleProp<ViewStyle>;
}) {
  const isSwapping = status === TransactionStatusTypes.swapping;

  let statusColor = colors.alpha(colors.blueGreyDark, 0.7);
  if (pending) {
    if (isSwapping) {
      statusColor = colors.swapPurple;
    } else {
      statusColor = colors.appleBlue;
    }
  } else if (status === TransactionStatusTypes.swapped) {
    statusColor = colors.swapPurple;
  }

  const showIcon = !!StatusProps[status];

  return (
    <View style={[sx.row, style]}>
      {pending && (
        <Spinner
          color={isSwapping ? colors.swapPurple : colors.appleBlue}
          size={12}
          style={{ marginTop: ios ? 0 : -2 }}
        />
      )}
      {showIcon && (
        <Icon color={statusColor} style={sx.icon} {...StatusProps[status]} />
      )}
      <Text color={{ custom: statusColor }} size="14px" weight="semibold">
        {title}
      </Text>
    </View>
  );
});
