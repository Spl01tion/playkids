(function () {
  'use strict';

  // Shorthand accessors into pkModal internals (defined in pk-modals.js)
  function m()   { return window.pkModal; }
  function v(id) { return m()._v(id); }
  function r(n)  { return m()._r(n); }
  function cv(n) { return m()._cVals(n); }

  function h()                   { return m()._html; }
  function mfTxt(id, l, t, p)   { return h().mfTxt(id, l, t, p); }
  function mfSel(id, l, opts)    { return h().mfSel(id, l, opts); }
  function mfTxa(id, l, p)       { return h().mfTxa(id, l, p); }
  function row2(a, b)            { return h().row2(a, b); }
  function divider()             { return h().divider(); }
  function subtitle(t)           { return h().subtitle(t); }
  function condDiv(id, content)  { return h().condDiv(id, content); }

  // ══ FESTAS ════════════════════════════════════════════════
  function buildFestas() {
    var body =
      subtitle('🎂 Dados da Festa') +
      m()._body.festas() +
      divider() +
      subtitle('👤 Contacto') +
      row2(mfTxt('f-ee', 'Nome do encarregado *'), mfTxt('f-tel', 'Telefone *', 'tel'));

    m()._open(
      'linear-gradient(135deg,#ff6b9d,#c44569)',
      '🎂', 'Agendar Festa de Aniversário',
      'Preencha os dados e entraremos em contacto',
      body, 'pkSendFestas'
    );
  }

  window.pkSendFestas = function () {
    if (!m()._req(['f-nome', 'f-anos', 'f-data', 'f-unidade', 'f-ee', 'f-tel'])) {
      alert('Por favor preencha todos os campos obrigatórios (*).');
      return;
    }
    var extras = cv('f-extras');
    var msg = '*Agendamento – Festa de Aniversário*\n\n' +
      '*Aniversariante:* ' + v('f-nome') + ' (' + v('f-anos') + ' anos)\n' +
      '*Data:* ' + v('f-data') + '\n' +
      '*Unidade:* ' + v('f-unidade') + '\n';
    if (v('f-pacote'))          msg += '*Pacote:* ' + v('f-pacote') + '\n';
    if (v('f-ncriancas-extra')) msg += '*Crianças extra:* ' + v('f-ncriancas-extra') + '\n';
    if (v('f-tema'))            msg += '*Tema:* ' + v('f-tema') + '\n';
    if (extras.length)  msg += '*Extras:* ' + extras.join(', ') + '\n';
    msg += '\n*Encarregado:* ' + v('f-ee') + '\n*Contacto:* ' + v('f-tel');
    m()._wpp(msg);
  };

  // ══ FÉRIAS ════════════════════════════════════════════════
  function buildFerias() {
    var body =
      subtitle('☀️ Dados da Criança') +
      m()._body.ferias() +
      divider() +
      subtitle('👤 Encarregado de Educação') +
      row2(mfTxt('fer-ee-nome', 'Nome *'), mfTxt('fer-ee-parent', 'Parentesco', 'text', 'ex: Mãe, Pai...')) +
      row2(mfTxt('fer-ee-tel', 'Contacto *', 'tel'), mfTxt('fer-ee-email', 'E-mail *', 'email')) +
      mfTxa('fer-ee-info', 'Informação adicional');

    m()._open(
      'linear-gradient(135deg,#f9a825,#e65100)',
      '☀️', 'Inscrição – Tempo de Férias',
      'Preencha o formulário de inscrição',
      body, 'pkSendFerias'
    );
    m()._cond('fer-alerg', 'cond-fer-alerg', 'Sim');
    m()._cond('fer-med',   'cond-fer-med',   'Sim');
  }

  window.pkSendFerias = function () {
    if (!m()._req(['fer-nome', 'fer-nasc', 'fer-data', 'fer-ee-nome', 'fer-ee-tel', 'fer-ee-email'])) {
      alert('Por favor preencha todos os campos obrigatórios (*).');
      return;
    }
    var msg = '☀️ *Inscrição – Tempo de Férias*\n\n' +
      '*Criança:* ' + v('fer-nome') + '\n' +
      '*Data nasc.:* ' + v('fer-nasc') + '\n' +
      '*Data pretendida:* ' + v('fer-data') + '\n';
    if (v('fer-morada'))     msg += '*Morada:* '          + v('fer-morada') + '\n';
    if (v('fer-nutente'))    msg += '*Nº utente:* '       + v('fer-nutente') + '\n';
    if (v('fer-obs'))        msg += '*Observações:* '     + v('fer-obs') + '\n';
    if (r('fer-nadar'))      msg += '*Sabe nadar:* '      + r('fer-nadar') + '\n';
    if (r('fer-alerg'))      msg += '*Alérgico:* '        + r('fer-alerg') + '\n';
    if (v('fer-alerg-qual')) msg += '*Qual alergia:* '    + v('fer-alerg-qual') + '\n';
    if (r('fer-med'))        msg += '*Medicação:* '       + r('fer-med') + '\n';
    if (v('fer-med-qual'))   msg += '*Qual medicação:* '  + v('fer-med-qual') + '\n';
    msg += '\n*Encarregado:* ' + v('fer-ee-nome') + '\n';
    if (v('fer-ee-parent')) msg += '*Parentesco:* ' + v('fer-ee-parent') + '\n';
    msg += '*Contacto:* ' + v('fer-ee-tel') + '\n*E-mail:* ' + v('fer-ee-email') + '\n';
    if (v('fer-ee-info')) msg += '*Info adicional:* ' + v('fer-ee-info') + '\n';
    var auto = cv('fer-auto');
    if (auto.length) msg += '\n*Autorizações:* ' + auto.join('; ');
    m()._wpp(msg);
  };

  // ══ APÓS ESCOLA ═══════════════════════════════════════════
  function buildAposEscola() {
    var body =
      subtitle('📚 Dados da Criança') +
      m()._body.aposEscola() +
      divider() +
      subtitle('👤 Encarregado de Educação') +
      row2(mfTxt('ae-ee-nome', 'Nome *'), mfTxt('ae-ee-tel', 'Telefone *', 'tel')) +
      row2(mfTxt('ae-ee-email', 'E-mail *', 'email'), mfTxt('ae-ee-morada', 'Morada'));

    m()._open(
      'linear-gradient(135deg,#43a047,#1b5e20)',
      '📚', 'Inscrição – Após Escola',
      'Preencha os dados de inscrição',
      body, 'pkSendAposEscola'
    );
    m()._cond('ae-med', 'cond-ae-med', 'Sim');
  }

  window.pkSendAposEscola = function () {
    if (!m()._req(['ae-nome', 'ae-idade', 'ae-escola', 'ae-horario', 'ae-ee-nome', 'ae-ee-tel', 'ae-ee-email'])) {
      alert('Por favor preencha todos os campos obrigatórios (*).');
      return;
    }
    var msg = '📚 *Inscrição – Após Escola*\n\n' +
      '*Criança:* ' + v('ae-nome') + ' (' + v('ae-idade') + ' anos)\n' +
      '*Escola:* ' + v('ae-escola') + '\n' +
      '*Horário de saída:* ' + v('ae-horario') + '\n';
    if (r('ae-transp'))   msg += '*Transporte:* '      + r('ae-transp') + '\n';
    if (r('ae-med'))      msg += '*Medicação:* '       + r('ae-med') + '\n';
    if (v('ae-med-qual')) msg += '*Qual medicação:* '  + v('ae-med-qual') + '\n';
    var dias = cv('ae-dias');
    if (dias.length) msg += '*Dias:* ' + dias.join(', ') + '\n';
    msg += '\n*Encarregado:* ' + v('ae-ee-nome') + '\n' +
      '*Contacto:* ' + v('ae-ee-tel') + '\n' +
      '*E-mail:* '   + v('ae-ee-email') + '\n';
    if (v('ae-ee-morada')) msg += '*Morada:* ' + v('ae-ee-morada');
    m()._wpp(msg);
  };

  // ══ TRANSPORTE ════════════════════════════════════════════
  function buildTransporte() {
    var body =
      subtitle('🚌 Dados da Criança') +
      m()._body.transporte() +
      divider() +
      subtitle('👤 Encarregado de Educação') +
      mfTxt('tr-ee-nome', 'Nome *') +
      mfTxt('tr-ee-morada', 'Morada *') +
      row2(mfTxt('tr-ee-tel', 'Contacto *', 'tel'), mfTxt('tr-ee-email', 'E-mail *', 'email'));

    m()._open(
      'linear-gradient(135deg,#1e88e5,#0d47a1)',
      '🚌', 'Inscrição – Transporte Escolar',
      'Preencha os dados para registo',
      body, 'pkSendTransporte'
    );
  }

  window.pkSendTransporte = function () {
    if (!m()._req(['tr-nome', 'tr-idade', 'tr-escola', 'tr-morada', 'tr-ee-nome', 'tr-ee-morada', 'tr-ee-tel', 'tr-ee-email', 'tr-trajeto'])) {
      alert('Por favor preencha todos os campos obrigatórios (*).');
      return;
    }
    var msg = '🚌 *Inscrição – Transporte Escolar*\n\n' +
      '*Criança:* '          + v('tr-nome')   + ' (' + v('tr-idade') + ' anos)\n' +
      '*Escola:* '           + v('tr-escola') + '\n' +
      '*Morada da criança:* '+ v('tr-morada') + '\n' +
      '*Trajeto:* '          + v('tr-trajeto')+ '\n' +
      '\n*Encarregado:* '    + v('tr-ee-nome')   + '\n' +
      '*Morada EE:* '        + v('tr-ee-morada') + '\n' +
      '*Contacto:* '         + v('tr-ee-tel')    + '\n' +
      '*E-mail:* '           + v('tr-ee-email');
    m()._wpp(msg);
  };

  // ══ INSUFLÁVEIS ═══════════════════════════════════════════
  function buildInsuflaveis() {
    var body =
      subtitle('🎪 Dados do Evento') +
      m()._body.insuflaveis();

    m()._open(
      'linear-gradient(135deg,#e91e8c,#ad1457)',
      '🎪', 'Pedido de Aluguer – Insufláveis',
      'Preencha os dados do evento',
      body, 'pkSendInsuflaveis'
    );
  }

  window.pkSendInsuflaveis = function () {
    if (!m()._req(['ins-nome', 'ins-tel', 'ins-data', 'ins-duracao', 'ins-ncriancas', 'ins-idades', 'ins-morada'])) {
      alert('Por favor preencha todos os campos obrigatórios (*).');
      return;
    }
    var msg = '🎪 *Pedido de Aluguer – Insufláveis*\n\n' +
      '*Nome:* '              + v('ins-nome')      + '\n' +
      '*Contacto:* '          + v('ins-tel')       + '\n' +
      '*Data:* '              + v('ins-data')      + '\n' +
      '*Duração:* '           + v('ins-duracao')   + '\n' +
      '*Nº de crianças:* '    + v('ins-ncriancas') + '\n' +
      '*Média de idades:* '   + v('ins-idades')    + '\n' +
      '*Morada de montagem:* '+ v('ins-morada')    + '\n';
    if (v('ins-obs')) msg += '*Observações:* ' + v('ins-obs');
    m()._wpp(msg);
  };

  // ── Extend pkModal with agendar ───────────────────────────
  var builders = {
    'festas':      buildFestas,
    'ferias':      buildFerias,
    'apos-escola': buildAposEscola,
    'transporte':  buildTransporte,
    'insuflaveis': buildInsuflaveis
  };

  window.pkModal.agendar = function (service) {
    m()._css();
    var fn = builders[service];
    if (fn) fn();
  };

})();
