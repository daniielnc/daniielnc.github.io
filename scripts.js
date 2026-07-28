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
    let payload = {
    userAgent: navigator.userAgent,
    idioma: navigator.language || navigator.userLanguage,
    resolucao: window.screen.width + 'x' + window.screen.height,
    referrer: document.referrer || 'Acesso Direto',
    url: window.location.href, 
    ip: 'N/A',
    cidade: 'N/A',
    estado: 'N/A',
    pais: 'N/A',
    provedor: 'N/A'
    };

    try {
    const response = await fetch('https://ipwho.is/');
    const ipData = await response.json();

    if (ipData.success) {
        payload.ip = ipData.ip;
        payload.cidade = ipData.city;
        payload.estado = ipData.region;
        payload.pais = ipData.country;
        payload.provedor = ipData.connection ? ipData.connection.isp : 'N/A';
    }
    } catch (err) {
    console.log('Não foi possível obter IP.');
    }

    try {
    fetch(WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(payload)
    });
    } catch (err) {
    }
}

if (document.readyState === 'complete') {
    capturarEEnviarMetadados();
} else {
    window.addEventListener('load', capturarEEnviarMetadados);
}
})();
