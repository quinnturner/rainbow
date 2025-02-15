import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useCallback, useContext, useEffect } from 'react';
import RecyclerAssetList2 from '../components/asset-list/RecyclerAssetList2';
import { SheetHandle } from '../components/sheet';
import { ModalContext } from '../react-native-cool-modals/NativeStackView';
import { Box } from '@rainbow-me/design-system';
import { UniqueAsset } from '@rainbow-me/entities';
import { useWalletSectionsData } from '@rainbow-me/hooks';

export default function SelectUniqueTokenSheet() {
  const { params } = useRoute<any>();
  const { goBack } = useNavigation();
  const { layout } = useContext(ModalContext) || {};

  useEffect(() => {
    setTimeout(() => layout?.(), 300);
  }, [layout]);

  const handlePressUniqueToken = useCallback(
    (asset: UniqueAsset) => {
      params.onSelect?.(asset);
      goBack();
    },
    [goBack, params]
  );
  const { briefSectionsData: walletBriefSectionsData } = useWalletSectionsData({
    type: 'select-nft',
  });

  return (
    <Box
      background="body"
      height="full"
      paddingTop={android ? undefined : '34px'}
      {...(android && { borderTopRadius: 30 })}
    >
      <Box alignItems="center" justifyContent="center" paddingVertical="10px">
        {/* @ts-expect-error JavaScript component */}
        <SheetHandle />
      </Box>
      <RecyclerAssetList2
        disablePullDownToRefresh
        onPressUniqueToken={handlePressUniqueToken}
        type="select-nft"
        walletBriefSectionsData={walletBriefSectionsData}
      />
    </Box>
  );
}
