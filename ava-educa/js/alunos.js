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
