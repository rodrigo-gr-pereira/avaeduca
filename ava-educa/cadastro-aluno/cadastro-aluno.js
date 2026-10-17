import Aluno from '../js/Aluno.js';
import { carregarAlunos, salvarAlunos } from '../js/alunos.js';

document.addEventListener('DOMContentLoaded', () => {
    const nomeUsuarioHeader = document.getElementById('nomeUsuarioHeader');
    const btnSair = document.getElementById('btnSair');
    const formCadastro = document.getElementById('formCadastroAluno');
    const mensagemErro = document.getElementById('mensagemErro');
    const mensagemSucesso = document.getElementById('mensagemSucesso');
    const cepInput = document.getElementById('cep');
    const logradouroInput = document.getElementById('logradouro');
    const bairroInput = document.getElementById('bairro');
    const cidadeInput = document.getElementById('cidade');
    const estadoInput = document.getElementById('estado');

    const usuarioSessao = sessionStorage.getItem('usuarioLogado');
    if (!usuarioSessao) {
        window.location.href = '../login/login.html';
        return;
    }

    try {
        const usuario = JSON.parse(usuarioSessao);
        if (nomeUsuarioHeader) {
            nomeUsuarioHeader.textContent = usuario.nome || 'Aluno';
        }
    } catch (error) {
        sessionStorage.removeItem('usuarioLogado');
        window.location.href = '../login/login.html';
        return;
    }

    btnSair?.addEventListener('click', () => {
        sessionStorage.removeItem('usuarioLogado');
        window.location.href = '../login/login.html';
    });

    const exibirErro = (mensagem) => {
        if (!mensagemErro) return;
        mensagemErro.textContent = mensagem;
        mensagemErro.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const limparErro = () => {
        if (!mensagemErro) return;
        mensagemErro.textContent = '';
        mensagemErro.style.display = 'none';
        if (mensagemSucesso) {
            mensagemSucesso.textContent = '';
            mensagemSucesso.style.display = 'none';
        }
    };

    const restaurarPlaceholders = () => {
        if (logradouroInput) logradouroInput.placeholder = 'Rua, Avenida, etc.';
        if (bairroInput) bairroInput.placeholder = 'Bairro';
        if (cidadeInput) cidadeInput.placeholder = 'Cidade';
        if (estadoInput) estadoInput.placeholder = 'Estado';
    };

    cepInput?.addEventListener('blur', async () => {
        const cep = cepInput.value.replace(/\D/g, '');
        limparErro();

        if (!cep) return;
        if (cep.length !== 8) {
            exibirErro('CEP inválido. O CEP deve conter exatamente 8 números.');
            return;
        }

        for (const campo of [logradouroInput, bairroInput, cidadeInput, estadoInput]) {
            if (campo) campo.placeholder = 'Buscando...';
        }

        try {
            const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            if (!resposta.ok) {
                throw new Error(`A busca de CEP falhou com status ${resposta.status}.`);
            }

            const endereco = await resposta.json();
            if (endereco.erro) {
                exibirErro('CEP não localizado na base do ViaCEP.');
                return;
            }

            if (logradouroInput) logradouroInput.value = endereco.logradouro || '';
            if (bairroInput) bairroInput.value = endereco.bairro || '';
            if (cidadeInput) cidadeInput.value = endereco.localidade || '';
            if (estadoInput) estadoInput.value = endereco.uf || '';

            const numeroInput = document.getElementById('numero');
            numeroInput?.focus();
        } catch (error) {
            exibirErro('Falha ao conectar com o serviço de busca de CEP. Insira o endereço manualmente.');
        } finally {
            restaurarPlaceholders();
        }
    });

    const validarDataNascimento = (valor) => {
        if (!valor) return 'Informe a data de nascimento.';

        const dataMinima = '1900-01-01';
        const hoje = new Date();
        const ano = hoje.getFullYear();
        const mes = String(hoje.getMonth() + 1).padStart(2, '0');
        const dia = String(hoje.getDate()).padStart(2, '0');
        const dataHoje = `${ano}-${mes}-${dia}`;

        if (valor <= dataMinima) {
            return 'A data de nascimento deve ser posterior a 01/01/1900.';
        }
        if (valor >= dataHoje) {
            return 'A data de nascimento deve ser anterior à data atual.';
        }
        return '';
    };

    formCadastro?.addEventListener('submit', (event) => {
        event.preventDefault();
        limparErro();

        const dataNascimento = document.getElementById('dataNascimento').value;
        const erroData = validarDataNascimento(dataNascimento);
        if (erroData) {
            exibirErro(erroData);
            return;
        }

        const dadosAluno = {
            id: Date.now(),
            nome: document.getElementById('nomeCompleto').value.trim(),
            genero: document.getElementById('genero').value,
            dataNascimento,
            cpf: document.getElementById('cpf').value.replace(/\D/g, ''),
            telefone: document.getElementById('telefone').value.replace(/\D/g, ''),
            email: document.getElementById('email').value.trim(),
            cep: cepInput.value.replace(/\D/g, ''),
            logradouro: logradouroInput.value.trim(),
            numero: document.getElementById('numero').value.trim(),
            complemento: document.getElementById('complemento').value.trim(),
            bairro: bairroInput.value.trim(),
            cidade: cidadeInput.value.trim(),
            estado: estadoInput.value.trim()
        };

        try {
            const novoAluno = new Aluno(dadosAluno);
            const listaAlunos = carregarAlunos();
            salvarAlunos([...listaAlunos, novoAluno]);

            formCadastro.reset();
            restaurarPlaceholders();
            if (mensagemSucesso) {
                mensagemSucesso.textContent = 'Aluno cadastrado com sucesso!';
                mensagemSucesso.style.display = 'block';
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            exibirErro('Não foi possível salvar o cadastro. Tente novamente.');
            console.error('Falha ao salvar o cadastro do aluno:', error);
        }
    });
});
