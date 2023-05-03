const H = [
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
    0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
]
const K = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
]

const rotr = (x: number, n: number): number => (x >>> n) | (x << (32 - n));

const sigma0 = (x: number): number => rotr(x, 2) ^ rotr(x, 13) ^ rotr(x, 22);
const sigma1 = (x: number): number => rotr(x, 6) ^ rotr(x, 11) ^ rotr(x, 25);
const gamma0 = (x: number): number => rotr(x, 7) ^ rotr(x, 18) ^ (x >>> 3);
const gamma1 = (x: number): number => rotr(x, 17) ^ rotr(x, 19) ^ (x >>> 10);

const ch = (x: number, y: number, z: number): number => (x & y) ^ (~x & z);
const maj = (x: number, y: number, z: number): number => (x & y) ^ (x & z) ^ (y & z);

const buildMessageSchedule = (message: number[]): number[] => {
    const W: number[] = [];
    for (let t = 0; t < 64; t++) {
        if (t < 16) {
            W[t] = message[t];
        } else {
            W[t] = (gamma1(W[t - 2]) + W[t - 7] + gamma0(W[t - 15]) + W[t - 16]) >>> 0;
        }
    }
    return W;
};

const sha256Compress = (state: number[], message: number[]): number[] => {
    const W = buildMessageSchedule(message);
    console.log(W)
    let [a, b, c, d, e, f, g, h] = state;

    for (let t = 0; t < 64; t++) {
        const T1 = (h + sigma1(e) + ch(e, f, g) + K[t] + W[t]) >>> 0;
        const T2 = (sigma0(a) + maj(a, b, c)) >>> 0;
        [h, g, f, e, d, c, b, a] = [g, f, e, d + T1 >>> 0, c, b, a, T1 + T2 >>> 0];
    }
    return state.map((x, i) => (x + [a, b, c, d, e, f, g, h][i]) >>> 0);
};

const padding = (message: Uint8Array): number[][] => {
    const length = message.length;
    const bitLength = length * 8;
    const remainder = length % 64;
    const padLength = remainder < 56 ? 64 - remainder : 128 - remainder;

    const padded = new Uint8Array(length + padLength);
    padded.set(message);
    padded[length] = 0x80;
    const bitLengthWords = new DataView(new ArrayBuffer(8));
    bitLengthWords.setUint32(0, Math.floor(bitLength / 0x100000000), false);
    bitLengthWords.setUint32(4, bitLength, false);
    padded.set(new Uint8Array(bitLengthWords.buffer), length + padLength - 8);

    const words = [];
    for (let i = 0; i < padded.length; i += 4) {
        words.push(
            (padded[i] << 24) |
            (padded[i + 1] << 16) |
            (padded[i + 2] << 8) |
            padded[i + 3]
        );
    }

    const blocks = [];
    for (let i = 0; i < words.length; i += 16) {
        blocks.push(words.slice(i, i + 16));
    }

    return blocks;
};

export const sha256 = (input: string): string => {
    const message = new TextEncoder().encode(input);
    const blocks = padding(message);
    console.log('Blocks', blocks)
    let state = H.slice();

    for (const block of blocks) {
        state = sha256Compress(state, block);
    }

    return state
        .map((word) => word.toString(16).padStart(8, "0"))
        .join("");
};