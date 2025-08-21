import JSEncrypt from 'jsencrypt'
import cryptoJs from 'crypto-js'

/**
 * Try to encrypt a text string
 * @param query 
 * @returns string encrypted.
 */

// SYMETRIC ENCRYPTION

export const symetricEncrypt = (data: string, secretKey: string) => {
    let encJson = cryptoJs.AES.encrypt(JSON.stringify(data), secretKey).toString()
    let encData = cryptoJs.enc.Base64.stringify(cryptoJs.enc.Utf8.parse(encJson))
    return encData
}

export const symetricDecrypt = (encryptedData: string, secretKey: string) => {
    
    const bytes = cryptoJs.AES.decrypt(encryptedData, secretKey);
    return bytes.toString(cryptoJs.enc.Utf8);
    
}

// ASYMETRIC ENCRYPTION

export const AsymetricEncrypt = async (data: string, publicKey: string) => {
    
    const encryptor = new JSEncrypt()
    encryptor.setPublicKey(publicKey)
    const ciphertext = encryptor.encrypt(data)

    return ciphertext

}


export const AsymetricDecrypt = (encryptedData: string, privateKey: string)  => {

  const encryptor = new JSEncrypt()
    encryptor.setPrivateKey(privateKey);
    const decryptedData = encryptor.decrypt(encryptedData)

    return decryptedData

}

