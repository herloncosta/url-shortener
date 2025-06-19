# Encurtador de URL — Projeto Open Source

Bem-vindo(a) ao **URL Shortener**, um projeto open source criado com o objetivo de proporcionar à comunidade acadêmica uma experiência prática e real no desenvolvimento de software.

Este projeto é um **encurtador de URL**, simples, funcional e com código aberto. Além de ser uma ótima oportunidade para aprender sobre desenvolvimento backend, ele também será utilizado por outras pessoas, ou seja, seu código aqui terá impacto real!

## Objetivo

O projeto tem como principal objetivo transformar URLs longas em URLs curtas e fáceis de compartilhar, com um prazo de expiração configurado (30 dias).

## Tecnologias Utilizadas

- **Node.js** — Ambiente de execução JavaScript
- **TypeScript** — Superset de JavaScript com tipagem forte
- **Express.js** — Framework web minimalista
- **Sequelize** — ORM para banco de dados relacional
- **SQLite** (ou outro banco relacional) — Banco de dados leve e fácil de configurar
- **NanoID** — Gerador de IDs curtos, seguros e aleatórios
- **Dotenv** — Gerenciamento de variáveis de ambiente

## Documentação das Rotas

### 🔸 Criar URL Encurtada

- **Método:** `POST`
- **Endpoint:** `/shorten-url`

#### 🔸 Request Body:

```json
{
  "url": "https://exemplo.com"
}
```

#### 🔸 Response:

```json
{
  "shortUrl": "http://localhost:3001/ABC1234"
}
```

### Redirecionar para URL Original

- **Método:** `GET`
- **Endpoint:** `/:code`

#### 🔸 Exemplo:

```
GET http://localhost:3001/ABC1234
```

- ✅ **Se encontrar a URL válida:** redireciona (HTTP 301) para a URL original.
- ❌ **Se não encontrar:** retorna `404 Not Found`.

## Funcionamento Interno

- Cada URL gerada tem validade de **30 dias**.
- As URLs são armazenadas no banco de dados com:

  - URL original (`longUrl`)
  - Código curto (`shortCode`)
  - Data de expiração (`expiresAt`)

## Como Rodar Localmente

### Clone o repositório

```bash
git clone https://github.com/herloncosta/url-shortener.git
cd url-shortener
```

### Instale as dependências

```bash
npm install
```

### Configure o arquivo `.env`

Exemplo:

```env
SERVER_PORT=3001
DATABASE_URL=sqlite:./db.sqlite
```

### Rode o projeto

```bash
npm run start:dev
```

Servidor rodando em:

```
http://localhost:3000 | 3001
```

## Como Contribuir

1. Faça um fork do projeto.
2. Crie uma branch: `git checkout -b feature/sua-feature`
3. Faça suas alterações e commit: `git commit -m 'feat: sua feature'`
4. Envie para sua branch: `git push origin feature/sua-feature`
5. Abra um **Pull Request**.

## Sugestões de Melhorias

- ✅ Implementar frontend para geração das URLs
- 🔐 Adicionar autenticação para gerenciamento de links
- 🗑️ Permitir exclusão manual das URLs
- 📈 Dashboard de estatísticas de acesso
- 📦 Deploy na nuvem (Vercel, Render, Railway, etc.)
- 🚦 Implementar testes automatizados (Jest)
- 🔧 CI/CD (GitHub Actions)

## Objetivo Educacional

Este projeto foi criado como uma iniciativa prática para a turma do curso de **Desenvolvimento de Software**. Aqui, você terá contato com:

- Desenvolvimento backend real
- Organização de código para projetos profissionais
- Controle de versão com Git e GitHub
- Processos colaborativos (Pull Requests, Issues, Reviews)
- Boas práticas de desenvolvimento

## Licença

[MIT License](LICENSE)

## Agradecimentos

A todos que estão participando dessa jornada, colaborando, aprendendo e evoluindo. Cada linha de código aqui representa crescimento profissional e pessoal. 🚀

> **"Software é uma construção coletiva. Quem compartilha, aprende duas vezes."**
