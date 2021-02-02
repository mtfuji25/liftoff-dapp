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
            What is Liftoff?
          </StyledQuestion>
          <StyledAnswer>
            Liftoff is a fully self-service ERC20 launchpad dapp with integrated insurance. It allows any project
developer to create a new token, token sale, insurance scheme, and marketing partnerships with just
one click of a button. For project developers, it is the fastest and simplest way to create a new token
and reach a wide audience. For sale buyers, it is the safest presale platform and the only one that
insures deposits.
          </StyledAnswer>
          
          <StyledQuestion>
            Why is Liftoff important?
          </StyledQuestion>
          <StyledAnswer>
            Multiple types of technologies emerged in 2020 to protect token sale buyers from scams. The first
platforms provided locked liquidity. However, buyers of tokens with locked liquidity were still
vulnerable to minting attacks. Lid’s first presale platform, Lid Simplified, stopped minting and many
other early attacks on token sales. However, Lid Simplified is vulnerable to soft exit scams, where
developers abandon their project instead of growing it. In response, Lid developed Liftoff in the first
few weeks of 2021 to stop soft exit scams.
          </StyledAnswer>

          <StyledQuestion>
            What is Crash Insurance?
          </StyledQuestion>
          <StyledAnswer>
            Crash Insurance protects presale buyers by refunding their deposited Eth if the price of the token falls
below the initial sale rate. Crash Insurance provides 100% coverage for the first week. For the next 10
weeks, it provides insurance at a gradually reduced amount but at the same, original sale rate. Crash
Insurance thus guarantees a hard price floor during the first week, and a soft price floor for the next 10
weeks.
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
            How do I get ETH?
          </StyledQuestion>
          <StyledAnswer>
            Unfortunately, financial regulation makes acquiring cryptocurrencies like ETH quite difficult.
You will need to consult the regulations in your particular country, and find an exchange where
you can deposit your native currency and receive ETH. Afterwards, you can transfer your ETH
to your metamask wallet to use Liftoff. Ask in the Lid Protocol’s telegram or Discord channels
for assistance.
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