import { Contract, Wallet, ethers } from 'ethers';

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
}

export { LiftoffRegistrationService };
