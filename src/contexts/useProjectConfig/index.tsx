import { useEffect, useState } from 'react';
import { ProjectConfig, Maybe } from 'utils/types';

export const useProjectConfig = (ipfsHashRaw: string | undefined) => {
  const [projectConf, setProjectConf] = useState<Maybe<ProjectConfig>>(null);

  useEffect(() => {
    if (!ipfsHashRaw) {
      setProjectConf(null);
      return;
    }

    const fetchConfig = async () => {
      const ipfsHash = ipfsHashRaw.replace(/[^A-Za-z0-9]/g, '');
      const response = await fetch(`https://ipfs.io/ipfs/${ipfsHash}`);
      console.log('response',response);
      const data: ProjectConfig = await response.json();
      setProjectConf(data);
    };

    fetchConfig();
  }, [ipfsHashRaw]);

  return { projectConf };
};
