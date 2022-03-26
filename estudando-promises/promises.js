//teste1

const fs = require("fs/promises");
const { resolve } = require("path");
fs
    .readFile("./arquivos-de-leitura/texto.txt")
    .then((a) => {
        console.log('texto lido com sucesso');
    })
    .catch((erro) => console.log("deu ruim"));
fs
    .readFile("./arquivos-de-leitura/texto2.txt")
    .then((a) => {
        console.log('texto2 lido com sucesso');
    })
    .catch((erro) => console.log("deu ruim"));
fs
    .readFile("./arquivos-de-leitura/texto3.txt")
    .then((a) => {
        console.log('texto3 lido com sucesso');
    })
    .catch((erro) => console.log("deu ruim"));
fs
    .readFile("./arquivos-de-leitura/texto4.txt")
    .then((a) => {
        console.log('texto4 lido com sucesso');
    })
    .catch((erro) => console.log("deu ruim"));

//Nesse primeiro teste, a promises vão retornando conforme a leitura vai sendo finalizada!
//Ou seja, arquivos menores são lidos mais rapidamente e consequêntimente retornam um resultado mais rápido
//em paralelo os arquivos maiores levam mais tempo para serem lidos demoram mais para serem lidos!
//É meio óbvio, mas é legal de ser "verbalizado" e ver na prática.

//teste1

//<-------------------------------------------------->
//teste2

//Caso queira que seja rodado outra requisição depois que a primeira for feita, então é necessário fazer um encapsulamento do .then()
//e isso é um dos maiores problemas do then, pois vai geral um callback-hell

fs
    .readFile("./arquivos-de-leitura/texto.txt")
    .then((a) => {
        fs.readFile("./arquivos-de-leitura/texto.txt").then(() => {}); //segundo .then()
    })
    .catch((erro) => console.log("deu ruim"));

//para resolver esse problema foi criado o 'async' 'await', o único problema é que ele só pode ser utilizado dentro de uma escopo de uma função!
//obs: já esta sendo resolvido!

//async vai ser utilizado para dizer que aquela função vai rodar de maneira assíncrona;
//await vai ser utilizado pra travar essa execução
    //então quando eu estiver utilizando o await ele não mais execulta aquele passo de maneira assíncrona, mas perceba a função ainda sim vai acontecer
    //de forma assíncrona!

async function lerArquivo(){
    const conteudo = await fs.readFile("./arquivos-de-leitura/texto.txt")
    const conteudo2 = await fs.readFile("./arquivos-de-leitura/texto2.txt")
    const conteudo3 = await fs.readFile("./arquivos-de-leitura/texto3.txt")
    const conteudo4 = await fs.readFile("./arquivos-de-leitura/texto4.txt")

    console.log(conteudo, 'arquivo texto');
    console.log(conteudo2, 'arquivo texto2');
    console.log(conteudo3, 'arquivo texto3');
    console.log(conteudo4, 'arquivo texto4');
}
// lerArquivo();

//desta forma não preciso mais utilizar o then em cadeia para fazer uma leitura a após da outra, basta apenas colocar um item abaixo do outro e ele vai seguir
//na sequência...

//um ponto interessante é que mesmo ut

//isso também pode ser observado quando diferente do primeiro teste em que ele retornava o que era lido primeiro, ele passa a ler o arquivo na seqûencia que
//que foi definida!


//mais forma de fazer é utilizando o Promise.all
async function lerArquivo2(){
    const promises = [
    fs.readFile("./arquivos-de-leitura/texto.txt"),
    fs.readFile("./arquivos-de-leitura/texto2.txt"),
    fs.readFile("./arquivos-de-leitura/texto3.txt"),
    fs.readFile("./arquivos-de-leitura/texto4.txt")
    ];

    const teste = await Promise.all(promises); //o Primise.all retorna um array de resultados, onde cada posição vai ser um resultado na ordem.
    
    //se achar melhor pode fazer uma desestruturação!
    teste.forEach(a=>console.log(a, 'all'))
}
// lerArquivo2();


//Outra forma de utilizar é com o Promise.race;
//Só que nesse caso ele vai ler apenas que dar o resultado primeiro!
async function testePromiseRace(){
    const promises = [
    fs.readFile("./arquivos-de-leitura/texto.txt"),
    fs.readFile("./arquivos-de-leitura/texto2.txt"),
    fs.readFile("./arquivos-de-leitura/texto3.txt"),
    fs.readFile("./arquivos-de-leitura/texto4.txt")
    ];

    const teste = await Promise.race(promises); //vai retornar sempre o resultado que vier mais rápido!
    
    console.log(teste, 'race');
}
// testePromiseRace();


//Pra tratativa de erro usamos uma função própria do Javascript try(), catch().
//try() -> vai tentar execultar qualquer o código! é como se fosse o lado bom
//catch() -> qualquer falha em execultar o try, o catch pega e executa o código dentro dele
async function tryCatch(){
    try {
        const conteudo = await fs.readFile("./arquivos-de-leitura/texto.txt")
        const conteudo2 = await fs.readFile("./arquivos-de-leitura/texto2.txt")
        const conteudo3 = await fs.readFile("./arquivos-de-leitura/texto3.txt")
        const conteudo4 = await fs.readFile("./arquivos-de-leitura/texto4.txt")

        console.log(conteudo, 'arquivo texto');
        console.log(conteudo2, 'arquivo texto2');
        console.log(conteudo3, 'arquivo texto3');
        console.log(conteudo4, 'arquivo texto4');
    } catch (error){
        console.log('deu erro');
        enviarEmailInformandoEsseProblema() //pode retornar uma função caso de erro, funciona como um else(?)
    } finally{
        //faz alguma coisa independe do try ou catch ter rodado, ou seja, ele vai rodar indepente do resultado!
    }
}
// tryCatch();

//a estrutura como then seria assim:
// fs.readFile("./arquivos-de-leitura/texto.txt").then().catch().finally();


//Criando uma nova promises!
const promise = new Promise((resolve, reject) => {
    const soma = 10 + 10;

    if(soma != 20){
        return reject('deu ruim')
    }

    resolve(soma)
})
//pra poder fazer uso dessa promise se faz uso do then() e pode adicionar um catch caso de algum B.O.
promise.then(a=>console.log(a))
//aparentimente não consigo adicionar esse valor que é retornado a uma variável que esta fora do escopo da promise.

//criando cartão de visita
function criarCartao(nome){
    return new Promise((resolve, reject) => {
        if(nome == 'Larissa'){
            return reject("Nome não é permitido"); //sem o return ele ainda sim iria adicionar o nome Larissa ao arquivo!
        }

        fs.appendFile('cartao-visita.txt', `Olá meu nome é ${nome}\n`).then(() => {
            resolve()
            console.log('Cartão adicionado ao arquivo');
        })
    })
}
criarCartao('Guilhermeeee').catch((error) => console.log(error))


//Outra forma de fazer seria
function criarCartao2(nome){
    return new Promise(async (resolve, reject) => { //passar o async antes do parâmetro
        if(nome == 'Larissa'){
            return reject("Nome não é permitido");
        }

        await fs.appendFile('cartao-visita.txt', `Olá meu nome é ${nome}\n`); //passa o await pra não ter que usar o then!
        resolve();
        console.log('Cartão adicionado ao arquivo');

    })
}
criarCartao2('Guilhermeeee').catch((error) => console.log(error))