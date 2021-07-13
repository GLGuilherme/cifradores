var fs = require('fs');
var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

const calcCifra = (char, key) => {
    const n = char.charCodeAt(0)

    if (n >= 65 && n <= 90) {
        return String.fromCharCode(((n - 65 + key) % 26) + 65)
        
    } else if (n >= 97 && n <= 122) {
        return String.fromCharCode(((n - 97 + key) % 26) + 97)

    } else if (n >= 48 && n <= 57) {
        return String.fromCharCode(((n - 48 + key) % 10) + 48)
    } else {
        return char
    }
}

const calcDecifra = (char, key) => {
    const n = char.charCodeAt(0)

    if (n >= 65 && n <= 90) {
        return String.fromCharCode(((n - 90 + key) % 26) + 90)
        
    } else if (n >= 97 && n <= 122) {
        return String.fromCharCode(((n - 122 + key) % 26) + 122)

    } else if (n >= 48 && n <= 57) {
        return String.fromCharCode(((n - 57 + key) % 10) + 57)
    } else {
        return char
    }
}

const cifrar = (key, string) => {
    let newString = '';

    for (let i = 0; i < string.length; i++) {
        newString = newString.concat(calcCifra(string[i], key))
    }

    process.stdout.write(newString)
    // rl.write('asdasd')

    // fs.writeFile(process.stdout, newString, (error) => {
    //     if (error) throw error

    //     console.log('Arquivo cifrado com sucesso!')
    // })
}

const decifrar = (key, string) => {
    let newString = '';

    for (let i = 0; i < string.length; i++) {
        newString = newString.concat(calcDecifra(string[i], key))
    }

    process.stdout.write(newString)

    // process.stdout.write(newString, (error) => {
    //     if (error) throw error
    // })

    // fs.writeFile(process.stdout, newString, (error) => {
    //     if (error) throw error

    //     console.log('Arquivo decifrado com sucesso!')
    // })
}

const init = () => {
    rl.on('line', (data) => {
        if (process.argv[3] === '-c') {
            if (process.argv[4] === '-k') {
                cifrar(parseInt(process.argv[5]), data.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
            }
        }

        if (process.argv[3] === '-d') {
            if (process.argv[4] === '-k') {
                decifrar(parseInt(process.argv[5]), data)
            }
        }
        rl.close()
    })
    // fs.readFile(readline., 'utf8', (error, data) => {
    //     if (error) throw error

    //     if (process.argv[2] === '-c') {
    //         if (process.argv[3] === '-k') {
    //             cifrar(parseInt(process.argv[4]), data.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
    //         }
    //     }

    //     if (process.argv[2] === '-d') {
    //         if (process.argv[3] === '-k') {
    //             decifrar(parseInt(process.argv[4]), data)
    //         }
    //     }
    // })
}

init()