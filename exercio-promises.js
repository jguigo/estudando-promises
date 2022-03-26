const registra = require('fs/promises');

const registraSoma = (a, b) => {
    return new Promise((resolve, reject) => {
        if(typeof a != 'number' || typeof b != 'number'){
            return reject('Não são números');
        }
        registra.appendFile('./resultado.txt', `${a} + ${b} = ${a+b}\n`).then(
            resolve(a+b)
        )
    }).then().catch(error => console.log(error));
}

registraSoma(1,1)
registraSoma(2,2)
registraSoma(3,3)
registraSoma(4,4)
registraSoma(5,5)