export function validateNombre (nombre) {
    var nombreValidated = /^(\s*[a-zA-Z]\s*)*$/;
    return nombreValidated.test(nombre);
}