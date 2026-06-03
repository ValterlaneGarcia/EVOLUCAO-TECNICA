//callback, async/await, promise to return server and rubrica


//callback
function registrationServerCallback(registration, callback) {
    const registerServer = {
        123: 'Emma',
        345: 'Joyce',
        678: 'Tuti'
    }

    if (registerServer[registration]) {
        const rubric = callback(registration);

        return data = [rubric,registerServer[registration]]
    } else {
        return false;
    }
}

function rubricServerCallback(registration) {
    const registerRubric = {
        123: 'R990',
        345: '0932',
        678: '1210'
    }

    if (registerRubric[registration]) {
        return registerRubric[registration]
    } else {
        return false;
    }
}

function searchDataServerCallback(registration, callback, callback2) {
    setTimeout(() => {
      const dataServer = callback(registration,callback2);
      
      if (!dataServer) {
        console.log("Não foi possivel encontrar o servidor!");
        return false;
      }

      console.log("O servidor: " + dataServer[1] + " contém a rubrica: " + dataServer[0]);
    }, 2000);

}

searchDataServerCallback(123, registrationServerCallback,rubricServerCallback);


//Promise
function registerServerPromise(registration) {
    return new Promise((resolve, reject) => {

        const registerServer = {
            123: 'Emma',
            345: 'Joyce',
            678: 'Tuti'
        }
    
        setTimeout(() => {
            
            if (registerServer[registration]) {
                resolve(registerServer[registration]);
            } else {
                reject('Aluno não encontrado')
            } 

        }, 1000);
    });
}

function rubricServerPromise(registration) {
    const registerRubric = {
        123: 'R990',
        345: '0932',
        678: '1210'
    }

    if (registerRubric[registration]) {
        return registerRubric[registration]
    } else {
        return false;
    }
}

function searchDataServerPromise(id) {

    return registerServerPromise(id)
        .then((name) => {
            const rubrics = rubricServerPromise(id);
            
            return {
                name,
                rubrics
            };
        });
}

searchDataServerPromise(123)
.then((result) => {
    console.log("A server " + result.name + ", have is rubric: " + result.rubrics);
}) .catch ((err) => {
    console.log(err);
})

//Async/Await

function registerServerAsyncAwait(id) {

    const registerServer = {
        123: 'Emma',
        456: 'Joyce',
        789: 'Tuti'
    }
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (registerServer[id]) {
                    resolve(registerServer[id])
                } else {
                    reject("not found register");
                }          
            }, 2000);
    })


}

function valueWageServerAsyncAwait(id, name, rubric) {
    const valueDate = {
        123: {'R990': 2341.21},
        456: {'0932': 1232.23},
        789: {'1210': 32.0}
    }

    if (valueDate[id][rubric]) {
        console.log('Value the server ' + name + " is: " + valueDate[id][rubric])
        return true;
    } else {
        throw new Error("Server not found");
    }
}

function rubricServerAsyncAwait (registration) {
        const registerRubric = {
        123: 'R990',
        345: '0932',
        678: '1210'
    }

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (registerRubric[registration]) {
                resolve(registerRubric[registration])
            } else {
                reject('not found rubric');
            }
        }, 2000);
    });
}

async function searchDataServerAsyncAwait(id) {
    try {
        
        console.log("seachring value of server...");

        const name      = await registerServerAsyncAwait(id)
        const rubric    = await rubricServerAsyncAwait(id)

        const value = valueWageServerAsyncAwait(id, name, rubric)

    } catch (error) {
        console.log(error);
    }
}

searchDataServerAsyncAwait(123)