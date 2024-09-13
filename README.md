# Teste API - Guilherme Abdelnor Tavares

Este projeto consiste em uma API desenvolvida em Java utilizando o framework Spring Boot, integrada com um front-end em ReactJS. A API é construída com as dependências Data JPA, Security, Web e Lombok, e utiliza o banco de dados em memória H2 DataBase. A autenticação é realizada por meio de Token JWT.

Para a API, são disponibilizados endpoints para cadastro de usuário, login e validação de token. O endpoint de cadastro permite que o cliente se registre na plataforma fornecendo as informações Username, Email e Senha. Já o endpoint de login possibilita que o cliente faça login na aplicação enviando seu Username e Senha e recebendo um Token JWT válido como resposta. Por fim, o endpoint de validação de token permite que o cliente verifique se um Token JWT é válido.

O front-end é construído com ReactJS e utiliza diversas bibliotecas e ferramentas. Entre elas, estão o shadcn/ui v0, radix-ui e tailwind, responsáveis pela estilização dos componentes, react-router-dom para gerenciamento de rotas, axios para execução de requisições na API, react-toastify para exibição de pop-ups e react-feather para ícones na interface.

Ambos, frontend e backend, serão executados no Docker, o que proporciona uma significativa praticidade.



## Execução

Para executar, abra o Terminal na raiz do projeto e execute o comando:

```bash
docker-compose build; docker-compose up
```
