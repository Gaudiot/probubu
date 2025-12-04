export function isValidUsername(username: string): boolean {
    // Deve ter entre 3 e 20 caracteres
    if (username.length < 3 || username.length > 20) {
        return false;
    }
    // Não pode aceitar espaços vazios
    if (/\s/.test(username)) {
        return false;
    }
    // Só permite letras (qualquer alfabeto), números, hífen e underline.
    // Unicode letters: \p{L}, números: \d, hífen "-", underline "_"
    const regex = /^[\p{L}\d\-_]+$/u;
    return regex.test(username);
}
