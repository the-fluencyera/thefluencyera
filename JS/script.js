/*LÓGICA DO FORMULÁRIO DE CONTATO - WHATSAPP BUSINESS*/

/*Mostra ou esconde a caixa de texto de detalhes 
 dependendo da escolha "Sim" ou "Não" no select de experiência.*/

function verificarExperiencia() {
    const selecao = document.getElementById('temExperiencia').value;
    const caixaDetalhes = document.getElementById('caixaExperiencia');

    if (selecao === 'sim') {
        caixaDetalhes.style.display = 'block';
    } else {
        caixaDetalhes.style.display = 'none';
        // Limpa o campo caso o usuário mude de ideia
        document.getElementById('detalhesExperiencia').value = '';
    }
}

/*Captura todos os dados do formulário, monta uma mensagem 
  profissional e redireciona para o WhatsApp da Teacher Laura.*/

function sendToWhatsapp() {
    // 1. CAPTURA DE TODOS OS CAMPOS DO FORMULÁRIO
    const btn = document.getElementById('btnEnviar'); // Pega o botão pelo ID
    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;
    const nivel = document.getElementById('nivel').value;
    const temExp = document.getElementById('temExperiencia').value;
    const detalhesExp = document.getElementById('detalhesExperiencia').value;
    const objetivo = document.getElementById('objetivo').value;
    const plano = document.getElementById('plano').value;
    const horario = document.getElementById('horario').value;

    // 2. VALIDAÇÃO SIMPLES
    // Impede o envio se o nome ou idade estiverem vazios
    if (nome === "" || idade === "") {
        alert("Por favor, preencha seu nome e idade antes de enviar.");
        return;
    }

    // 3. ANIMAÇÃO DE FEEDBACK
    btn.innerHTML = 'Enviando... 🚀'; // Muda o texto do botão
    btn.style.opacity = '0.7';        // Deixa ele levemente transparente
    btn.disabled = true;              // Impede cliques duplos

    // 4. MONTAGEM DA MENSAGEM ESTRUTURADA
    // Usamos \n para quebra de linha interna e * para negrito no WhatsApp
    let mensagem = `Olá, Teacher Laura! ✨\n`;
    mensagem += `Gostaria de informações sobre as aulas.\n\n`;
    mensagem += `*--- DADOS DO ALUNO ---*\n`;
    mensagem += `*Nome:* ${nome}\n`;
    mensagem += `*Idade:* ${idade} anos\n`;
    mensagem += `*Nível atual:* ${nivel}\n\n`;

    mensagem += `*--- OBJETIVOS E PLANOS ---*\n`;
    mensagem += `*Já estudou antes?* ${temExp === 'sim' ? 'Sim' : 'Não'}\n`;

    // Só adiciona os detalhes se o aluno marcou que tem experiência
    if (temExp === 'sim' && detalhesExp !== "") {
        mensagem += `*Detalhes da exp:* ${detalhesExp}\n`;
    }

    mensagem += `*Objetivo:* ${objetivo}\n`;
    mensagem += `*Plano de interesse:* ${plano}\n`;
    mensagem += `*Preferência de horário:* ${horario}\n\n`;
    mensagem += `_Enviado pelo site The Fluency Era_`;

    // 5. CONFIGURAÇÃO DO LINK 
    const meuNumero = "5582933005496";

    // Aqui o encodeURIComponent transforma a mensagem acima em um link que o navegador entende
    const url = `https://wa.me/${meuNumero}?text=${encodeURIComponent(mensagem)}`;

    // 6. EXECUÇÃO (Abre o WhatsApp)
    window.open(url, '_blank');

    // 7. RESTAURAR O BOTÃO (Após 1 segundos para o aluno ver que foi enviado)
    setTimeout(() => {
        btn.innerHTML = 'Enviar e Iniciar Chat';
        btn.style.opacity = '1';
        btn.disabled = false;
    }, 2000);
}

/* LÓGICA DOS MODAIS (PÁGINA INICIAL)*/

function abrirModal(tipo) {
    const modal = document.getElementById('meuModal');
    const titulo = document.getElementById('modalTitulo');
    const texto = document.getElementById('modalTexto');

    const infos = {
        'dinamicas': {
            titulo: '✨ Metodologia Ativa e Interativa ✨',
            texto: 'Aulas planejadas para máxima participação do aluno, utilizando ferramentas digitais que transformam o aprendizado em uma experiência prática, fluida e longe da exaustão.'
        },
        'foco': {
            titulo: '🎯 Ensino Personalizado 🎯',
            texto: 'Cronograma moldado pelos seus objetivos específicos (carreira, viagens ou exames). Suporte via WhatsApp e flexibilidade total.'
        },
        'digital': {
            titulo: '📖 Excelência Didática Oxford 📖',
            texto: 'Utilização da base acadêmica da Oxford University Press com acesso digital completo ao Student’s Book e Workbook.'
        }
    };

    if (infos[tipo]) {
        titulo.innerText = infos[tipo].titulo;
        texto.innerText = infos[tipo].texto;
        modal.style.display = "block";
    }
}

function fecharModal() {
    const modal = document.getElementById('meuModal');
    if (modal) modal.style.display = "none";
}

// Fecha o modal se o usuário clicar fora da área branca
window.onclick = function (event) {
    const modal = document.getElementById('meuModal');
    if (event.target == modal) {
        fecharModal();
    }
}