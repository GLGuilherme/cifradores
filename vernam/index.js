var fs = require("fs");

const vernam = (string, key) => {
  var keyLength = key.length;

  process.stdout.write(
    string.replace(/[\s\S]/g, function (char, index) {
      return String.fromCharCode(
        key.charCodeAt(index % keyLength) ^ char.charCodeAt(0)
      );
    })
  );
};

const generateKey = (string) => {
  let key = "";

  for (let i = 0; i < string.length; i++) {
    key = key.concat(String.fromCharCode(Math.floor(Math.random() * 1000)));
  }

  fs.writeFile("chave.dat", key, function (error) {
    if (error) throw error;
    vernam(string, key);
  });
};

const init = () => {
  if (process.argv[2] === "vernam") {
    if (process.argv[3] === "-c") {
      process.stdin.on("data", (data) => {
        if (process.argv[4] === "chave.dat") {
          generateKey(data.toString());
        }
      });
    }

    if (process.argv[3] === "-d") {
      process.stdin.on("data", (data) => {
        const string = data.toString().split();
        fs.readFile("chave.dat", "utf8", (error, key) => {
          if (error) throw error;
          vernam(string[0], key);
        });
      });
    }
  }
};

init();
