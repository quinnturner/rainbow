import PropTypes from 'prop-types';
import React, { createElement } from 'react';
import { compose } from 'recompact';
import styled from 'styled-components/primitives';
import connect from 'react-redux/es/connect/connect';
import { colors, padding } from '../../styles';
import { CoinIcon } from '../coin-icon';
import { Column, Row } from '../layout';
import Highlight from '../Highlight';
import { withAccountSettings, withFabSendAction } from '../../hoc';

const CoinRowPaddingVertical = 12;

const Container = styled(Row)`
  ${padding(CoinRowPaddingVertical, 19, CoinRowPaddingVertical, 15)}
  background-color: ${colors.white};
  width: 100%;
`;

const Content = styled(Column)`
  height: ${CoinIcon.size};
  margin-left: ${CoinRowPaddingVertical};
`;

const enhance = compose(
  withAccountSettings,
  withFabSendAction,
);

const CoinRow = enhance(({
  bottomRowRender,
  children,
  coinIconRender,
  containerStyles,
  contentStyles,
  highlight,
  selectedId,
  onPress,
  symbol,
  topRowRender,
  ...props
}) => (
  <Container align="center" css={containerStyles} color="red">
    <Highlight highlight={highlight}/>
    {createElement(coinIconRender, { symbol, ...props })}
    <Content flex={1} justify="space-between" css={contentStyles}>
      <Row align="center" justify="space-between">
        {topRowRender({ symbol, ...props })}
      </Row>
      <Row align="center" justify="space-between">
        {bottomRowRender({ symbol, ...props })}
      </Row>
    </Content>
    {(typeof children === 'function')
      ? children({ symbol, ...props })
      : children
    }
  </Container>
));

CoinRow.propTypes = {
  bottomRowRender: PropTypes.func,
  children: PropTypes.node,
  coinIconRender: PropTypes.func,
  containerStyles: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  contentStyles: PropTypes.string,
  onPress: PropTypes.func,
  symbol: PropTypes.string,
  topRowRender: PropTypes.func,
};

CoinRow.defaultProps = {
  coinIconRender: CoinIcon,
};

CoinRow.height = CoinIcon.size + (CoinRowPaddingVertical * 2);


export default CoinRow;
