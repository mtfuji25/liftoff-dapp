import { useEffect, useState } from 'react';
import { ProjectConfig, Maybe } from 'utils/types';

export const useProjectConfig = (ipfsHash: string) => {
  const [projectConf, setProjectConf] = useState<Maybe<ProjectConfig>>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      const response = await fetch(`https://ipfs.io/ipfs/${ipfsHash}`);
      const data: ProjectConfig = await response.json();
      setProjectConf(data);
    };

    fetchConfig();
  }, [ipfsHash]);

  return { projectConf };
};
