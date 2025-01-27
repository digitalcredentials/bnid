import { generateSecureRandom } from 'react-native-securerandom'

export async function getRandomBytes (buf: Uint8Array): Promise<Uint8Array> {
  return await generateSecureRandom(buf.length)
}

export function bytesToHex (bytes: Uint8Array): string {
  return Array.from(bytes).map(d => d.toString(16).padStart(2, '0')).join('')
}

// adapted from:
/* eslint-disable-next-line max-len */
// https://stackoverflow.com/questions/43131242/how-to-convert-a-hexadecimal-string-of-data-to-an-arraybuffer-in-javascript
export function bytesFromHex (hex: string): Uint8Array {
  if (hex.length === 0) {
    return new Uint8Array()
  }
  // @ts-expect-error
  return new Uint8Array(hex.match(/[\da-f]{2}/gi).map(h => parseInt(h, 16)))
}
