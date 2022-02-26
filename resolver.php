<?php
     function check(&$sudoku, $x, $y, $num): bool{
        $x2 = $x - $x % intval(sqrt(sizeof($sudoku)));
        $y2 = $y - $y % intval(sqrt(sizeof($sudoku)));
        for ($i = 0; $i < 9; $i++){
            if ($sudoku[$x][$i] == $num )
                return false;
        }
        for ($i = 0; $i < 9; $i++){
            if ($sudoku[$i][$y] == $num)
                return false;
        }
        for ($i = $x2; $i < $x2 + intval(sqrt(sizeof($sudoku))); $i++){
            for ($j = $y2; $j < $y2 + intval(sqrt(sizeof($sudoku))); $j++){
                if ($sudoku[$i][$j] == $num)
                    return false;
            }
        }
        return true;
    }

    
    if ($_GET['json']){
        $sudoku = json_decode($_GET['json']);
        resolver($sudoku);
        echo json_encode($sudoku);
    }

    function resolver(&$sudoku){
        $x = -1;
        $y = -1;
        $is_empty = true;
        for ($i = 0; $i < 9; $i++){
            for ($j = 0; $j < 9; $j++){
                if ($sudoku[$i][$j] == 0){
                    $x = $i;
                    $y = $j;
                    $is_empty = false;
                    break;
                }
            }if(!$is_empty){
                break;
            }
        }
        if ($is_empty){
            return true;
        }   
        for ($num = 1; $num <= 9; $num++){
            if (check($sudoku, $x, $y, $num)){
                $sudoku[$x][$y] = $num;
                if (resolver($sudoku)){
                    return  true;
                }else{
                    $sudoku[$x][$y] = 0;
                }
            }
        }
        return false;
    }

   

?>