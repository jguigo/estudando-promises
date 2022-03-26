//idéia

// <-----------------> Async <----------------->
// async function é a definição de um função assíncrona!
// Ou seja, eu posso fazer outras coisas enquanto aquela função não finaliza.

function ideiaDeSync(){
    // aguardar o prato ficar pronto! (5s)
    console.log('Cliente: Gostaria de 20 barcas de sushi')
    setTimeout(()=>{
        console.log("Restaurante: Seu pedido esta pronto! Senhor?!")
    }, 5000)
    setTimeout(()=>{
        console.log('Cliente: Que demora da porra! Não quero mais!') //mesmo que o return saia primeiro, a func ainda vai executar o de 5 segundos
    }, 2000)
}

function fazerOutraParada(){
    console.log('fazer outra parada por aqui!');
}

ideiaDeSync();
fazerOutraParada();

//melhor explicando, é como se acontecesse em segundo plano!
//PS: esse setTimeout é só pra simular como seria o comportento de uma função assincrona.




//----->offTopic<-----
// function testeReturn(){
//     // aguardar o prato ficar pronto! (5s)
//     console.log('Cliente: Gostaria de 20 barcas de sushi')
//     setTimeout(()=>{
//         console.log("Restaurante: Seu pedido esta pronto! Senhor?!")
//     }, 5000)
//     setTimeout(()=>{
//          return console.log('Cliente: Que demora da porra! Não quero mais!') //mesmo que o return saia primeiro, a func ainda vai executar o de 5 segundos
//     }, 2000)
// }