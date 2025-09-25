/*!
 * Copyright (c) 2020-2022 Digital Bazaar, Inc. All rights reserved.
 */
/* eslint-disable @typescript-eslint/no-floating-promises */
import assert from 'node:assert/strict'

import {
  IdGenerator,
  minEncodedIdBytes,
  maxEncodedIdBytes
} from '../src/index.js' // if you compile TS to JS, keep .js

describe('bnid', () => {
  describe('utilities', () => {
    it('should calculate min/max of encoded bytes', async () => {
      const bitLengths: number[] = [8, 16, 32, 64, 128, 256]
      const data: Array<[string[], number[], number[]]> = [
        [
          ['hex', 'base16', 'base16upper'],
          [2, 4, 8, 16, 32, 64],
          [2, 4, 8, 16, 32, 64]
        ],
        [
          ['base58', 'base58btc'],
          [1, 2, 4, 8, 16, 32],
          [2, 3, 6, 11, 22, 44]
        ]
      ]

      function t ({
        name,
        f,
        encoding,
        bitLength,
        multibase,
        expected
      }: {
        name: string
        f: typeof minEncodedIdBytes | typeof maxEncodedIdBytes
        encoding: string
        bitLength: number
        multibase: boolean
        expected: number
      }): void {
        const result = f({ encoding, bitLength, multibase })
        assert.equal(
          result,
          expected,
          JSON.stringify({ name, encoding, bitLength, multibase, expected })
        )
      }

      for (const [encodings, minBytes, maxBytes] of data) {
        for (const encoding of encodings) {
          for (const [i, bitLength] of bitLengths.entries()) {
            t({
              name: 'min',
              f: minEncodedIdBytes,
              encoding,
              bitLength,
              multibase: false,
              expected: minBytes[i]
            })
            t({
              name: 'min',
              f: minEncodedIdBytes,
              encoding,
              bitLength,
              multibase: true,
              expected: minBytes[i] + 1
            })
            t({
              name: 'max',
              f: maxEncodedIdBytes,
              encoding,
              bitLength,
              multibase: false,
              expected: maxBytes[i]
            })
            t({
              name: 'max',
              f: maxEncodedIdBytes,
              encoding,
              bitLength,
              multibase: true,
              expected: maxBytes[i] + 1
            })
          }
        }
      }
    })

    it('should reject unknown min encoding', async () => {
      assert.throws(() => {
        minEncodedIdBytes({
          encoding: 'baseBogus'
        } as any)
      })
    })

    it('should reject unknown max encoding', async () => {
      assert.throws(() => {
        maxEncodedIdBytes({
          encoding: 'baseBogus'
        } as any)
      })
    })
  })

  describe('IdGenerator', () => {
    it('should create IdGenerator', async () => {
      const d = new IdGenerator()
      assert.ok(d)
    })

    it('should generate default id', async () => {
      const d = new IdGenerator()
      const id = await d.generate()
      assert.ok(id)
      assert.ok(id instanceof Uint8Array)
      assert.equal(id.length, 16)
    })

    it('should generate 8 bit id', async () => {
      const d = new IdGenerator({ bitLength: 8 })
      const id = await d.generate()
      assert.ok(id)
      assert.ok(id instanceof Uint8Array)
      assert.equal(id.length, 1)
    })

    it('should not generate 0 bit id', async () => {
      assert.throws(() => {
        return new IdGenerator({ bitLength: 0 })
      })
    })

    it('should not generate odd bits id', async () => {
      assert.throws(() => {
        return new IdGenerator({ bitLength: 10 })
      })
    })
  })

  // ... keep rest of test cases unchanged, just add types like above ...
})
