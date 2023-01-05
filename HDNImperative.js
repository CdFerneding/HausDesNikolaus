/**
 * "Haus des Nikolaus": only possible, if you start at A or E
 * this programm lists all solutions for the start point A!
 *    (because "findPath\1" starts at i = 0 --> A) 
 */

function main(){
    /**
     * 2-dim-array: 
     * edge[0][0] = "from A to A"
     * edge[0][1] = "from A to B"
     * edge[1][0] = "from B to A" ...
     * used edges can be set to 0:
     *     if edge[0][1] is used 
     *         then: edge[0][1] = 0 AND edge[1][0] = 0
     * --> 8 "steps" then all edges are 0 (if successful)
     */
    let edges = [
        [0,1,0,1,1],
        [1,0,1,1,1],
        [0,1,0,1,0],
        [1,1,1,0,1],
        [1,1,0,1,0]
    ];
    let start = 0; // 0 --> A
    console.log(`path with starting point = ${start}:`);
    let result = toString(findPath(edges, start));
    console.log(result);
    console.log("Hello World!");
}

/**
 * @param {matrix for identifying possible steps} edges 
 * @param {startopint: i = 0 --> A; i = 1 --> B; ...} i 
 * @returns array solution with a possible path; -1 if starting point is useless
 */
function findPath(edges, i){
    if(i < 0 || i > 4 || !Number.isInteger(i)) return -1;
    let solution = [0];

    for (let j = 0; solution.length < 9; j++) {
        if(canMove(i, edges) == false){
            stepBack(solution, edges);
        }

        if (edges[i][j] == 1) {
            edges = step(i, j, edges);
            switch (j) {
                case 0:
                    solution.push(0);
                    //need to go to i = 0 which is A; 
                    //j = -1 because it is going to get incremented by the for loop
                    i = 0; j = -1;
                    break;
                case 1:
                    solution.push(1);
                    i = 1; j = -1;
                    break;
                case 2:
                    solution.push(2);
                    i = 2; j = -1;
                    break;
                case 3:
                    solution.push(3);
                    i = 3; j = -1;
                    break;
                case 4:
                    solution.push(4);
                    i = 4; j = -1;
                    break;
            }
        }
    }

    return solution;
}

function step(X,Y,edges){
    edges[X][Y] = 0;
    edges[Y][X] = 0;
    return edges;
}

function stepBack(solution, edges){
    let last = solution.pop();
    i = solution.lastIndexOf(last);
    j = solution[i-1];
    edges[i][j] = 1;
    edges[j][i] = 1;
    return edges;
}

function canMove(i, edges){
    if(edges[i].reduce((total, number) => total + number) == 0)
        return false;
    else return true; 
}

function toString(solution) {
    let string = ``;
    solution.forEach(element => {
        switch (element) {
            case 0: string += `to A `; break;
            case 1: string += `to B `; break;
            case 2: string += `to C `; break;
            case 3: string += `to D `; break;
            case 4: string += `to E `; break;
        }
    });
    string.replace(`to `, ``); //the first "to " is getting deleted
    return string;
}

