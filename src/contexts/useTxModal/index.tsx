import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer
} from 'react';

const ModalContext = createContext<any[]>([]);

const useModalContext = () => useContext(ModalContext);

const initialState = () => ({
  txHash: '',
  txStatus: 0
});

const UPDATE_TX_HASH = 'modal/UPDATE_TX_HASH';
const UPDATE_TX_STATUS = 'modal/UPDATE_TX_STATUS';

const reducer = (
  state: any,
  { type, payload }: { type: string; payload: { txHash: string, txStatus: number } }
) => {
  const { txHash, txStatus } = payload;
  switch (type) {
    case UPDATE_TX_HASH:
      return {
        ...state,
        txHash
      };
    case UPDATE_TX_STATUS:
      return {
        ...state,
        txStatus
        };
    default: {
      throw new Error(`Unknown action type ${type}`);
    }
  }
};

export function TxModalProvider({ children }: any) {
  const [state, dispatch] = useReducer(reducer, undefined, initialState);

  const updateTxHash = useCallback((payload: any) => {
    dispatch({
      type: UPDATE_TX_HASH,
      payload
    });
  }, []);

  const updateTxStatus = useCallback((payload: any) => {
    dispatch({
      type: UPDATE_TX_STATUS,
      payload
    });
  }, []);

  return (
    <ModalContext.Provider
      value={useMemo(() => [state, { updateTxHash, updateTxStatus }], [state, updateTxHash, updateTxStatus])}
    >
      {children}
    </ModalContext.Provider>
  );
}

export const useTxModal = () => {
  const [state, { updateTxHash, updateTxStatus }] = useModalContext();

  const toggleTxModal = async (provider: any, txHash: string) => {
    updateTxHash(txHash);
    updateTxStatus(2);
    await provider.waitForTransaction(txHash);
    updateTxStatus(3);
  };

  const onClose = () => {
    updateTxHash('');
    updateTxStatus(0);
  };

  return [state, updateTxStatus, toggleTxModal, onClose];
};
  