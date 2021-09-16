const oponente = "O"
const maquina  = "X"
const vacio    = "V"

casillas = [[vacio,vacio,vacio],
            [vacio,vacio,vacio],
            [vacio,vacio,vacio]
        ];

function esElFinal(tablero){
    return tablero.find(
        element => element.includes(vacio)) != undefined;
}


function evaluate(tablero){
  for(let row = 0; row < 3; row++)
  {
      if (tablero[row][0] == tablero[row][1] &&
        tablero[row][1] == tablero[row][2])
      {
          if (tablero[row][0] == maquina)
              return +10;
               
          else if (tablero[row][0] == oponente)
              return -10;
      }
  }

  for(let col = 0; col < 3; col++)
  {
    if (tablero[0][col] == tablero[1][col] &&
        tablero[1][col] == tablero[2][col])
        {
            if (tablero[0][col] == maquina)
                return +10;

            else if (tablero[0][col] == oponente)
                return -10;
        }
    }

    if (tablero[0][0] == tablero[1][1] && tablero[1][1] == tablero[2][2])
    {
        if (tablero[0][0] == maquina)
            return +10;
            
        else if (tablero[0][0] == oponente)
            return -10;
    }

    if (tablero[0][2] == tablero[1][1] &&
        tablero[1][1] == tablero[2][0])
    {
        if (tablero[0][2] == maquina)
            return +10;
            
        else if (tablero[0][2] == oponente)
            return -10;
    }

    return 0;

}

function minimax(tablero,profundidad,esMax){
    let puntos = evaluate(tablero)

    if(puntos == 10 || puntos == -10) return puntos;

    if(esElFinal(tablero)) {
        return 0;
    }

    if (esMax){
        let best = -Infinity;
        for(let i = 0; i < 3; i++)
        
            for(let j = 0; j < 3; j++)
            
                if (board[i][j]== vacio){
                    board[i][j] = oponente;
                    best = Math.max(best, minimax(tablero,
                        profundidad + 1, !esMax));
                    board[i][j] = vacio;
                }
                

        return best;

    }
    else{
        let best = +Infinity;
        for(let i = 0; i < 3; i++)
            for(let j = 0; j < 3; j++)           
                if (board[i][j] == '_')
                {
                    board[i][j] = oponente;
                    best = Math.min(best, minimax(tablero,
                        profundidad + 1, !esMax));
                    board[i][j] = vacio;
                }            
        
        return best;
    }
        

}

function buscarMejorMovimiento(tablero)
{
    let bestVal = -Infinity;
    let bestMove = []; //[0]=x u [1]=y
    bestMove.row = -1;
    bestMove.col = -1;
  

    for(let i = 0; i < 3; i++)
        for(let j = 0; j < 3; j++)
        {
            if (tablero[i][j] == vacio)
            {                 
                tablero[i][j] = maquina;

                let moveVal = minimax(tablero, 0, false);
  
                tablero[i][j] = vacio;
  
                if (moveVal > bestVal)
                {
                    bestMove[0] = i;
                    bestMove[1] = j;
                    bestVal = moveVal;
                }
            }
        }
    
  
  
    return bestMove;
}


