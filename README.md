# Aureum Advocacia — landing page demonstrativa

Landing page institucional para um escritório de advocacia fictício. HTML, CSS e JavaScript puros, sem build e sem dependências.

```
index.html          página única
css/style.css       estilos (tokens no topo, em :root)
js/main.js          menu, header, formulário e dados de contato
assets/images/      fotos otimizadas em WebP (+ og-image.jpg)
assets/fonts/       fontes auto-hospedadas (WOFF2)
favicon.svg
vercel.json         cache e cabeçalhos
.vercelignore       evita publicar arquivos de desenvolvimento
```

## Rodar localmente

Abra com qualquer servidor estático (abrir o arquivo direto pelo `file://` bloqueia as fontes):

```bash
npx serve .
```

## Deploy na Vercel

1. Envie a pasta para um repositório no GitHub.
2. Na Vercel: **Add New → Project**, importe o repositório.
3. Framework Preset: **Other**. Deixe Build Command e Output Directory vazios.
4. **Deploy**.

Ou pela CLI: `npx vercel` (prévia) e `npx vercel --prod`.

Depois do primeiro deploy, troque `https://aureum-advocacia.vercel.app/` pelo domínio real nas tags `canonical` e `og:image` do `index.html`.

## Personalização

| O quê | Onde |
|---|---|
| WhatsApp, e-mail e mensagem padrão | objeto `CONTATO` no topo de `js/main.js` (atualiza todos os botões) |
| Textos de WhatsApp/e-mail exibidos sem JS | buscar `90000-0000` e `contato@aureumadvocacia.com.br` no `index.html` |
| Nome do escritório | buscar `Aureum` no `index.html` (logo: `.logo__name` e `.logo__kind`) |
| Endereço e horário | seção `#contato` e rodapé do `index.html` |
| Equipe | seção `#equipe`; troque as fotos em `assets/images/equipe-*.webp` (proporção 4:5) |
| Cores e fontes | variáveis em `:root` no início de `css/style.css` |
| Título e descrição para buscadores | `<title>` e `<meta name="description">` |

## Antes de usar com um cliente real

- Substitua **todo** o conteúdo demonstrativo: profissionais, fotos, contatos e endereço são fictícios.
- Inclua nome e número de inscrição na OAB do escritório/responsável, conforme o Provimento 205/2021 do Conselho Federal da OAB.
- Remova a nota "Site demonstrativo" do rodapé.
- Mantenha a linguagem sóbria: sem promessas de resultado, preços, depoimentos ou estatísticas não verificáveis.

## Créditos

Fotografias de banco de imagens [Pexels](https://www.pexels.com/license/) (uso livre, inclusive comercial): fotos 9585879, 14350771, 29976379, 30479371, 12912940 e 33844626. Fontes: Montserrat e Libre Caslon Text (itálico) (SIL Open Font License).
