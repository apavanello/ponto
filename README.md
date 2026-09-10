# Retorno do Ponto

SPA de consulta rápida: digite o horário da batida e ela mostra o horário de
retorno, que é sempre **1h12 depois** (formato 24h, sem segundos). Nada fica
gravado — é só cálculo local no navegador.

## Rodar com Docker

```bash
docker build -t retorno-ponto .
docker run --rm -p 8080:80 retorno-ponto
```

Depois acesse <http://localhost:8080>.

## Rodar sem Docker

É HTML/CSS/JS puro, sem build. Basta abrir o `index.html` no navegador ou servir
a pasta com qualquer servidor estático, por exemplo:

```bash
python3 -m http.server 8080
```
