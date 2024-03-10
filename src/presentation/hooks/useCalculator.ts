import { useEffect, useRef, useState } from "react";

enum Operator {
    add = '+',
    subtract = '-',
    multiply = 'x',
    divide = '÷',
}



export const useCalculator = () => {

    const [formula, setFormula] = useState('');
    const [number, setNumber] = useState('0');
    const [prevNumber, setPrevNumber] = useState('0');
    const lasOperator = useRef<Operator>();

    useEffect(() => {

        if (lasOperator.current) {
            const firstFormulaPart = formula.split(' ').at(0);
            setFormula(`${firstFormulaPart} ${lasOperator.current} ${number}`);
        } else {
            setFormula(number);
        }


    }, [number]);

    useEffect(() => {
        const subResult = calculateSubResult();
        setPrevNumber(`${subResult}`);
    }, [formula])

    const clean = () => {
        setNumber('0');
        setPrevNumber('0');
        setFormula('0');
        lasOperator.current = undefined;
    }

    const deleteOperation = () => {

        let currentSign = '';
        let tempNumber = number;

        if (number.includes('-')) {
            currentSign = '-';
            tempNumber = number.substring(1);
        }

        if (tempNumber.length > 1) {
            return setNumber(currentSign + tempNumber.slice(0, -1));
        }

        setNumber('0');
    }

    const toggleSing = () => {
        if (number.includes('-')) {
            return setNumber(number.replace('-', ''));
        }
        return setNumber('-' + number);
    }

    const buildNumber = (numberString: string) => {

        if (number.includes('.') && numberString === '.') return;

        if (number.startsWith('0') || number.startsWith('-0')) {
            if (numberString === '.') {
                return setNumber(number + numberString);
            }
            //evaluar si es otro cero y no hay punto
            if (numberString === '0' && number.includes('.')) {
                return setNumber(number + numberString);
            }
            //evaluar si es diferente de cero, no hay punto y es el primer numero
            if (numberString !== '0' && !number.includes('.')) {
                return setNumber(numberString);
            }
            //evitar 0000.0
            if (numberString === '0' && !number.includes('.')) {
                return;
            }
            return setNumber(number + numberString);
        }

        setNumber(number + numberString);
    };

    const setLastNumber = () => {
        calculateResult();
        if (number.endsWith('.')) {
            setPrevNumber(number.slice(0, -1));
        } else {
            setPrevNumber(number);
        }
        setNumber('0');
    }

    const divideOperation = () => {
        setLastNumber();
        lasOperator.current = Operator.divide;
    };

    const multiplyOperation = () => {
        setLastNumber();
        lasOperator.current = Operator.multiply;
    };

    const addOperation = () => {
        setLastNumber();
        lasOperator.current = Operator.add;
    };

    const subtractOperation = () => {
        setLastNumber();
        lasOperator.current = Operator.subtract;
    };

    const calculateSubResult = (): number => {

        const [first, operator, second] = formula.split(' ');
        const num1 = Number(first);
        const num2 = Number(second);

        if (isNaN(num2)) return num1;

        switch (operator) {
            case Operator.add:
                return num1 + num2;
            case Operator.subtract:
                return num1 - num2;
            case Operator.divide:
                return num1 / num2;
            case Operator.multiply:
                return num1 * num2;
            default:
                throw new Error('Operation not implemented');
        }
    }

    const calculateResult = () => {
        const result = calculateSubResult();

        setFormula(`${result}`);
        setPrevNumber('0');
    }




    return {
        formula,
        number,
        prevNumber,
        buildNumber,
        toggleSing,
        deleteOperation,
        clean,
        divideOperation,
        multiplyOperation,
        addOperation,
        subtractOperation,
        calculateResult,
    }
};