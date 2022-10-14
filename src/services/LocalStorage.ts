export class LocalStorage {
  static set(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  static get(key: string) {
    const value = window.localStorage.getItem(key)

    if (!value) {
      return null
    }

    return JSON.parse(value)
  }
}
