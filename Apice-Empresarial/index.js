(function() {
    'use strict';

    // ===== CONFIGURAÇÕES GLOBAIS =====
    const CONFIG = {
        THEME_KEY: 'theme',             // Chave para salvar tema no localStorage
        SCROLL_THRESHOLD: 300,          // Pixels para mostrar botão voltar ao topo
        CAROUSEL_INTERVAL: 5000,        // Intervalo do carrossel em ms (5s)
        SCROLL_DEBOUNCE: 10,            // Debounce para scroll em ms
        RESIZE_DEBOUNCE: 250,           // Debounce para resize em ms
        MOBILE_BREAKPOINT: 992          // Breakpoint para menu mobile (992px)
    };

    // ===== CLASSE PRINCIPAL DA APLICAÇÃO =====
    class ApiceApp {
        constructor() {
            this.elements = null;           // Cache dos elementos DOM
            this.currentSlide = 0;          // Slide atual do carrossel
            this.autoSlideInterval = null;  // Intervalo automático do carrossel
            this.scrollHandler = null;      // Referência do handler de scroll
            this.resizeHandler = null;      // Referência do handler de resize
            this.isMenuOpen = false;        // Estado do menu mobile
            this.init();                    // Inicializa aplicação
        }

        // Cache de elementos DOM para melhor performance
        cacheElements() {
            this.elements = {
                themeToggle: document.getElementById('themeToggle'),     // Botão tema
                themeIcon: document.getElementById('themeIcon'),         // Ícone tema
                backToTopBtn: document.getElementById('backToTop'),      // Botão topo
                body: document.body,                                    // Body da página
                header: document.querySelector('.header'),               // Cabeçalho
                hamburger: document.getElementById('hamburger'),         // Botão hambúrguer
                navMenu: document.getElementById('navMenu'),             // Menu navegação
                carouselSlides: document.querySelectorAll('.carousel-slide'), // Slides
                indicators: document.querySelectorAll('.indicator'),     // Indicadores
                heroSection: document.querySelector('.hero')             // Seção hero
            };

            // Validação dos elementos essenciais
            const navLinks = document.querySelectorAll('.nav-link');
            this.elements.navLinks = Array.from(navLinks);

            // Log de debug (remover em produção)
            console.log('✅ Elementos DOM carregados:', Object.keys(this.elements).filter(key => this.elements[key]));
        }

        // ===== SISTEMA DE TEMAS (CLARO/ESCURO) =====
        initTheme() {
            // Verifica tema salvo ou preferência do sistema
            const savedTheme = localStorage.getItem(CONFIG.THEME_KEY);
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

            // Aplica tema inicial
            if (isDark) {
                this.elements.body.classList.add('dark-mode');
                this.updateThemeIcon(true);
            } else {
                this.elements.body.classList.remove('dark-mode');
                this.updateThemeIcon(false);
            }

            this.bindThemeEvents(); // Vincula eventos de tema
        }

        // Atualiza ícone do botão de tema
        updateThemeIcon(isDark) {
            if (this.elements.themeIcon) {
                this.elements.themeIcon.textContent = isDark ? '☀️' : '🌙';
            }
        }

        // Alterna entre tema claro e escuro
        toggleTheme() {
            const isDark = this.elements.body.classList.toggle('dark-mode');
            this.updateThemeIcon(isDark);
            localStorage.setItem(CONFIG.THEME_KEY, isDark ? 'dark' : 'light');
            
            // Dispara evento customizado para outros scripts
            window.dispatchEvent(new CustomEvent('themeChanged', { detail: { isDark } }));
        }

        // Vincula eventos do sistema de temas
        bindThemeEvents() {
            if (this.elements.themeToggle) {
                this.elements.themeToggle.addEventListener('click', this.toggleTheme.bind(this));
            }

            // Suporte a preferência do sistema operacional
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', (e) => {
                if (!localStorage.getItem(CONFIG.THEME_KEY)) {
                    this.elements.body.classList.toggle('dark-mode', e.matches);
                    this.updateThemeIcon(e.matches);
                }
            });
        }

        // ===== EFEITOS DE SCROLL =====
        initScroll() {
            this.handleScroll(); // Executa uma vez
            
            // Configura scroll otimizado com debounce
            this.scrollHandler = this.debounce(this.handleScroll.bind(this), CONFIG.SCROLL_DEBOUNCE);
            window.addEventListener('scroll', this.scrollHandler, { passive: true });
            
            // Botão voltar ao topo
            if (this.elements.backToTopBtn) {
                this.elements.backToTopBtn.addEventListener('click', this.scrollToTop.bind(this));
            }
        }

        // Gerencia efeitos durante scroll
        handleScroll() {
            const scrolled = window.scrollY;

            // Mostra/esconde botão voltar ao topo
            if (this.elements.backToTopBtn) {
                this.elements.backToTopBtn.classList.toggle('visible', scrolled > CONFIG.SCROLL_THRESHOLD);
            }

            // Header transparente → sólido
            if (this.elements.header) {
                this.elements.header.classList.toggle('scrolled', scrolled > 50);
            }
        }

        // Scroll suave para o topo
        scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // ===== UTILITÁRIOS =====
        // Função debounce para otimizar performance
        debounce(fn, delay) {
            let timeout;
            return (...args) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => fn(...args), delay);
            };
        }

        // ===== MENU MOBILE RESPONSIVO =====
        initMenu() {
            // Botão hambúrguer
            if (this.elements.hamburger) {
                this.elements.hamburger.addEventListener('click', this.toggleMenu.bind(this));
            }

            // Link do card profissionais
            const professionalsCardLink = document.getElementById('profissionais-card-link');
            if (professionalsCardLink) {
                professionalsCardLink.addEventListener('click', () => {
                    sessionStorage.setItem('serviceScrollTarget', 'instrutor-bloco-reverse');
                });
            }
            
            // Fecha menu ao clicar em links
            this.elements.navLinks.forEach(link => {
                link.addEventListener('click', this.closeMenu.bind(this));
            });

            // Gerencia resize da janela
            this.resizeHandler = this.debounce(this.handleResize.bind(this), CONFIG.RESIZE_DEBOUNCE);
            window.addEventListener('resize', this.resizeHandler);
        }

        // Abre/fecha menu mobile
        toggleMenu() {
            this.elements.hamburger?.classList.toggle('active');
            this.elements.navMenu?.classList.toggle('active');
            this.isMenuOpen = !this.isMenuOpen;
            
            // Acessibilidade: foco no primeiro link quando menu abre
            if (this.isMenuOpen && this.elements.navLinks[0]) {
                this.elements.navLinks[0].focus();
            }
        }

        // Fecha menu mobile
        closeMenu() {
            this.elements.hamburger?.classList.remove('active');
            this.elements.navMenu?.classList.remove('active');
            this.isMenuOpen = false;
        }

        // Gerencia mudança de tamanho da janela
        handleResize() {
            if (window.innerWidth > CONFIG.MOBILE_BREAKPOINT && this.isMenuOpen) {
                this.closeMenu();
            }
        }

        // ===== CARROSSEL AUTOMÁTICO =====
        initCarousel() {
            if (this.elements.carouselSlides.length === 0) return;

            this.showSlide(0);      // Mostra primeiro slide
            this.startAutoSlide();  // Inicia rotação automática
            this.bindCarouselEvents(); // Vincula controles
        }

        // Mostra slide específico
        showSlide(index) {
            // Gerencia slides
            this.elements.carouselSlides.forEach((slide, i) => {
                const isActive = i === index;
                slide.classList.toggle('active', isActive);
                slide.setAttribute('aria-hidden', (!isActive).toString());
            });

            // Gerencia indicadores
            this.elements.indicators.forEach((indicator, i) => {
                const isActive = i === index;
                indicator.classList.toggle('active', isActive);
                indicator.setAttribute('aria-selected', isActive.toString());
                indicator.setAttribute('tabindex', isActive ? '0' : '-1');
            });

            this.currentSlide = index;
        }

        // Próximo slide
        nextSlide() {
            const next = (this.currentSlide + 1) % this.elements.carouselSlides.length;
            this.showSlide(next);
        }

        // Inicia rotação automática
        startAutoSlide() {
            this.autoSlideInterval = setInterval(this.nextSlide.bind(this), CONFIG.CAROUSEL_INTERVAL);
        }

        // Pausa carrossel
        pauseCarousel() {
            if (this.autoSlideInterval) {
                clearInterval(this.autoSlideInterval);
                this.autoSlideInterval = null;
            }
        }

        // Retoma carrossel
        resumeCarousel() {
            if (!this.autoSlideInterval) {
                this.startAutoSlide();
            }
        }

        // Vincula eventos do carrossel
        bindCarouselEvents() {
            if (!this.elements.heroSection) return;

            // Pausa em hover
            this.elements.heroSection.addEventListener('mouseenter', this.pauseCarousel.bind(this));
            this.elements.heroSection.addEventListener('mouseleave', this.resumeCarousel.bind(this));

            // Controles dos indicadores
            this.elements.indicators.forEach((indicator, index) => {
                // Clique
                indicator.addEventListener('click', () => {
                    this.showSlide(index);
                    this.pauseCarousel();
                    setTimeout(() => this.resumeCarousel(), 1000);
                });

                // Teclado (acessibilidade)
                indicator.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.showSlide(index);
                        this.pauseCarousel();
                    }
                });
            });
        }

        // ===== INICIALIZAÇÃO E LIMPEZA =====
        init() {
            this.cacheElements();   // Carrega elementos DOM
            this.initTheme();       // Configura tema
            this.initScroll();      // Configura scroll
            this.initMenu();        // Configura menu mobile
            this.initCarousel();    // Configura carrossel

            // Cleanup ao sair da página
            window.addEventListener('beforeunload', this.cleanup.bind(this));
        }

        // Limpa eventos e timers
        cleanup() {
            this.pauseCarousel();
            
            if (this.elements.heroSection) {
                this.elements.heroSection.removeEventListener('mouseenter', this.pauseCarousel);
                this.elements.heroSection.removeEventListener('mouseleave', this.resumeCarousel);
            }
            
            if (this.scrollHandler) {
                window.removeEventListener('scroll', this.scrollHandler);
            }
            if (this.resizeHandler) {
                window.removeEventListener('resize', this.resizeHandler);
            }
        }
    }

    // Inicializa aplicação quando DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => new ApiceApp());
    } else {
        new ApiceApp();
    }
})();
