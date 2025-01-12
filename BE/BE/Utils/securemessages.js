import cryptojs from'cryptojs'
function encryptMessage(message) {
    return CryptoJS.AES.encrypt(message, process.env.ENCRYPT_KEY).toString();
  }

// Decrypt the message
function decryptMessage(ciphertext) {
  const bytes = cryptojs.AES.decrypt(ciphertext, process.env.ENCRYPT_KEY);
  return bytes.toString(cryptojs.enc.Utf8);
}