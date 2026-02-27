const TOKEN = "37777ef4141745cd81822768b980e11f";
const jogosDiv = document.getElementById("jogos");

function abrirAba(aba) {
  document.querySelectorAll(".abas button").forEach(b =>
    b.classList.remove("ativa")
  );

  document.getElementById("tab-" + aba).classList.add("ativa");

  if (aba === "live") carregarAoVivo();
  if (aba === "hoje") carregarHoje();
  if (aba === "prox") carregarProximos();
}

// 🔴 AO VIVO
async function carregarAoVivo() {
  jogosDiv.innerHTML = "⏳ Carregando jogos ao vivo...";

  const res = await fetch(
    "https://api.football-data.org/v4/matches?status=LIVE",
    { headers: { "X-Auth-Token": TOKEN } }
  );

  const data = await res.json();
  mostrarJogos(data.matches);
}

// 📅 HOJE
async function carregarHoje() {
  jogosDiv.innerHTML = "⏳ Carregando jogos de hoje...";

  const hoje = new Date().toISOString().split("T")[0];

  const res = await fetch(
    `https://api.football-data.org/v4/matches?dateFrom=${hoje}&dateTo=${hoje}`,
    { headers: { "X-Auth-Token": TOKEN } }
  );

  const data = await res.json();
  mostrarJogos(data.matches);
}

// ⏭ PRÓXIMOS
async function carregarProximos() {
  jogosDiv.innerHTML = "⏳ Carregando próximos jogos...";

  const res = await fetch(
    "https://api.football-data.org/v4/matches?status=SCHEDULED",
    { headers: { "X-Auth-Token": TOKEN } }
  );

  const data = await res.json();
  mostrarJogos(data.matches);
}

// MOSTRAR
function mostrarJogos(lista) {
  jogosDiv.innerHTML = "";

  if (!lista || lista.length === 0) {
    jogosDiv.innerHTML = "⚠️ Nenhum jogo encontrado";
    return;
  }

  lista.forEach(j => {
    jogosDiv.innerHTML += `
      <div class="jogo">
        <strong>${j.homeTeam.name} x ${j.awayTeam.name}</strong><br>
        ⚽ ${j.score.fullTime.home ?? 0} : ${j.score.fullTime.away ?? 0}<br>
        ⏱ ${j.status}
      </div>
    `;
  });
}

// inicial
abrirAba("hoje");
