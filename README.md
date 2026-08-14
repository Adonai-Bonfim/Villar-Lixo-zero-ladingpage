# Villar Consultoria Lixo Zero

Landing page institucional da **Villar Consultoria Lixo Zero**, criada para apresentar serviços de gestão de resíduos, educação ambiental, treinamentos, experiência em campo e soluções sustentáveis para organizações.

## Sobre o projeto

O site apresenta a atuação da consultoria de forma clara, moderna e responsiva. A página reúne informações sobre os serviços oferecidos, benefícios da metodologia Lixo Zero, registros de projetos e treinamentos, reconhecimento profissional e um formulário de contato integrado ao WhatsApp.

## Principais recursos

- Layout responsivo para celulares, tablets e computadores
- Navegação por seções da página
- Galeria de experiências e projetos realizados
- Apresentação dos serviços e benefícios da consultoria
- Formulário de contato com direcionamento para o WhatsApp
- Validação dos campos do formulário
- Animações e interações leves
- Service Worker para melhorar a experiência de carregamento
- Boas práticas básicas de acessibilidade e segurança

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript moderno (ES Modules)
- Node.js para o servidor local e os testes
- Node Test Runner

## Estrutura do projeto

```text
.
├── assets/
│   ├── css/          # Estilos da página
│   ├── images/       # Logotipo, fotos e elementos visuais
│   └── js/           # Navegação, formulário, contato e interações
├── tests/            # Testes automatizados
├── index.html        # Página principal
├── service-worker.js # Service Worker do site
├── dev-server.mjs    # Servidor local de desenvolvimento
└── package.json      # Configuração do projeto
```

## Como executar localmente

### Requisitos

- [Node.js](https://nodejs.org/) instalado

### Passos

1. Clone este repositório:

   ```bash
   git clone URL_DO_SEU_REPOSITORIO
   ```

2. Entre na pasta do projeto:

   ```bash
   cd villar-consultoria-landing-page
   ```

3. Inicie o servidor local:

   ```bash
   node dev-server.mjs
   ```

4. Acesse no navegador:

   ```text
   http://localhost:5500
   ```

Para usar outra porta, informe-a após o nome do servidor:

```bash
node dev-server.mjs 8080
```

## Testes

Execute os testes automatizados com:

```bash
npm test
```

## Personalização

O número e a mensagem inicial do WhatsApp podem ser alterados em:

```text
assets/js/config.js
```

As imagens utilizadas na página ficam em `assets/images`, e o conteúdo principal pode ser editado no arquivo `index.html`.

## Publicação

Por ser um site estático, o projeto pode ser publicado em serviços como GitHub Pages, Cloudflare Pages, Netlify ou Vercel.

## Autoria

Projeto desenvolvido para a **Villar Consultoria Lixo Zero**.

