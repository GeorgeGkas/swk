import crypto from 'crypto-js'

export class Crypto {
  static encrypt(message: string, key: string) {
    const encrypted = crypto.AES.encrypt(message, key)
    return encrypted.toString()
  }

  static decrypt(cipher: string, key: string) {
    const bytes = crypto.AES.decrypt(cipher, key)
    return bytes.toString(crypto.enc.Utf8)
  }
}
