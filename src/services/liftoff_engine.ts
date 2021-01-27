import { Contract, Wallet, ethers, utils } from 'ethers';

const liftoffEnginesAbi = [
  'event LaunchToken(uint256 tokenId, uint256 startTime, uint256 endTime, uint256 softCap, uint256 hardCap, uint256 totalSupply, string name, string symbol, address dev)',
  'event Spark(uint256 tokenId, address deployed, uint256 rewardSupply)',
  'event Ignite(uint256 tokenId, address igniter, uint256 toIgnite)',
  'event ClaimReward(uint256 tokenId, address igniter, uint256 reward)',
  'event ClaimRefund(uint256 tokenId, address igniter)',
  'function setLiftoffSettings(ILiftoffSettings liftoffSettings) public',
  'function launchToken(uint256 startTime, uint256 endTime, uint256 softCap, uint256 hardCap,uint256 totalSupply, string calldata name, string calldata symbol, address projectDev) external returns (uint256 tokenId)',
  'function ignite(uint256 _tokenSaleId, address _for, uint256 _amountXEth) external',
  'function igniteEth(uint256 _tokenSaleId) external payable',
  'function undoIgnite(uint256 _tokenSaleId) external payable',
  'function claimReward(uint256 _tokenSaleId, address _for) external',
  'function spark(uint256 _tokenSaleId) external',
  'function claimRefund(uint256 _tokenSaleId, address _for) external',
  'function getTokenSale(uint256 _tokenSaleId) external view returns (uint256 startTime, uint256 endTime, uint256 softCap, uint256 hardCap, uint256 totalIgnited, uint256 totalSupply, uint256 rewardSupply, address projectDev, address deployed, bool isSparked)',
  'function getTokenSaleForInsurance(uint256 _tokenSaleId) external view returns (uint256 totalIgnited, uint256 rewardSupply, address projectDev, address deployed)',
  'function isSparkReady(uint256 endTime, uint256 totalIgnited, uint256 hardCap, uint256 softCap, bool isSparked) public view returns (bool)',
  'function isRefunding(uint256 endTime, uint256 softCap, uint256 totalIgnited) public view returns (bool)',
  'function getReward(uint256 ignited, uint256 rewardSupply, uint256 totalIgnited) public pure returns (uint256 reward)',
  'function getAmountToIgnite(uint256 amountXEth, uint256 hardCap, uint256 totalIgnited) public pure returns (uint256 toIgnite)'
];

class LiftoffEngineService {
  contract: Contract;
  signerAddress: Maybe<string>;
  provider: any;

  constructor(address: string, provider: any, signerAddress: Maybe<string>) {
    if (signerAddress) {
      const signer: Wallet = provider.getSigner();
      this.contract = new ethers.Contract(
        address,
        liftoffEnginesAbi,
        provider
      ).connect(signer);
    } else {
      this.contract = new ethers.Contract(address, liftoffEnginesAbi, provider);
    }
    this.signerAddress = signerAddress;
    this.provider = provider;
  }

  get address(): string {
    return this.contract.address;
  }

  ignite = async (tokenSaleId: string, address: string, amount: string): Promise<string> => {
    const txObject = await this.contract.igniteEth(tokenSaleId, address, amount);

    return txObject.hash;
  };

  igniteEth = async (tokenSaleId: string, amount: string): Promise<string> => {
    const txObject = await this.contract.igniteEth(tokenSaleId, {
      value: utils.parseEther(amount)
    });

    return txObject.hash;
  };

  undoIgnite = async (tokenSaleId: string): Promise<string> => {
    const txObject = await this.contract.undoIgnite(tokenSaleId, {});

    return txObject.hash;
  };

  spark = async (tokenSaleId: string): Promise<string> => {
    const txObject = await this.contract.spark(tokenSaleId);

    return txObject.hash;
  };

  claimReward = async (
    tokenSaleId: string,
    address: string
  ): Promise<string> => {
    const txObject = await this.contract.claimReward(tokenSaleId, address);

    return txObject.hash;
  };

  claimRefund = async (
    tokenSaleId: string,
    address: string
  ): Promise<string> => {
    const txObject = await this.contract.claimRefund(tokenSaleId, address);

    return txObject.hash;
  };
}

export { LiftoffEngineService };
