import { Contract, Wallet, ethers } from 'ethers';
import { TransactionReceipt } from '@ethersproject/abstract-provider/lib/index';

const liftoffRegistrationsAbi = [
  'event TokenIpfsHash(uint256 tokenId, string ipfsHash)',
  'function registerProject(string calldata ipfsHash, uint256 launchTime, uint256 softCap, uint256 hardCap, uint256 totalSupplyWad, string calldata name, string calldata symbol) external',
  'function setSoftCapTimer(uint256 _seconds) public',
  'function setLaunchTimeWindow(uint256 _min, uint256 _max) public',
  'function setLiftoffEngine(ILiftoffEngine _liftoffEngine) public'
];

class LiftoffRegistrationService {
  contract: Contract;
  signerAddress: Maybe<string>;
  provider: any;

  constructor(address: string, provider: any, signerAddress: Maybe<string>) {
    if (signerAddress) {
      const signer: Wallet = provider.getSigner();
      this.contract = new ethers.Contract(
        address,
        liftoffRegistrationsAbi,
        provider
      ).connect(signer);
    } else {
      this.contract = new ethers.Contract(
        address,
        liftoffRegistrationsAbi,
        provider
      );
    }
    this.signerAddress = signerAddress;
    this.provider = provider;
  }

  get address(): string {
    return this.contract.address;
  }

  registerProject = async (
    ipfsHash: string,
    launchTime: string,
    softCap: string,
    hardCap: string,
    totalSupplyWad: string,
    name: string,
    symbol: string
  ): Promise<TransactionReceipt> => {
    const txObject = await this.contract.registerProject(
      ipfsHash,
      launchTime,
      softCap,
      hardCap,
      totalSupplyWad,
      name,
      symbol
    );

    return this.provider.waitForTransaction(txObject.hash);
  };
}

export { LiftoffRegistrationService };
