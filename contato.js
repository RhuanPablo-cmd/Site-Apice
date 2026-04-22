document.addEventListener('DOMContentLoaded', async function() {
    // ==========================================================================
    // 1. GERENCIAMENTO DO MODO ESCURO (DARK MODE)
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
    // 2. MENU HAMBÚRGUER (MOBILE)
    // ==========================================================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link'); 

    const toggleMenu = () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    };

    const closeMenu = () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', toggleMenu);
        navLinks.forEach(link => link.addEventListener('click', closeMenu));
        
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && navMenu.classList.contains('active')) {
                closeMenu();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 992 && navMenu.classList.contains('active')) {
                closeMenu();
            }
        });
    }

    // ==========================================================================
    // 3. FUNCIONALIDADES DO FORMULÁRIO E PÁGINA
    // ==========================================================================
    const nomeInput = document.getElementById('nome');
    if (nomeInput) nomeInput.focus();

    const backToTopBtn = document.getElementById('backToTopBtn');
    window.addEventListener('scroll', () => {
        if (backToTopBtn) backToTopBtn.classList.toggle('visible', window.scrollY > 300);
    });
    if (backToTopBtn) backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // --- Máscaras ---
    const mCPF = (v) => v.replace(/\D/g, '').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2').substring(0, 14);
    const mCNPJ = (v) => v.replace(/\D/g, '').replace(/^(\d{2})(\d)/, '$1.$2').replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3').replace(/\.(\d{3})(\d)/, '.$1/$2').replace(/(\d{4})(\d)/, '$1-$2').substring(0, 18);
    const mTel = (v) => v.replace(/\D/g, '').replace(/^(\d{2})(\d)/g, '($1) $2').replace(/(\d)(\d{4})$/, '$1-$2').substring(0, 15);

    const cpfInput = document.getElementById('cpf');
    if (cpfInput) cpfInput.addEventListener('input', e => e.target.value = mCPF(e.target.value));
    const cnpjInput = document.getElementById('cnpj');
    if (cnpjInput) cnpjInput.addEventListener('input', e => e.target.value = mCNPJ(e.target.value));
    const telInput = document.getElementById('telefone');
    if (telInput) telInput.addEventListener('input', e => e.target.value = mTel(e.target.value));

    // ==========================================================================
    // 4. TOGGLE ENTRE PESSOA FÍSICA E JURÍDICA
    // ==========================================================================
    const tipoPessoaFisica = document.getElementById('tipoPessoaFisica');
    const tipoPessoaJuridica = document.getElementById('tipoPessoaJuridica');
    const cpfContainer = document.getElementById('cpfContainer');
    const cnpjContainer = document.getElementById('cnpjContainer');
    let tipoAtual = 'fisica'; // Estado atual

    const atualizarTipo = (tipo) => {
        tipoAtual = tipo;

        if (tipo === 'fisica') {
            // Mostrar CPF, ocultar CNPJ
            cpfContainer.style.display = 'grid';
            cnpjContainer.style.display = 'none';
            
            // Atualizar botões
            tipoPessoaFisica.classList.add('active');
            tipoPessoaJuridica.classList.remove('active');
            
            // Limpar e configurar validação
            if (cnpjInput) cnpjInput.value = '';
            if (cnpjInput) cnpjInput.removeAttribute('required');
            if (cpfInput) cpfInput.setAttribute('required', 'required');
        } else {
            // Mostrar CNPJ, ocultar CPF
            cpfContainer.style.display = 'none';
            cnpjContainer.style.display = 'grid';
            
            // Atualizar botões
            tipoPessoaFisica.classList.remove('active');
            tipoPessoaJuridica.classList.add('active');
            
            // Limpar e configurar validação
            if (cpfInput) cpfInput.value = '';
            if (cpfInput) cpfInput.removeAttribute('required');
            if (cnpjInput) cnpjInput.setAttribute('required', 'required');
        }
    };

    if (tipoPessoaFisica) {
        tipoPessoaFisica.addEventListener('click', (e) => {
            e.preventDefault();
            atualizarTipo('fisica');
        });
    }

    if (tipoPessoaJuridica) {
        tipoPessoaJuridica.addEventListener('click', (e) => {
            e.preventDefault();
            atualizarTipo('juridica');
        });
    }

    // --- Cursos e Orçamento ---
    let selected = [];
    const input = document.getElementById('curso');
    const dropdown = document.getElementById('coursesDropdown');
    const container = document.getElementById('selectedCoursesContainer');
    const totalVal = document.getElementById('totalValue');
    const budgetBox = document.getElementById('budgetSummary');
    const CMS_CONTENT_API_BASE = '/api/content';

    const getCmsCourses = () => {
        try {
            const rawCourses = localStorage.getItem('cms_courses');
            if (!rawCourses) {
                return [];
            }
            const parsedCourses = JSON.parse(rawCourses);
            return Array.isArray(parsedCourses) ? parsedCourses : [];
        } catch (error) {
            console.warn('Nao foi possivel carregar cursos do CMS.', error);
            return [];
        }
    };

    const syncCoursesFromApi = async () => {
        try {
            const response = await fetch(`${CMS_CONTENT_API_BASE}/courses`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                return;
            }

            const payload = await response.json();
            const courses = Array.isArray(payload && payload.data) ? payload.data : [];
            if (courses.length > 0) {
                localStorage.setItem('cms_courses', JSON.stringify(courses));
            }
        } catch (error) {
            console.warn('Nao foi possivel sincronizar cursos da API.', error);
        }
    };

    const syncCoursesDropdownFromCms = () => {
        if (!dropdown) {
            return;
        }

        const cmsCourses = getCmsCourses();
        if (cmsCourses.length === 0) {
            return;
        }

        dropdown.innerHTML = '';

        cmsCourses.forEach((course) => {
            const option = document.createElement('div');
            option.className = 'course-option';
            option.textContent = course.name;
            option.dataset.price = course.price;
            dropdown.appendChild(option);
        });
    };

    await syncCoursesFromApi();
    syncCoursesDropdownFromCms();

    if (input && dropdown) {
        input.onclick = (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('active');
        };
    }

    const courseOptions = Array.from(document.querySelectorAll('.course-option'));
    courseOptions.forEach((opt) => {
        opt.addEventListener('click', () => {
            const name = opt.textContent;
            const price = parseFloat(opt.dataset.price);
            if (!selected.find(c => c.name === name)) { selected.push({name, price}); render(); }
            dropdown.classList.remove('active');
        });
    });

    function render() {
        if (!container) return;
        container.innerHTML = '';
        let t = 0;
        selected.forEach((c, i) => {
            t += c.price;
            const tag = document.createElement('div');
            tag.className = 'course-tag';
            tag.innerHTML = `${c.name} <button type="button" class="remove-course-btn"><i class="fas fa-times"></i></button>`;
            tag.querySelector('button').onclick = () => { selected.splice(i, 1); render(); };
            container.appendChild(tag);
        });
        if (budgetBox) budgetBox.style.display = selected.length ? 'flex' : 'none';
        if (totalVal) totalVal.textContent = `R$ ${t.toFixed(2).replace('.', ',')}`;
    }

    const form = document.getElementById('contatoForm');
    const successMessage = document.getElementById('successMessage');
    if (form) {
        form.onsubmit = (e) => {
            e.preventDefault();

            const nome = document.getElementById('nome')?.value.trim() || '';
            const email = document.getElementById('email')?.value.trim() || '';
            const telefone = document.getElementById('telefone')?.value.trim() || '';
            const cpf = document.getElementById('cpf')?.value.trim() || '';
            const cnpj = document.getElementById('cnpj')?.value.trim() || '';
            const assuntoSelect = document.getElementById('assunto');
            const assunto = (assuntoSelect && assuntoSelect.options[assuntoSelect.selectedIndex]) ? assuntoSelect.options[assuntoSelect.selectedIndex].text : '';
            const mensagem = document.getElementById('mensagem')?.value.trim() || '';

            let coursesText = 'Nenhum curso selecionado.';
            if (selected.length) {
                coursesText = selected.map(c => `${c.name} - R$ ${c.price.toFixed(2).replace('.', ',')}`).join('%0A');
            }

            const total = totalVal ? totalVal.textContent : '';

            // Determinar qual campo foi preenchido
            let documentoLabel = '';
            let documentoValor = '';
            
            if (tipoAtual === 'fisica') {
                documentoLabel = '*CPF:*';
                documentoValor = cpf;
            } else {
                documentoLabel = '*CNPJ:*';
                documentoValor = cnpj;
            }

            // Monta o corpo da mensagem para WhatsApp
            const messageLines = [
                `*NOVO CONTATO - ÁPICE EMPRESARIAL*`,
                `----------------------------------`,
                `*Nome:* ${nome}`,
                `*E-mail:* ${email}`,
                `*Telefone:* ${telefone}`,
                `${documentoLabel} ${documentoValor}`,
                `*Assunto:* ${assunto}`,
                ``,
                `*Mensagem:*`,
                mensagem,
                ``,
                `*Cursos de interesse:*`,
                coursesText,
                ``,
                `*Total estimado:* ${total}`
            ];

            const message = messageLines.join('%0A'); // %0A é quebra de linha em URL

            const whatsappNumber = '5531994242641'; // numero: 55 + 31 + 99424-2641

            // Cria a URL do WhatsApp
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

            try {
                window.open(whatsappUrl, '_blank', 'noopener');
            } catch (err) {
                window.location.href = whatsappUrl;
            }

            // Mostra mensagem de sucesso na página
            if (successMessage) {
                successMessage.style.display = 'block';
            }

            // Limpa formulário localmente após 3 segundos
            setTimeout(() => {
                form.reset();
                selected = [];
                render();
                if (successMessage) successMessage.style.display = 'none';
                atualizarTipo('fisica'); // Volta ao padrão (Pessoa Física)
            }, 3000);
        };
    }
});