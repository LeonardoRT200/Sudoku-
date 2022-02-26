const $txtN_0_0 = $('#txtN_0_0');
var myTable = document.getElementById('myTable');

const $btnResolver = $('#btnResolver');  // Objeto jQuery que representa al elemento input button 

// Handling del evento click del button.
$btnResolver.on('click', function(e) {
    e.preventDefault();
    const tableroSudoku = obtenerTableroSudoku();
    console.log("Tablero ingresado");
    console.log(tableroSudoku);
    //console.log(JSON.stringify(tableroSudoku))
    // TODO: Enviar el tablero mediante llamada AJAX, esperar la respuesta -> mostrar la respuesta.
    $.ajax({
        type: 'GET',
        url: 'resolver.php',
        data: {json: JSON.stringify(tableroSudoku)},
        dataType: 'json'
    })
    .done (function (sudoku) {
        console.log("**************************************");
        console.log('Resultado');
        console.log(sudoku);
        ingresar_data(sudoku);
    })
    .fail( function (sudoku) {
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.log('ERROR: No se obtuvo un resultado');
        console.log(sudoku);
    });
});

/**
 * Obtiene el tablero del sudoku como una matriz (array de arrays)
 * @returns La matriz del tablero del sudoku.
 */

function obtenerTableroSudoku() {
    const tableroSudoku = [];
    for (let r = 0; r < 9; r++) {
        const row = [];
        for (let c = 0; c < 9; c++) {
            row.push(valorMatrix(r, c));
        }
        tableroSudoku.push(row);
    }
    return tableroSudoku;
}

function ingresar_data(data){
        for(let x=0;x<9;x++){
            for(let y=0;y<9;y++){
                let cells = document.getElementById('tabla1').rows[x].cells;
                cells[y].innerHTML = data[x][y];
            }
        }
}

/**
 * Convierte un string a int, en caso de no poderse convertir, regresa null.
 * @param {string} s Valor en string a convertir a número entero.
 * @returns El string en número int
 */

function numeroONull(s) {
    const v = parseInt(s);
    return isNaN(v) ? null : v;
}

/**
 * Obtiene el valor del input que corresponde al tablero de la matriz del tablero.
 * @param {int} r Index del row de la matriz a obtener el valor
 * @param {int} c Index del column de la matríz a obtener el valor.
 * @returns String del valor del input.
 */

function valorMatrix(r, c) {
    return numeroONull($(`#txtN_${r}_${c}`).val());
}