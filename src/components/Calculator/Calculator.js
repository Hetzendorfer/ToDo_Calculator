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
        let result = test3(this.state.input);
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
    let calculation = string;
    let result = 0;

    // Rechnung durchgehen und Klammern zählen

    
    let offeneKlammernCount = calculation.split("(").length - 1;
    let schließendeKlammernCount = calculation.split(")").length - 1;

    if(offeneKlammernCount > 0 && offeneKlammernCount == schließendeKlammernCount) {
        let ebene = 0;
        let ebene1Count = 0;

        let ebene1 = [];

        let index1 = 0;
        let index2 = 0;

        while(index1 >= 0) {
            index2 = calculation.indexOf(")", index1);
            index2 = index2 == -1 ? index2 : index2 + 1;

            index1 = calculation.indexOf("(", index1);
            index1 = index1 == -1 ? index1 : index1 + 1;

            console.log("index1: " + index1);
            console.log("index2: " + index2);

            if(index2 > index1) {
                ebene++;
            }
            else {
                ebene--;
                index1 = index2;
            }

            if(ebene == 1) {
                ebene1Count++;
            }
        }

        index1 = calculation.indexOf("(");
        index2 = calculation.lastIndexOf(")");

        // console.log(index1 + " : " + index2);

        // console.log(calculation.substring(index1 + 1, index2));
        result = calculate(calculation.substring(index1 + 1, index2));

        calculation = calculation.substring(0, index1) + result + calculation.substring(index2 + 1);
        console.log(calculation);
    }

    if(calculation.split("*").length - 1) {
        result = calculation.split("*").reduce((prev, cur) => {
            return parseFloat((prev * cur).toFixed(10));
        });
    }
    else if(calculation.split("/").length - 1) {
        result = calculation.split("/").reduce((prev, cur) => {
            return parseFloat((prev / cur).toFixed(10));
        });
    }
    else if(calculation.split("+").length - 1) {
        result = calculation.split("+").reduce((prev, cur) => {
            return parseFloat(prev) + parseFloat(cur);
        });
    }
    else if(calculation.split("-").length - 1) {
        result = calculation.split("-").reduce((prev, cur) => {
            return prev - cur;
        });
    }

    return result;

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

class Calculation {

}