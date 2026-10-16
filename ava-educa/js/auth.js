import { usuarios } from '../dados/listagem-usuarios.js';

export function login(usuario, senha) {
    return new Promise((resolve, reject) => {
        const usuarioEncontrado = usuarios.find(
            (u) => u.email.toLowerCase() === String(usuario).trim().toLowerCase() && u.senha === senha
        );

        if (usuarioEncontrado) {
            const { senha: _, ...dadosUsuario } = usuarioEncontrado;
            resolve(dadosUsuario);
        } else {
            reject('Dados incorretos. Favor verificar e tentar novamente');
        }
    });
}
