/* Medição de uso com GoatCounter (decisão D5 de 10/11/2026): sem cookie e sem dado pessoal.
   Só a rota e o evento "despesa-registrada"; nunca o e-mail, o valor ou a descrição.
   Carrega só no build de produção, fora de localhost e fora de navegador automatizado. */
export const GOATCOUNTER_URL = 'https://douglasabnovato.goatcounter.com/count';
export const EVENTO_DESPESA = 'despesa-registrada';

const ambienteAtual = () => ({
  producao: import.meta.env.PROD,
  hostname: window.location.hostname,
  automatizado: navigator.webdriver === true,
});

/* Diz se este navegador deve medir */
export function deveMedir(amb = ambienteAtual()) {
  if (!amb.producao || amb.automatizado) return false;
  return !['localhost', '127.0.0.1', '[::1]', ''].includes(amb.hostname);
}

/* Insere o script; a contagem das rotas é manual, porque o app troca de página sem recarregar */
export function iniciarMedicao(amb = ambienteAtual()) {
  if (!deveMedir(amb) || document.querySelector('script[data-goatcounter]')) return false;
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://gc.zgo.at/count.js';
  script.dataset.goatcounter = GOATCOUNTER_URL;
  script.dataset.goatcounterSettings = JSON.stringify({ no_onload: true });
  document.head.appendChild(script);
  return true;
}

/* Conta uma rota; se o script ainda carrega, conta quando ele terminar */
export function registrarRota(rota) {
  if (window.goatcounter?.count) {
    window.goatcounter.count({ path: rota });
    return;
  }
  document.querySelector('script[data-goatcounter]')
    ?.addEventListener('load', () => window.goatcounter?.count({ path: rota }), { once: true });
}

/* Registra um evento só com o nome; a medição nunca atrapalha o uso */
export function registrarEvento(nome) {
  try {
    window.goatcounter?.count({ path: nome, title: nome, event: true });
  } catch {
    /* A medição é opcional */
  }
}
/* Fim de medicao.js */
