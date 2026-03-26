import SecureLS from 'secure-ls'

const ls = new SecureLS()

export const lsStorage = {
  getItem(key: any) {
    return ls.get(key)
  },
  setItem: (key: any, val: any) => ls.set(key, val),
}
