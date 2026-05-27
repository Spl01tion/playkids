(function () {
  'use strict';

  // ── CSS ───────────────────────────────────────────────────
  var _waveDivider = 'data:image/svg+xml,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="8">' +
    '<path d="M0,4 Q5,0 10,4 Q15,8 20,4" fill="none" stroke="#ccc" stroke-width="1.5" stroke-dasharray="3,2"/>' +
    '</svg>'
  );

  var css = [
    '#pk-overlay{display:none;position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.55);',
    'backdrop-filter:blur(3px);overflow:hidden;padding:1.5rem;}',
    '#pk-overlay.pk-open{display:flex;align-items:center;justify-content:center;}',
    '.pk-modal-box{background:#fff;border-radius:20px;width:100%;max-width:640px;margin:auto;',
    'display:flex;flex-direction:column;max-height:calc(100vh - 3rem);',
    'overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.25);}',
    '.pk-modal-hdr{padding:1.4rem 1.6rem;display:flex;align-items:center;gap:.8rem;color:#fff;flex-shrink:0;}',
    '.pk-modal-hdr h5{margin:0;font-family:"Fredoka",sans-serif;font-size:1.3rem;}',
    '.pk-modal-hdr p{margin:0;font-size:.85rem;opacity:.9;}',
    '.pk-mhdr-icon{font-size:2rem;flex-shrink:0;}',
    '.pk-mhdr-text{flex:1;}',
    '.pk-modal-close{background:rgba(255,255,255,.25);border:none;color:#fff;width:32px;height:32px;',
    'border-radius:50%;font-size:1.3rem;cursor:pointer;display:flex;align-items:center;',
    'justify-content:center;flex-shrink:0;transition:background .2s;line-height:1;}',
    '.pk-modal-close:hover{background:rgba(255,255,255,.45);}',
    '.pk-modal-body{padding:1.6rem;overflow-y:auto;flex:1;}',
    '.pk-mf{margin-bottom:.9rem;}',
    '.pk-mf label{display:block;font-size:.82rem;font-weight:600;color:#444;margin-bottom:.3rem;}',
    '.pk-mf input,.pk-mf select,.pk-mf textarea{width:100%;border:1.5px solid #ddd;border-radius:10px;',
    'padding:.5rem .8rem;font-size:.9rem;outline:none;transition:border-color .2s;',
    'font-family:"Nunito",sans-serif;box-sizing:border-box;}',
    '.pk-mf input:focus,.pk-mf select:focus,.pk-mf textarea:focus{border-color:var(--pk-green,#4caf50);}',
    '.pk-mf textarea{resize:vertical;min-height:70px;}',
    '.pk-mf-row{display:grid;gap:.75rem;}',
    '.pk-mf-row.col2{grid-template-columns:1fr 1fr;}',
    '.pk-divider-line{border:none;height:8px;margin:.8rem 0;background-repeat:repeat-x;background-size:20px 8px;background-position:center;background-image:url(' + _waveDivider + ');}',
    '.pk-msubtitle{font-family:"Fredoka",sans-serif;font-size:1rem;font-weight:600;color:#333;',
    'margin-bottom:.5rem;margin-top:.2rem;}',
    '.pk-radio-group,.pk-chk-group{display:flex;flex-wrap:wrap;gap:.5rem;}',
    '.pk-rd-label,.pk-chk-label{display:inline-flex;align-items:center;gap:.4rem;',
    'border:1.5px solid #ddd;border-radius:50px;padding:.32rem .85rem;cursor:pointer;',
    'font-size:.85rem;font-weight:600;transition:all .15s;user-select:none;color:#555;}',
    '.pk-rd-label input,.pk-chk-label input{display:none;}',
    '.pk-rd-label.pk-sel,.pk-chk-label.pk-sel{background:var(--pk-green,#4caf50);',
    'border-color:var(--pk-green,#4caf50);color:#fff;}',
    '.pk-cond{display:none;}.pk-cond.pk-show{display:block;}',
    /* Field hint text */
    '.pk-field-hint{display:block;font-size:.78rem;color:#888;margin-top:.3rem;}',
    /* Visible checkbox list */
    '.pk-chk-list{list-style:none;margin:.25rem 0 0;padding:0;}',
    '.pk-chk-list li label{display:flex;align-items:flex-start;gap:.6rem;cursor:pointer;',
    'padding:.4rem 0;border-bottom:1px solid #f3f3f3;width:100%;}',
    '.pk-chk-list li:last-child label{border-bottom:none;}',
    '.pk-chk-list input[type="checkbox"]{width:16px;height:16px;min-width:16px;margin-top:2px;',
    'accent-color:var(--pk-green,#4caf50);cursor:pointer;}',
    '.pk-chk-list span{font-size:.87rem;color:#444;line-height:1.4;}',
    /* Orçamento pills */
    '.pk-orc-pills{display:flex;flex-wrap:wrap;gap:.5rem;margin-bottom:.8rem;}',
    '.pk-orc-pill{border:2px solid #ddd;border-radius:50px;padding:.38rem 1rem;cursor:pointer;',
    'font-weight:600;font-size:.85rem;transition:all .2s;color:#555;background:#fff;}',
    '.pk-orc-pill.pk-sel{color:#fff;}',
    /* Orçamento service sections */
    '.pk-orc-sec{display:none;border-radius:14px;padding:1rem 1.1rem;margin-bottom:.8rem;',
    'border:1.5px solid #eee;background:#fafafa;}',
    '.pk-orc-sec-hdr{display:flex;align-items:center;gap:.5rem;margin-bottom:.8rem;',
    'font-family:"Fredoka",sans-serif;font-size:1rem;font-weight:600;}',
    /* Submit */
    '.pk-modal-submit{width:100%;padding:.75rem 1rem;border:none;border-radius:50px;font-size:1rem;',
    'font-weight:700;font-family:"Fredoka",sans-serif;cursor:pointer;display:flex;align-items:center;',
    'justify-content:center;gap:.5rem;margin-top:1.2rem;transition:opacity .2s;',
    'background:#25d366;color:#fff;}',
    '.pk-modal-submit:hover{opacity:.88;}',
    '@media(max-width:480px){.pk-mf-row.col2{grid-template-columns:1fr;}',
    '#pk-overlay{padding:.5rem;}.pk-modal-box{max-height:calc(100vh - 1rem);}}'
  ].join('');

  function injectCSS() {
    if (document.getElementById('pk-modal-styles')) return;
    var s = document.createElement('style');
    s.id = 'pk-modal-styles';
    s.textContent = css;
    document.head.appendChild(s);
  }

  // ── Overlay ───────────────────────────────────────────────
  var overlay = null;

  function getOverlay() {
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'pk-overlay';
      overlay.addEventListener('click', function (e) {
        if (e.target === overlay) pkModal.fechar();
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') pkModal.fechar();
      });
      document.body.appendChild(overlay);
    }
    return overlay;
  }

  // ── Helpers ───────────────────────────────────────────────
  function v(id) {
    var el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }
  function r(name) {
    var el = document.querySelector('input[name="' + name + '"]:checked');
    return el ? el.value : '';
  }
  function cVals(name) {
    return Array.from(document.querySelectorAll('input[name="' + name + '"]:checked')).map(function (e) { return e.value; });
  }
  function sendWpp(msg) {
    window.open('https://wa.me/351937608823?text=' + encodeURIComponent(msg), '_blank');
    pkModal.fechar();
  }
  function req(ids) {
    for (var i = 0; i < ids.length; i++) {
      if (!v(ids[i])) return false;
    }
    return true;
  }

  // ── HTML builders ─────────────────────────────────────────
  function mfTxt(id, lbl, type, ph) {
    type = type || 'text'; ph = ph || '';
    return '<div class="pk-mf"><label for="' + id + '">' + lbl + '</label>' +
      '<input type="' + type + '" id="' + id + '" placeholder="' + ph + '" /></div>';
  }
  function mfSel(id, lbl, opts) {
    var options = opts.map(function (o) { return '<option value="' + o + '">' + o + '</option>'; }).join('');
    return '<div class="pk-mf"><label for="' + id + '">' + lbl + '</label>' +
      '<select id="' + id + '"><option value="">Selecionar...</option>' + options + '</select></div>';
  }
  function mfTxa(id, lbl, ph) {
    ph = ph || '';
    return '<div class="pk-mf"><label for="' + id + '">' + lbl + '</label>' +
      '<textarea id="' + id + '" placeholder="' + ph + '"></textarea></div>';
  }
  function row2(a, b) {
    return '<div class="pk-mf-row col2">' + a + b + '</div>';
  }
  function divider() {
    return '<hr class="pk-divider-line">';
  }
  function subtitle(t) {
    return '<p class="pk-msubtitle">' + t + '</p>';
  }
  function rdGroup(name, opts) {
    var pills = opts.map(function (o) {
      return '<label class="pk-rd-label" onclick="pkRdToggle(this)">' +
        '<input type="radio" name="' + name + '" value="' + o + '" />' + o + '</label>';
    }).join('');
    return '<div class="pk-mf"><div class="pk-radio-group">' + pills + '</div></div>';
  }
  function chkGroup(name, opts) {
    var pills = opts.map(function (o) {
      return '<label class="pk-chk-label" onclick="pkChkToggle(this)">' +
        '<input type="checkbox" name="' + name + '" value="' + o + '" />' + o + '</label>';
    }).join('');
    return '<div class="pk-mf"><div class="pk-chk-group">' + pills + '</div></div>';
  }
  function condDiv(condId, content) {
    return '<div class="pk-cond" id="' + condId + '">' + content + '</div>';
  }
  function chkList(name, opts) {
    var items = opts.map(function (o) {
      return '<li><label><input type="checkbox" name="' + name + '" value="' + o + '" /><span>' + o + '</span></label></li>';
    }).join('');
    return '<div class="pk-mf"><ul class="pk-chk-list">' + items + '</ul></div>';
  }

  // ── Shell ─────────────────────────────────────────────────
  function shell(gradient, icon, title, sub, body, sendFn) {
    var ov = getOverlay();
    ov.innerHTML = '<div class="pk-modal-box">' +
      '<div class="pk-modal-hdr" style="background:' + gradient + '">' +
        '<span class="pk-mhdr-icon">' + icon + '</span>' +
        '<div class="pk-mhdr-text"><h5>' + title + '</h5><p>' + sub + '</p></div>' +
        '<button class="pk-modal-close" onclick="pkModal.fechar()" aria-label="Fechar">&times;</button>' +
      '</div>' +
      '<div class="pk-modal-body">' +
        '<form id="pk-form" onsubmit="return false;">' + body +
          '<button type="button" class="pk-modal-submit" onclick="' + sendFn + '()">' +
            '<i class="bi bi-whatsapp"></i> Enviar via WhatsApp' +
          '</button>' +
        '</form>' +
      '</div>' +
    '</div>';
    ov.classList.add('pk-open');
    document.body.style.overflow = 'hidden';
  }

  function setupCond(radioName, condId, triggerValue) {
    setTimeout(function () {
      document.querySelectorAll('input[name="' + radioName + '"]').forEach(function (inp) {
        inp.addEventListener('change', function () {
          var c = document.getElementById(condId);
          if (c) c.classList.toggle('pk-show', inp.value === triggerValue);
        });
      });
    }, 50);
  }

  // ══ SERVICE BODY BUILDERS ═════════════════════════════════
  // Shared between individual agendar modals and orçamento sections.
  // Each returns service-specific fields only (no contact info).

  function bodyFestas() {
    return row2(mfTxt('f-nome', 'Nome do aniversariante *'), mfTxt('f-anos', 'Anos que faz *', 'number', 'ex: 6')) +
      row2(mfTxt('f-data', 'Data da festa *', 'date'), mfSel('f-unidade', 'Unidade *', ['Centro – Rua Manuel Mafra, 35 A', 'Zona Industrial – Rua António de Oliveira, 40B'])) +
      mfSel('f-pacote', 'Pacote', ['Kids – 175€', 'Friends – 255€', 'Adventure – 255€', 'Power – 335€', 'Premium – 750€']) +
      mfTxt('f-ncriancas-extra', 'Nº de crianças extra', 'number', 'ex: 3') +
      mfTxt('f-tema', 'Tema da festa', 'text', 'ex: Princesas, Dinossauros, Marvel...') +
      divider() +
      subtitle('✨ Extras opcionais') +
      chkGroup('f-extras', ['Decoração temática simples (+60€)','Decoração temática (+120€)',  'Kit Brigadeiros (+22€)', 'Pintura facial (+40€)', 'Participação de adultos (+61,50€)']);
  }

  function bodyFerias() {
    return row2(mfTxt('fer-nome', 'Nome da criança *'), mfTxt('fer-nasc', 'Data de nascimento *', 'date')) +
      mfTxt('fer-data', 'Data pretendida *', 'date') +
      mfTxt('fer-morada', 'Endereço', 'text', 'Rua, nº, cidade') +
      mfTxt('fer-nutente', 'Nº de utente', 'text') +
      mfTxa('fer-obs', 'Observações importantes', 'Necessidades especiais, condições médicas...') +
      divider() +
      subtitle('🏊 Saúde') +
      '<div class="pk-mf"><label>Sabe nadar?</label><div class="pk-radio-group">' +
        '<label class="pk-rd-label" onclick="pkRdToggle(this)"><input type="radio" name="fer-nadar" value="Sim" />Sim</label>' +
        '<label class="pk-rd-label" onclick="pkRdToggle(this)"><input type="radio" name="fer-nadar" value="Não" />Não</label>' +
      '</div></div>' +
      '<div class="pk-mf"><label>Tem alguma alergia?</label><div class="pk-radio-group">' +
        '<label class="pk-rd-label" onclick="pkRdToggle(this)"><input type="radio" name="fer-alerg" value="Sim" />Sim</label>' +
        '<label class="pk-rd-label" onclick="pkRdToggle(this)"><input type="radio" name="fer-alerg" value="Não" />Não</label>' +
      '</div></div>' +
      condDiv('cond-fer-alerg', mfTxt('fer-alerg-qual', 'Qual a alergia?')) +
      '<div class="pk-mf"><label>Toma medicação?</label><div class="pk-radio-group">' +
        '<label class="pk-rd-label" onclick="pkRdToggle(this)"><input type="radio" name="fer-med" value="Sim" />Sim</label>' +
        '<label class="pk-rd-label" onclick="pkRdToggle(this)"><input type="radio" name="fer-med" value="Não" />Não</label>' +
      '</div></div>' +
      condDiv('cond-fer-med', mfTxt('fer-med-qual', 'Qual a medicação?')) +
      divider() +
      subtitle('✅ Autorizações') +
      chkList('fer-auto', ['Autorizo saídas e passeios', 'Autorizo captação e uso de imagem', 'Autorizo assistência médica de urgência', 'Autorizo atividades desportivas']);
  }

  function bodyAposEscola() {
    return row2(mfTxt('ae-nome', 'Nome da criança *'), mfTxt('ae-idade', 'Idade *', 'number')) +
      row2(mfTxt('ae-escola', 'Escola *'), mfTxt('ae-horario', 'Horário de saída *', 'time')) +
      '<div class="pk-mf"><label>Necessita de transporte escolar?</label><div class="pk-radio-group">' +
        '<label class="pk-rd-label" onclick="pkRdToggle(this)"><input type="radio" name="ae-transp" value="Sim" />Sim</label>' +
        '<label class="pk-rd-label" onclick="pkRdToggle(this)"><input type="radio" name="ae-transp" value="Não" />Não</label>' +
      '</div></div>' +
      '<div class="pk-mf"><label>Toma medicação?</label><div class="pk-radio-group">' +
        '<label class="pk-rd-label" onclick="pkRdToggle(this)"><input type="radio" name="ae-med" value="Sim" />Sim</label>' +
        '<label class="pk-rd-label" onclick="pkRdToggle(this)"><input type="radio" name="ae-med" value="Não" />Não</label>' +
      '</div></div>' +
      condDiv('cond-ae-med', mfTxt('ae-med-qual', 'Qual a medicação?')) +
      divider() +
      subtitle('📅 Dias da semana') +
      chkGroup('ae-dias', ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta']);
  }

  function bodyTransporte() {
    return row2(mfTxt('tr-nome', 'Nome da criança *'), mfTxt('tr-idade', 'Idade *', 'number')) +
      mfTxt('tr-escola', 'Escola *') +
      mfTxt('tr-morada', 'Morada da criança *') +
      divider() +
      mfSel('tr-trajeto', 'Trajeto solicitado *', ['Casa → Escola', 'Escola → Casa', 'Casa → Escola e Escola → Casa']);
  }

  function bodyInsuflaveis() {
    return row2(mfTxt('ins-nome', 'Nome *'), mfTxt('ins-tel', 'Contacto *', 'tel')) +
      row2(mfTxt('ins-data', 'Data pretendida *', 'date'), mfTxt('ins-duracao', 'Duração do evento *', 'text', 'ex: 4 horas')) +
      row2(mfTxt('ins-ncriancas', 'Nº de crianças *', 'number'), mfTxt('ins-idades', 'Média de idades *', 'text', 'ex: 5–8 anos')) +
      mfTxt('ins-morada', 'Morada de montagem *', 'text', 'Rua, nº, cidade') +
      mfTxa('ins-obs', 'Observações', 'Tipo de espaço (interior/exterior), acesso ao local...');
  }

  // ══ ORÇAMENTO (multi-serviço) ═════════════════════════════
  var ORC_SVCS = [
    { key: 'festas',      label: '🎂 Festas',       color: '#ff6b9d', bg: '#fff5f8' },
    { key: 'ferias',      label: '☀️ Férias',        color: '#f9a825', bg: '#fffde7' },
    { key: 'apos-escola', label: '📚 Após Escola',  color: '#43a047', bg: '#f1f8e9' },
    { key: 'transporte',  label: '🚌 Transporte',   color: '#1e88e5', bg: '#e3f2fd' },
    { key: 'insuflaveis', label: '🎪 Insufláveis',  color: '#e91e8c', bg: '#fce4ec' }
  ];

  var orcSecBuilders = {
    'festas':      bodyFestas,
    'ferias':      bodyFerias,
    'apos-escola': bodyAposEscola,
    'transporte':  bodyTransporte,
    'insuflaveis': bodyInsuflaveis
  };

  function buildOrcamento() {
    var pills = ORC_SVCS.map(function (s) {
      return '<div class="pk-orc-pill" data-key="' + s.key + '" data-color="' + s.color + '" data-bg="' + s.bg + '" onclick="pkToggleOrcSvc(\'' + s.key + '\')">' + s.label + '</div>';
    }).join('');

    var sections = ORC_SVCS.map(function (s) {
      var builder = orcSecBuilders[s.key];
      return '<div class="pk-orc-sec" id="orc-sec-' + s.key + '" style="border-color:' + s.color + '33;background:' + s.bg + '">' +
        '<div class="pk-orc-sec-hdr" style="color:' + s.color + '">' + s.label + '</div>' +
        (builder ? builder() : '') +
      '</div>';
    }).join('');

    var body =
      subtitle('👤 Encarregado de Educação') +
      row2(mfTxt('orc-nome', 'Nome *'), mfTxt('orc-tel', 'Telefone *', 'tel')) +
      row2(mfTxt('orc-email', 'E-mail', 'email'), mfTxt('orc-parent', 'Parentesco', 'text', 'ex: Mãe, Pai...')) +
      mfTxa('orc-msg', 'Mensagem adicional') +
      divider() +
      subtitle('Selecione os serviços de interesse') +
      '<div class="pk-orc-pills">' + pills + '</div>' +
      sections;

    shell(
      'linear-gradient(135deg,#7b1fa2,#4a148c)',
      '📋', 'Pedido de Orçamento',
      'Selecione os serviços e deixe os seus contactos',
      body, 'pkSendOrcamento'
    );

    setupCond('fer-alerg', 'cond-fer-alerg', 'Sim');
    setupCond('fer-med', 'cond-fer-med', 'Sim');
    setupCond('ae-med', 'cond-ae-med', 'Sim');
  }

  window.pkToggleOrcSvc = function (key) {
    var pill = document.querySelector('.pk-orc-pill[data-key="' + key + '"]');
    var sec  = document.getElementById('orc-sec-' + key);
    if (!pill || !sec) return;
    var on = !pill.classList.contains('pk-sel');
    pill.classList.toggle('pk-sel', on);
    if (on) {
      pill.style.background    = pill.dataset.color;
      pill.style.borderColor   = pill.dataset.color;
      sec.style.display        = 'block';
      setTimeout(function () {
        sec.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 80);
    } else {
      pill.style.background  = '';
      pill.style.borderColor = '';
      sec.style.display      = 'none';
    }
  };

  window.pkSendOrcamento = function () {
    if (!req(['orc-nome', 'orc-tel'])) {
      alert('Por favor preencha o nome e o telefone.');
      return;
    }
    var selected = Array.from(document.querySelectorAll('.pk-orc-pill.pk-sel')).map(function (e) { return e.dataset.key; });
    if (!selected.length) {
      alert('Selecione pelo menos um serviço de interesse.');
      return;
    }

    var msg = '📋 *Pedido de Orçamento – PlayKids*\n\n';

    selected.forEach(function (key) {
      switch (key) {
        case 'festas':
          msg += '*FESTAS DE ANIVERSÁRIO*\n';
          if (v('f-nome'))    msg += '  Aniversariante: ' + v('f-nome') + '\n';
          if (v('f-anos'))    msg += '  Anos: ' + v('f-anos') + '\n';
          if (v('f-data'))    msg += '  Data: ' + v('f-data') + '\n';
          if (v('f-unidade')) msg += '  Unidade: ' + v('f-unidade') + '\n';
          if (v('f-pacote'))         msg += '  Pacote: ' + v('f-pacote') + '\n';
          if (v('f-ncriancas-extra')) msg += '  Crianças extra: ' + v('f-ncriancas-extra') + '\n';
          if (v('f-tema'))           msg += '  Tema: ' + v('f-tema') + '\n';
          var ex = cVals('f-extras');
          if (ex.length)      msg += '  Extras: ' + ex.join(', ') + '\n';
          break;
        case 'ferias':
          msg += '*TEMPO DE FÉRIAS*\n';
          if (v('fer-nome'))       msg += '  Criança: ' + v('fer-nome') + '\n';
          if (v('fer-nasc'))       msg += '  Data nasc.: ' + v('fer-nasc') + '\n';
          if (v('fer-data'))       msg += '  Data pretendida: ' + v('fer-data') + '\n';
          if (v('fer-morada'))     msg += '  Morada: ' + v('fer-morada') + '\n';
          if (v('fer-nutente'))    msg += '  Nº utente: ' + v('fer-nutente') + '\n';
          if (v('fer-obs'))        msg += '  Obs.: ' + v('fer-obs') + '\n';
          if (r('fer-nadar'))      msg += '  Sabe nadar: ' + r('fer-nadar') + '\n';
          if (r('fer-alerg'))      msg += '  Alérgico: ' + r('fer-alerg') + '\n';
          if (v('fer-alerg-qual')) msg += '  Qual alergia: ' + v('fer-alerg-qual') + '\n';
          if (r('fer-med'))        msg += '  Medicação: ' + r('fer-med') + '\n';
          if (v('fer-med-qual'))   msg += '  Qual medicação: ' + v('fer-med-qual') + '\n';
          var fauto = cVals('fer-auto');
          if (fauto.length)        msg += '  Autorizações: ' + fauto.join('; ') + '\n';
          break;
        case 'apos-escola':
          msg += '*APÓS ESCOLA*\n';
          if (v('ae-nome'))     msg += '  Criança: ' + v('ae-nome') + '\n';
          if (v('ae-idade'))    msg += '  Idade: ' + v('ae-idade') + ' anos\n';
          if (v('ae-escola'))   msg += '  Escola: ' + v('ae-escola') + '\n';
          if (v('ae-horario'))  msg += '  Horário saída: ' + v('ae-horario') + '\n';
          if (r('ae-transp'))   msg += '  Transporte: ' + r('ae-transp') + '\n';
          if (r('ae-med'))      msg += '  Medicação: ' + r('ae-med') + '\n';
          if (v('ae-med-qual')) msg += '  Qual medicação: ' + v('ae-med-qual') + '\n';
          var dias = cVals('ae-dias');
          if (dias.length)      msg += '  Dias: ' + dias.join(', ') + '\n';
          break;
        case 'transporte':
          msg += '*TRANSPORTE ESCOLAR*\n';
          if (v('tr-nome'))    msg += '  Criança: ' + v('tr-nome') + '\n';
          if (v('tr-idade'))   msg += '  Idade: ' + v('tr-idade') + ' anos\n';
          if (v('tr-escola'))  msg += '  Escola: ' + v('tr-escola') + '\n';
          if (v('tr-morada'))  msg += '  Morada: ' + v('tr-morada') + '\n';
          if (v('tr-trajeto')) msg += '  Trajeto: ' + v('tr-trajeto') + '\n';
          break;
        case 'insuflaveis':
          msg += '*INSUFLÁVEIS*\n';
          if (v('ins-nome'))       msg += '  Nome: ' + v('ins-nome') + '\n';
          if (v('ins-tel'))        msg += '  Contacto: ' + v('ins-tel') + '\n';
          if (v('ins-data'))       msg += '  Data: ' + v('ins-data') + '\n';
          if (v('ins-duracao'))    msg += '  Duração: ' + v('ins-duracao') + '\n';
          if (v('ins-ncriancas'))  msg += '  Nº crianças: ' + v('ins-ncriancas') + '\n';
          if (v('ins-idades'))     msg += '  Média idades: ' + v('ins-idades') + '\n';
          if (v('ins-morada'))     msg += '  Morada: ' + v('ins-morada') + '\n';
          if (v('ins-obs'))        msg += '  Obs.: ' + v('ins-obs') + '\n';
          break;
      }
      msg += '\n';
    });

    msg += '*Nome:* ' + v('orc-nome') + '\n*Contacto:* ' + v('orc-tel') + '\n';
    if (v('orc-email'))  msg += '*E-mail:* ' + v('orc-email') + '\n';
    if (v('orc-parent')) msg += '*Parentesco:* ' + v('orc-parent') + '\n';
    if (v('orc-msg'))   msg += '*Mensagem:* ' + v('orc-msg');

    sendWpp(msg);
  };

  // ── Public API ────────────────────────────────────────────
  window.pkModal = {
    orcamento: function () {
      injectCSS();
      buildOrcamento();
    },
    fechar: function () {
      var ov = document.getElementById('pk-overlay');
      if (ov) ov.classList.remove('pk-open');
      document.body.style.overflow = '';
    },
    // Internal API consumed by pk-agendar.js
    _open: shell,
    _css:  injectCSS,
    _cond: setupCond,
    _v: v, _r: r, _cVals: cVals, _wpp: sendWpp, _req: req,
    _html: { mfTxt: mfTxt, mfSel: mfSel, mfTxa: mfTxa, row2: row2, divider: divider, subtitle: subtitle, chkGroup: chkGroup, chkList: chkList, condDiv: condDiv },
    _body: {
      festas:      bodyFestas,
      ferias:      bodyFerias,
      aposEscola:  bodyAposEscola,
      transporte:  bodyTransporte,
      insuflaveis: bodyInsuflaveis
    }
  };

  // ── Radio / Checkbox visual toggles ───────────────────────
  window.pkRdToggle = function (label) {
    var inp = label.querySelector('input[type="radio"]');
    if (!inp) return;
    document.querySelectorAll('input[name="' + inp.name + '"]').forEach(function (i) {
      var lbl = i.closest('label');
      if (lbl) lbl.classList.remove('pk-sel');
    });
    inp.checked = true;
    label.classList.add('pk-sel');
    inp.dispatchEvent(new Event('change', { bubbles: true }));
  };

  window.pkChkToggle = function (label) {
    var inp = label.querySelector('input[type="checkbox"]');
    if (!inp) return;
    label.classList.toggle('pk-sel', inp.checked);
    inp.dispatchEvent(new Event('change', { bubbles: true }));
  };

})();
