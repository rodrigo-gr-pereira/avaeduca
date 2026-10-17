import { cursos } from './listagem-cursos.js';


export function listarCursos(usuario) {
    return new Promise((resolve, reject) => {
        // Validação inicial do parâmetro de entrada
        if (!usuario || !usuario.id) {
            reject("Usuário inválido ou não autenticado.");
            return;
        }

        // Filtra os cursos pertencentes ao id do usuário recebido
        const cursosDoUsuario = cursos.filter(curso => curso.usuarioId === usuario.id);

        // Valida a existência de registros para o usuário
        if (cursosDoUsuario.length > 0) {
            // Retorna a promise resolve com os dados dos cursos
            resolve(cursosDoUsuario);
        } else {
            // Retorna a promise reject com a mensagem exata exigida pelo requisito
            reject("Não há cursos cadastrados para esse usuário");
        }
    });
}
