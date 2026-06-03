document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DO ACORDION DO FAQ (CORRIGIDO) ---
    const faqQuestions = document.querySelectorAll('.faq-q');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const answer = question.nextElementSibling;

            if (item.classList.contains('active')) {
                answer.style.maxHeight = '0';
                item.classList.remove('active');
            } else {
                // Fecha qualquer outro item aberto antes de expandir o atual
                document.querySelectorAll('.faq-item.active').forEach(activeItem => {
                    activeItem.querySelector('.faq-a').style.maxHeight = '0';
                    activeItem.classList.remove('active');
                });

                answer.style.maxHeight = answer.scrollHeight + 'px';
                item.classList.add('active');
            }
        });
    });

    // --- LÓGICA DE GERENCIAMENTO DA JANELA MODAL ---
    const modal = document.getElementById('bookingModal');
    const openModalButtons = document.querySelectorAll('.open-modal-btn');
    const closeModalButton = document.querySelector('.close-modal');

    // Abre a modal ao clicar em qualquer botão com a classe correspondente
    openModalButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Trava rolagem de fundo
        });
    });

    // Fecha a janela ao clicar no (X)
    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restaura rolagem
    });

    // Fecha a janela se clicar em qualquer área sombreada fora do card
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // --- LOGICA DE ENVIO DO FORMULÁRIO PARA O WHATSAPP ---
    const whatsappForm = document.getElementById('whatsappForm');

    whatsappForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Coleta inteligente dos dados dos inputs
        const name = document.getElementById('userName').value.trim();
        const age = document.getElementById('userAge').value.trim();
        const level = document.getElementById('englishLevel').value;
        const experience = document.getElementById('hasExperience').value;
        const objective = document.getElementById('userObjective').value.trim();
        const plan = document.getElementById('preferredPlan').value;
        const time = document.getElementById('preferredTime').value;

        // NÚMERO DO WHATSAPP DA TEACHER LAURA (Mantenha o DDI 55 + DDD + Número)
        const teacherPhoneNumber = "5582933005496";

        // Criação da mensagem estruturada com quebras de linha e negritos (*texto*)
        const messageText = `Olá, Teacher Laura! Gostaria de agendar uma aula experimental. Aqui estão as minhas informações:\n\n` +
            `• *Nome:* ${name}\n` +
            `• *Idade:* ${age} anos\n` +
            `• *Como avalio meu inglês:* ${level}\n` +
            `• *Experiência anterior:* ${experience}\n` +
            `• *Principal Objetivo:* ${objective}\n` +
            `• *Plano de Interesse:* ${plan}\n` +
            `• *Preferência de Horário:* ${time}`;

        // Codifica os caracteres especiais para manter a formatação segura na URL
        const encodedMessage = encodeURIComponent(messageText);

        const mobileLink = `https://api.whatsapp.com/send?phone=${teacherPhoneNumber}&text=${encodedMessage}`;
        const desktopWebLink = `https://web.whatsapp.com/send?phone=${teacherPhoneNumber}&text=${encodedMessage}`;

        // Detecta o dispositivo do usuário para abrir a melhor versão da API
        if (/Android|iPhone|iPad/i.test(navigator.userAgent)) {
            window.open(mobileLink, '_blank');
        } else {
            window.open(desktopWebLink, '_blank');
        }

        // Reseta o estado da UI pós-envio
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        whatsappForm.reset();
    });


});