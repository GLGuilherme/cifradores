var readline = require("readline");

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const freqPtBr = [
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

const decifrar = (key, string) => {
  let newString = "";

  const calcChar = (char) => {
    const n = char.charCodeAt(0);

    if (n >= 65 && n <= 90) {
      return String.fromCharCode(((n - 90 - key) % 26) + 90);
    } else if (n >= 97 && n <= 122) {
      return String.fromCharCode(((n - 122 - key) % 26) + 122);
    } else if (n >= 48 && n <= 57) {
      return String.fromCharCode(((n - 57 - key) % 10) + 57);
    } else {
      return char;
    }
  };

  for (let i = 0; i < string.length; i++) {
    newString = newString.concat(calcChar(string[i]));
  }

  process.stdout.write(`${newString}\nChave: ${key}`);
};

const calcFreq = (string) => {
  const deletedChar = [];

  const freq = {};

  const freqKey = {};

  var key = 0;

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
          (count * 100) / string.replace(/\d\s/, "").length
        ).toFixed(2);
        count = 0;
      }
    }
  }

  const freqOrder = Object.entries(freq)
    .sort(([, a], [, b]) => b - a)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

  Object.keys(freqOrder).map((value, index) => {
    let key = value.toUpperCase().charCodeAt(0) - freqPtBr[index].charCodeAt(0);
    freqKey[key] = freqKey[key] + 1 || 1;
  });

  var freqAux = 0;
  Object.keys(freqKey).map((value) => {
    if (parseInt(freqKey[value]) > freqAux) {
      freqAux = parseInt(freqKey[value]);
      key = parseInt(value) < 0 ? parseInt(value) * -1 : parseInt(value);
    }
  });

  decifrar(key, string);
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
