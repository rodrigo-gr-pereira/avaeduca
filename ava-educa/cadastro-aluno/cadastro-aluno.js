import { alunos } from '../dados/listagem-alunos.js';

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
