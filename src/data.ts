export interface RocketData {
  title: string;
  ticker: string;
  totalEth?: string;
  uniswapPrice?: string;
  website: string;
  date: number;
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
        date: new Date().getTime()
      },
      {
        title: 'Project Name',
        ticker: 'Ticker',
        website: 'https://googl.co',
        date: new Date().getTime()
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
        date: new Date().getTime()
      },
      {
        title: 'Project Name',
        ticker: 'Ticker',
        website: 'https://googl.co',
        totalEth: '135 ETH Deposited',
        date: new Date().getTime()
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
        date: new Date().getTime()
      },
      {
        title: 'Project Name',
        ticker: 'Ticker',
        website: 'https://googl.co',
        uniswapPrice: 'Uniswap Price: XXX',
        date: new Date().getTime()
      }
    ]
  }
];
