export type TypeResult = {
    axisX: number;
    axisY: number;
    lastFacing: string | undefined;
}
export class Bot {
    printBot(command: string): TypeResult {

        const arrCommand = this.createCommands(command);
        const { axisX, axisY, crrFacing } = this.calculatePosition(arrCommand);
        const lastFacing = this.printDirection(crrFacing);

        console.log("X", axisX);
        console.log("Y", axisY);
        console.log("compase", lastFacing);

        return {
            axisX,
            axisY,
            lastFacing
        }

    }

    private createCommands(command: string): string[] {
        let wFlag = false;
        let wWord: string = "";
        let arr: string[] = [];
        for (let i = 0; i < command.length; i++) {
            if (command[i] === "R" || command[i] === "L") {
                if (wFlag === true) {
                    arr.push(wWord);
                    wFlag = false;
                    wWord = "";
                }
                arr.push(command[i]);
            } else if (command[i] === "W") {
                wFlag = true;
                wWord = command[i];
            } else {
                wWord += command[i];
            }
        }
        if (wWord !== "") {
            arr.push(wWord);
        }
        return arr;
    }
    private calculatePosition(arrCommand: string[]): { axisX: number, axisY: number, crrFacing: number } {
        let crrFacing = 1; //1 = N, 2 = E, 3 = S, 4 = W
        let axisX = 0;
        let axisY = 0;
        for (let i = 0; i < arrCommand.length; i++) {
            // rotate axis
            if (arrCommand[i] === "R") {
                if (crrFacing === 4) {
                    crrFacing = 1;
                } else {
                    crrFacing++;
                }
            } else if (arrCommand[i] === "L") {
                if (crrFacing === 1) {
                    crrFacing = 4;
                } else {
                    crrFacing--;
                }
            }
            //walk
            else {
                const word = Number(arrCommand[i].substring(1));
                // eslint-disable-next-line default-case
                switch (crrFacing) {
                    case 1:
                        axisY += word;
                        break;
                    case 2:
                        axisX += word;
                        break;
                    case 3:
                        axisY -= word;
                        break;
                    case 4:
                        axisX -= word;
                        break;
                }
            }
        }
        return {
            axisX,
            axisY,
            crrFacing
        }
    }
    private printDirection(lastFacing: number): string | undefined {
        switch (lastFacing) {
            case 1:
                return "North";
            case 2:
                return "East";
            case 3:
                return "South";
            case 4:
                return "West";
            default:
                break;
        }
    }


}