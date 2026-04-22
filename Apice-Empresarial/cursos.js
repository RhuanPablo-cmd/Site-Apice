document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // 1. MODO ESCURO - ALTERNÂNCIA CLARO/ESCURO
    // ==========================================================================
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            if (themeIcon) themeIcon.textContent = '☀️';
        } else {
            body.classList.remove('dark-mode');
            if (themeIcon) themeIcon.textContent = '🌙';
        }
    };

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        applyTheme(prefersDark ? 'dark' : 'light');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isDarkMode = body.classList.toggle('dark-mode');
            const newTheme = isDarkMode ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);
        });
    }
    // ==========================================================================
    // FIM MODO ESCURO
    // ==========================================================================

    // ==========================================================================
    // 2. BOTÃO VOLTAR AO TOPO
    // ==========================================================================
    const backToTopBtn = document.getElementById('backToTop');

    // Mostrar/ocultar botão ao rolar e scroll suave
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==========================================================================
    // 3. CARROSSEL AUTOMÁTICO DOS MODAIS
    // ==========================================================================
    const carousels = document.querySelectorAll('.hero-modal');

    carousels.forEach((carouselContainer) => {
        const carouselSlides = carouselContainer.querySelectorAll('.carousel-slide');
        const indicators = carouselContainer.querySelectorAll('.indicator');
        let currentSlide = 0;
        let autoSlideInterval;

        const showSlide = (index) => {
            // Remove classe active de todos os slides e adiciona ao atual
            carouselSlides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
                slide.setAttribute('aria-hidden', i !== index);
            });

            // Atualiza indicadores ativos
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === index);
                indicator.setAttribute('aria-selected', i === index);
            });

            currentSlide = index;
        };

        const nextSlide = () => {
            const next = (currentSlide + 1) % carouselSlides.length;
            showSlide(next);
        };

        const startAutoSlide = () => {
            // Garante apenas um intervalo por carrossel
            if (!autoSlideInterval) {
                autoSlideInterval = setInterval(nextSlide, 5000);
            }
        };

        if (carouselSlides.length > 0) {
            showSlide(0);
            startAutoSlide();

            // Cliques nos indicadores (mantém auto-slide ativo)
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => {
                    showSlide(index);
                });
            });
        }
    });
});

// ==========================================================================
// 4. FUNÇÕES GLOBAIS PARA MODAIS
// ==========================================================================
// Abre modal pelo ID
function abrirModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = "flex";
}

// Fecha modal pelo ID
function fecharModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = "none";
}

// Fecha modal ao clicar fora do conteúdo
window.onclick = function (event) {
    const modais = document.querySelectorAll(".modal");
    modais.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
};

// ==========================================================================
// 5. MENU HAMBURGUER RESPONSIVO
// ==========================================================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link'); 
let isMenuOpen = false;

const toggleMenu = () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    isMenuOpen = !isMenuOpen;
    hamburger.setAttribute('aria-expanded', String(isMenuOpen));
};

const closeMenu = () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    isMenuOpen = false;
    hamburger.setAttribute('aria-expanded', 'false');
};

if (hamburger && navMenu) {
    // Toggle ao clicar no hambúrguer
    hamburger.addEventListener('click', toggleMenu);
    
    // Fecha menu ao clicar em links
    navLinks.forEach(link => link.addEventListener('click', closeMenu));

    // Fecha menu ao redimensionar para desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992 && isMenuOpen) {
            closeMenu();
        }
    });
}
