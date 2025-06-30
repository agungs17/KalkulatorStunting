// dapat di gunakan di luar hook

let refAuth = null;
export const AuthStore = {
  setRef: (ref) => refAuth = ref,
  get: () => refAuth?.current?.getContext?.(), // jangan pakai di component, karena tidak reactive (gunakan useAuth())
  set: ({user, token}) => refAuth?.current?.setAuthContext?.({user, token}),
  clear : () => refAuth?.current?.removeAuthContext?.()
};