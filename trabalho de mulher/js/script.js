// Esperar o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    // Referências aos elementos
    const header = document.querySelector('header');
    const menuToggle = document.querySelector('.menu-mobile');
    const menu = document.querySelector('.menu');
    const statNumbers = document.querySelectorAll('.stat-number');
    const sections = document.querySelectorAll('section');
    
    // Toggle do menu mobile
    menuToggle.addEventListener('click', function() {
        menu.classList.toggle('active');
        
        // Alternar ícone
        if (menuToggle.querySelector('i').classList.contains('fa-bars')) {
            menuToggle.querySelector('i').classList.remove('fa-bars');
            menuToggle.querySelector('i').classList.add('fa-times');
        } else {
            menuToggle.querySelector('i').classList.remove('fa-times');
            menuToggle.querySelector('i').classList.add('fa-bars');
        }
    });
    
    // Fechar menu ao clicar em um link
    document.querySelectorAll('.menu a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            menuToggle.querySelector('i').classList.remove('fa-times');
            menuToggle.querySelector('i').classList.add('fa-bars');
        });
    });
    
    // Efeito de scroll suave para âncoras
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Efeito de scroll no header
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Animação dos números de estatísticas quando visível na tela
        checkStatsVisibility();
        
        // Destacar item do menu baseado na seção visível
        highlightActiveSection();
    });
    
    // Animação de contador para os números de estatísticas
    function animateStats(stat) {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000; // 2 segundos
        const step = target / (duration / 16); // 60fps
        
        let current = 0;
        const timer = setInterval(() => {
            current += step;
            
            if (current >= target) {
                clearInterval(timer);
                stat.textContent = target;
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    // Verificar se seção de estatísticas está visível
    let statsAnimated = false;
    
    function checkStatsVisibility() {
        if (!statsAnimated) {
            const statsSection = document.querySelector('.estatisticas');
            const position = statsSection.getBoundingClientRect();
            
            // Se a seção estiver visível na tela
            if (position.top < window.innerHeight && position.bottom >= 0) {
                statNumbers.forEach(stat => animateStats(stat));
                statsAnimated = true;
            }
        }
    }
    
    // Destacar item do menu baseado na seção visível
    function highlightActiveSection() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.menu a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Adicionar classe de efeito fade-in para elementos quando eles se tornam visíveis
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });
    
    // Observar elementos que receberão animação
    document.querySelectorAll('.card, .testimonial-card, .section-title').forEach(el => {
        el.classList.add('needs-animation');
        observer.observe(el);
    });
    
    // Adicionar estilos CSS para animação de fade-in
    const style = document.createElement('style');
    style.textContent = `
        .needs-animation {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .fade-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Inicializar verificações
    checkStatsVisibility();
    highlightActiveSection();
}); 