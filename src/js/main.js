game = {
    question_lettre: [],
    grilles: [],
    grille_en_cours: []
};

function replaceAt(string, index, replace, length) {
    return string.substring(0, index) + replace + string.substring(index+length + 1);
}

function initGame() {
    getRandomDefinition();
    createGrid(10, 10);
}

function createGrid(li, col) {
    var table_html = "<table id=\"grid\">"
    for (var i=0; i < (li); i++) {
        table_html += "<tr>"
        for (var j=0; j < (col); j++) {
            table_html += `<td><div id="cell_${i}_${j}" class="grid_cell"></div></td>`;
        }
        table_html += "</tr>";
    }
    table_html += "</table>";
    grid_placeholder.innerHTML = table_html;

    fillGrid();
}

function displayLetter(letter) {
    var word_data = game.grille_en_cours;
    var cell_to_display = []

    for (var i=0; i<word_data.length; i++) {
        for (var j=0; j<word_data[i].mot.length; j++) {
            checkLetter(letter)
        }
    }

    function checkLetter(letter) {
        if (word_data[i].mot[j] != letter) {
            return;
        }
        
        console.log(word_data[i].mot[j], word_data[i].orientation, word_data[i].x, word_data[i].y, word_data[i].visibilite[j])

        
        if (word_data[i].orientation == "v") {
            var cell_id = `cell_${(word_data[i].y) + 1 + j}_${(word_data[i].x) + 1}`
        } else {
            var cell_id = `cell_${(word_data[i].y) + 1}_${(word_data[i].x) + 1 + j}`
        }

        var cell_html = document.getElementById(cell_id);
        cell_to_display.push(cell_id)


        cell_html.className = "open_cell"
        cell_html.innerHTML = "<a class=\"grid_letter\">" + word_data[i].mot[j] + "</a>"
        
    }
}

function fillGrid() {
    var selected_grid_id = 0;
    game.grille_en_cours = [];
    game.grille_en_cours = game.grille_en_cours.concat(game.grilles().get()[selected_grid_id].grille);

    for (var i=0; i<game.grille_en_cours.length; i++) {
        var word_data = game.grille_en_cours[i];
        var word = word_data.mot;
        var x = word_data.x;
        var y = word_data.y;
        var orientation = word_data.orientation;
        var id = word_data.id;
        game.grille_en_cours[i].visibilite = ""

        if (orientation == "h") {
            var number_cell = document.getElementById(`cell_${y+1}_${x}`);
            number_cell.innerHTML = id;
            number_cell.className = "number_cell";
        } else {
            var number_cell = document.getElementById(`cell_${y}_${x+1}`);
            number_cell.innerHTML = "<a class=\"grid_number\">" + (id+1) + "</a>";
            number_cell.className = "number_cell";
        }

        for (var j=0; j<word.length; j++) {
            if (orientation == "h") {
                var cell = document.getElementById(`cell_${y+1}_${x+1+j}`);
            } else {
                var cell = document.getElementById(`cell_${y+1+j}_${x+1}`);
            }

            cell.className = "hided_cell"
            cell.innerHTML = ""

            // cell.className = "open_cell"
            // cell.innerHTML = "<a class=\"grid_letter\">" + word[j] + "</a>"

            // AFFICHAGE HASARD LETTRE: A CHANGER
            // if (Math.random() + .5 >> 0) {
            //     cell.className = "hided_cell";
            //     cell.innerHTML = "";
            // } else {
            //     cell.className = "open_cell";
            //     cell.innerHTML = "<a class=\"grid_letter\">" + word[j] + "</a>";
            // }

            //AJOUT ATTRIBUT VISIBILITE LETTRE
            game.grille_en_cours[i].visibilite += "0";
        }    
        
        console.log(word, game.grille_en_cours[i].visibilite, x, y, orientation)   
    }
}

function discoverSpecificLetters(letter) {
    for (var i=0; i<game.grille_en_cours.length; i++) {
        
    }
    function trouverPositionsLettre(lettre, mot) {
        let positions = [];
        
        for (let i = 0; i < mot.length; i++) {
          if (mot[i].toUpperCase() === lettre.toUpperCase()) {
            positions.push(i + 1); // Ajouter 1 pour obtenir un index basé sur 1
          }
        }
      
        return positions;
      }
      
      // Exemple d'utilisation :
      let lettreRecherchee = 'R';
      let motARechercher = 'TREMBLER';
      
      let resultats = trouverPositionsLettre(lettreRecherchee, motARechercher);
      console.log(resultats); // Output: [1, 7]
}

function getRandomDefinition() {
    var question_lettre = game.question_lettre().get();
    var r = Math.floor(Math.random() * question_lettre.length);
    var data = game.question_lettre().get()[r];
    var lettre = data.reponse;
    var type = data.type;

    if (type == "question_cache") {
        definition_question.innerHTML = data.definition.replace(/@/g, " " + "<span id=\"definition_hiding\">") + "</span>";
    } else {
        definition_question.innerHTML = data.definition;
    }
    
    definition_lettre.innerHTML = lettre;
    definition_explication.innerHTML = data.explication.replace(/@/g, "<span id=\"definition_highlight\">"+ lettre +"</span>");
}

function toggleDefinitionReponse() {
    definition_reponse.classList.toggle("hided");
    definition_reponse.classList.toggle("displayed");
}

function toggleDefinition(force) {
    if (force == undefined) {
        definition.classList.toggle("hided");
        definition.classList.toggle("displayed");
    } else if (force == true) {
        definition.className = "displayed"
    } else {
        definition.className = "hided"
    }
}