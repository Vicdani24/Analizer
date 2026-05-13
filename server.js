const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.static("public"));

function calculateHT(homePower, awayWeakness){

    const result =
        (homePower * 0.6) +
        (awayWeakness * 0.4);

    return Math.min(Math.floor(result), 95);

}

app.get("/games", async(req,res)=>{

    try{

        /*
        ====================================
        AQUI FUTURAMENTE:
        scraping SofaScore / FootyStats
        ====================================
        */

        const games = [

            {
                league:"Premier League",
                home:"Manchester City",
                away:"Tottenham",
                homePower:85,
                awayWeakness:74
            },

            {
                league:"Brasileirão",
                home:"Flamengo",
                away:"Bahia",
                homePower:81,
                awayWeakness:77
            },

            {
                league:"Bundesliga",
                home:"Bayern",
                away:"Dortmund",
                homePower:90,
                awayWeakness:80
            }

        ];

        const analyzedGames = games.map(game=>{

            const probability =
                calculateHT(
                    game.homePower,
                    game.awayWeakness
                );

            return{
                ...game,
                probability
            };

        });

        analyzedGames.sort(
            (a,b)=>
            b.probability - a.probability
        );

        res.json(analyzedGames);

    }catch(error){

        console.log(error);

        res.status(500).json({
            error:"Erro ao analisar jogos"
        });

    }

});

app.listen(3000,()=>{

    console.log(
        "Servidor rodando em http://localhost:3000"
    );

});
