export function getBigrams(secretText: string): string[] {
    const row: string[] = []
    for (let i = 0; i < secretText.length; i++) {
        if (secretText[i] === secretText[i + 1]) {
            row.push(secretText[i] + 'x')
        } else {
            row.push(secretText[i] + (secretText[i + 1] ?? 'x'))
            i++
        }
    }
    return row;
}

export function playfairEncode(alphabet: string, bigrams: string[], num: number = 5): string {
    let encodedText: string = '';
    for (let i = 0; i < bigrams.length; i++) {
        let index1: number = alphabet.indexOf(bigrams[i][0])
        let index2: number = alphabet.indexOf(bigrams[i][1])
        let row1 = Math.floor(index1 / num)
        let row2 = Math.floor(index2 / num)
        let column1 = index1 - row1 * num
        let column2 = index2 - row2 * num
        if (row1 === row2) {
            encodedText += (column1 < num - 1) ? alphabet[index1 + 1] : alphabet[index1 - (num - 1)]
            encodedText += (column2 < num - 1) ? alphabet[index2 + 1] : alphabet[index2 - (num - 1)]
        } else if (column1 === column2) {
            encodedText += (row1 < num - 1) ? alphabet[index1 + num] : alphabet[index1 - (num * (num - 1))]
            encodedText += (row2 < num - 1) ? alphabet[index2 + num] : alphabet[index2 - (num * (num - 1))]
        } else {
            encodedText += alphabet[index1 + (column2 - column1)]
            encodedText += alphabet[index2 - (column2 - column1)]
        }
    }
    return encodedText.toUpperCase();
}

export function playfairDecode(alphabet: string, bigrams: string[], num: number = 5): string {
    let decodedText: string = '';
    for (let i = 0; i < bigrams.length; i++) {
        let index1: number = alphabet.indexOf(bigrams[i][0])
        let index2: number = alphabet.indexOf(bigrams[i][1])
        let row1 = Math.floor(index1 / num)
        let row2 = Math.floor(index2 / num)
        let column1 = index1 - row1 * num
        let column2 = index2 - row2 * num
        if (row1 === row2) {
            decodedText += (column1 > 0) ? alphabet[index1 - 1] : alphabet[index1 + (num - 1)]
            decodedText += (column2 > 0) ? alphabet[index2 - 1] : alphabet[index2 + (num - 1)]
        } else if (column1 === column2) {
            decodedText += (row1 > 0) ? alphabet[index1 - num] : alphabet[index1 + (num * (num - 1))]
            decodedText += (row2 > 0) ? alphabet[index2 - num] : alphabet[index2 + (num * (num - 1))]
        } else {
            decodedText += alphabet[index1 + (column2 - column1)]
            decodedText += alphabet[index2 - (column2 - column1)]
        }
    }
    return decodedText.replace(/x/g, '').toUpperCase();
}