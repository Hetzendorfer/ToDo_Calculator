import React from "react";
import "./Calculator.css";

export default class CalculatorComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            input: "",
            result: ""
        };

        // console.log(test("12*2.2*3"));
        // console.log(test("1+2+3+4"));
        // console.log(test3("(1+3) - (2+3 * (1 + 1)) "));
        // console.log(test3("2 * ((4 / 2) * 3 - 1) : (10 * (10) * 10)"));
        // console.log(test3("(((1 + 2) * (3 + 4)))"));

    }

    onChangeHandler = (ev) => {
        this.setState({
            input: ev.currentTarget.value
        });
    }

    onClickHandler = (ev) => {
        let result = calculate(this.state.input);
        console.log("result: ", result);
        this.setState({
            result: result
        });
    }

    render() {
        return (
            <div className="calculator row">
                <div className="col-md-6">
                    <textarea className="calculator-input" onChange={this.onChangeHandler}></textarea>
                </div>
                <div className="col-md-12">
                    <button className="calculator-button" onClick={this.onClickHandler}>Berechnen</button>
                </div>
                <div className="col-md-6">
                    <textarea className="calculator-result" defaultValue={this.state.result}></textarea>
                </div>
            </div>
        );
    }
}

function calculate(string) {
    return eval(string);
}

function test3(calculation) {
    calculation += " ";
    let offeneKlammernCount = (calculation.match(/[(]/g) || []).length;
    let schließendeKlammernCount = (calculation.match(/[)]/g) || []).length;

    let resultArr = [];

    if(offeneKlammernCount > 0 && offeneKlammernCount === schließendeKlammernCount) {
        let ebene = 0;

        let buffer = "";

        let regExZahlen = /[1234567890.]/g;
        let regExRechnungsart = /[\/\:\*\+\-]/g;

        for(let i = 0; i < calculation.length; i++) {
            console.log("ebene: " + ebene);
            if(ebene > 1 || (ebene > 0 && (calculation[i].match(/[)]/g) || []).length === 0))
                buffer += calculation[i];

            if(ebene === 0) {
                if((calculation[i].match(regExZahlen) || []).length) {
                    buffer += calculation[i];
                }
                else if(buffer.length) {
                    console.log("buffer: " + buffer);
                    resultArr.push(test3(buffer));
                    buffer = "";
                }
    
                if((calculation[i].match(regExRechnungsart) || []).length) {
                    resultArr.push(calculation[i]);
                }
            }

            if((calculation[i].match(/[(]/g) || []).length) 
                ebene++;
            else if((calculation[i].match(/[)]/g) || []).length) 
                ebene--;
                
        }
    }
    else {
        console.log(calculation);
        return test(calculation);
    }
    return test(resultArr.join(""));

}
function test(calculation) {
    let cal = "";
    cal = calculation + " "; // add whitespace for for loop

    // Wieviele Zahlen sind in der Gleichung?
    let buffer = "";
    let zahlen = [];

    let arr = [];

    let regExZahlen = /[1234567890.]/g;
    let regExRechnungsart = /[\/\:\*\+\-]/g;

    for(let i = 0; i < cal.length; i++) {
        if((cal[i].match(regExZahlen) || []).length) {
            buffer += cal[i];
        }
        else if(buffer.length) {
            arr.push(parseFloat(buffer));
            buffer = "";
        }

        if((cal[i].match(regExRechnungsart) || []).length) {
            arr.push(cal[i]);
        }
    }

    console.log("arr: " + arr);

    arr = test2(arr, "*");
    arr = test2(arr, "/");
    arr = test2(arr, ":");
    arr = test2(arr, "+");
    console.log("arr: " + arr);
    arr = test2(arr, "-");
    console.log("arr: " + arr);


    return parseFloat(arr.join(""));
}

function test2(arr, rechnungsart) {
    let index = arr.indexOf(rechnungsart, 1);

    while(index >= 0) {
        let param1 = 0, param2 = 0;
        let result = 0;

        param1 = typeof arr[index - 1] !== "undefined" ? arr[index - 1] : 0;
        param2 = typeof arr[index + 1] !== "undefined" ? arr[index + 1] : 0;

        switch(rechnungsart) {
            case "*":
                result = parseFloat((param1 * param2).toFixed(10));
                break;
            case "/":
            case ":":
                result = parseFloat((param1 / param2).toFixed(10));
                break;
            case "+":
                result = param1 + param2;
                break;
            case "-":
                console.log("param1: " + param1);
                console.log("param2: " + param2);
                result = param1 - param2;
                break;
            default:
                break;
        }

        [].slice(0, index - 1);
        [].slice(index + 1);

        arr = [...arr.slice(0, index - 1), result, ...arr.slice(index + 2)];

        index = arr.indexOf(rechnungsart, 1);
    }

    return arr;
}