/**
 * Copyright (c) 2025 Dipin Niroula < dipinniroula@hotmail.com >
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

require("dotenv").config();
const crypto = require("crypto");
const argon2 = require("argon2");

const algorithm = "aes-256-cbc";
const secretKey = Buffer.from(process.env.SECRET_KEY, "hex");
const iv = Buffer.from(process.env.IV, "hex");

const Helper = {};

// Function to hash a password
Helper.hashKey = async function (password) {
    return crypto.createHash("sha512").update(password).digest("hex");
};

// Function to encrypt data
Helper.encryptData = function (data) {
    const jsonString = JSON.stringify(data);
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    let encrypted = cipher.update(jsonString, "utf8", "hex");
    encrypted += cipher.final("hex");
    return { encryptedData: encrypted, iv: iv.toString("hex") };
};

// Function to decrypt data
Helper.decryptData = function (encryptedData, ivHex) {
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(ivHex, "hex"));
    let decrypted = decipher.update(encryptedData, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return JSON.parse(decrypted);
};

// Function to verify hash using Argon2
Helper.argonVerify = async function (sample, str) {
    try {
        return await argon2.verify(sample, str);
    } catch (error) {
        console.error("Error verifying password:", error);
        return false;
    }
};

module.exports = Helper;
