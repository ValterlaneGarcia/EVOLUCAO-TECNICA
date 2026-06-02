// function BuscarDadosPromise() {
//     return new Promise((resolve, reject) => {
//         const id = Number(prompt('informe o id do servidor'));

//         const servidores = {
//             1: 'Servidor Alpa',
//             2: 'Servidor Beta',
//             3: 'Servidor Gama'
//         };

//         if (servidores[id]) {
//             resolve(servidores[id]);
//         }else {
//             reject();
//         }

//     });
// }

// BuscarDadosPromise()
//     .then((servidor) => {
//         alert('Servidor encontrado: ' + servidor);
//     })
//     .catch(() => {
//         alert('Servidor não encontrado');
//     });


function BuscarNomeDoAluno (matricula) {
    return new Promise((resolve, reject) => {

        const AlunosCadastrados = {
            123: 'Luana Lima Garcia',
            345: 'Aila Lima Garcia',
            678: 'Saori Lima Garcia',
            910: 'Kalleo Lima Garcia'
        }

        setTimeout(() => {

            if (AlunosCadastrados[matricula]) {
                resolve(AlunosCadastrados[matricula])
            } else {
                reject('Aluno não encontrado');
            }

        }, 1000);
    });
}

function BuscarSalaDoAluno (matricula) {
    const SalaAlaunosCadastrados = {
        123: 'Sala 01',
        345: 'Sala 03',
        678: 'Sala 04',
        910: 'Sala 02'
    }

    if (SalaAlaunosCadastrados[matricula]) {
        return SalaAlaunosCadastrados[matricula];
    } else {
        return false;
    }
}

function BuscarMatricula() {
    const id = Number(prompt('Informe a matricula do aluno'));

    return BuscarNomeDoAluno(id)
        .then((nome) => {
            const sala = BuscarSalaDoAluno(id);

            return {
                nome,
                sala
            };
        });
}

BuscarMatricula()
    .then((result) => {
        alert("O aluno(a) " + result.nome + " está matriculado(a) na "+ result.sala);
    }).catch(() => {
        alert("Não encontramos nenhum aluno com essa matricula.");
    })