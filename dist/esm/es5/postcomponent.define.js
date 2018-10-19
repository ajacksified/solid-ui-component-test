
// postcomponent: Custom Elements Define Library, ES Module/es5 Target

import { defineCustomElement } from './postcomponent.core.js';
import {
  LoginButton,
  LoginComponent,
  PostComponent,
  PostListComponent,
  ProviderSelectComponent,
  SolidFormPaneComponent
} from './postcomponent.components.js';

export function defineCustomElements(win, opts) {
  return defineCustomElement(win, [
    LoginButton,
    LoginComponent,
    PostComponent,
    PostListComponent,
    ProviderSelectComponent,
    SolidFormPaneComponent
  ], opts);
}
