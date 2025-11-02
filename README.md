# 🌌 inOrbit WEB

> Aplicação web responsiva para gerenciamento de metas pessoais, desenvolvida com **React** e **Vite**.

![Status](https://img.shields.io/badge/status-estável-2ECC71?style=flat-square)

---

## ✨ Sobre o projeto

O **inOrbit WEB** é a interface da aplicação inOrbit, permitindo que os usuários:

- Visualizem e criem **metas pessoais**.
- Acompanhem **hábitos diários** e progresso de tarefas.
- Interajam com métricas e dashboards de desempenho pessoal.
- Efetuem login via **GitHub OAuth** de forma segura e prática.

---

## 🚀 Tecnologias

- [![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/) - Build tool rápida e moderna para React.

- [![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/) - Biblioteca para construção de interfaces reativas.

- [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/) - Tipagem estática e segurança no código.

- [![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)](https://axios-http.com/) - Cliente HTTP para requisições à API.

- [![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/) - Navegação e roteamento em React.

- [![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC3C4D?style=for-the-badge&logo=react&logoColor=white)](https://react-hook-form.com/) - Gerenciamento de formulários de forma simples e performática.

- [![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)](https://zod.dev/) - Validação de esquemas para formulários e dados.

- [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/) - Framework CSS para estilização rápida e responsiva.

- [![Sonner](https://img.shields.io/badge/Sonner-7B61FF?style=for-the-badge)](https://sonner.toast.dev/) - Biblioteca de notificações/toasts customizáveis.

- [![Day.js](https://img.shields.io/badge/Day.js-2EC1AC?style=for-the-badge&logo=day.js&logoColor=white)](https://day.js.org/) - Manipulação de datas leve e prática.

- [![Radix UI](https://img.shields.io/badge/Radix_UI-000000?style=for-the-badge&logo=radix-ui&logoColor=white)](https://www.radix-ui.com/) - Componentes acessíveis e reutilizáveis.

- [![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)](https://tanstack.com/query/latest) - Gerenciamento e cache de dados assíncronos.

---

## 📦 Instalação

1. Clone o repositório e acesse o diretório do projeto:

```bash
git clone https://github.com/oliveiradniel/in.orbit-web.git
cd in.orbit-web
```

2. Instale as dependências:

```bash
yarn
```

3. Copie o arquivo de variáveis de ambiente:

```bash
cp .env.example .env
```

> 💡 **Dica:** adicione o arquivo `.env` ao `.gitignore` para evitar o versionamento de dados sensíveis.

---

## 📄 Variáveis de Ambiente

O projeto utiliza um arquivo `.env` com as seguintes variáveis:

| Nome                    | Descrição                        | Exemplo                 |
| ----------------------- | -------------------------------- | ----------------------- |
| `VITE_API_URL`          | URL de conexão com a API         | `http://localhost:3000` |
| `VITE_GITHUB_CLIENT_ID` | ID gerado pelo GitHub para OAuth | `AIzaSy...`             |

---

## 🛜 Conexão com a API

Para conseguir utilizar a aplicação corretamente vá até o [repositório da API](https://github.com/oliveiradniel/in.orbit-server) e siga os passos corretamente para colocá-la no ar e fazer as requisições.

---

## 💻 Executando em modo de desenvolvimento

```bash
yarn dev
```

> Certifique-se de que o banco de dados e as variáveis de ambiente estão configurados corretamente antes de iniciar o projeto.

---

## 🎨 Algumas telas da aplicação

### Login

Realize login utilizando sua conta do GitHub.

![Tela de login](https://raw.githubusercontent.com/oliveiradniel/in.orbit-web/refs/heads/main/_assets/Login.png)

### Metas Vazias

Tela inicial antes de adicionar qualquer meta.

![Tela de metas vazias](https://raw.githubusercontent.com/oliveiradniel/in.orbit-web/refs/heads/main/_assets/Empty_Goals.png)

### Dashboard

Visualize dados do perfil, níveis de experiência, metas cadastradas e status.

![Tela de dashboard](https://raw.githubusercontent.com/oliveiradniel/in.orbit-web/refs/heads/main/_assets/Dashboard.png)

### Cadastrar Meta

Adicione rapidamente novas metas e defina a frequência desejada.

![Diálogo para cadastrar meta](https://raw.githubusercontent.com/oliveiradniel/in.orbit-web/refs/heads/main/_assets/New_Goal.png)

### Gerenciar Metas

Gerencie suas metas, visualize o total e torne inativas as que não são mais necessárias.

![Diálogo para gerenciar metas](https://raw.githubusercontent.com/oliveiradniel/in.orbit-web/refs/heads/main/_assets/Manage_Goals.png)

### Perfil do Usuário

Acompanhe suas metas concluídas, ativas, cadastradas e tenha a opção de excluir a conta.

![Modal para filtrar transações](https://raw.githubusercontent.com/oliveiradniel/in.orbit-web/refs/heads/main/_assets/Profile.png)

---

## 🔗 Links

[![Deploy](https://img.shields.io/badge/🧑🏻‍💻_aplicação_em_tempo_real-8E51FF?style=for-the-badge&logo=windows-terminal&logoColor=white)](https://app.inorbit.site/login)

[![Repositório Back-End](https://img.shields.io/badge/repositório_back_end-0a1123?style=for-the-badge&logo=github&logoColor=white)](https://github.com/oliveiradniel/in.orbit-server)

[![Portfólio](https://img.shields.io/badge/meu_portfólio-00A6F4?style=for-the-badge&logo=google-earth&logoColor=white)](https://jovemprogramador.dev/)
