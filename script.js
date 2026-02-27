const jogosDiv = document.getElementById("jogos");
document.getElementById("data").innerText =
  new Date().toLocaleDateString("pt-BR");

// DADOS PÚBLICOS (SEM API / SEM BLOQUEIO)
const API =
  "https://raw.githubusercontent.com/openfootball/football.json/master/2024-25/fixtures.json";

async function carregarHoje() {
  jogosDiv.innerHTML = "⏳ Carregando jogos de hoje...";

  const hoje = new Date().toISOString().split("T")[0];

  const res = await fetch(API);
  const data = await res.json();

  const jogosHoje = data.matches.filter(j =>
    j.date === hoje
  );

  mostrarJogos(jogosHoje);
}

async function carregarProximos() {
  jogosDiv.innerHTML = "⏳ Carregando próximos jogos...";

  const hoje = new Date().toISOString().split("T")[0];

  const res = await fetch(API);
  const data = await res.json();

  const proximos = data.matches.filter(j =>
    j.date >= hoje
  );

  mostrarJogos(proximos.slice(0, 15));
}

function mostrarJogos(lista) {
  jogosDiv.innerHTML = "";

  if (!lista || lista.length === 0) {
    jogosDiv.innerHTML = "⚠️ Nenhum jogo encontrado.";
    return;
  }

  lista.forEach(j => {
    jogosDiv.innerHTML += `
      <div class="jogo">
        <strong>${j.team1} x ${j.team2}</strong><br>
        📅 ${j.date}<br>
        ⚽ ${j.score?.ft?.[0] ?? "-"} : ${j.score?.ft?.[1] ?? "-"}
      </div>
    `;
  });
}

// CARREGA PADRÃO
carregarProximos();
