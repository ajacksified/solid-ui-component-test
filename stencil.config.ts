import { Config } from '@stencil/core';
import alias from 'rollup-plugin-alias';

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
  plugins: [alias({
    solidAuth : 'node_modules/solid-auth-client/dist-lib/solid-auth-client.bundle.js',
  })],

};
