// servico.js - TODAS FUNCIONALIDADES EM UM ÚNICO ARQUIVO
document.addEventListener('DOMContentLoaded', () => {
    console.log('Ápice Empresarial - Scripts carregados! 🚀');

    const scrollTargetMap = {
        '#img-profissionais': 'img-profissionais',
        '#img-portfolio': 'img-portfolio',
        '#descricao-principal2': 'descricao-principal2',
        '#prof': 'instrutor-bloco-reverse',
        '#instrutor-bloco-reverse': 'instrutor-bloco-reverse',
        '#proofs': 'instrutor-bloco-reverse',
        '#titulo-profissionais': 'titulo-profissionais',
        '#sobre-profissionais': 'titulo-profissionais'
    };

    const storedTarget = sessionStorage.getItem('serviceScrollTarget');
    const hash = window.location.hash;
    const targetId = scrollTargetMap[hash] || storedTarget;

    const scrollToServiceTarget = () => {
        if (!targetId) {
            return;
        }

        const target = document.getElementById(targetId);
        if (!target) {
            return;
        }

        const header = document.querySelector('.header');
        const headerPosition = header ? window.getComputedStyle(header).position : '';
        const hasFixedHeader = headerPosition === 'fixed' || headerPosition === 'sticky';
        const headerOffset = hasFixedHeader && header ? header.offsetHeight + 12 : 0;
        const targetRect = target.getBoundingClientRect();
        const targetAbsoluteTop = targetRect.top + window.scrollY;
        const availableViewport = window.innerHeight - headerOffset;
        const shouldCenterTarget = targetId === 'instrutor-bloco-reverse';

        let targetTop = targetAbsoluteTop - headerOffset;

        if (shouldCenterTarget) {
            const centerOffset = Math.max((availableViewport - targetRect.height) / 2, 24);
            targetTop = targetAbsoluteTop - headerOffset - centerOffset;
        }

        window.scrollTo({
            top: Math.max(0, targetTop),
            behavior: 'auto'
        });

        if (storedTarget) {
            sessionStorage.removeItem('serviceScrollTarget');
        }
    };

    // ========================================
    // 0. ÂNCORA ROBUSTA (LINKS VINDOS DE OUTRAS PÁGINAS)
    // ========================================
    if (targetId) {
        requestAnimationFrame(scrollToServiceTarget);
        window.setTimeout(scrollToServiceTarget, 250);
        window.setTimeout(scrollToServiceTarget, 700);
        window.addEventListener('load', scrollToServiceTarget, { once: true });
    }
    
    // ========================================
    // 1. BOTÃO VOLTAR AO TOPO (OTIMIZADO 60fps)
    // ========================================
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        let ticking = false;
        
        // Calcula visibilidade baseada em 50% do scroll total
        const updateBackToTop = () => {
            const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = window.scrollY;
            const scrollPercentage = scrollableHeight > 0 ? (scrolled / scrollableHeight) * 100 : 0;
            
            if (scrollPercentage > 50) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
            ticking = false;
        };
        
        // Throttle com requestAnimationFrame para performance
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateBackToTop);
                ticking = true;
            }
        });
        
        // Scroll suave para topo
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ========================================
    // 2. MODO ESCURO (DETECÇÃO SISTEMA + LOCALSTORAGE)
    // ========================================
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;
    
    if (themeToggleBtn && themeIcon) {
        // Prioridade: localStorage > preferência sistema
        const savedTheme = localStorage.getItem('theme') || 
                          (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        
        // Aplica tema inicial salvo
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
            themeIcon.textContent = '☀️';
        } else {
            themeIcon.textContent = '🌙';
        }
        
        // Alterna tema com salvamento
        themeToggleBtn.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            if (body.classList.contains('dark-mode')) {
                themeIcon.textContent = '☀️';
                localStorage.setItem('theme', 'dark');
            } else {
                themeIcon.textContent = '🌙';
                localStorage.setItem('theme', 'light');
            }
        });
        
        // Sincroniza com mudança do sistema (apenas sem preferência salva)
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                if (e.matches) {
                    body.classList.add('dark-mode');
                    themeIcon.textContent = '☀️';
                } else {
                    body.classList.remove('dark-mode');
                    themeIcon.textContent = '🌙';
                }
            }
        });
    }
    
    // ========================================
    // 3. NAVEGAÇÃO ATIVA (PÁGINA ATUAL)
    // ========================================
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Adiciona classe active no link clicado
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Remove de todos os links
            navLinks.forEach(l => l.classList.remove('active'));
            // Adiciona no link clicado
            link.classList.add('active');
        });
    });
    
    // Define página atual automaticamente como active
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage || 
            link.getAttribute('href').includes(currentPage)) {
            link.classList.add('active');
        }
    });

    // ========================================
    // 4. MENU MOBILE HAMBURGUEIR (RESPONSIVO)
    // ========================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    let isMenuOpen = false;

    if (hamburger && navMenu) {
        // Alterna menu mobile
        const toggleMenu = () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            isMenuOpen = !isMenuOpen;
        };

        // Fecha menu mobile
        const closeMenu = () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            isMenuOpen = false;
        };

        // Evento botão hambúrguer
        hamburger.addEventListener('click', toggleMenu);

        // Fecha menu ao clicar em links
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Fecha menu automaticamente em desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && isMenuOpen) {
                closeMenu();
            }
        });
    }
});
