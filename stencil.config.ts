import { Config } from '@stencil/core';
import copy from 'rollup-plugin-copy-glob';
import externalGlobals from 'rollup-plugin-external-globals';

const solidAuthClient = 'solid-auth-client/dist-lib/solid-auth-client.bundle.js';

export const config: Config = {
  namespace: 'postcomponent',
  outputTargets:[
    {
      type: 'dist'
    },
    {
      type: 'www',
      serviceWorker: null
    }
  ],
  hashFileNames: false,
  plugins: [
    copy([
      { files: `${require.resolve(solidAuthClient)}*`, dest: 'dist' },
      { files: `${require.resolve(solidAuthClient)}*`, dest: 'www/assets' },
    ]),
    externalGlobals({
      'solid-auth-client': 'solid.auth',
    })
  ],
};
