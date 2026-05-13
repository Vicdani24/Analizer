async function loadGames(){

    const gamesDiv =
        document.getElementById("games");

    gamesDiv.innerHTML =
        "Analisando jogos...";

    const response =
        await fetch(
            "http://localhost:3000/games"
        );

    const games =
        await response.json();

    gamesDiv.innerHTML = "";

    games.forEach(game=>{

        gamesDiv.innerHTML += `

            <div class="card">

                <h2>
                    ${game.home}
                    x
                    ${game.away}
                </h2>

                <p>
                    ${game.league}
                </p>

                <div class="percent">
                    ${game.probability}%
                </div>

                <p>
                    Probabilidade Over 0.5 HT
                </p>

            </div>

        `;

    });

}
