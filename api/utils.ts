function declOfNum(num: number, wordForms: string[]) {
  // Склоняем слово в зависимости от числительного
  num = Math.abs(num) % 100
  const num1 = num % 10
  if (num > 10 && num < 20) {
    return wordForms[2]
  }
  if (num1 > 1 && num1 < 5) {
    return wordForms[1]
  }
  if (num1 === 1) {
    return wordForms[0]
  }
  return wordForms[2]
}

export function declensyTransfer(num:number) {
  // Прикрепляем к числу склоненное существительное: 1 пересадка, 2 пересадки...
  const wordsForDeclension: string[] = ['пересадка', 'пересадки', 'пересадок']
  const declensionedWordWithNumber =
    num.toString() + ' ' + declOfNum(num, wordsForDeclension)
  return declensionedWordWithNumber
}

export function addSpacesToNumber(num: number) {
  // 45000 -> 45 000
  return new Intl.NumberFormat('ru', {useGrouping: true}).format(num)
}

export function getNormalizeRatio(numbers: Array<number>) {
  return Math.max(...numbers) / 100
}

export function normalizeNumbers(numbers: Array<number>) {
  // Нормализация последовательности чисел. Нужна, чтобы сравнивать значения из разных "миров"
  const ratio = getNormalizeRatio(numbers)
  return numbers.map(number => number / ratio)
}