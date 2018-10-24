/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import './stencil.core';




export namespace Components {

  interface SolidAuth {}
  interface SolidAuthAttributes extends StencilHTMLAttributes {}

  interface SolidLoginPopup {
    'popup': string;
  }
  interface SolidLoginPopupAttributes extends StencilHTMLAttributes {
    'onAuthenticated'?: (event: CustomEvent) => void;
    'popup'?: string;
  }

  interface SolidLogoutPopup {
    'popup': string;
  }
  interface SolidLogoutPopupAttributes extends StencilHTMLAttributes {
    'popup'?: string;
  }

  interface SolidLogin {
    'callback': string;
  }
  interface SolidLoginAttributes extends StencilHTMLAttributes {
    'callback'?: string;
  }

  interface SolidProviderSelect {}
  interface SolidProviderSelectAttributes extends StencilHTMLAttributes {
    'onProviderChanged'?: (event: CustomEvent) => void;
  }

  interface SolidForm {}
  interface SolidFormAttributes extends StencilHTMLAttributes {}

  interface PostCreate {
    'webid': string;
  }
  interface PostCreateAttributes extends StencilHTMLAttributes {
    'webid'?: string;
  }

  interface PostList {
    'webid': string;
  }
  interface PostListAttributes extends StencilHTMLAttributes {
    'webid'?: string;
  }
}

declare global {
  interface StencilElementInterfaces {
    'SolidAuth': Components.SolidAuth;
    'SolidLoginPopup': Components.SolidLoginPopup;
    'SolidLogoutPopup': Components.SolidLogoutPopup;
    'SolidLogin': Components.SolidLogin;
    'SolidProviderSelect': Components.SolidProviderSelect;
    'SolidForm': Components.SolidForm;
    'PostCreate': Components.PostCreate;
    'PostList': Components.PostList;
  }

  interface StencilIntrinsicElements {
    'solid-auth': Components.SolidAuthAttributes;
    'solid-login-popup': Components.SolidLoginPopupAttributes;
    'solid-logout-popup': Components.SolidLogoutPopupAttributes;
    'solid-login': Components.SolidLoginAttributes;
    'solid-provider-select': Components.SolidProviderSelectAttributes;
    'solid-form': Components.SolidFormAttributes;
    'post-create': Components.PostCreateAttributes;
    'post-list': Components.PostListAttributes;
  }


  interface HTMLSolidAuthElement extends Components.SolidAuth, HTMLStencilElement {}
  var HTMLSolidAuthElement: {
    prototype: HTMLSolidAuthElement;
    new (): HTMLSolidAuthElement;
  };

  interface HTMLSolidLoginPopupElement extends Components.SolidLoginPopup, HTMLStencilElement {}
  var HTMLSolidLoginPopupElement: {
    prototype: HTMLSolidLoginPopupElement;
    new (): HTMLSolidLoginPopupElement;
  };

  interface HTMLSolidLogoutPopupElement extends Components.SolidLogoutPopup, HTMLStencilElement {}
  var HTMLSolidLogoutPopupElement: {
    prototype: HTMLSolidLogoutPopupElement;
    new (): HTMLSolidLogoutPopupElement;
  };

  interface HTMLSolidLoginElement extends Components.SolidLogin, HTMLStencilElement {}
  var HTMLSolidLoginElement: {
    prototype: HTMLSolidLoginElement;
    new (): HTMLSolidLoginElement;
  };

  interface HTMLSolidProviderSelectElement extends Components.SolidProviderSelect, HTMLStencilElement {}
  var HTMLSolidProviderSelectElement: {
    prototype: HTMLSolidProviderSelectElement;
    new (): HTMLSolidProviderSelectElement;
  };

  interface HTMLSolidFormElement extends Components.SolidForm, HTMLStencilElement {}
  var HTMLSolidFormElement: {
    prototype: HTMLSolidFormElement;
    new (): HTMLSolidFormElement;
  };

  interface HTMLPostCreateElement extends Components.PostCreate, HTMLStencilElement {}
  var HTMLPostCreateElement: {
    prototype: HTMLPostCreateElement;
    new (): HTMLPostCreateElement;
  };

  interface HTMLPostListElement extends Components.PostList, HTMLStencilElement {}
  var HTMLPostListElement: {
    prototype: HTMLPostListElement;
    new (): HTMLPostListElement;
  };

  interface HTMLElementTagNameMap {
    'solid-auth': HTMLSolidAuthElement
    'solid-login-popup': HTMLSolidLoginPopupElement
    'solid-logout-popup': HTMLSolidLogoutPopupElement
    'solid-login': HTMLSolidLoginElement
    'solid-provider-select': HTMLSolidProviderSelectElement
    'solid-form': HTMLSolidFormElement
    'post-create': HTMLPostCreateElement
    'post-list': HTMLPostListElement
  }

  interface ElementTagNameMap {
    'solid-auth': HTMLSolidAuthElement;
    'solid-login-popup': HTMLSolidLoginPopupElement;
    'solid-logout-popup': HTMLSolidLogoutPopupElement;
    'solid-login': HTMLSolidLoginElement;
    'solid-provider-select': HTMLSolidProviderSelectElement;
    'solid-form': HTMLSolidFormElement;
    'post-create': HTMLPostCreateElement;
    'post-list': HTMLPostListElement;
  }


}
