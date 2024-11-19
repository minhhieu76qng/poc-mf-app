import { FederationRuntimePlugin } from '@module-federation/enhanced/runtime';

export default function () {
  return {
    name: 'custom-plugin-build',
    beforeInit(args) {
      console.log('[build time inject] beforeInit: ', args);
      return args;
    },
    beforeRegisterRemote(args) {
      console.log('[build time inject] beforeRegisterRemote: ', args);
      return args;
    },
    errorLoadRemote(args) {
      console.log('[build time inject] errorLoadRemote: ', args);
      return args;
    },
    beforeRequest(args) {
      console.log('[build time inject] beforeRequest: ', args);
      return args;
    },
    onLoad(args) {
      console.log('[build time inject] onLoad: ', args);
      return args;
    },
    handlePreloadModule(args) {
      console.log('[build time inject] handlePreloadModule: ', args);
      return args;
    },
    loadEntry(args) {
      console.log('[build time inject] loadEntry: ', args);
      return args;
    },
    beforeLoadRemoteSnapshot(args) {
      console.log('[build time inject] beforeLoadRemoteSnapshot: ', args);
      return args;
    },
    loadSnapshot(args) {
      console.log('[build time inject] loadSnapshot: ', args);
      return args;
    },
    loadRemoteSnapshot(args) {
      console.log('[build time inject] loadRemoteSnapshot: ', args);
      return args;
    },
    afterLoadSnapshot(args) {
      console.log('[build time inject] afterLoadSnapshot: ', args);
      return args;
    },
  };
}