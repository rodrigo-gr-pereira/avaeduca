import { cursos } from '../dados/listagem-cursos.js';

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


const nomeUsuario = document.getElementById('nomeUsuario');
const listaCursos = document.getElementById('listaCursos');
const btnSair = document.getElementById('btnSair');

const usuarioLogado = sessionStorage.getItem('usuarioLogado');

if (!usuarioLogado) {
    window.location.href = '../login/login.html';
} else {
    const usuario = JSON.parse(usuarioLogado);
    if (nomeUsuario) {
        nomeUsuario.textContent = usuario.nome || 'Aluno';
    }

    if (listaCursos) {
        listaCursos.innerHTML = cursos
            .map(
                (curso) => `
                    <li>
                        <strong>${curso.nomeCurso}</strong>
                        <span>Professor: ${curso.emailProfessor}</span>
                        <span>Período: ${curso.dataInicio} a ${curso.dataFim}</span>
                    </li>
                `
            )
            .join('');
    }
}

if (btnSair) {
    btnSair.addEventListener('click', () => {
        sessionStorage.removeItem('usuarioLogado');
        window.location.href = '../login/login.html';
    });
}
