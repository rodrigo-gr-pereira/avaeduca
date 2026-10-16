import { login } from '../js/auth.js';

const formLogin = document.getElementById('formLogin');
const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');
const mensagemErro = document.getElementById('mensagemErro');
const linkResetarSenha = document.getElementById('linkResetarSenha');

if (linkResetarSenha) {
    linkResetarSenha.addEventListener('click', (event) => {
        event.preventDefault();
        window.alert('Funcionalidade em construção.');
    });
}

if (formLogin && emailInput && senhaInput && mensagemErro) {
    formLogin.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = emailInput.value.trim();
        const senha = senhaInput.value;

        mensagemErro.textContent = '';
        emailInput.classList.remove('input-erro');
        senhaInput.classList.remove('input-erro');

        try {
            const usuarioLogado = await login(email, senha);
            sessionStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
            window.location.href = '../dashboard/dashboard.html';
        } catch (erro) {
            mensagemErro.textContent = erro;
            emailInput.classList.add('input-erro');
            senhaInput.classList.add('input-erro');
        }
    });
}

