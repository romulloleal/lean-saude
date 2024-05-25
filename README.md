# Lean Saúde Chalenger

## Setup

Instale as dependências

```
yarn install
```

Inicie o json-server

```
yarn db
```

Inicie o projeto

```
yarn dev
```

## Estrutura

#### Components: Uma customização do MUI DataGrid, onde criei do zero os filtros para a tabela que pode ser reutilizado em vários locais

#### Providers: Utilizei Context Api para persistência de login e do tema (dark mode incluso)

#### Routes: Aqui estão as rotas da aplicação (Login e Customers)

Utilizei Formik em conjunto do Yup para validação do login <br>
Na parte de filtros avançados, implementei apenas alguns das opções de filtros que existem no MUI Datagrid como os tipos de string, numero e data

## Dados de Login

email: admin@admin.com
senha: 123456 <br>
(estes dados podem ser alterados em `/routes/login/useLogin.tsx -> mockSignIn`)

## Technologies

- Vite.js
- Typescript
- MUI
- React Query
- Axios
- json-server
- Formik
- yup

---

⌨️ with ❤️ by [Romullo Leal](https://github.com/romulloleal) 😊
