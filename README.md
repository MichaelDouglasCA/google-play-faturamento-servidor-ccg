```
# google-play-faturamento-servidor-ccg

![npm](https://img.shields.io/npm/v/google-play-faturamento-servidor-ccg)
![License](https://img.shields.io/github/license/MichaelDouglasCA/google-play-faturamento-servidor-ccg)
![Node.js](https://img.shields.io/badge/node.js-%3E%3D14.0-green)

**Servidor Node.js para integração com a API Google Play Billing**, permitindo a verificação de compras de produtos e assinaturas na Google Play Store.

Este pacote simplifica a comunicação com a API Google Play Billing, fornecendo uma solução confiável para verificar transações in-app e processar compras. Ideal para desenvolvedores que precisam integrar faturamento com a Google Play Store em suas aplicações.

🔗 **NPM:** [google-play-faturamento-servidor-ccg](https://www.npmjs.com/package/google-play-faturamento-servidor-ccg)

---

## 📌 Índice

- [Instalação](#instalação)
- [Uso](#uso)
- [Exemplos](#exemplos)
- [API](#api)
- [Contribuindo](#contribuindo)
- [Licença](#licença)
- [Sobre](#sobre)

---

## 🚀 Instalação

### Via npm
```bash
npm install google-play-faturamento-servidor-ccg
```

### Via Yarn
```bash
yarn add google-play-faturamento-servidor-ccg
```

---

## 🛠 Uso

Este pacote permite verificar compras in-app (produtos e assinaturas) realizadas na Google Play Store.

### 🔹 Exemplo de Uso

```javascript
const Verifier = require('google-play-faturamento-servidor-ccg');

// Configuração do verificador com credenciais do Google
const verifier = new Verifier({
  email: 'SEU_EMAIL_DE_SERVIÇO',
  key: 'SUA_CHAVE_PRIVADA'
});

// Exemplo de verificação de um produto in-app
const receipt = {
  packageName: 'com.exemplo.app',
  productId: 'produto_exemplo',
  purchaseToken: 'TOKEN_DE_COMPRA'
};

verifier.verifyINAPP(receipt)
  .then(response => {
    if (response.isSuccessful) {
      console.log('Compra verificada com sucesso!', response.payload);
    } else {
      console.error('Erro ao verificar compra:', response.errorMessage);
    }
  })
  .catch(error => {
    console.error('Erro ao processar verificação:', error);
  });
```

---

## 📌 Exemplos

### ✅ Verificação de Compra In-App

```javascript
const receipt = {
  packageName: 'com.exemplo.app',
  productId: 'produto_exemplo',
  purchaseToken: 'TOKEN_DE_COMPRA'
};

verifier.verifyINAPP(receipt)
  .then(response => {
    console.log(response.isSuccessful ? 'Compra verificada com sucesso!' : 'Erro:', response.errorMessage);
  });
```

### ✅ Verificação de Assinatura

```javascript
const subscriptionReceipt = {
  packageName: 'com.exemplo.app',
  productId: 'assinatura_exemplo',
  purchaseToken: 'TOKEN_DE_COMPRA',
  developerPayload: 'dados adicionais'
};

verifier.verifySub(subscriptionReceipt)
  .then(response => {
    console.log(response.isSuccessful ? 'Assinatura verificada com sucesso!' : 'Erro:', response.errorMessage);
  });
```

---

## 📚 API

### `Verifier(options)`

Classe para verificação de compras.

#### 🔹 Parâmetros:
- `options`: Um objeto contendo as credenciais do Google (email e chave privada) para autenticação via JWT.

### `verifyINAPP(receipt)`

Verifica uma compra de produto in-app.

#### 🔹 Parâmetros:
- `receipt`: Objeto contendo:
  - `packageName` (string): Nome do pacote do app.
  - `productId` (string): ID do produto.
  - `purchaseToken` (string): Token da compra.

#### 🔹 Retorno:
Uma Promise resolvendo um objeto:
```javascript
{
  isSuccessful: boolean,
  errorMessage: string | null,
  payload: object
}
```

### `verifySub(receipt)`

Verifica uma compra de assinatura.

#### 🔹 Parâmetros:
- `receipt`: Objeto contendo:
  - `packageName` (string): Nome do pacote do app.
  - `productId` (string): ID do produto da assinatura.
  - `purchaseToken` (string): Token da compra.
  - `developerPayload` (any): Dados adicionais enviados pelo desenvolvedor.

#### 🔹 Retorno:
Uma Promise resolvendo um objeto:
```javascript
{
  isSuccessful: boolean,
  errorMessage: string | null,
  payload: object
}
```

---

## 💡 Contribuindo

Se você deseja contribuir para este projeto, siga os passos:

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/MichaelDouglasCA/google-play-faturamento-servidor-ccg.git
   ```

2. **Crie uma branch para suas alterações**:
   ```bash
   git checkout -b minha-feature
   ```

3. **Implemente suas mudanças** e adicione testes se necessário.

4. **Envie para o repositório remoto**:
   ```bash
   git push origin minha-feature
   ```

5. **Abra um Pull Request**.

---

## 📜 Licença

Distribuído sob a licença MIT. Veja [LICENSE](./LICENSE) para mais informações.

---

## 🔗 Sobre

Este pacote foi criado por [MichaelDCA](https://github.com/MichaelDouglasCA) com o objetivo de facilitar a integração entre servidores Node.js e a API Google Play Billing. Este projeto é mantido e aberto a contribuições da comunidade.
```