game = {
    question_lettre: [],
    grilles: [],
    grille_en_cours: []
};

function replaceAt(string, index, replace, length) {
    return string.substring(0, index) + replace + string.substring(index+length + 1);
}

function initGame() {
    createGrid(10, 10)
    getRandomDefinition()
    fillGrid()
}

function createGrid(li, col) {
    var table_html = "<table>"
    for (var i=0; i < (li+1); i++) {
        table_html += "<tr>"
        for (var j=0; j < (col+1); j++) {
            if (i==0 || j==0) {
                if (i==0) {}
                var HTMLclass="number_cell"
            } else {
                var HTMLclass="empty_cell"
            }
            table_html += `<td id="cell_${i}_${j}" class="${HTMLclass}"></td>`
            
        }
        table_html += "</tr>"
    }
    table_html += "</table>"
    grid.innerHTML = table_html
}

function fillGrid() {
    game.grille_en_cours = []
    game.grille_en_cours = game.grille_en_cours.concat(game.grilles().get()[0].grille)

    for (var i=0; i<game.grille_en_cours.length; i++) {
        var word_data = game.grille_en_cours[i]
        var word = word_data.mot
        var x = word_data.x + 1
        var y = word_data.y + 1
        var orientation = word_data.orientation

        for (var j=0; j<word.length; j++) {
            if (orientation == "h") {
                var cell = document.getElementById(`cell_${x+j}_${y}`)
            } else {
                var cell = document.getElementById(`cell_${x}_${y+j}`)
            }

            // AFFICHAGE HASARD LETTRE: A CHANGER
            if (Math.random() + .5 >> 0) {
                cell.className = "hided_cell"
                cell.innerHTML = ""
            } else {
                cell.className = "open_cell"
                cell.innerHTML = word[j]
            }
        }        
    }
}

function getRandomDefinition() {
    var question_lettre = game.question_lettre().get();
    var r = Math.floor(Math.random() * question_lettre.length);
    var data = game.question_lettre().get()[r]
    var lettre = data.reponse;
    definition.innerHTML = data.definition;
    definition_lettre.innerHTML = lettre
    definition_explication.innerHTML = replaceArobaseByLetter(data.explication);

    function replaceArobaseByLetter(text) {
        var replacedText = text
        for (var i=0; i<text.length; i++) {
            replacedText.indexOf("@")
            if (i != -1) {

            } else {
                break;
            }
        }
        return replaceAt(text, text.indexOf("@"), "<span id=\"definition_highlight\">"+ lettre +"</span>", 0);
    }
    
    function eraseAfterArobase(text) {
        return text;
    }
}

function getWord() {

}