function quarterround(x: number[], a: number, b: number, c: number, d: number): void {
    x[b] ^= rol(x[a] + x[d], 7);
    x[c] ^= rol(x[b] + x[a], 9);
    x[d] ^= rol(x[c] + x[b], 13);
    x[a] ^= rol(x[d] + x[c], 18);
}


function rol(x: number, y: number): number {
    return ((x << y) | (x >>> (32 - y))) >>> 0;
}

function columnround(x: number[]): void {
    quarterround(x, 0, 4, 8, 12);
    quarterround(x, 5, 9, 13, 1);
    quarterround(x, 10, 14, 2, 6);
    quarterround(x, 15, 3, 7, 11);
}

function rowround(x: number[]): void {
    quarterround(x, 0, 1, 2, 3);
    quarterround(x, 5, 6, 7, 4);
    quarterround(x, 10, 11, 8, 9);
    quarterround(x, 15, 12, 13, 14);
}

function doubleround(x: number[]): void {
    columnround(x);
    rowround(x);
}

function littleendian(b0: number, b1: number, b2: number, b3: number): number {
    return (b0 & 0xff) | ((b1 & 0xff) << 8) | ((b2 & 0xff) << 16) | ((b3 & 0xff) << 24);
}

export function salsa20Expansion(k: number[], n: number[], i?: number[]): number[] {
    const tau: number[] = [101, 120, 112, 97, 110, 100, 32, 49, 54, 45, 98, 121, 116, 101, 32, 107];
    const sigma = [101, 120, 112, 97, 110, 100, 32, 51, 50, 45, 98, 121, 116, 101, 32, 107];
    let expandedKey: number[];
    if (k.length === 32) {
        const k0 = k.slice(0, 16);
        const k1 = k.slice(16, 32);
        if (i === undefined) {
            expandedKey = salsa20Hash([
                littleendian(sigma[0], sigma[1], sigma[2], sigma[3]),
                littleendian(k0[0], k0[1], k0[2], k0[3]),
                littleendian(k0[4], k0[5], k0[6], k0[7]),
                littleendian(k0[8], k0[9], k0[10], k0[11]),
                littleendian(k0[12], k0[13], k0[14], k0[15]),
                littleendian(sigma[4], sigma[5], sigma[6], sigma[7]),
                littleendian(n[0], n[1], n[2], n[3]),
                littleendian(n[4], n[5], n[6], n[7]),
                littleendian(n[8], n[9], n[10], n[11]),
                littleendian(n[12], n[13], n[14], n[15]),
                littleendian(sigma[8], sigma[9], sigma[10], sigma[11]),
                littleendian(k1[0], k1[1], k1[2], k1[3]),
                littleendian(k1[4], k1[5], k1[6], k1[7]),
                littleendian(k1[8], k1[9], k1[10], k1[11]),
                littleendian(k1[12], k1[13], k1[14], k1[15]),
                littleendian(sigma[12], sigma[13], sigma[14], sigma[15]),
            ]);
        } else {
            expandedKey = salsa20Hash([
                littleendian(sigma[0], sigma[1], sigma[2], sigma[3]),
                littleendian(k0[0], k0[1], k0[2], k0[3]),
                littleendian(k0[4], k0[5], k0[6], k0[7]),
                littleendian(k0[8], k0[9], k0[10], k0[11]),
                littleendian(k0[12], k0[13], k0[14], k0[15]),
                littleendian(sigma[4], sigma[5], sigma[6], sigma[7]),
                littleendian(n[0], n[1], n[2], n[3]),
                littleendian(n[4], n[5], n[6], n[7]),
                ...i,
                littleendian(sigma[8], sigma[9], sigma[10], sigma[11]),
                littleendian(k1[0], k1[1], k1[2], k1[3]),
                littleendian(k1[4], k1[5], k1[6], k1[7]),
                littleendian(k1[8], k1[9], k1[10], k1[11]),
                littleendian(k1[12], k1[13], k1[14], k1[15]),
                littleendian(sigma[12], sigma[13], sigma[14], sigma[15]),
            ]);
        }
    } else if (k.length === 16 && i !== undefined) {
        expandedKey = salsa20Hash([
            littleendian(tau[0], tau[1], tau[2], tau[3]),
            littleendian(k[0], k[1], k[2], k[3]),
            littleendian(k[4], k[5], k[6], k[7]),
            littleendian(k[8], k[9], k[10], k[11]),
            littleendian(k[12], k[13], k[14], k[15]),
            littleendian(tau[4], tau[5], tau[6], tau[7]),
            littleendian(n[0], n[1], n[2], n[3]),
            littleendian(n[4], n[5], n[6], n[7]),
            ...i,
            littleendian(tau[8], tau[9], tau[10], tau[11]),
            littleendian(k[0], k[1], k[2], k[3]),
            littleendian(k[4], k[5], k[6], k[7]),
            littleendian(k[8], k[9], k[10], k[11]),
            littleendian(k[12], k[13], k[14], k[15]),
            littleendian(tau[12], tau[13], tau[14], tau[15]),
        ]);
    } else {
        throw new Error('Key must be either 16 or 32 bytes long.');
    }

    return expandedKey;
}

function salsa20Hash(input: number[]): number[] {
    const block = new Array<number>(...input);
    for (let i = 0; i < 10; i++) {
        doubleround(block);
    }
    const output = new Array(64);
    for (let i = 0; i < 16; i++) {
        block[i] += input[i];
        output[i * 4] = block[i] & 0xff;
        output[i * 4 + 1] = (block[i] >>> 8) & 0xff;
        output[i * 4 + 2] = (block[i] >>> 16) & 0xff;
        output[i * 4 + 3] = (block[i] >>> 24) & 0xff;
    }
    return output;
}

export function encrypt(plaintext: string, nonce: number[], key: string) {
    // @ts-ignore
    let byteKey = [...(new TextEncoder().encode(key))]
    // @ts-ignore
    let byteText = plaintext.split('').map((_, index) => plaintext.charCodeAt(index))

    const blockNumber = Math.ceil(plaintext.length / 64)
    const blockSize = plaintext.length <= 64 ? plaintext.length : 64;

    let cipherText = new Array<number>(plaintext.length)
    let hash: number[];
    let i0: number, i1: number;
    i0 = i1 = 0;
    try {
        for (let i = 0; i < blockNumber; i++) {
            hash = salsa20Expansion(byteKey, nonce, [i0, i1])
            for (let j = 0; j < blockSize; j++) {
                i0 = (i0 + 1) >>> 0
                if (i0 === 0) {
                    i1 = (i1 + 1) >>> 0
                }
                cipherText[i * blockSize + j] = byteText[i * blockSize + j] ^ hash[j]

            }
        }
        return cipherText.join(' ')
    } catch (e) {
        return (e)
    }


}


export function decrypt(ciphertext: string, nonce: number[], key: string) {
    // @ts-ignore
    let byteKey = [...(new TextEncoder().encode(key))]
    let byteCiphertext = ciphertext.split(' ').map(el => parseInt(el))
    console.log(byteCiphertext.length)

    const blockNumber = Math.ceil(byteCiphertext.length / 64)
    const blockSize = byteCiphertext.length <= 64 ? byteCiphertext.length : 64;

    let bytePlaintext = new Array<number>(byteCiphertext.length)
    let hash: number[];
    let i0: number, i1: number;
    i0 = i1 = 0;
    try {
        for (let i = 0; i < blockNumber; i++) {
            hash = salsa20Expansion(byteKey, nonce, [i0, i1])
            for (let j = 0; j < blockSize; j++) {
                i0 = (i0 + 1) >>> 0
                if (i0 === 0) {
                    i1 = (i1 + 1) >>> 0
                }
                bytePlaintext[i * blockSize + j] = byteCiphertext[i * blockSize + j] ^ hash[j]
            }
        }
        return bytePlaintext.map(el => String.fromCharCode(el)).join('')
    } catch (e) {
        alert(e)
    }


}