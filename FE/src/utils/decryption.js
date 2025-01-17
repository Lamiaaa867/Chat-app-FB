import CryptoJS from "crypto-js";


// Shared Key Generation (Example: XOR-based)
export const deriveSharedKey = (senderKey, receiverKey) => {
  const [key1, key2] = [senderKey, receiverKey].sort();
  // Combine the sorted keys and hash them
  return CryptoJS.SHA256(key1 + key2).toString(CryptoJS.enc.Hex);
};

// Encrypt a message
export const encryptMessage = (message,userKey) => {
  return CryptoJS.AES.encrypt(message, userKey).toString();
};

// Decrypt a message
export const decryptMessage = (encryptedMessage,userKey) => {
  const bytes = CryptoJS.AES.decrypt(encryptedMessage, userKey).toString(CryptoJS.enc.Utf8);
  return bytes

};