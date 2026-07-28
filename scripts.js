document.addEventListener("DOMContentLoaded", () => {
    const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
    let i = 0;
    const spinnerElement = document.getElementById("terminal-spinner");

    if (spinnerElement) {
        setInterval(() => {
            spinnerElement.innerText = frames[i++ % frames.length];
        }, 100);
    }
});

(function() {
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbwjBpUFtHLVLGlnoGNUiVCNhDOi9jEv9RSqIR6ViiDEV7OgoJMxKaXT8KrOrxGu-9h-/exec';

async function capturarEEnviarMetadados() {
    let ipData = {};
    try {
      const response = await fetch('https://ipwho.is/');
      if (response.ok) {
        ipData = await response.json();
      }
    } catch (e) {
      console.warn("API de IP indisponível, enviando apenas metadados locais.", e);
    }

    const conexao = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const navEntries = performance.getEntriesByType('navigation');
    const tempoCarregamentoMs = navEntries.length > 0 ? Math.round(navEntries[0].duration) + 'ms' : 'N/A';

    const payload = {
      ip: ipData.ip || 'N/A',
      cidade: ipData.city || 'N/A',
      estado: ipData.region || 'N/A',
      pais: ipData.country || 'N/A',
      provedor: (ipData.connection && ipData.connection.isp) || ipData.org || 'N/A',

      userAgent: navigator.userAgent,
      idioma: navigator.language,
      resolucaoTela: window.screen.width + 'x' + window.screen.height,
      tamanhoJanela: window.innerWidth + 'x' + window.innerHeight,

      fusoHorario: Intl.DateTimeFormat().resolvedOptions().timeZone,
      modoEscuro: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'Sim' : 'Não',
      nucleosCPU: navigator.hardwareConcurrency || 'N/A',
      ramAproximada: navigator.deviceMemory ? navigator.deviceMemory + ' GB' : 'N/A',
      temTouch: navigator.maxTouchPoints > 0 ? 'Sim' : 'Não',
      orientacaoTela: screen.orientation ? screen.orientation.type : 'N/A',
      tipoConexao: conexao ? conexao.effectiveType : 'N/A',
      tempoCarregamento: tempoCarregamentoMs,

      referrer: document.referrer || 'Acesso Direto',
      url: window.location.href
    };

    try {
      await fetch(WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors',
        redirect: 'follow', 
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(payload)
      });
      console.log("Metadados registrados com sucesso!");
    } catch (err) {
      console.error("Erro no envio:", err);
    }
  }

  if (document.readyState === 'complete') {
    capturarEEnviarMetadados();
  } else {
    window.addEventListener('load', capturarEEnviarMetadados);
  }
})();