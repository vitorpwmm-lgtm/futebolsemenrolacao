const API_KEY = "a8345dca5fmsh5f55cdf29c3cc47p1eb068jsnb91e462c3685";
const HOST = "api-football-v1.p.rapidapi.com";

const jogosDiv = document.getElementById("jogos");
document.getElementById("data").innerText =
  "Hoje: " + new Date().toLocaleDateString("pt-BR");

function headers() {
  return {
    "X-RapidAPI-Key": API_KEY,
    "X-RapidAPI-Host": HOST
  };
}

// 🔴 JOGOS AO VIVO
async function carregarAoVivo() {
  jogosDiv.innerHTML = "⏳ Carregando jogos ao vivo...";

  try {
    const res = await fetch(
      "https://api-football-v1.p.rapidapi.com/v3/fixtures?next=10",
      { headers: headers() }
    );

    const data = await res.json();
    mostrarJogos(data.response);
  } catch {
    jogosDiv.innerHTML = "❌ Erro ao carregar jogos";
  }
}

// 📅 JOGOS DE HOJE
async function carregarHoje() {
  jogosDiv.innerHTML = "⏳ Carregando jogos de hoje...";

  try {
    const hoje = new Date().toISOString().split("T")[0];

    const res = await fetch(
      `https://api-football-v1.p.rapidapi.com/v3/fixtures?date=${hoje}`,
      { headers: headers() }
    );

    const data = await res.json();
    mostrarJogos(data.response);
  } catch {
    jogosDiv.innerHTML = "❌ Erro ao carregar jogos";
  }
}

// 🖥️ MOSTRAR NA TELA
function mostrarJogos(lista) {
  jogosDiv.innerHTML = "";

  if (!lista || lista.length === 0) {
    jogosDiv.innerHTML = "⚠️ Nenhum jogo encontrado";
    return;
  }

  lista.forEach(j => {
    const div = document.createElement("div");
    div.className = "jogo";

    div.innerHTML = `
      <strong>${j.teams.home.name} x ${j.teams.away.name}</strong><br>
      ⚽ ${j.goals.home ?? 0} : ${j.goals.away ?? 0}<br>
      ⏱ ${j.fixture.status.long}
    `;

    jogosDiv.appendChild(div);
  });
}

// carregamento inicial
carregarHoje();