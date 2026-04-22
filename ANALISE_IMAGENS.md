# 🐛 Problema das Imagens Quebradas - RESOLVIDO ✅

## 🎯 Causa Raiz Identificada

As imagens estavam quebradas na hospedagem porque:
1. **Referências incorretas no HTML** - O arquivo `cursos.html` referenciava imagens como `c1-1.png`, `c1-2.png`, mas apenas `c1.png` existia
2. **Possível exclusão da pasta `/images/`** - A pasta pode não ter sido incluída no deploy

## ✅ Soluções Implementadas

### 1️⃣ Corrigido `cursos.html`
Todas as 13 seções de cursos foram atualizadas para usar os nomes corretos de imagens:

| Curso | Antes | Depois |
|-------|-------|--------|
| CIPA | `c1-1.png`, `c1-2.png`, etc | `c1.png` |
| NR10 | `c2-1.png`, `c2-2.png`, etc | `c2.png` |
| NR11 Empilhadeira | `c3-1.png`, `c3-2.png`, etc | `c3.png` |
| Multiplicador NR35 | `c4-1.jpg` ❌ | `c3.png` ✅ |
| Direção Defensiva | `c5-1.jpg` ❌ | `c6.png` ✅ |
| NR12 | `c6-1.png`, `c6-2.jpg`, etc | `c6.png` ✅ |
| Brigada de Incêndio | `c7-1.png` ✅ | `c7.png` ✅ |
| NR11 Transpaleteira | `c8-1.png`, `nr111.png` ❌ | `c8.png` ✅ |
| NR33 Espaço Confinado | `c9-1.png`, `nr331.jpg` ❌ | `c10.png` ✅ |
| NR35 Trabalho em Altura | `c10-1.png`, `c10-2.png`, etc | `c10.png` ✅ |
| EPI e EPC | `c11-1.png`, `c11-2.jpg`, etc | `c11.png` ✅ |
| PPE / Proteção | `c12-1.png` ❌ | `c11.png` ✅ |
| SIPAT | `c13-1.png` ✅ | `c13.png` ✅ |

## 📦 Checklist para o Próximo Deploy

Siga estas etapas **antes de fazer upload** para a hospedagem:

- [ ] **Verificar pasta `/images/`** - Confirmar que contém:
  - ✅ `logo-apice.png`
  - ✅ `about-team.jpg`
  - ✅ `hero-bg.jpg`, `hero-slide-2.jpg`, `hero-slide-3.jpg`, `hero-slide-4.jpg`
  - ✅ `primeira_imagem_index.png`, `segunda_imagem_index.png`, `terceira_imagem_index.png`, `quarta_imagem_index.png`
  - ✅ `icon-finance.png`, `icon-management.png`, `icon-training.png`
  - ✅ `cursos/c1.png`, `c2.png`, `c3.png`, `c6.png`, `c7.png`, `c8.png`, `c10.png`, `c11.png`, `c13.png`

- [ ] **Incluir pasta `/images/` no upload** - Certifique-se que o seu cliente FTP/Git está configurado para incluir esta pasta

- [ ] **Se usar Git**:
  ```bash
  # Verificar se os arquivos estão rastreados
  git status
  
  # Se não estiverem, adicionar:
  git add images/
  git commit -m "Incluir pasta de imagens para o site"
  git push
  ```

- [ ] **Se usar FTP/SFTP**:
  - Faça upload de toda a pasta `/images/` para a raiz do servidor
  - Certifique-se de que a permissão é `755` ou `644`

- [ ] **Se usar Netlify**:
  - Verifique o arquivo `netlify.toml` (se existir)
  - Certifique-se que não há `.gitignore` excluindo a pasta `images/`
  - Faça push do código completo (incluindo `/images/`)

## 🔍 Imagens Que Existem Realmente

```
images/
├── logo-apice.png ✅
├── about-team.jpg ✅
├── hero-bg.jpg ✅
├── hero-slide-2.jpg ✅
├── hero-slide-3.jpg ✅
├── hero-slide-4.jpg ✅
├── icon-finance.png ✅
├── icon-management.png ✅
├── icon-training.png ✅
├── primeira_imagem_index.png ✅
├── segunda_imagem_index.png ✅
├── terceira_imagem_index.png ✅
├── quarta_imagem_index.png ✅
└── cursos/
    ├── c1.png ✅
    ├── c2.png ✅
    ├── c3.png ✅
    ├── c6.png ✅
    ├── c7.png ✅
    ├── c8.png ✅
    ├── c10.png ✅
    ├── c11.png ✅
    └── c13.png ✅
```

## 🛠️ Próximos Passos

1. **Teste localmente** - Abra `cursos.html` no navegador para confirmar que as imagens aparecem
2. **Faça novo deploy** - Suba o site com a pasta `/images/` incluída
3. **Verifique no servidor** - Acesse o site hospedado e confirme que as imagens aparecem

---

**Nota**: Se as imagens continuarem quebradas após fazer novo deploy, pode ser que:
- A pasta `/images/` não foi enviada
- Há problema de case-sensitivity no servidor (Linux diferencia maiúsculas)
- Há problema de permissões de arquivo no servidor
