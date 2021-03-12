//importa os módulos http e express
const http = require('http');
const express = require('express');

//constroi um objeto express
const app = express();

//importa o body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//configura a porta do servidor e o coloca em execucao
const porta = 3000;
app.set('port', porta);
const server = http.createServer(app);
server.listen(3000);

let id = 2;
let alunos = [
    {
        id: 1,
        nome: "João",
        fone: "11223344",
        email: "joao@email.com"
    },    
    {
        id: 2,
        nome: "Maria",
        fone: "55667788",
        email: "maria@email.com"
    }
];

//tratamento de requisicoes POST
app.post("/alunos", (req, res, next) =>{
    const aluno = {
        id: id+=1,
        nome: req.body.nome,
        fone: req.body.fone,
        email: req.body.email
    }
    alunos.push(aluno)
    res.status(201).json(aluno);
});

//tratamento de requisicoes GET
app.get("/alunos", (req, res, next) => 
    res.status(200).json(alunos)
);

//tratamento de requisicoes PUT
app.put("/alunos/:id", (req, res, next) => {
    const { id } = req.params;
    const { nome, fone, email } = req.body;

    const userElementIndex = alunos.findIndex( e => {
        return e.id === Number(id)
    });

    alunos[userElementIndex] = {
        id: Number(id),
        nome,
        fone,
        email
    }

    return res.status(200).json(alunos);
});

app.delete("/alunos/:id", (req, res, next) => {
    const { id }  = req.params;

    const index = alunos.findIndex(e => {
        return e.id === Number(id)
    });
    
    alunos.splice(index, 1);

    return res.status(200).json(alunos);
});

let idLivro = 1;

let livros = [
    {
        id: 1,
        titulo: "abc",
        descricao: "def",
        edicao: "ghi",
        autor: "jkl"
    }
]

// GET
app.get("/livros", (req, res, next) => {
    return res.status(200).json(livros);
});

// CREATE
app.post("/livros", (req, res, next) => {
    const livro = req.body;
    
    livros.push({
        id: idLivro += 1,
        titulo: livro.titulo,
        descricao: livro.descricao,
        edicao: livro.edicao,
        autor: livro.autor
    });

    return res.status(201).json(livros);
});

// PUT
app.put("/livros/:id", (req, res, next) => {
    const { id } = req.params;
    const { titulo, descricao, edicao, autor } = req.body;

    const index = livros.findIndex( e => {
        return e.id === Number(id);
    });

    livros[index] = {
        id: Number(id),
        titulo,
        descricao,
        edicao,
        autor
    }

    return res.status(204).end();
});

// DELETE
app.delete("/livros/:id", (req, res, next) => {
    const { id } = req.params;

    const index = livros.findIndex( e => {
        return e.id === Number(id);
    });

    livros.splice(index, 1);

    return res.status(200).json(livros);
});