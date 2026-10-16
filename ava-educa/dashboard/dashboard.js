import { cursos } from '../dados/listagem-cursos.js';

document.addEventListener('DOMContentLoaded', () => {
    const nomeUsuarioHeader = document.getElementById('nomeUsuarioHeader');
    const containerCursos = document.getElementById('containerCursos');
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
    } catch (error) {
        sessionStorage.removeItem('usuarioLogado');
        window.location.href = '../login/login.html';
        return;
    }

    if (containerCursos) {
        if (cursos.length === 0) {
            containerCursos.innerHTML = '<div class="aviso-vazio">Nenhum curso disponível.</div>';
            return;
        }

        containerCursos.innerHTML = cursos
            .map(
                (curso) => `
                    <article class="curso-card">
                        <div class="card-badge">Ativo</div>
                        <h3 class="curso-nome">${curso.nomeCurso}</h3>
                        <div class="curso-datas">
                            <p><strong>Professor:</strong> ${curso.emailProfessor}</p>
                            <p><strong>Início:</strong> ${curso.dataInicio}</p>
                            <p><strong>Fim:</strong> ${curso.dataFim}</p>
                        </div>
                    </article>
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


