import { isNil, keys } from 'lodash';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { analytics } from '@rainbow-me/analytics';
import { AppState } from '@rainbow-me/redux/store';
import logger from 'logger';

export default function usePortfolios() {
  const portfolios = useSelector(
    ({ data: { portfolios } }: AppState) => portfolios
  );

  const trackPortfolios = useCallback(() => {
    const total = {
      assets_value: 0,
      borrowed_value: 0,
      bsc_assets_value: 0,
      deposited_value: 0,
      locked_value: 0,
      polygon_assets_value: 0,
      staked_value: 0,
      total_value: 0,
    };
    keys(portfolios).forEach(address => {
      keys(portfolios[address]).forEach(key => {
        if (!isNil(total[key as keyof typeof total])) {
          total[key as keyof typeof total] += portfolios[address][
            key as keyof typeof portfolios[typeof address]
          ]!;
        }
      });
    });
    logger.log('💰 wallet totals', JSON.stringify(total, null, 2));
    keys(total).forEach(key => {
      const data = { [key]: total[key as keyof typeof total] };
      analytics.identify(undefined, data);
    });
  }, [portfolios]);

  return {
    portfolios,
    trackPortfolios,
  };
}
