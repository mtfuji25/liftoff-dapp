import * as yup from 'yup';

export const LaunchpadSchema = yup.object().shape({
  projectName: yup.string().required('Project name is required'),
  tokenTicker: yup.string().required('Token ticker is required'),
  projectDescription: yup.string().required('Project description is required'),
  logo: yup.mixed().required('Logo is required'),
  websiteLink: yup
    .string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9-]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#-]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Website URL is invalid'
    )
    .required('Website URL is required'),
  dappLink: yup
    .string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9-]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#-]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Dapp URL is invalid'
    )
    .required('Dapp URL is required'),
  whitepaperLink: yup
    .string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9-]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#-]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Whitepaper URL is invalid'
    )
    .required('Whitepaper URL is required'),
  discord: yup.string(),
  telegram: yup.string(),
  twitter: yup.string(),
  facebook: yup.string(),
  currentDate: yup.date(),
  // date: yup.date().when(''),
  time: yup.string().required('Launch time is required'),
  softCap: yup
    .number()
    .typeError('Soft cap must be a number')
    .required('Soft cap is required'),
  hardCap: yup
    .number()
    .typeError('Hardcap must be a number')
    .required('Hard cap is required'),
  totalSupply: yup
    .number()
    .typeError('Total supply must be a number')
    .required('Total supply is required')
});
