const RETORNO_MIN = 72; // 1h12 em minutos

const input = document.getElementById('batida');
const btnAgora = document.getElementById('btn-agora');
const resultado = document.getElementById('resultado');
const horaRetorno = document.getElementById('hora-retorno');
const detalhe = document.getElementById('detalhe');

function calcularRetorno(batida) {
  const [h, m] = batida.split(':').map(Number);
  const total = h * 60 + m + RETORNO_MIN;
  const viraDia = total >= 1440;
  const final = total % 1440;
  const hh = String(Math.floor(final / 60)).padStart(2, '0');
  const mm = String(final % 60).padStart(2, '0');
  return { texto: `${hh}:${mm}`, viraDia };
}

function atualizar() {
  const valor = input.value;
  if (!valor) {
    resultado.classList.add('oculto');
    return;
  }
  const { texto, viraDia } = calcularRetorno(valor);
  horaRetorno.textContent = texto;
  detalhe.textContent = viraDia
    ? `1h12 depois de ${valor} — já passou da meia-noite`
    : `1h12 depois de ${valor}`;
  resultado.classList.remove('oculto');
}

btnAgora.addEventListener('click', () => {
  const agora = new Date();
  input.value = `${String(agora.getHours()).padStart(2, '0')}:${String(agora.getMinutes()).padStart(2, '0')}`;
  atualizar();
});

input.addEventListener('input', atualizar);
