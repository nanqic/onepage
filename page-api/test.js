import { compareHash, hashDigest } from "./utils.js";

const str = hashDigest("123")
const cm = compareHash("123", str)
console.log(cm);