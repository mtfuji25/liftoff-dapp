import React from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer';
import Disclaimer from '../components/Disclaimer';
import CopyRight from '../components/Copyright';

import {
  StyledContainer as UnstyledContainer,
  StyledBody,
} from '../theme';

const StyledContainer = styled(UnstyledContainer)({}, ({ theme }) =>
  theme.mediaWidth.upToExtraSmall({
    maxWidth: '100vw !important'
  })
);

const StyledQuestion = styled.h3(
  {
    textAlign: 'left',
    width: '100%',
    maxWidth:'960px',
    padding: '0px 10px',
    marginBottom: '0px'
  },
  ({theme}) => ({
    color: theme.black
  })
)

const StyledAnswer = styled.p(
  {
    textAlign: 'left',
    width: '100%',
    maxWidth:'960px',
    padding: '10px 10px 20px;',
    marginTop: '0px',
    borderBottom: 'solid 1px black'
  },
  ({theme}) => ({
    color: theme.black
  })
)

const Faq = () => {
  return(
    <>
      <StyledBody color="bg3">
        <StyledContainer sWidth="85vw">

          <StyledQuestion>
            Links
          </StyledQuestion>
          <StyledAnswer>
            dApp: <a href="https://liftoff.eth.link/">liftoff.eth.link/</a> <br/>
            Whitepaper: <a href="https://whitepaper.liftoff.eth.link/">whitepaper.liftoff.eth.link</a> <br/>
            Telegram: <a href="https://t.me/LiftoffETH">t.me/LiftoffETH</a><br/>
            Announcements: <a href="https://t.me/LiftOffNews">t.me/LiftOffNews</a><br/>
            Twitter: <a href="https://twitter.com/LiftoffEth">twitter.com/LiftoffEth</a><br/>
            Medium: <a href="https://liftoffeth.medium.com/">liftoffeth.medium.com</a><br/>
            Discord: <a href="https://discord.gg/APz5npdWgv">discord.gg/APz5npdWgv</a><br/>
            Opensea: <a href="https://opensea.io/collection/lfty">opensea.io/collection/lfty</a><br/>
          </StyledAnswer>

          <StyledQuestion>
            What is Liftoff?
          </StyledQuestion>
          <StyledAnswer>
            LIFTOFF is a fully decentralized & self service ERC20 Launchpad that creates both the new Token & the Sale in one transaction. It allows any project
developer to create a new token, token sale, insurance scheme, and marketing partnerships with just
one click of a button. It does so through Three Innovations that improve over the previous Launchpads run by Lid Protocol.<br/>
☞ Crash Insurance<br/>
☞ Gradual Payments<br/>
☞ Free Liquidity
          </StyledAnswer>

          <StyledQuestion>
            What is LIFT?
          </StyledQuestion>
          <StyledAnswer>
            LIFT is the Platform Token for LIFTOFF and is designed to congeal a community around LIFTOFF to both earn benefits & review LIFTOFF sales.<br/>
            LIFT has 3 primary benefits to Members. Currently we have Tier 1 which has the following Benefits and will receive all future Benefits.
☞ 3% airdrop distributed proportionately to Members based on LIFT holdings from all LIFT sales.<br/>
☞ Access to private channels with Research, Discussion, & AMAs for projects both on LIFTOFF and not.<br/>
☞ Voting rights to verify LIFTOFF sales of unusually high Quality as a signal to the crypto community.<br/>
Tier 1 has the following requirements all of which must be maintained:<br/>
☞ Wallet balance of 1 LIFT,<br/>
☞ Good Standing in the community, and<br/>
☞ A whitelisted Discord account with Ethereum address.<br/>
          </StyledAnswer>

          <StyledQuestion>
            How does a project launch on Liftoff?
          </StyledQuestion>
          <StyledAnswer>
            The project first fills out the required informational disclosures at liftoff.eth.link such as Whitepaper, Social Media, dApp Link, & Website.
            These are uploaded automatically by LIFTOFF to IPFS silently. Second, they select their softcap, hardcap, and Token quantity.
            Finally they click the "Launch" button and sign the Ethereum transaction.<br/>
            Alternatively, if the Project wishes to meet the LIFT community and receive a vote for verification, they must reach out to the LIFT team first.
          </StyledAnswer>

          <StyledQuestion>
            What restrictions are there to launch on Liftoff?
          </StyledQuestion>
          <StyledAnswer>
            LIFTOFF is fully self service, so there are no limitations. The only cost is the Gas for the Launch transaction.
            However, LIFT Club Members may vote to verify Sales that are of exceptional quality as a signal to the wider world.
            LIFTOFF is also radically decentralized. The dApp is hosted on IPFS, the domain on ENS, and the smart contracts on Ethereum.
            Accordingly the platform is uncensorable. However, before calling Ignite, users must sign an Attestation that they are not
            in the USA or any other unfriendly jurisdiction.
          </StyledAnswer>

          <StyledQuestion>
            What is Crash Insurance?
          </StyledQuestion>
          <StyledAnswer>
            Crash Insurance protects presale buyers by refunding their deposited Eth if the price of the token falls
below the initial sale rate. Crash Insurance covers 100% of Tokens for the first week. For the next 10
weeks, it provides insurance for a gradually reducing percentage of the supply but at the same, original sale rate. Crash
Insurance thus guarantees a hard price floor during the first week, and a soft price floor for the next 10
weeks. All Tokens are covered no matter the source. There is a 2% fee for claiming insurance<br/>
LIFTOFF is fully self insured. First, during the first week if excessive redemptions are made the Sale is able to unwind itself.
Second, Developers & Promoters are not paid in Tokens, only ETH (Gradual Payments). This ETH is distributed over 10% over 10 weeks but Insurance Redemptions are removed from this pay.
          </StyledAnswer>

          <StyledQuestion>
            What is xETH?
          </StyledQuestion>
          <StyledAnswer>
            Liftoff is able to distribute 10% of the deposited eth, instead of 100%, all without ever risking
any deposits. This seemingly impossible feat is accomplished through xETH, a type of
wrapped ether. xETH is derived from the ERC-31337 technology developed by
Rootkit.finance and allows the issuance of xETH backed by locked liquidity. More details are
available for xETH at https://xlocker.eth.link and more information about ERC-31337 is
available at https://rootkit.finance.
          </StyledAnswer>

          <StyledQuestion>
            How safe is Liftoff?
          </StyledQuestion>
          <StyledAnswer>
            Liftoff is the third presale platform developed by Lid Protocol. None of Lid’s contracts have
ever been hacked or lost liquidity. This is accomplished by diligent code reviews combined with
99%+ automated testing. Liftoff is audited by Halborn, one of the top cybersecurity firms
globally with a history servicing great projects like Coinbase and Bancor.
          </StyledAnswer>

          <StyledQuestion>
            What types of Rugs or Scams does LIFTOFF protect against?
          </StyledQuestion>
          <StyledAnswer>
            Hard Rugs/Slow Rugs, where the Liquidity is removed. These are impossible as LIFTOFF creates permanently locked liquidity after launch.<br/>
            Strong Soft Rugs, where the Developer deletes their Social Media Channels. These are fully protected against in the first week by Crash Insurance and by a reduced amount for the following 9 weeks. Additionally, since Developers are paid at 10%/week, they are heavily incentivized to maintain the project. That said, if a Developer appears dishonest after Launch the first week is the best time to Sell or Redeem for insurance.<br/>
            Weak Soft Rugs, where the Developers are lazy. These are somewhat protected against by Crash Insurance but Laziness is not something which can be detected by technology. The primary protection against Indolence is community vetting with LIFT Member Verification.<br/>
            Fake Rugs, where the Developers create a fake token. The only protection against these is the required informational disclosures & Crash Insurance. It is best to be cautious to avoid the 2% insurance fee.
          </StyledAnswer>

          <StyledQuestion>
            How long do Liftoff sales last?
          </StyledQuestion>
          <StyledAnswer>
            All sales last 5 days. Sales must be launched at least 2 days before their start time.
          </StyledAnswer>

          <StyledQuestion>
            How often is Eth distributed to project devs?
          </StyledQuestion>
          <StyledAnswer>
            Most sales immediately give the project developers 100% of the Eth, even if the token price falls. With
Liftoff, the developers and promoters receive their eth at 10% per week for 10 weeks. This encourages them to
maintain an active community for at least that amount of time, and discourages bad actors looking for
a quick profit. Additionally, every insurance redemption reduces the amount of eth project developers 
get. Since insurance redemptions occur whenever the token price falls below the presale price, the
project developers are heavily incentivized to prevent the price from crashing for the full 10 weeks.
          </StyledAnswer>

          <StyledQuestion>
            How are ETH and tokens distributed for Liftoff token sales?
          </StyledQuestion>
          <StyledAnswer>
            Eth allocations, as % of raise:<br/>
            59.91% liquidity<br/>
            45.00% dev fund (for the project raising funds)<br/>
            3.09% lid fee<br/>
            2.00% insurance fee<br/>
            ———————<br/>
            TOTAL: 110% raised<br/><br/>
            Token allocations, as % of total supply:<br/>
            37.44% liquidity<br/>
            62.56% depositors<br/>
            ———————<br/>
            TOTAL: 100% of supply
          </StyledAnswer>

          <StyledQuestion>
            What is Liftoff Partnerships?
          </StyledQuestion>
          <StyledAnswer>
            Liftoff integrates marketing partners directly into the platform in a decentralized way. Entirely through
Liftoff’s smart contracts, projects request partnerships which can then be accepted by influencer
networks and marketing agencies. These agencies are then paid directly from the developers Eth.
Since the amount of developer’s Eth, and thus the agency’s pay, is reduced by insurance
redemptions, it means agencies are incentivized to promote good projects. Meanwhile the automated
payment mechanism reduces agency’s risks, by guaranteeing that if their promotion is successful and
the token price is maintained, they will receive an excellent reward.
          </StyledAnswer>

          <StyledQuestion>
            How do I join Liftoff Partnerships?
          </StyledQuestion>
          <StyledAnswer>
            Ask in the Lid discord or telegram chats to apply. You will need a website, logo, and a 2-3
sentence description of your service. Liftoff primarily accepts influencer networks and
marketing agencies.
          </StyledAnswer>

          <Disclaimer color="#232628" />
          <CopyRight mt="1.375rem" color="#232628" />
        </StyledContainer>
      </StyledBody>
      <Footer noBackground={false} isSimple={true} />
    </>
  )
}

export default Faq;