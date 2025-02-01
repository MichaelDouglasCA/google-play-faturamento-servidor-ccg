// Requer a biblioteca google-oauth-jwt para autenticação JWT e utilitário para formatação de URLs
const { requestWithJWT } = require('google-oauth-jwt');
const util = require('util');

// Exposição do Verifier como módulo
module.exports = Verifier;
module.exports.default = Verifier;

// Função construtora do Verifier, recebe um objeto de opções
function Verifier(options = {}) {
  this.options = options;  // Armazena as opções passadas
}

// Método para verificar compras in-app (produtos)
Verifier.prototype.verifyINAPP = function (receipt) {
  this.options.method = 'get';  // Método HTTP padrão é GET
  this.options.body = '';       // Corpo vazio por padrão
  this.options.json = false;    // Resposta em formato não-JSON por padrão

  // URL base para verificar uma compra de produto
  let urlPattern = "https://www.googleapis.com/androidpublisher/v3/applications/%s/purchases/products/%s/tokens/%s";

  // Se o recibo contiver o campo "consume", altera a URL para consumir o item
  if ("consume" in receipt) {
    urlPattern += ":consume";    // Adiciona ":consume" na URL para consumir o item
    this.options.method = 'post'; // Método HTTP muda para POST
    this.options.json = true;    // Espera resposta em formato JSON
  }

  // Formata a URL com os parâmetros do recibo
  const finalUrl = util.format(
    urlPattern,
    encodeURIComponent(receipt.packageName),  // Codifica o nome do pacote
    encodeURIComponent(receipt.productId),    // Codifica o ID do produto
    encodeURIComponent(receipt.purchaseToken)  // Codifica o token de compra
  );

  // Chama o método de verificação com a URL final
  return this.verify(finalUrl);
};

// Método para verificar assinaturas
Verifier.prototype.verifySub = function (receipt) {
  this.options.method = 'get';  // Método HTTP padrão é GET
  this.options.body = '';       // Corpo vazio por padrão
  this.options.json = false;    // Resposta em formato não-JSON por padrão

  // URL base para verificar uma assinatura
  let urlPattern = "https://www.googleapis.com/androidpublisher/v3/applications/%s/purchases/subscriptions/%s/tokens/%s";

  // Se o recibo contiver o campo "developerPayload", envia um payload adicional para reconhecer a assinatura
  if ("developerPayload" in receipt) {
    urlPattern += ":acknowledge";  // Adiciona ":acknowledge" na URL para reconhecer a assinatura
    this.options.body = { "developerPayload": receipt.developerPayload }; // Adiciona o payload do desenvolvedor
    this.options.method = 'post';  // Método HTTP muda para POST
    this.options.json = true;      // Espera resposta em formato JSON
  }

  // Formata a URL com os parâmetros do recibo
  const finalUrl = util.format(
    urlPattern,
    encodeURIComponent(receipt.packageName),  // Codifica o nome do pacote
    encodeURIComponent(receipt.productId),    // Codifica o ID do produto
    encodeURIComponent(receipt.purchaseToken)  // Codifica o token de compra
  );

  // Chama o método de verificação com a URL final
  return this.verify(finalUrl);
};

// Função para verificar se uma string é um JSON válido
function isValidJson(string) {
  try {
    JSON.parse(string);  // Tenta parsear a string para JSON
    return true;  // Se não ocorrer erro, é um JSON válido
  } catch (e) {
    return false;  // Se ocorrer erro, não é um JSON válido
  }
}

// Método principal de verificação, realiza a chamada HTTP com JWT e processa a resposta
Verifier.prototype.verify = async function (finalUrl) {
  // Configuração para a requisição HTTP
  const options = {
    uri: finalUrl,  // URL final para a verificação
    method: this.options.method,  // Método HTTP (GET ou POST)
    body: this.options.body,      // Corpo da requisição (se houver)
    json: this.options.json,      // Indica se a resposta esperada é JSON
    jwt: {
      email: this.options.email,  // Email do desenvolvedor para autenticação JWT
      key: this.options.key,      // Chave da API para autenticação JWT
      scopes: ['https://www.googleapis.com/auth/androidpublisher']  // Escopo de autorização
    }
  };

  try {
    // Realiza a requisição com JWT e aguarda a resposta
    const response = await requestWithJWT(options);
    let resultInfo = {};  // Inicializa o objeto para armazenar a resposta

    // Verifica o código de status da resposta
    if (response.statusCode === 204) {
      // Caso a compra tenha sido reconhecida com sucesso (código 204)
      resultInfo = {
        isSuccessful: true,  // A verificação foi bem-sucedida
        errorMessage: null,  // Sem mensagem de erro
        payload: { code: response.statusCode, message: "Acknowledged Purchase Successfully" }  // Mensagem de sucesso
      };
    } else if (response.statusCode === 200) {
      // Caso a resposta seja válida (código 200)
      const responseBody = isValidJson(response.body) ? JSON.parse(response.body) : null;
      resultInfo = {
        isSuccessful: true,  // A verificação foi bem-sucedida
        errorMessage: null,  // Sem mensagem de erro
        payload: responseBody  // Dados da resposta
      };
    } else {
      // Caso ocorra um erro com o código de status diferente de 200 ou 204
      resultInfo = {
        isSuccessful: false,  // A verificação falhou
        errorCode: response.statusCode,  // Código de erro da resposta
        errorMessage: response.body?.error?.message || 'Unknown Error'  // Mensagem de erro (se houver)
      };
    }

    // Retorna as informações da verificação
    return resultInfo;
  } catch (err) {
    // Caso ocorra algum erro durante a requisição
    const errorMessage = err.body ? err.body.error_description : err.message || 'Unknown Error';  // Mensagem de erro detalhada
    throw {
      isSuccessful: false,  // A verificação falhou
      errorMessage  // Mensagem de erro
    };
  }
};
