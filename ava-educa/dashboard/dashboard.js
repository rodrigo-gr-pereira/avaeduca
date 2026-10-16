import { cursos } from '../dados/listagem-cursos.js';

document.addEventListener('DOMContentLoaded', () => {
    const nomeUsuarioHeader = document.getElementById('nomeUsuarioHeader');
    const nomeUsuario = document.getElementById('nomeUsuario');
    const listaCursosElement = document.getElementById('listaCursos');
    const btnSair = document.getElementById('btnSair');
    const usuarioSessao = sessionStorage.getItem('usuarioLogado');

    if (!usuarioSessao) {
        window.location.href = '../login/login.html';
        return;
    }

    try {
        const dadosUsuario = JSON.parse(usuarioSessao);

        if (nomeUsuarioHeader) {
            nomeUsuarioHeader.textContent = dadosUsuario.nome || 'Aluno';
        }

        if (nomeUsuario) {
            nomeUsuario.textContent = dadosUsuario.nome || 'Aluno';
        }
    } catch (error) {
        sessionStorage.removeItem('usuarioLogado');
        window.location.href = '../login/login.html';
        return;
    }

    if (listaCursosElement) {
        listaCursosElement.innerHTML = cursos
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

    if (btnSair) {
        btnSair.addEventListener('click', () => {
            sessionStorage.removeItem('usuarioLogado');
            window.location.href = '../login/login.html';
        });
    }
});
