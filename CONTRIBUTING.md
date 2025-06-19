# Guia de Contribuição

Obrigado por querer contribuir com este projeto! 🎉 Este é um projeto open source criado para fins educacionais e com impacto real, portanto sua colaboração é muito bem-vinda.

## Como contribuir

- **Fork este repositório**:
  Clique em "Fork" no canto superior direito da página para criar uma cópia do projeto no seu GitHub.

- **Clone seu fork**

```bash
git clone https://github.com/herloncosta/url-shortener.git
cd url-shortener
```

### Crie uma branch para sua feature ou correção

```bash
git checkout -b feature/nome-da-sua-feature
```

### Faça suas alterações

- **Implemente sua melhoria, correção ou nova feature.**
- **Commit suas alterações**

```bash
git commit -m "feat: descrição da sua feature"
```

- **Envie para seu fork**

```bash
git push origin feature/nome-da-sua-feature
```

### Abra um Pull Request

- Vá até o seu repositório forkado no GitHub.
- Clique em **"Compare & Pull Request"**.
- Descreva sua alteração de forma clara e objetiva.

## Boas práticas

- Escreva commits claros e no formato: **tipo: descrição**

### Exemplos de tipos:

```code
- feat: — Nova feature
- fix: — Correção de bug
- docs: — Documentação
- refactor: — Refatoração de código
- test: — Adição ou melhoria de testes
- chore: — Tarefas que não impactam o código (configs, CI, etc)
```

## Padrões de Código

- Utilize TypeScript sempre.
- Mantenha a tipagem estrita, evite any sempre que possível.
- Siga o padrão de nomenclatura consistente.
- Valide entradas e trate erros apropriadamente.
- Execute npm run lint antes de enviar seu PR para garantir que o código está formatado corretamente.

## Checklist antes do PR

- [ ] O código roda sem erros.
- [ ] Adicionei testes, se aplicável.
- [ ] Adicionei/atualizei a documentação, se necessário.
- [ ] Fiz lint no código (npm run lint).
- [ ] A branch está atualizada com a main.

## Precisa de ajuda?

Abra uma Issue com sua dúvida, sugestão ou problema encontrado. Toda contribuição é bem-vinda!

### Bora codar e colaborar!
