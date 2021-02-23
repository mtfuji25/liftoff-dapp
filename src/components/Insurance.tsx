import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import { utils, BigNumber } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';

import Button from 'components/Button';
import { TYPE, StyledRocketCard } from 'theme';
import InputWithAddon from 'components/InputAddon';

import { TokenInsurance } from 'utils/types';
import {
  useConnectedWeb3Context,
  useContracts,
  useToken,
  useTxModal
} from 'contexts';
import { formatBigNumber } from 'utils';
import { TxStatus } from 'utils/enums';

const CTA = styled.div`
  display: flex;
  align-items: center;
  padding-top: 1rem;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    justify-content: space-between;
  `}
`;

const RowFlex = styled.div(
  {
    display: 'flex',
    justifyContent: 'space-between'
  },
  ({ theme }) =>
    theme.mediaWidth.upToSmall({
      flexDirection: 'column',
      padding: '10px 0'
    })
);

const Redeem = styled.div({
  marginTop: 20
});

const FlexWrap = styled.div(
  {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px'
  },
  ({ theme }) =>
    theme.mediaWidth.upToSmall({
      flexDirection: 'column',
      padding: '10px 0',
      alignItems: 'flex-start'
    })
);

const StyledButton = styled(Button)``;

const InsuranceContainer = styled.div(({ theme }) =>
  theme.mediaWidth.upToSmall({
    display: 'flex',
    justifyContent: 'space-around',
    width: '-webkit-fill-available'
  })
);

const InsuranceButton = styled(StyledButton)(
  {
    margin: '0 1rem'
  },
  ({ theme }) =>
    theme.mediaWidth.upToSmall({
      margin: '10px 0 0 0'
    })
);

interface IProps {
  tokenInsurance: Maybe<TokenInsurance>;
  symbol: string;
  tokenSaleId: string;
}

const Insurance: FC<IProps> = ({ tokenSaleId, tokenInsurance, symbol }) => {
  const isInsuranceStarted = !!(tokenInsurance && tokenInsurance.isInitialized);
  const context = useConnectedWeb3Context();
  const [, updateTxStatus, toggleTxModal] = useTxModal();

  const { liftoffInsurance, xEth } = useContracts(context);
  const { token: xToken } = useToken(context, tokenInsurance?.deployed || '');

  const [isApprovedTokens, setApprovedTokens] = useState(false);
  const [redeemAmount, setRedeemAmount] = useState('0');
  const [xEthBalance, setXEthBalance] = useState('0');

  const { account } = context;

  useEffect(() => {
    if (!xToken || !account || !liftoffInsurance) {
      return;
    }

    const checkApprovedTokens = async () => {
      const balance = await xToken.getBalanceOf(account);
      const isEnoughAllowance = await xToken.hasEnoughAllowance(
        account,
        liftoffInsurance.address,
        balance
      );
      setApprovedTokens(isEnoughAllowance);
    };

    checkApprovedTokens();
  }, [xToken, account, liftoffInsurance]);

  useEffect(() => {
    if (!xEth || !account) {
      return;
    }
    const getXEthBalance = async () => {
      const balance = await xEth.getBalanceOf(account);
      setXEthBalance(balance);
    };

    getXEthBalance();
  }, [xEth, account]);

  const onClickStartInsurance = async () => {
    if (!liftoffInsurance || isInsuranceStarted) {
      return;
    }
    try {
      const txHash = await liftoffInsurance.createInsurance(tokenSaleId);
      await toggleTxModal(liftoffInsurance.provider, txHash);
    } catch (error) {
      alert(error.message || error);
      console.log(error);
    }
  };

  const onClickApprove = async () => {
    if (!xToken || !liftoffInsurance || isApprovedTokens) {
      return;
    }

    try {
      await xToken.approveUnlimited(liftoffInsurance.address);
    } catch (error) {
      alert(error.message || error);
      console.log(error);
    }
  };

  const onClickMax = async () => {
    if (!xToken || !account) {
      return;
    }
    try {
      const balance = await xToken.getBalanceOf(account);
      setRedeemAmount(formatUnits(balance, 18));
    } catch (error) {
      alert(error.message || error);
      console.log(error);
    }
  };

  const onClickRedeem = async () => {
    if (!liftoffInsurance || !redeemAmount || redeemAmount === '0') {
      return;
    }

    try {
      const txHash = await liftoffInsurance.redeem(tokenSaleId, redeemAmount);
      await toggleTxModal(liftoffInsurance.provider, txHash);
    } catch (error) {
      console.log(error);
      updateTxStatus(TxStatus.TX_ERROR);
    }
  };

  const onChangeRedeemAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isNaN(Number(event.target.value))) {
      setRedeemAmount(event.target.value);
    }
  };

  const xEthEstimation =
    tokenInsurance && tokenInsurance.tokensPerEthWad && redeemAmount
      ? BigNumber.from(utils.parseEther(redeemAmount))
          .mul(BigNumber.from(utils.parseEther('1')))
          .div(BigNumber.from(tokenInsurance.tokensPerEthWad))
          .toString()
      : '0';

  const percent =
    tokenInsurance &&
    tokenInsurance.totalIgnited &&
    tokenInsurance.claimedXEth &&
    !BigNumber.from(tokenInsurance.totalIgnited).isZero()
      ? BigNumber.from(tokenInsurance.totalIgnited)
          .sub(BigNumber.from(tokenInsurance.claimedXEth))
          .mul(BigNumber.from('1000'))
          .div(BigNumber.from(tokenInsurance.totalIgnited))
          .toNumber() / 10
      : '0';

  return (
    <StyledRocketCard>
      <RowFlex>
        <TYPE.LargeHeader>Insurance</TYPE.LargeHeader>
        <TYPE.Body data-tip data-for="insurance" color="primary1">
          What is LIFTOFF Insurance
        </TYPE.Body>
      </RowFlex>
      <TYPE.Body>
        Redeem {symbol} for original sale price with 2% fee.
      </TYPE.Body>
      {!isInsuranceStarted && (
        <CTA>
          <StyledButton onClick={onClickStartInsurance}>
            Start Insurance
          </StyledButton>
        </CTA>
      )}
      {isInsuranceStarted && (
        <TYPE.Body color="blue1">Percentage remaining: {percent}%</TYPE.Body>
      )}
      {isInsuranceStarted && !isApprovedTokens && (
        <>
          <TYPE.Body fontWeight="bold" marginBottom="0.5rem" marginTop="1rem">
            Approve the insurance contract to redeem your tokens
          </TYPE.Body>
          <CTA>
            <StyledButton onClick={onClickApprove}>Approve</StyledButton>
          </CTA>
        </>
      )}
      {isInsuranceStarted && isApprovedTokens && (
        <Redeem>
          <TYPE.Body fontWeight="bold">Amount of {symbol} to Redeem</TYPE.Body>
          <FlexWrap>
            <InputWithAddon
              placeholder="0"
              text={symbol}
              type="text"
              value={redeemAmount}
              onChange={(event) => onChangeRedeemAmount(event)}
            />
            <InsuranceContainer>
              <InsuranceButton onClick={onClickMax}>MAX</InsuranceButton>
              <InsuranceButton onClick={onClickRedeem}>Redeem</InsuranceButton>
            </InsuranceContainer>
          </FlexWrap>
          <TYPE.Body color="blue1">
            You will get {utils.formatEther(xEthEstimation)} xETH (Current xETH
            Balance: {utils.formatEther(xEthBalance)})
          </TYPE.Body>
        </Redeem>
      )}

      <ReactTooltip id="insurance">
        <p>
          Liftoff Insurance allows you to redeem your tokens at the presale
          launch price. It's useful if the <br /> value of your tokens on
          Uniswap falls below the presale launch price. You can then deposit
          your
          <br /> tokens here, into the Insurance contract, and get your eth back
          minus a 2% fee. If enough of the <br /> Insurance is claimed in the
          first week, the Insurance contract will unwind the entire sale, so
          that <br /> all tokens can be redeemed for the original ETH.
        </p>
        <p>
          After the first week, the Insurance availability falls, but is still
          available for 10 weeks. However, the <br /> sale cannot be unwound and
          if the Insurance fund is exhausted, no more claims can be made.
        </p>
      </ReactTooltip>
    </StyledRocketCard>
  );
};

export default Insurance;
