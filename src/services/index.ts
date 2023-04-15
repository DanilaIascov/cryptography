export function createPolybiosSquare(word: string, num: number = 5): string[][] {
    const matrix: string[][] = [];
    const arr = word.split('');
    for (let i = 0; i < num; i++) {
        matrix.push(arr.slice(i * num, (i + 1) * num));
    }
    return matrix;
}

export function cleanWord(word: string, removeJ: boolean = true): string {
    word = word.toLowerCase()
    if (removeJ) {
        word = word.replace(/j/gi, 'i')
    }
    return word.split('')
        .filter((letter, index) => {
            return word.indexOf(letter) === index;
        })
        .join('');
}