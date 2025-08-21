import cryptoJs from 'crypto-js'

/**
 * Try to decrypt a string using aes-256-ecb algorithm
 * @param query 
 * @returns string encrypted.
*/

export const useDecryptQuery = (encryptedData: string, secretKey: string) => {
    let decData = cryptoJs.enc.Base64.parse(encryptedData).toString(cryptoJs.enc.Utf8)
    let bytes = cryptoJs.AES.decrypt(decData, secretKey).toString(cryptoJs.enc.Utf8)
    return JSON.parse(bytes)
}