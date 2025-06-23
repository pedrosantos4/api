// Gerar um código aleatório de acordo com a quantidade de caracteres informada
export function codeGenerator(tamanho) {
    let text = '';
    const possible = 'QWERTYUIOPASDFGHJKLÇZXCVBNMqwertyuiopasdfghjklçzxcvbnm0123456789';
    for (let i = 0; i < tamanho; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

// Validar campos ausentes em um body de requisição
export function validateRequiredFields(body, requiredFields) {
    const missingFields = requiredFields.filter(field => !body || body[field] === undefined || body[field] === null);
    return {
        fields: missingFields,
        missing: missingFields.length > 0 ? true : false
    }
}

// Validar valores ausentes nos campos em um body de requisição
export function validateRequiredFieldsValues(body, requiredFields) {
    const missingFields = requiredFields.filter(field => body[field] === null || (typeof body[field] === 'string' && body[field].trim() === ''));
    return {
        fields: missingFields,
        missing: missingFields.length > 0 ? true : false
    }
}