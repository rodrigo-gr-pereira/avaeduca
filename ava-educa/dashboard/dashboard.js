import { cursos } from '../dados/listagem-cursos.js';

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
