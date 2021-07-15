var fs = require("fs");

var readline = require("readline");

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const vernam = (string, key) => {
  var keyLength = key.length;
  var fromCharCode = String.fromCharCode;

  process.stdout.write(
    string.replace(/[\s\S]/g, function (char, index) {
      return fromCharCode(
        key.charCodeAt(index % keyLength) ^ char.charCodeAt(0)
      );
    })
  );
};

const generateKey = (string) => {
  let key = "";

  for (let i = 0; i < string.length; i++) {
    key = key.concat(String.fromCharCode(Math.floor(Math.random() * 10)));
  }

  fs.writeFile("chave.dat", key, function (err) {
    if (err) throw err;
  });
};

const init = () => {
  if (process.argv[2] === "vernam") {
    rl.on("line", (data) => {
      if (process.argv[3] === "-c") {
        if (process.argv[4] === "chave.dat") {
          generateKey(data);
          fs.readFile("chave.dat", "utf8", (error, key) => {
            if (error) throw error;
            vernam(data, key);
          });
        }
      }

      if (process.argv[3] === "-d") {
        if (process.argv[4] === "chave.dat") {
          fs.readFile("chave.dat", "utf8", (error, key) => {
            if (error) throw error;
            vernam(data, key);
          });
        }
      }
      rl.close();
    });
  }
};

init();
