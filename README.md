# 🛒 Entre. Acompanhe. Compre!

Esta aplicação é integrada à plataforma **OdinLine**, feita para facilitar a vida do usuário que quer monitorar os preços de produtos e agir rapidamente quando o valor ideal aparecer — seja com uma notificação ou uma compra instantânea.

## 🔐 Acesso Restrito

Este sistema é exclusivo para usuários **já cadastrados** na OdinLine.  
> ⚠️ Não é possível realizar novos cadastros por aqui.  
A autenticação é obrigatória para acessar qualquer funcionalidade.

---

## 🚀 Funcionalidades

Após o login, o usuário é direcionado a uma interface simples e funcional, com duas opções principais:

### 1. 📢 Alerta de Preço

Permite cadastrar alertas para produtos com:

- **Nome do produto**
- **Valor desejado**
- **Ação**:
  - `Notificar`: exibe uma mensagem visual quando o produto atingir o preço.
  - `Comprar`: registra automaticamente a compra local com identificação e preço.

> 🛑 Não é possível cadastrar dois alertas para o mesmo produto.

Após a execução da ação (notificação ou compra), o alerta é **automaticamente removido** do sistema.

---

### 2. 🧾 Minhas Compras

Exibe uma lista com os dados das **compras realizadas localmente**, contendo:

- Nome do produto
- Valor de compra
- Representação visual

---

## 🧩 Integração com OdinLine

Toda a base de usuários é gerenciada **exclusivamente** pela OdinLine.  
Esta aplicação apenas consome essas credenciais para autenticação.

---

## 🛠️ Tecnologias Utilizadas

- Autenticação via OdinLine
- Armazenamento local de dados de compra
- Interface responsiva
