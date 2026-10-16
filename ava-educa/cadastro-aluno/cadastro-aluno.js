import { alunos } from '../dados/listagem-alunos.js';

document.addEventListener('DOMContentLoaded', () => {
    const nomeUsuarioHeader = document.getElementById('nomeUsuarioHeader');

    // Recupera a string JSON da sessionStorage
    const usuarioSessao = sessionStorage.getItem('usuarioLogado');

    if (usuarioSessao) {
        // Converte de volta para objeto JavaScript
        const dadosUsuario = JSON.parse(usuarioSessao);
        
        // Exibe o nome do usuário (assumindo que o objeto possui a propriedade .nome)
        nomeUsuarioHeader.textContent = dadosUsuario.nome;
    } else {
        // Proteção de rota básica: se não houver usuário logado, chuta de volta para o login
        window.location.href = "login.html";
    }
});

const formCadastroAluno = document.getElementById('formCadastroAluno');
const mensagemCadastro = document.getElementById('mensagemCadastro');

if (formCadastroAluno) {
    formCadastroAluno.addEventListener('submit', (event) => {
        event.preventDefault();

        const dados = Object.fromEntries(new FormData(formCadastroAluno).entries());
        const listaAlunos = JSON.parse(localStorage.getItem('alunos')) || alunos;

        listaAlunos.push({
            id: Date.now(),
            ...dados
        });

        localStorage.setItem('alunos', JSON.stringify(listaAlunos));

        if (mensagemCadastro) {
            mensagemCadastro.textContent = 'Aluno cadastrado com sucesso!';
        }

        formCadastroAluno.reset();
    });
}
