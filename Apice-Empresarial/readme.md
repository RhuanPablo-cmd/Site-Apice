# Ápice Empresarial - Site de Consultoria

## 📋 Descrição

Site corporativo responsivo para a Ápice Empresarial, uma empresa de consultoria empresarial focada em resultados, eficiência e crescimento sustentável.

## 📁 Estrutura de Arquivos

```
apice-empresarial/
├── index.html          # Arquivo HTML principal
├── css/
│   └── styles.css      # Estilos CSS completos
├── js/
│   └── script.js       # JavaScript com interatividade
├── images/             # Pasta com todas as imagens
│   ├── hero-bg.jpg     # Imagem de fundo da seção hero
│   ├── about-team.jpg  # Imagem da equipe
│   ├── icon-finance.png
│   ├── icon-management.png
│   └── icon-training.png
└── README.md           # Este arquivo
```

## 🚀 Como Usar

### Opção 1: Abrir Localmente
1. Extraia o arquivo ZIP
2. Abra o arquivo `index.html` diretamente no navegador
3. O site funcionará completamente sem necessidade de servidor

### Opção 2: Com um Servidor Local (Recomendado)
Se você estiver usando VS Code:
1. Instale a extensão "Live Server"
2. Clique com botão direito em `index.html`
3. Selecione "Open with Live Server"

Ou use Python:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Depois acesse: `http://localhost:8000`

## 🎨 Customização

### Cores
As cores principais estão definidas no arquivo `css/styles.css`:
- Azul primário: `#3b7fb5`
- Azul escuro: `#1a3a5c`
- Azul médio: `#2d5a7b`

Para alterar, procure por esses valores no CSS e substitua.

### Textos
Todos os textos estão no arquivo `index.html`. Procure pelas seções comentadas:
- `<!-- Hero Section -->`
- `<!-- Why Choose Us Section -->`
- `<!-- About Us Section -->`
- `<!-- Footer -->`

### Imagens
Substitua as imagens na pasta `images/` mantendo os mesmos nomes de arquivo.

### Fontes
As fontes são importadas do Google Fonts no `index.html`:
- **Montserrat**: Para títulos
- **Open Sans**: Para corpo de texto

Para mudar, edite a linha de importação no `<head>` do HTML.

## 📱 Responsividade

O site é totalmente responsivo e se adapta a:
- Desktop (1280px+)
- Tablet (768px - 1279px)
- Mobile (até 767px)

## ✨ Recursos

- ✅ Design moderno e profissional
- ✅ Navegação suave (smooth scroll)
- ✅ Efeitos de hover nos cards
- ✅ Animações de entrada
- ✅ Indicadores de slide automáticos
- ✅ Header que muda ao fazer scroll
- ✅ Totalmente responsivo
- ✅ Sem dependências externas (apenas Google Fonts)

## 🔧 Modificações Comuns

### Adicionar Nova Seção
1. Adicione um novo `<section>` no HTML
2. Crie os estilos correspondentes no CSS
3. Adicione a navegação no header se necessário

### Alterar Cores
Procure por `#3b7fb5`, `#1a3a5c`, `#2d5a7b` no CSS e substitua pelos valores desejados.

### Adicionar Links Funcionais
No HTML, altere os `href="#"` para os URLs desejados:
```html
<a href="https://seu-site.com">Link</a>
```

### Adicionar Formulário de Contato
Você pode usar serviços como:
- Formspree (https://formspree.io/)
- Netlify Forms
- EmailJS

#### 🔧 Envio via servidor (Node.js + Nodemailer)
Se preferir enviar e-mails diretamente do servidor (recomendado para enviar para um e-mail fixo), o projeto já traz um exemplo simples com `nodemailer` em `server.js` e um endpoint `/api/contact`.

Passos rápidos:
1. Crie um arquivo `.env` na raiz com as variáveis abaixo:

```env
GMAIL_USER=seu_email@gmail.com
GMAIL_PASS=sua_app_password_do_gmail
TARGET_EMAIL=apiceempresarial@gmail.com
PORT=3000
```

2. Gere uma App Password no Gmail (se sua conta tiver 2FA) e coloque em `GMAIL_PASS`.
3. Instale dependências: `npm install` (ou `npm ci`).
4. Inicie o servidor: `node server.js` (ou `npm start`).

O endpoint `/api/contact` valida os dados e encaminha o e-mail para `TARGET_EMAIL`. Use com atenção (proteja o servidor e as credenciais!).

## 📞 Contato

Para dúvidas sobre o código, consulte os comentários no arquivo correspondente.

## 📄 Licença

Este projeto é fornecido como está para uso pessoal e comercial.

---

**Desenvolvido com ❤️ para Ápice Empresarial**
