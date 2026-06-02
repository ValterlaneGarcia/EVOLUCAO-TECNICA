function listaDeServidores(id) {
    const servidores = ['Servidor1', 'Servidor2', 'Servidor3'];

    var servidorEncontrado = servidores[id];

    alert('Foi encontrado o : ' + servidorEncontrado);
}

function buscarDadosCallback(callback) {
    var IdServidor = prompt('Informe o id do seu servidor: ');

    setTimeout(() => {
        callback(IdServidor)
    }, 1000);
}

buscarDadosCallback(listaDeServidores);