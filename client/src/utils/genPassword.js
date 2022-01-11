export const generatePassword = () => {
  let passwordText = "";
  const options = {
    lowerCase: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
    upperCase: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    numbers: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    specials: ["!", "#", "%", "^", "*", "+", "-", "_", "?", ".", "~"]
  }

  // Generate random character from chosen array
  const charGen = (arr) => {
    const charIndex = Math.floor(Math.random() * arr.length);
    const charChoice = arr[charIndex];
    passwordText = passwordText.concat(charChoice);
  }

  // Generate the four initial characters
  const initCharGen = () => {
    charGen(options.lowerCase);
    charGen(options.upperCase);
    charGen(options.numbers);
    charGen(options.specials);
  }

  // Generate the rest of the password
  const charAdd = () => {
    const keyChoice = Math.floor(Math.random() * 4);
    switch (keyChoice) {
      case 0:
        return charGen(options.lowerCase);
      case 1:
        return charGen(options.upperCase);
      case 2:
        return charGen(options.numbers);
      case 3:
        return charGen(options.specials);
      default:
        return console.log(keyChoice);
    }
  }

  // Create password
  function createPassword() {
    initCharGen();
    while (passwordText.length < 14) {
      charAdd();
    }
    return passwordText;
  }

  return createPassword()
}

console.log(generatePassword());