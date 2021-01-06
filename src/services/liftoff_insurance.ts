import { Contract, Wallet, ethers, utils } from 'ethers';
import { TransactionReceipt } from '@ethersproject/abstract-provider/lib/index';

const liftoffInsuranceAbi = [
  'event Register(uint256 tokenId)',
  'event ClaimBaseFee(uint256 tokenId, uint256 baseFee)',
  'event Claim(uint256 tokenId, uint256 xEthClaimed, uint256 tokenClaimed)',
  'event Redeem(uint256 tokenId, uint256 redeemEth)',
  'event CreateInsurance(uint256 tokenId, uint256 startTime, uint256 tokensPerEthWad, uint256 baseXEth, uint256 baseTokenLidPool, uint256 totalIgnited, address deployed, address dev)',
  'function setLiftoffSettings(ILiftoffSettings liftoffSettings) public',
  'function register(uint256 tokenSaleId) external',
  'function redeem(uint256 tokenSaleId, uint256 amount) external',
  'function claim(uint256 tokenSaleId) external',
  'function createInsurance(uint256 tokenSaleId) external',
  'function isInsuranceExhausted(uint256 currentTime, uint256 startTime, uint256 insurancePeriod, uint256 xEthValue, uint256 baseXEth, uint256 redeemedXEth, bool isUnwound) public pure returns (bool)',
  'function canCreateInsurance(uint256 tokenSaleId) public view returns (bool)',
  'function getRedeemValue(uint256 amount, uint256 tokensPerEthWad) public pure returns (uint256)',
  'function getTotalTokenClaimable(uint256 baseTokenLidPool, uint256 cycles, uint256 claimedTokenLidPool) public view returns (uint256)',
  'function getTotalXethClaimable(uint256 totalIgnited, uint256 redeemedXEth, uint256 claimedXEth, uint256 cycles) public view returns (uint256)'
];

class LiftoffInsuranceService {
  contract: Contract;
  signerAddress: Maybe<string>;
  provider: any;

  constructor(address: string, provider: any, signerAddress: Maybe<string>) {
    if (signerAddress) {
      const signer: Wallet = provider.getSigner();
      this.contract = new ethers.Contract(
        address,
        liftoffInsuranceAbi,
        provider
      ).connect(signer);
    } else {
      this.contract = new ethers.Contract(
        address,
        liftoffInsuranceAbi,
        provider
      );
    }
    this.signerAddress = signerAddress;
    this.provider = provider;
  }

  get address(): string {
    return this.contract.address;
  }

  createInsurance = async (
    tokenSaleId: string
  ): Promise<TransactionReceipt> => {
    const txObject = await this.contract.createInsurance(tokenSaleId);

    return this.provider.waitForTransaction(txObject.hash);
  };

  redeem = async (
    tokenSaleId: string,
    amount: string
  ): Promise<TransactionReceipt> => {
    const txObject = await this.contract.redeem(
      tokenSaleId,
      utils.parseEther(amount)
    );

    return this.provider.waitForTransaction(txObject.hash);
  };

  claim = async (tokenSaleId: string): Promise<TransactionReceipt> => {
    const txObject = await this.contract.claim(tokenSaleId);

    return this.provider.waitForTransaction(txObject.hash);
  };
}

export { LiftoffInsuranceService };
