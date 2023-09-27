// проверка длины
function checkLenght (line, maxLength) {
  return line.length <= maxLength;
}
checkLenght('проверяемая строка', 20);
checkLenght('проверяемая строка', 18);
checkLenght('проверяемая строка', 10);

// проверка на палиндром
function checkPalindrome (line) {
  line = line.toLowerCase();
  line = line.replaceAll(' ', '');
  let reverseLine = '';
  for (let i = line.length - 1; i >= 0; i--) {
    reverseLine += line[i];
  }
  return reverseLine === line;
}

checkPalindrome('топот');
checkPalindrome('ДовОд');
checkPalindrome('Кекс');
checkPalindrome('Лёша на полке клопа нашёл ');

// из строки в число
function getNumber(line) {
  line = String(line);
  line = line.replaceAll(' ', '');
  let number = '';
  for (let i = 0; i < line.length; i++) {
    if (!isNaN(line[i])) {
      number += line[i];
    }
  }
  return Number(number);
}

getNumber('2023 год');
getNumber('ECMAScript 2022');
getNumber('1 кефир, 0.5 батона');
getNumber('агент 007');
getNumber('а я томат');
getNumber(2023);
getNumber(-1);
getNumber(1.5);
