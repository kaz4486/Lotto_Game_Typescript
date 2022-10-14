import inquirer, { Answers } from 'inquirer';

const chosenNumbers: number[] = [];
const randomNumbers: Array<number> = [];

const startApp = async (): Promise<void> => {

    const validateInput = (text: string): boolean => {
        const number = parseInt(text);
        if (number > 0 && number < 50 && !chosenNumbers.includes(number)){
            return true;
        } 
        return false;
    };

    do {
        const result = await inquirer.prompt([{
            name: 'number',
            type: 'input',
            message: 'Podaj liczbę...'
        }]);
    
        if (validateInput(result.number)) {
            chosenNumbers.push(parseInt(result.number));
        }
    } while (chosenNumbers.length < 6);

    const randomNewNumber = (): number => {
        const randomNumber = Math.floor(1 + Math.random() * 49);
        return randomNumber;
        
    };

    const validateRandomNumber = (number: number): boolean => {
        if (!randomNumbers.includes(number)) { 
            return true;
        }
        return false;
    };

    do {
        const number: number = randomNewNumber();
        if (validateRandomNumber(number)) {
            randomNumbers.push(number);
        }
    } while (randomNumbers.length < 6);

    const resultCheck = async (chosenNumbers: number[], randomNumbers: number[]): Promise<Answers> => {
        let result = 0;
        chosenNumbers.forEach(number => {
            if (randomNumbers.includes(number)){
                result++;
            }
        });
        const communicate = await inquirer.prompt({
            name: 'string',
            message: `Trafiłeś ${result} liczb`
        });
        return communicate;
    };
        
    resultCheck(chosenNumbers, randomNumbers);

};

startApp();