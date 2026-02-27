const TOKEN = "37777ef4141745cd81822768b980e11f";

const jogosDiv = document.getElementById("jogos");
document.getElementById("data").innerText =
  "Hoje: " + new Date().toLocaleDateString("pt-BR");

// CONTROLE DAS ABAS
function abrirAba(aba) {
  document.querySelectorAll(".abas button").forEach(b =>
    b.classList.remove("ativa")
  );
  document.getElementById("tab-" + aba).classList.add("ativa");

  if (aba === "prox") carregarProximos();
  if (aba === "hoje") carregarHoje();
  if (aba === "live") carregarAoVivo();
}

// ⏭ PRÓXIMOS JOGOS (PADRÃO)
async function carregarProximos() {
  jogosDiv.innerHTML = "⏳ Carregando próximos jogos...";

  try {
    const res = await fetch(
      "https://api.football-data.org/v4/matches?status=SCHEDULED&limit=20",
      { headers: { "X-Auth-Token": TOKEN } }
    );

    const data = await res.json();
    mostrarJogos(data.matches);
  } catch (e) {
    jogosDiv.innerHTML = "❌ Erro ao buscar jogos";
  }
}

// 📅 JOGOS DE HOJE
async function carregarHoje() {
  jogosDiv.innerHTML = "⏳ Carregando jogos de hoje...";

  const hoje = new Date();
  const amanha = new Date();
  amanha.setDate(hoje.getDate() + 1);

  const d1 = hoje.toISOString().split("T")[0];
  const d2 = amanha.toISOString().split("T")[0];

  try {
    const res = await fetch(
      `https://api.football-data.org/v4/matches?dateFrom=${d1}&dateTo=${d2}&limit=20`,
      { headers: { "X-Auth-Token": TOKEN } }
    );

    const data = await res.json();
    mostrarJogos(data.matches);
  } catch (e) {
    jogosDiv.innerHTML = "❌ Erro ao buscar jogos";
  }
}

// 🔴 AO VIVO (PODE FICAR VAZIO – NORMAL)
async function carregarAoVivo() {
  jogosDiv.innerHTML = "⏳ Carregando jogos ao vivo...";

  try {
    const res = await fetch(
      "https://api.football-data.org/v4/matches?status=LIVE",
      { headers: { "X-Auth-Token": TOKEN } }
    );

    const data = await res.json();
    mostrarJogos(data.matches);
  } catch (e) {
    jogosDiv.innerHTML = "❌ Erro ao buscar jogos";
  }
}

// MOSTRAR NA TELA
function mostrarJogos(lista) {
  jogosDiv.innerHTML = "";

  if (!lista || lista.length === 0) {
    jogosDiv.innerHTML =
      "⚠️ Nenhum jogo disponível no plano gratuito da API.";
    return;
  }

  lista.forEach(j => {
    jogosDiv.innerHTML += `
      <div class="jogo">
        <strong>${j.homeTeam.name} x ${j.awayTeam.name}</strong><br>
        ⚽ ${j.score?.fullTime?.home ?? "-"} : ${j.score?.fullTime?.away ?? "-"}<br>
        ⏱ ${j.status}
      </div>
    `;
  });
}

// INICIALIZA NO PADRÃO
abrirAba("prox");
