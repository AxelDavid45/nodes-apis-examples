import crypto from "node:crypto";

const IV_LENGTH = 16;

function encrypt(text, encryptionKey) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(encryptionKey),
    iv
  );
  let encrypted = cipher.update(text);

  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
}

const textToEncrypt = "a4e455c266684a3985acdd6f5b1fdef3"
const encryptionKey = "s6v9y$B&E)H@MbQeThWmZq4t7w!z%C*F"

function decrypt(text, encryptionKey) {
  const textParts = text.split(":");
  const iv = Buffer.from(textParts.shift(), "hex");
  const encryptedText = Buffer.from(textParts.join(":"), "hex");
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(encryptionKey),
    iv
  );
  let decrypted = decipher.update(encryptedText);

  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
}


console.log(encrypt(textToEncrypt, encryptionKey));
