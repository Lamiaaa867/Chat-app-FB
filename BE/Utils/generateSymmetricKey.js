import CryptoJS from "crypto-js";

// Shared Key Generation (Example: XOR-based)
 export const deriveSharedKey = (senderKey, receiverKey) => {
  return CryptoJS.SHA256(senderKey + receiverKey).toString(CryptoJS.enc.Hex);
};

export const encryptMessage = (message,userKey) => {
  return CryptoJS.AES.encrypt(JSON.stringify(message), userKey)
};
// Decrypt a message
export const decryptMessage = (encryptedMessage,sharedKey) => {

  const bytes = CryptoJS.AES.decrypt(encryptedMessage, sharedKey);
  return bytes.toString(CryptoJS.enc.Utf8);
  
};

