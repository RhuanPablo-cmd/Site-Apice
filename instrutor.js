document.addEventListener('DOMContentLoaded', async () => {
    // MODO ESCURO - IMPLEMENTAÇÃO COM ATRIBUTO data-theme
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;

    // Aplica o tema definido usando atributo data-theme no body
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.setAttribute('data-theme', 'dark');
            if (themeIcon) themeIcon.textContent = '☀️';
        } else {
            body.removeAttribute('data-theme');
            if (themeIcon) themeIcon.textContent = '🌙';
        }
    };

    // Sincroniza com o mesmo tema escolhido nas outras páginas.
    const savedTheme = localStorage.getItem('theme');
    applyTheme(savedTheme === 'dark' ? 'dark' : 'light');

    // Alterna tema ao clicar no botão
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isDarkMode = body.getAttribute('data-theme') === 'dark';
            const newTheme = !isDarkMode ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);
        });
    }
    // FIM MODO ESCURO


    // ELEMENTOS DA PÁGINA
    const backToTopBtn = document.getElementById('backToTop');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const booksListContainer = document.getElementById('livrosList');
    const CMS_CONTENT_API_BASE = '/api/content';

    const fallbackBooks = [
        {
            name: 'P.D.P.I',
            image: 'images/ChatGPT Image 20 de jan. de 2026, 14_14_22.png',
            description: 'O livro PDPI – Planejamento e Desenvolvimento Profissional Integrado, da Ápice, é um guia prático voltado para quem busca alinhar objetivos pessoais e profissionais, oferecendo metodologias de planejamento estratégico e ferramentas para crescimento de carreira.',
            purchaseLink: 'https://www.amazon.com.br/PDPI-Planejamento-Desenvolvimento-Profissional-Integrado/dp/6501518040'
        }
    ];

    const sanitizeText = (value) => String(value || '').replace(/[<>&"']/g, (char) => ({
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        '"': '&quot;',
        '\'': '&#39;'
    }[char]));

    const getBooks = () => {
        try {
            const parsed = JSON.parse(localStorage.getItem('cms_books') || 'null');
            if (Array.isArray(parsed) && parsed.length > 0) {
                return parsed;
            }
        } catch (error) {
            console.warn('Nao foi possivel carregar livros do CMS.', error);
        }
        return fallbackBooks;
    };

    const syncBooksFromApi = async () => {
        try {
            const response = await fetch(`${CMS_CONTENT_API_BASE}/books`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                return;
            }

            const payload = await response.json();
            const books = Array.isArray(payload && payload.data) ? payload.data : [];
            if (books.length > 0) {
                localStorage.setItem('cms_books', JSON.stringify(books));
            }
        } catch (error) {
            console.warn('Nao foi possivel sincronizar livros da API.', error);
        }
    };

    const renderBooks = () => {
        if (!booksListContainer) {
            return;
        }

        const books = getBooks();
        booksListContainer.innerHTML = books.map((book) => `
            <div class="livro-container">
                <img src="${sanitizeText(book.image || '')}" alt="Capa do livro ${sanitizeText(book.name || 'Livro')}" loading="lazy">
                <div class="livro-descricao">
                    <h3>${sanitizeText(book.name || 'Livro')}</h3>
                    <p>${sanitizeText(book.description || '')}</p>
                    <a class="livro-link" href="${sanitizeText(book.purchaseLink || '#')}" target="_blank" rel="noopener noreferrer">📖 Comprar na Amazon</a>
                </div>
            </div>
        `).join('');
    };

    await syncBooksFromApi();
    renderBooks();

    // BOTÃO VOLTAR AO TOPO (APARECE AOS 50% DO SCROLL)
    const handleScrollBackToTop = () => {
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY;
        const scrollPercentage = (scrolled / scrollableHeight) * 100;

        if (backToTopBtn) {
            backToTopBtn.classList.toggle('visible', scrollPercentage > 50);
        }
    };

    // Scroll suave para o topo da página
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // MENU HAMBURGUER (MÓVEL)
    const toggleMenu = () => {
        if (hamburger && navMenu) {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        }
    };

    // Fecha menu mobile ao clicar em links de navegação
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // ANIMAÇÕES DE ENTRADA (INTERSECTION OBSERVER)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Anima cards de competências com delay sequencial
    const competenciaItems = document.querySelectorAll('.competencia-item');
    competenciaItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });

    // Anima containers de livros
    const livroContainers = document.querySelectorAll('.livro-container');
    livroContainers.forEach((livroContainer, index) => {
        livroContainer.style.opacity = '0';
        livroContainer.style.transform = 'translateY(30px)';
        livroContainer.style.transition = `opacity 0.8s ease ${0.3 + (index * 0.08)}s, transform 0.8s ease ${0.3 + (index * 0.08)}s`;
        observer.observe(livroContainer);
    });

    // EFEITOS HOVER AVANÇADOS
    // Efeito hover no link do livro
    const livroLinks = document.querySelectorAll('.livro-link');
    livroLinks.forEach((livroLink) => {
        livroLink.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });

        livroLink.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Efeitos hover nas imagens dos parceiros
    const parceiroImages = document.querySelectorAll('.imagemcolegas img');
    parceiroImages.forEach(img => {
        img.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px) scale(1.08)';
        });

        img.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // SCROLL SUAVE PARA LINKS INTERNOS (ANCHOR LINKS)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // EVENT LISTENERS PRINCIPAIS
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', scrollToTop);
    }

    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }

    // Listener de scroll otimizado para botão voltar ao topo
    window.addEventListener('scroll', handleScrollBackToTop, { passive: true });

    // Limpeza de recursos ao sair da página
    window.addEventListener('beforeunload', () => {
        observer.disconnect();
    });
});


// Função para posicionar o botão do VLibras
function positionVLibrasButton() {
    function applyVLibrasPosition() {
        const vlibrasButton = document.querySelector('[vw-access-button]') || document.querySelector('.vw-access-button');

        if (!vlibrasButton) {
            return false;
        }

        vlibrasButton.style.position = 'fixed';
        vlibrasButton.style.right = window.innerWidth <= 768 ? '20px' : '30px';
        vlibrasButton.style.bottom = window.innerWidth <= 768 ? '95px' : '110px';
        vlibrasButton.style.zIndex = '9998';
        return true;
    }

    // Se o botão já existir quando a função for chamada, aplica imediatamente
    if (applyVLibrasPosition()) {
        window.addEventListener('resize', applyVLibrasPosition);
        return;
    }

    // Tenta posicionar o botão em intervalos, até encontrar ou dar timeout
    const intervalId = setInterval(() => {
        if (applyVLibrasPosition()) {
            clearInterval(intervalId);
        }
    }, 300);

    // Timeout máximo para tentativas
    setTimeout(() => {
        clearInterval(intervalId);
    }, 10000);

    // Ajusta posição quando redimensionar
    window.addEventListener('resize', applyVLibrasPosition);
}

// Inicializa o widget VLibras e posiciona o botão
if (window.VLibras) {
    new window.VLibras.Widget('https://vlibras.gov.br/app');
}
positionVLibrasButton();
