import { alunos } from '../dados/listagem-alunos.js';

export const alunosAtivos = alunos;

export function salvarAlunos(lista) {
    localStorage.setItem('alunos', JSON.stringify(lista));
    return lista;
}

export function carregarAlunos() {
    const dadosSalvos = localStorage.getItem('alunos');
    return dadosSalvos ? JSON.parse(dadosSalvos) : alunosAtivos;
}

export function cadastrarAluno(aluno) {
    return new Promise((resolve, reject) => {
        // Simulação preventiva: garante que um objeto válido foi enviado
        if (!aluno || !aluno.nomeCompleto) {
            reject("Falha ao processar os dados do aluno. Tente novamente.");
            return;
        }

        // Simulando sucesso na persistência dos dados
        console.log("Salvando aluno na base de dados...", aluno);
        
        // Aqui você poderia fazer um: localStorage.setItem(...) ou um fetch para API
        
        resolve(`Aluno ${aluno.nomeCompleto} cadastrado com sucesso!`);
    });
}
