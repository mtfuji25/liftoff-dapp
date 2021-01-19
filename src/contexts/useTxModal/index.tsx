import React, {
  createContext,
  useCallback,
  useContext,
  useReducer
} from 'react';
import { TxStatus } from 'utils/enums';

export interface ITxModalState {
  txHash: string;
  txStatus: TxStatus;
}

const ModalContext = createContext<any[]>([]);

const useModalContext = () => useContext(ModalContext);

const initialState = () => ({
  txHash: '',
  txStatus: TxStatus.TX_INITIAL
});

const UPDATE_TX_HASH = 'modal/UPDATE_TX_HASH';
const UPDATE_TX_STATUS = 'modal/UPDATE_TX_STATUS';

const reducer = (
  state: ITxModalState,
  { type, payload }: { type: string; payload: string | TxStatus }
): ITxModalState => {
  switch (type) {
    case UPDATE_TX_HASH:
      return {
        ...state,
        txHash: payload as string
      };
    case UPDATE_TX_STATUS:
      return {
        ...state,
        txStatus: payload as TxStatus
      };
    default: {
      return state;
    }
  }
};

export function TxModalProvider({ children }: any) {
  const [state, dispatch] = useReducer(reducer, initialState(), initialState);

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
    <ModalContext.Provider value={[state, { updateTxHash, updateTxStatus }]}>
      {children}
    </ModalContext.Provider>
  );
}

export const useTxModal = () => {
  const [state, { updateTxHash, updateTxStatus }] = useModalContext();

  const toggleTxModal = async (provider: any, txHash: string) => {
    updateTxHash(txHash);
    updateTxStatus(TxStatus.TX_SENT);
    await provider.waitForTransaction(txHash);
    updateTxStatus(TxStatus.TX_SUCCESS);
  };

  const onClose = () => {
    updateTxHash('');
    updateTxStatus(TxStatus.TX_INITIAL);
  };

  return [state, updateTxStatus, toggleTxModal, onClose];
};
