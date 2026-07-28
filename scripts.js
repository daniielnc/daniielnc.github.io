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
  try {
    // 1. Obtém dados de IP (mantenha a sua chamada de API atual se houver)
    let ipData = {};
    try {
      const response = await fetch('https://ipapi.co/json/');
      ipData = await response.json();
    } catch (e) {
      console.warn("Não foi possível obter dados de IP", e);
    }

    // 2. Mede tempo de carregamento
    const navEntries = performance.getEntriesByType('navigation');
    const tempoCarregamentoMs = navEntries.length > 0 ? Math.round(navEntries[0].duration) + 'ms' : 'N/A';

    // 3. Monta o payload (AQUI FICA A CORREÇÃO DA CONEXÃO)
    const conexaoInfo = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

    const payload = {
      // IP e Localização
      ip: ipData.ip || 'N/A',
      cidade: ipData.city || 'N/A',
      estado: ipData.region || 'N/A',
      pais: ipData.country_name || 'N/A',
      provedor: ipData.org || 'N/A',

      // Navegador e Tela
      userAgent: navigator.userAgent,
      idioma: navigator.language,
      resolucaoTela: window.screen.width + 'x' + window.screen.height,
      tamanhoJanela: window.innerWidth + 'x' + window.innerHeight,

      // Preferências e Hardware
      fusoHorario: Intl.DateTimeFormat().resolvedOptions().timeZone,
      modoEscuro: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'Sim' : 'Não',
      nucleosCPU: navigator.hardwareConcurrency || 'N/A',
      ramAproximada: navigator.deviceMemory ? navigator.deviceMemory + ' GB' : 'N/A',
      temTouch: navigator.maxTouchPoints > 0 ? 'Sim' : 'Não',
      orientacaoTela: screen.orientation ? screen.orientation.type : 'N/A',
      tipoConexao: conexaoInfo ? conexaoInfo.effectiveType : 'N/A', // 👈 Correção
      tempoCarregamento: tempoCarregamentoMs,

      // Origem e Destino
      referrer: document.referrer || 'Acesso Direto',
      url: window.location.href
    };

    // 4. Envio silencioso para o Apps Script
    fetch('https://script.google.com/macros/s/AKfycbwduGf5_yxtiUL24PWaGtQBqmLBb8NOjUQqmRxJgisOBh7xHKPqemFXWEA3XFGGpLoD/exec', {
      method: 'POST',
      mode: 'no-cors',
      redirect: 'manual',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(payload)
    });

  } catch (error) {
    console.error("Erro ao registrar acesso:", error);
  }
}

// Executa ao carregar a página
window.addEventListener('load', capturarEEnviarMetadados);

if (document.readyState === 'complete') {
    capturarEEnviarMetadados();
} else {
    window.addEventListener('load', capturarEEnviarMetadados);
}
})();
