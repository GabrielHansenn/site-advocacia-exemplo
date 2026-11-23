/* ==========================================================================
   Aureum Advocacia — comportamento da página
   ========================================================================== */

/* Dados de contato (demonstrativos).
   Altere aqui: os links de WhatsApp/e-mail da página e o formulário usam estes valores. */
const CONTATO = {
  whatsapp: '5511900000000',            // DDI + DDD + número, somente dígitos
  whatsappExibicao: '(11) 90000-0000',
  email: 'contato@aureumadvocacia.com.br',
  mensagemPadrao: 'Olá! Gostaria de agendar uma conversa com a equipe da Aureum Advocacia.'
};

const waLink = (texto) =>
  `https://wa.me/${CONTATO.whatsapp}?text=${encodeURIComponent(texto)}`;

document.addEventListener('DOMContentLoaded', () => {
  aplicarContatos();
  iniciarHeader();
  iniciarMenu();
  iniciarSecaoAtiva();
  iniciarRevelacao();
  iniciarAreas();
  iniciarFormulario();

  const ano = document.querySelector('[data-year]');
  if (ano) ano.textContent = new Date().getFullYear();
});

/* Contatos centralizados ------------------------------------------------- */
function aplicarContatos() {
  document.querySelectorAll('[data-contact="whatsapp-link"]').forEach((a) => {
    a.href = waLink(CONTATO.mensagemPadrao);
  });
  document.querySelectorAll('[data-contact="whatsapp-display"]').forEach((el) => {
    el.textContent = CONTATO.whatsappExibicao;
  });
  document.querySelectorAll('[data-contact="email-link"]').forEach((a) => {
    a.href = `mailto:${CONTATO.email}`;
  });
  document.querySelectorAll('[data-contact="email-display"]').forEach((el) => {
    el.textContent = CONTATO.email;
  });
}

/* Header que se adapta durante a rolagem ---------------------------------- */
function iniciarHeader() {
  const header = document.querySelector('[data-header]');
  if (!header) return;
  let ticking = false;
  const atualizar = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 24);
    ticking = false;
  };
  atualizar();
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(atualizar);
      ticking = true;
    }
  }, { passive: true });
}

/* Menu mobile ------------------------------------------------------------- */
function iniciarMenu() {
  const botao = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-nav]');
  const rotulo = document.querySelector('[data-menu-label]');
  if (!botao || !nav) return;

  const mobile = window.matchMedia('(max-width: 1200px)');
  const focaveis = () => [botao, ...nav.querySelectorAll('a')];

  const definir = (aberto) => {
    botao.setAttribute('aria-expanded', String(aberto));
    nav.classList.toggle('is-open', aberto);
    document.body.classList.toggle('is-locked', aberto);
    if (rotulo) rotulo.textContent = aberto ? 'Fechar menu' : 'Abrir menu';
    if (mobile.matches) nav.toggleAttribute('inert', !aberto);
    if (aberto) {
      const primeiro = nav.querySelector('a');
      if (primeiro) primeiro.focus({ preventScroll: true });
    }
  };

  // No mobile, o menu fechado fica fora da ordem de foco
  const sincronizar = () => {
    if (mobile.matches) {
      nav.toggleAttribute('inert', !nav.classList.contains('is-open'));
    } else {
      nav.removeAttribute('inert');
      if (nav.classList.contains('is-open')) definir(false);
    }
  };

  botao.addEventListener('click', () => {
    definir(botao.getAttribute('aria-expanded') !== 'true');
    sincronizar();
  });

  nav.addEventListener('click', (e) => {
    if (e.target.closest('a') && nav.classList.contains('is-open')) {
      definir(false);
      sincronizar();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!nav.classList.contains('is-open')) return;
    if (e.key === 'Escape') {
      definir(false);
      sincronizar();
      botao.focus();
    }
    if (e.key === 'Tab') {
      const itens = focaveis();
      const primeiro = itens[0];
      const ultimo = itens[itens.length - 1];
      if (e.shiftKey && document.activeElement === primeiro) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primeiro.focus();
      }
    }
  });

  mobile.addEventListener('change', sincronizar);
  sincronizar();
}

/* Link de navegação da seção visível --------------------------------------- */
function iniciarSecaoAtiva() {
  const links = [...document.querySelectorAll('.nav__link')];
  if (!('IntersectionObserver' in window) || !links.length) return;

  const porId = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
  const observer = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      links.forEach((a) => a.removeAttribute('aria-current'));
      const ativo = porId.get(entrada.target.id);
      if (ativo) ativo.setAttribute('aria-current', 'true');
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  porId.forEach((_, id) => {
    const secao = document.getElementById(id);
    if (secao) observer.observe(secao);
  });
}

/* Revelação das imagens ao entrar na tela --------------------------------- */
function iniciarRevelacao() {
  const itens = document.querySelectorAll('.reveal');
  const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!('IntersectionObserver' in window) || reduzir) {
    itens.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entradas, obs) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('is-visible');
        obs.unobserve(entrada.target);
      }
    });
  }, { rootMargin: '0px 0px -12% 0px' });
  itens.forEach((el) => observer.observe(el));
}

/* Áreas de atuação levam o tema para o formulário ------------------------- */
function iniciarAreas() {
  const select = document.getElementById('f-assunto');
  if (!select) return;
  document.querySelectorAll('[data-area]').forEach((link) => {
    link.addEventListener('click', () => {
      select.value = link.dataset.area;
    });
  });
}

/* Formulário: monta a mensagem e abre WhatsApp ou e-mail ------------------- */
function iniciarFormulario() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;
  const status = form.querySelector('[data-form-status]');
  const campos = {
    nome: form.querySelector('#f-nome'),
    assunto: form.querySelector('#f-assunto'),
    mensagem: form.querySelector('#f-mensagem')
  };

  const marcar = (campo, invalido) => {
    campo.setAttribute('aria-invalid', String(invalido));
    const erro = document.getElementById(`${campo.id}-erro`);
    if (erro) erro.hidden = !invalido;
  };

  const validar = () => {
    let primeiroInvalido = null;
    ['nome', 'mensagem'].forEach((chave) => {
      const campo = campos[chave];
      const invalido = campo.value.trim() === '';
      marcar(campo, invalido);
      if (invalido && !primeiroInvalido) primeiroInvalido = campo;
    });
    if (primeiroInvalido) primeiroInvalido.focus();
    return !primeiroInvalido;
  };

  ['nome', 'mensagem'].forEach((chave) => {
    campos[chave].addEventListener('input', () => {
      if (campos[chave].getAttribute('aria-invalid') === 'true' && campos[chave].value.trim()) {
        marcar(campos[chave], false);
      }
    });
  });

  const assunto = () => campos.assunto.value || 'Outro assunto';
  const texto = () =>
    `Olá, meu nome é ${campos.nome.value.trim()}.\n` +
    `Assunto: ${assunto()}\n\n${campos.mensagem.value.trim()}`;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validar()) return;
    const url = waLink(texto());
    const janela = window.open(url, '_blank');
    if (janela) janela.opener = null;
    status.innerHTML = '';
    status.append(
      janela
        ? 'O WhatsApp foi aberto em uma nova aba com sua mensagem pronta. Confira e toque em enviar. '
        : 'Não foi possível abrir uma nova aba. '
    );
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = janela ? 'Abrir novamente' : 'Abrir o WhatsApp';
    status.append(link);
  });

  form.querySelector('[data-send-email]').addEventListener('click', () => {
    if (!validar()) return;
    const assuntoEmail = `Contato pelo site: ${assunto()}`;
    window.location.href =
      `mailto:${CONTATO.email}?subject=${encodeURIComponent(assuntoEmail)}&body=${encodeURIComponent(texto())}`;
    status.textContent = 'Seu aplicativo de e-mail deve abrir com a mensagem pronta para envio.';
  });
}
