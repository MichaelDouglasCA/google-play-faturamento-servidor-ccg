```
# google-play-faturamento-servidor-ccg

**Servidor Node.js para integração com a API Google Play Billing**, permitindo a verificação de compras de produtos e assinaturas na Google Play Store.

Este pacote facilita a interação com a API Google Play Billing, oferecendo uma maneira simples de verificar transações in-app e processar compras. Ideal para desenvolvedores que precisam integrar faturamento com a Google Play Store em suas aplicações.

---

## Índice

- [Instalação](#instalação)
- [Uso](#uso)
- [Exemplos](#exemplos)
- [API](#api)
- [Contribuindo](#contribuindo)
- [Licença](#licença)
- [Sobre](#sobre)

---

## Instalação

### Com npm

```bash
npm install google-play-faturamento-servidor-ccg
```

### Com Yarn

```bash
yarn add google-play-faturamento-servidor-ccg
```

---

## Uso

Este pacote permite verificar compras in-app (produtos e assinaturas) feitas na Google Play Store. 

### Exemplo de Uso

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

## Exemplos

Aqui estão alguns exemplos para ajudá-lo a começar com as principais funcionalidades.

### Exemplo 1: Verificação de Compra In-App

Verifique uma compra de produto in-app usando um `receipt`.

```javascript
const receipt = {
  packageName: 'com.exemplo.app',
  productId: 'produto_exemplo',
  purchaseToken: 'TOKEN_DE_COMPRA'
};

verifier.verifyINAPP(receipt)
  .then(response => {
    if (response.isSuccessful) {
      console.log('Compra verificada com sucesso!');
    } else {
      console.error('Erro na verificação:', response.errorMessage);
    }
  });
```

### Exemplo 2: Verificação de Assinatura

Verifique uma compra de assinatura.

```javascript
const subscriptionReceipt = {
  packageName: 'com.exemplo.app',
  productId: 'assinatura_exemplo',
  purchaseToken: 'TOKEN_DE_COMPRA',
  developerPayload: 'dados adicionais' // Usado para validações extras
};

verifier.verifySub(subscriptionReceipt)
  .then(response => {
    if (response.isSuccessful) {
      console.log('Assinatura verificada com sucesso!');
    } else {
      console.error('Erro na verificação da assinatura:', response.errorMessage);
    }
  });
```

---

## API

### `Verifier(options)`

A classe `Verifier` é responsável por verificar as compras.

#### Parâmetros:
- `options`: Um objeto que contém as credenciais do Google (email e chave privada) para autenticação via JWT.

### `verifyINAPP(receipt)`

Verifica uma compra de produto in-app.

#### Parâmetros:
- `receipt`: Um objeto que contém:
  - `packageName` (string): O nome do pacote do aplicativo.
  - `productId` (string): O ID do produto.
  - `purchaseToken` (string): O token da compra.

#### Retorno:
Uma promessa que resolve para um objeto com a estrutura:
```javascript
{
  isSuccessful: boolean,
  errorMessage: string | null,
  payload: object
}
```

### `verifySub(receipt)`

Verifica uma compra de assinatura.

#### Parâmetros:
- `receipt`: Um objeto que contém:
  - `packageName` (string): O nome do pacote do aplicativo.
  - `productId` (string): O ID do produto da assinatura.
  - `purchaseToken` (string): O token da compra.
  - `developerPayload` (any): Dados adicionais enviados pelo desenvolvedor.

#### Retorno:
Uma promessa que resolve para um objeto com a estrutura:
```javascript
{
  isSuccessful: boolean,
  errorMessage: string | null,
  payload: object
}
```

---

## Contribuindo

Se você deseja contribuir para este projeto, siga as etapas abaixo:

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/MichaelDouglasCA/google-play-faturamento-servidor-ccg.git
   ```

2. **Crie uma branch para suas alterações**:
   ```bash
   git checkout -b minha-feature
   ```

3. **Faça suas alterações** e adicione testes, se necessário.

4. **Envie para o repositório remoto**:
   ```bash
   git push origin minha-feature
   ```

5. **Crie um Pull Request**.

---

## Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

---

## Sobre

Este pacote foi criado por [MichaelDCA](https://github.com/MichaelDouglasCA) com o objetivo de facilitar a integração entre servidores Node.js e a Google Play Billing API. Este projeto é mantido e aberto para contribuições.

```