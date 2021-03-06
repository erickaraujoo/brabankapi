// Constante para checar e validar resultado na inserção de dados
const { validationResult } = require('express-validator')
// const UsuariosValid = require('./../validator/UsuariosValidator')
const usuarioDAO = new (require('./../models/Usuarios'))()

module.exports = {

    async lista(req, res){

        try{
            const usuarios = await usuarioDAO.lista()

            // Caso não tenha usuarios, retorna o erro
            if(!usuarios)
                return res.status(204).send({erro: 'Lista vazia'})

            // Senão retorna o usuario
            return res.send(usuarios)

        // Caso dê erro, retorna o erro para o usuario e para o Dev
        } catch(erro){

            console.log(erro)
            res.status(500).send({erro: erro})
        }
    },

    async insere(req, res) {

        // Verifica se os dados mandados estão de acordo com a validação
        const erros = validationResult(req)

        // Verificando se está vazio
        if(!erros.isEmpty())
            return res.status(400).send(erros)

        // Pegando o corpo da requisição em que o usuario inseriu
        let usuario = req.body

        // Try - Catch para inserir um usuario e mostrar para o usuario a nova lista do banco de dados
        try{
            const retorno = await usuarioDAO.insere(usuario)
            usuario = {id: retorno.insertId, ...usuario}

            res.status(201).send(usuario)
        } catch(erro) {
            console.log(erro)
            res.status(500).send(erro) 
        }
    }
}

// const usuarios = (app) => {

//     app.get('/usuarios/email/:email', (req, res) => {

//         const email = req.params.email

//         usuarioDAO = app.models.Usuarios

//         usuarioDAO.buscarPorEmail(email)
//             .then(retorno => {

//                 if(retorno){
//                     res.send(retorno)
//                 } else {
//                     res.status(404).send({erro: "Usuário não encontrado"})
//                 }
//                 res.send(retorno)
                
//             })
//             .catch(erro => res.status(500).send(erro))
//     })

//     app.post('/usuarios', UsuariosValid.validacoes(), (req, res) => {

//         // Pegando o corpo da requisição e inserindo no usuario
//         let usuario = req.body

//         // Retornando uma lista de erros consultados pelo validationResult caso algum campo esteja vazio
//         // Como no caso o nome é obrigatorio no banco, se estiver vazio o validationResult retornara
//         // esse erro e mandara a mensagem com withMessage
//         const erros = validationResult(req)

//         if(!erros.isEmpty()){
//             res.status(400).send(erros)
//             return
//         }
        
//         // Instanciando a classe Usuarios
//         const usuarioDAO = app.models.Usuarios

//         // Inserindo o usuario
//         usuarioDAO.insere(usuario)
//         .then(retorno => {

//             // usuario.id = retorno.insertId

//             // Mostrando o erro no terminal
//             // console.log(retorno)
//             // Mostrando usuario no POST quando status for 201 
//             res.status(201).send(retorno)
//         })
//         .catch(erro => {

//             // Mostrando o erro no terminal
//             console.log(erro)
//             // Mostrando erro no POST quando status for 500
//             res.status(500).send(erro)
//         })
//     })
// }

// module.exports = usuarios