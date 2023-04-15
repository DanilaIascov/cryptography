export function addDigits(text: string): string {
    const arr: string[] = ['j', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
    let newText = ''

    for (let i = 0; i < text.length; i++) {
        newText += text[i]
        let index = arr.indexOf(text[i])
        if (index !== -1) {
            newText += index
        }
    }
    return newText
}

function charCount(str: string, letter: string) {
    let counter: number = 0;
    for (let i = 0; i < str.length; i++) {
        if (str.charAt(i) === letter) {
            counter++;
        }
    }
    return counter;
}

export function firstEncode(polybios: string[][], secretText: string, toAdfgvx: boolean = false): string {
    const indexes: string[] = toAdfgvx ? ['A', 'D', 'F', 'G', 'V', 'X'] : ['A', 'D', 'F', 'G', 'X']
    const num: number = toAdfgvx ? 6 : 5

    let text: string = '';
    for (let letter = 0; letter < secretText.length; letter++) {
        for (let i = 0; i < num; i++) {
            for (let j = 0; j < num; j++) {
                if (secretText[letter] === polybios[i][j]) {
                    text += indexes[i] + indexes[j];
                }
            }
        }
    }
    return text;
}

function separateLines(text: string, numOfPos: number) {
    const matrix: string[] = [];
    const arr: string[] = text.split('');
    for (let i = 0; i < Math.ceil(text.length / 5); i++) {
        let row = arr.slice(i * numOfPos, (i + 1) * numOfPos).join('');
        matrix.push(row);
    }
    text = matrix.join(' ')
    return text;
}

export function secondEncode(codedText: string, keyword: string): string {
    let text: string = '';

    const sortedKeyword: string = keyword.split('').sort().join('');
    const matrix: string[][] = [];
    const arr: string[] = codedText.split('');
    const numOfColumns = keyword.length;
    const numOfRows = Math.ceil(codedText.length / keyword.length);
    for (let i = 0; i < numOfRows; i++) {
        let row = arr.slice(i * numOfColumns, (i + 1) * numOfColumns);
        if (row.length < numOfColumns) {
            let remaining = numOfColumns - row.length;
            for (let j = 0; j < remaining; j++) {
                row.push('0');
            }
        }
        matrix.push(row);
    }
    let lastElemIndex = 0
    let columnIndex = 0
    for (let i = 0; i < keyword.length; i++) {
        let counter = charCount(sortedKeyword, sortedKeyword[i]);
        if (counter !== 1) {
            columnIndex = keyword.indexOf(sortedKeyword[i], lastElemIndex + 1);
            lastElemIndex = columnIndex
        } else {
            columnIndex = keyword.indexOf(sortedKeyword[i]);
        }
        for (let j = 0; j < numOfRows; j++) {
            text += matrix[j][columnIndex];
        }
    }
    return separateLines(text.replace(/0/g, ''), 5);
}

export function firstDecode(keyword: string, codedText: string): string {
    let text = '';
    const sortedKeyword = keyword.split('').sort().join('');
    const numOfRows = Math.ceil(codedText.length / keyword.length);
    const numOfColumns = keyword.length;
    const numOfLongColumns =
        numOfColumns - (numOfRows * keyword.length - codedText.length);

    let matrix: string[][] = [];
    let arr: string[] = codedText.split('');
    let pos: number = 0;
    let lastElemIndex = 0
    let columnIndex = 0
    for (let i = 0; i < numOfColumns; i++) {
        let row: string[] = [];
        let counter = charCount(sortedKeyword, sortedKeyword[i]);
        if (counter !== 1) {
            columnIndex = keyword.indexOf(sortedKeyword[i], lastElemIndex + 1);
            lastElemIndex = columnIndex
        } else {
            columnIndex = keyword.indexOf(sortedKeyword[i]);
        }
        if (columnIndex < numOfLongColumns) {
            row = arr.slice(pos, pos + numOfRows);
            pos += numOfRows;
        } else {
            row = arr.slice(pos, pos + numOfRows - 1);
            pos += numOfRows - 1;
            if (row.length < numOfRows) {
                let remaining = numOfRows - row.length;
                for (let j = 0; j < remaining; j++) {
                    row.push('0');
                }
            }
        }

        matrix.push(row);
    }

    for (let i = 0; i < numOfRows; i++) {
        lastElemIndex = 0
        columnIndex = 0
        for (let j = 0; j < numOfColumns; j++) {
            let counter = charCount(keyword, keyword[j]);
            if (counter !== 1) {
                columnIndex = sortedKeyword.indexOf(keyword[j], lastElemIndex + 1);
                lastElemIndex = columnIndex
            } else {
                columnIndex = sortedKeyword.indexOf(keyword[j]);
            }
            text += matrix[columnIndex][i];
        }
    }

    return text.replace(/0/g, '');
}

export function secondDecode(polybios: string[][], secretText: string, fromAdfgvx: boolean = false): string {
    const indexes: string[] = fromAdfgvx ? ['A', 'D', 'F', 'G', 'V', 'X'] : ['A', 'D', 'F', 'G', 'X']
    const pairs: string[][] = [];

    let arr = secretText.split('');
    let pos = 0;
    for (let i = 0; i < secretText.length / 2; i++) {
        pairs.push(arr.slice(pos, pos + 2));
        pos += 2;
    }

    let text: string = '';
    for (let i = 0; i < pairs.length; i++) {
        let rowIndex = indexes.indexOf(pairs[i][0]);
        let columnIndex = indexes.indexOf(pairs[i][1]);
        text += polybios[rowIndex][columnIndex];
    }
    return text;
}
