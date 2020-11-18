export interface RocketData {
  title: string;
  ticker: string;
  totalEth?: string;
  uniswapPrice?: string;
  website: string;
  date: string;
}

export interface Rocket {
  title: string;
  subtitle: string;
  data: RocketData[];
}

export const rockets: Rocket[] = [
  {
    title: '🚀Pre-Launch Rockets',
    subtitle: 'All the projects before launch. Timer countdown to Launch.',
    data: [
      {
        title: 'Project Name',
        ticker: 'Ticker',
        website: 'https://googl.co',
        date: '01/02/2021'
      },
      {
        title: 'Project Name',
        ticker: 'Ticker',
        website: 'https://googl.co',
        date: '01/03/2021'
      }
    ]
  },
  {
    title: '💥Sparking Rockets',
    subtitle:
      '24 hours from launch to when the Uniswap pools are created. Timer countdown to Spark.',
    data: [
      {
        title: 'Project Name',
        ticker: 'Ticker',
        website: 'https://googl.co',
        totalEth: '135 ETH Deposited',
        date: '01/04/2021'
      },
      {
        title: 'Project Name',
        ticker: 'Ticker',
        website: 'https://googl.co',
        totalEth: '135 ETH Deposited',
        date: '01/05/2021'
      }
    ]
  },
  {
    title: '🪐Orbiting Rockets',
    subtitle: 'Projects that are launched and sparked on LIFTOFF.',
    data: [
      {
        title: 'Project Name',
        ticker: 'Ticker',
        website: 'https://googl.co',
        uniswapPrice: 'Uniswap Price: XXX',
        date: '01/06/2021'
      },
      {
        title: 'Project Name',
        ticker: 'Ticker',
        website: 'https://googl.co',
        uniswapPrice: 'Uniswap Price: XXX',
        date: '01/07/2021'
      }
    ]
  }
];
