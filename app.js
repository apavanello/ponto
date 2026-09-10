const RETORNO_MIN = 72; // 1h12 em minutos

const form = document.getElementById('form');
const input = document.getElementById('batida');
const btnAgora = document.getElementById('btn-agora');
const resultado = document.getElementById('resultado');
const horaRetorno = document.getElementById('hora-retorno');
const detalhe = document.getElementById('detalhe');

function calcularRetorno(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  const total = h * 60 + m + RETORNO_MIN;
  const viraDia = total >= 1440;
  const final = total % 1440;
  const hh = String(Math.floor(final / 60)).padStart(2, '0');
  const mm = String(final % 60).padStart(2, '0');
  return { texto: `${hh}:${mm}`, viraDia };
}

// Mantém só dígitos (máx. 4). Hora começando com 3-9 ganha o 0 na frente: "930" -> 09:30.
function normalizar(texto) {
  let d = texto.replace(/\D/g, '').slice(0, 4);
  if (d && +d[0] > 2) d = '0' + d;
  return d.slice(0, 4);
}

function formatar(d) {
  if (d.length <= 2) return d;
  return `${d.slice(0, 2)}:${d.slice(2)}`;
}

function horaValida(d) {
  if (d.length !== 4) return false;
  return +d.slice(0, 2) <= 23 && +d.slice(2) <= 59;
}

function atualizar() {
  const d = normalizar(input.value);
  input.value = formatar(d);

  if (!horaValida(d)) {
    input.classList.toggle('invalid', d.length === 4);
    resultado.classList.add('oculto');
    return;
  }
  input.classList.remove('invalid');

  const { texto, viraDia } = calcularRetorno(input.value);
  horaRetorno.textContent = texto;
  detalhe.textContent = viraDia
    ? `1h12 depois de ${input.value} — já passou da meia-noite`
    : `1h12 depois de ${input.value}`;
  resultado.classList.remove('oculto');
}

form.addEventListener('submit', (e) => e.preventDefault());

btnAgora.addEventListener('click', () => {
  const agora = new Date();
  input.value = `${String(agora.getHours()).padStart(2, '0')}:${String(agora.getMinutes()).padStart(2, '0')}`;
  atualizar();
});

input.addEventListener('input', atualizar);
