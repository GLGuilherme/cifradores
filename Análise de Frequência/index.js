var readline = require("readline");

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const calcFreq = (string) => {
  const deletedChar = [];

  const freq = {};

  let count = 0;

  for (let i = 0; i < string.length; i++) {
    if (!deletedChar.includes(string[i])) {
      deletedChar.push(string[i]);
      for (let j = 0; j < string.length; j++) {
        if (string[i] === string[j]) {
          count++;
        }
        freq[string[i]] = parseFloat((count * 100) / string.length).toFixed(2);
      }
      count = 0;
    }
  }

  console.log(freq);
};

const init = () => {
  if (process.argv[2] === "decifrar") {
    rl.on("line", (data) => {
      calcFreq(data);
      rl.close();
    });
  }
};

init();
