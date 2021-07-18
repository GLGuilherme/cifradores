const cifrar = (key, string) => {
  let newString = "";

  const calcChar = (char) => {
    const n = char.charCodeAt(0);

    if (n >= 65 && n <= 90) {
      return String.fromCharCode(((n - 65 + key) % 26) + 65);
    } else if (n >= 97 && n <= 122) {
      return String.fromCharCode(((n - 97 + key) % 26) + 97);
    } else if (n >= 48 && n <= 57) {
      return String.fromCharCode(((n - 48 + key) % 10) + 48);
    } else {
      return char;
    }
  };

  for (let i = 0; i < string.length; i++) {
    newString = newString.concat(calcChar(string[i]));
  }

  process.stdout.write(newString);
};

const decifrar = (key, string) => {
  let newString = "";

  const calcChar = (char) => {
    const n = char.charCodeAt(0);

    if (n >= 65 && n <= 90) {
      return String.fromCharCode(((n - 90 + key) % 26) + 90);
    } else if (n >= 97 && n <= 122) {
      return String.fromCharCode(((n - 122 + key) % 26) + 122);
    } else if (n >= 48 && n <= 57) {
      return String.fromCharCode(((n - 57 + key) % 10) + 57);
    } else {
      return char;
    }
  };

  for (let i = 0; i < string.length; i++) {
    newString = newString.concat(calcChar(string[i]));
  }

  process.stdout.write(newString);
};

const init = () => {
  if (process.argv[2] === "cesar") {
    if (process.argv[3] === "-c") {
      if (process.argv[4] === "-k") {
        process.stdin.on("data", (data) => {
          cifrar(
            parseInt(process.argv[5]),
            data
              .toString()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
          );
        });
      }
    }

    if (process.argv[3] === "-d") {
      if (process.argv[4] === "-k") {
        process.stdin.on("data", (data) => {
          decifrar(-parseInt(process.argv[5]), data.toString());
        });
      }
    }
  }
};

init();
