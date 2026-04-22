# Organização de Arquivos - Ápice Empresarial

## Estrutura Final Organizada

### 📁 Arquivos HTML (Apenas HTML)
- `index.html` - Página inicial (HTML puro)
- `servico.html` - Página de serviços (HTML puro)
- `cursos.html` - Página de cursos (HTML puro)
- `instrutor.html` - Página do instrutor (HTML puro)
- `contato.html` - Página de contato (HTML puro)
- `cadastro.html` - Página de cadastro (HTML puro)

### 📁 Arquivos CSS (Apenas CSS)
**Raiz:**
- `index.css` - Estilos compartilhados
- `servico.css` - Estilos da página de serviços
- `cursos.css` - Estilos da página de cursos
- `instrutor.css` - Estilos da página do instrutor
- `contato.css` - Estilos da página de contato
- `cadastro.css` - Estilos da página de cadastro

**Pasta `css/`:**
- `styles.css` - Estilos globais base
- `theme.css` - Variáveis CSS e Dark Mode (NOVO)

### 📁 Arquivos JavaScript (Apenas JS)
**Raiz:**
- `index.js` - Lógica da página inicial
- `servico.js` - Lógica da página de serviços
- `cursos.js` - Lógica da página de cursos
- `instrutor.js` - Lógica da página do instrutor
- `contato.js` - Lógica da página de contato
- `cadastro.js` - Lógica da página de cadastro (NOVO)
- `chatbot-ia.js` - Chatbot IA

**Pasta `js/`:**
- `script.js` - Scripts globais
- `theme.js` - Gerenciador de tema centralizado (NOVO)

### 📁 Estrutura de Pastas
```
apice-html-export/
├── index.html
├── servico.html
├── cursos.html
├── instrutor.html
├── contato.html
├── cadastro.html
├── index.css
├── servico.css
├── cursos.css
├── instrutor.css
├── contato.css
├── cadastro.css
├── index.js
├── servico.js
├── cursos.js
├── instrutor.js
├── contato.js
├── cadastro.js
├── chatbot-ia.js
├── css/
│   ├── styles.css
│   └── theme.css (NOVO)
├── js/
│   ├── script.js
│   └── theme.js (NOVO)
├── images/
│   └── [arquivos de imagem]
└── README.md
```

## Mudanças Realizadas

### ✅ Limpeza de Arquivos HTML
1. **cursos.html** - Removidos scripts inline da lógica de tema
2. **contato.html** - Corrigida estrutura e removidas duplicações
3. **cadastro.html** - Corrigida referência a CSS e removidas duplicações
4. **instrutor.html** - Ajustado para usar instrutor.js específico
5. **servico.html** - Removidos comentários inline desnecessários
6. **index.html** - Mantido com estrutura correta

### ✅ Organização de CSS
- **Criado `css/theme.css`**: Centraliza variáveis CSS e estilos de Dark Mode
- **Criado `cadastro.css`**: Novo arquivo específico para página de cadastro
- Todos os estilos específicos de página estão em seus respectivos arquivos CSS

### ✅ Organização de JavaScript
- **Criado `js/theme.js`**: Lógica de tema centralizada para todas as páginas
- **Criado `cadastro.js`**: Script específico com validações e interatividade do cadastro
- Cada página HTML agora carrega seu arquivo JS correspondente
- O `js/theme.js` é carregado em todas as páginas para consistência de tema

### ✅ Referências nos HTMLs
Todos os arquivos HTML agora carregam:
```html
<link rel="stylesheet" href="css/theme.css">
<script src="js/theme.js"></script>
```

Mais seus respectivos arquivos CSS e JS:
```html
<link rel="stylesheet" href="[pagina].css">
<script src="[pagina].js"></script>
```

## Benefícios da Organização

1. **Separação de Responsabilidades**: Cada arquivo tem um tipo de conteúdo específico
2. **Manutenção Facilitada**: Localizar e modificar código é mais fácil
3. **Reutilização de Código**: Variáveis CSS e tema são centralizados
4. **Melhor Performance**: Arquivos menores e específicos carregam apenas o necessário
5. **Consistência**: Dark Mode funciona uniformemente em todas as páginas
6. **Escalabilidade**: Novos estilos e funcionalidades podem ser adicionados facilmente

## Arquivos Novos Criados

1. ✅ `css/theme.css` - 279 linhas
2. ✅ `js/theme.js` - 59 linhas
3. ✅ `cadastro.css` - 448 linhas
4. ✅ `cadastro.js` - 155 linhas

## Status: ✅ CONCLUÍDO

Todos os arquivos estão organizados corretamente separados por tipo (HTML, CSS, JS).
