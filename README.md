# Encrypt Helper

`encrypt-helper` is a Node.js package that provides encryption and decryption functions using AES-256-CBC encryption, along with password hashing using Argon2. This package is useful for securing sensitive data like passwords or messages, as well as providing easy-to-use utilities for encryption.

## Installation

You can install the package via npm:

```bash
npm install encrypt-helper
```

## Usage

### Importing the Library

```javascript
const EncryptHelper = require('encrypt-helper');
```

### Encrypt Data

You can use the `encryptData()` function to encrypt data. It encrypts an object and returns the encrypted data along with the IV (Initialization Vector).

```javascript
const data = { secret: "mySecretData" };
const encryptedData = EncryptHelper.encryptData(data);

console.log("Encrypted Data:", encryptedData.encryptedData);
console.log("IV (Initialization Vector):", encryptedData.iv);
```

### Decrypt Data

To decrypt the encrypted data, you need the `encryptedData` and the `iv`. Use the `decryptData()` function to decrypt the data back to its original form.

```javascript
const decryptedData = EncryptHelper.decryptData(encryptedData.encryptedData, encryptedData.iv);

console.log("Decrypted Data:", decryptedData);
```

### Hash a Password (SHA-512)

You can hash a password using SHA-512 with the `hashKey()` function. This is useful for securely storing passwords.

```javascript
const hashedPassword = await EncryptHelper.hashKey('your-password');
console.log("Hashed Password:", hashedPassword);
```

### Verify a Password (Argon2)

You can use Argon2 to securely hash a password and then verify it later. This is done with the `argonVerify()` function.

```javascript
const hashedPassword = await EncryptHelper.hashKey('your-password');
const hashedPasswordArgon2 = await argon2.hash(hashedPassword); // Hash the SHA-512 hash with Argon2

console.log("Hashed Password (Argon2):", hashedPasswordArgon2);

const isValid = await EncryptHelper.argonVerify(hashedPasswordArgon2, hashedPassword);
console.log("Password is valid:", isValid); // Should print: true if valid
```

### Example Code

Here's an example that shows the complete flow of encryption, decryption, and password hashing:

```javascript
const EncryptHelper = require('encrypt-helper');
const argon2 = require("argon2");

(async () => {
  // Encrypt and Decrypt Data Example
  const data = { secret: "mySecretData" };
  const encryptedData = EncryptHelper.encryptData(data);
  console.log("Encrypted Data:", encryptedData.encryptedData);
  console.log("IV (Initialization Vector):", encryptedData.iv);

  const decryptedData = EncryptHelper.decryptData(encryptedData.encryptedData, encryptedData.iv);
  console.log("Decrypted Data:", decryptedData);

  // Hash and Verify Password Example
  const hashedPassword = await EncryptHelper.hashKey('your-password');
  const hashedPasswordArgon2 = await argon2.hash(hashedPassword); // Hash with Argon2

  console.log("Hashed Password (Argon2):", hashedPasswordArgon2);

  const isValid = await EncryptHelper.argonVerify(hashedPasswordArgon2, hashedPassword);
  console.log("Password is valid:", isValid); // Should print: true
})();
```

## Features

- **AES-256-CBC Encryption**: Secure encryption using a fixed key and IV (Initialization Vector).
- **Argon2 Hashing**: Secure password hashing with Argon2, suitable for password storage.
- **SHA-512 Hashing**: Provides an additional layer of hashing using SHA-512.

## License

This project is licensed under the MIT License - see the [LICENSE](https://opensource.org/license/mit) file for details.

## Contributing

Feel free to open an issue or submit a pull request if you'd like to contribute to this project.

## Author

Dipin Niroula - dipinniroula@hotmail.com, dipin@roqos.com  
www.roqos.com

