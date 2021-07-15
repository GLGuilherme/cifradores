// var frequenciaTranslator = require("./frequenciaTranslator");

var readline = require("readline");

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const frequenciaTranslator = {
  14.63: "A",
  12.57: "E",
  10.73: "O",
  7.81: "S",
  6.53: "R",
  6.18: "I",
  5.05: "N",
  4.99: "D",
  4.74: "M",
  4.63: "U",
  4.34: "T",
  3.88: "C",
  2.78: "L",
  2.52: "P",
  1.67: "V",
  1.3: "G",
  1.28: "H",
  1.2: "Q",
  1.04: "B",
  1.02: "F",
  0.47: "Z",
  0.4: "J",
  0.21: "X",
  0.02: "K",
  0.01: "Y",
  0.01: "W",
};

const teste = [
  "A",
  "E",
  "O",
  "S",
  "R",
  "I",
  "N",
  "D",
  "M",
  "U",
  "T",
  "C",
  "L",
  "P",
  "V",
  "G",
  "H",
  "Q",
  "B",
  "F",
  "Z",
  "J",
  "X",
  "K",
  "Y",
  "W",
];

const decifra = (value, freqOrder) => {
  let count = 0;

  for (const key in freqOrder) {
    if (value.toUpperCase() === key.toUpperCase()) {
      return teste[count];
    }
    count++;
  }
  // Object.keys(freqOrder).map((val, index) => {
  //   if (value === val) {
  //     return teste[index];
  //   }
  // });
  // for (const key in frequenciaTranslator) {
  //   if (parseFloat(value) >= parseFloat(key)) {
  //     return frequenciaTranslator[key];
  //   }
  // }
};

const calcFreq = (string) => {
  const deletedChar = [];

  const freq = {};

  let newString = "";

  let count = 0;

  for (let i = 0; i < string.length; i++) {
    if (!deletedChar.includes(string[i])) {
      deletedChar.push(string[i].toUpperCase());
      deletedChar.push(string[i].toLowerCase());

      const n = string[i].charCodeAt(0);
      if ((n >= 65 && n <= 90) || (n >= 97 && n <= 122)) {
        for (let j = 0; j < string.length; j++) {
          if (
            string[i] === string[j].toUpperCase() ||
            string[i] === string[j].toLowerCase()
          ) {
            count++;
          }
        }
        freq[string[i]] = parseFloat(
          (count * 100) / string.replace(" ", "").length
        ).toFixed(2);
        count = 0;
      }
    }
  }

  const freqOrder = Object.entries(freq)
    .sort(([, a], [, b]) => b - a)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

  for (let i = 0; i < string.length; i++) {
    const n = string[i].charCodeAt(0);
    if (n >= 65 && n <= 90) {
      newString = newString.concat(
        // decifra(freq[string[i].toUpperCase()] || freq[string[i].toLowerCase()])
        decifra(string[i], freqOrder)
      );
    } else if (n >= 97 && n <= 122) {
      newString = newString.concat(
        // decifra(freq[string[i].toUpperCase()] || freq[string[i].toLowerCase()])
        decifra(string[i], freqOrder).toLowerCase()
      );
    } else {
      newString = newString.concat(string[i]);
    }
  }

  process.stdout.write(newString);
  console.log(freqOrder);

  // Object.values(freq).map((value) => {
  //   for (const key in frequenciaTranslator) {
  //     if (parseFloat(value) >= parseFloat(key)) {
  //       newString = newString.concat(frequenciaTranslator[key]);
  //       return;
  //     }
  //   }
  //   // Object.keys(frequenciaTranslator).map((valueT) => {
  //   //   if (parseFloat(value) >= parseFloat(valueT)) {
  //   //     newString = newString.concat(frequenciaTranslator[valueT]);
  //   //     return;
  //   //   }
  //   // });
  // });

  // console.log(newString);
};

const init = () => {
  if (process.argv[2] === "decifra") {
    rl.on("line", (data) => {
      calcFreq(data);
      rl.close();
    });
  }
};

init();
