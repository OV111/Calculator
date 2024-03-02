document.addEventListener('DOMContentLoaded',function() {

    const display = document.querySelector(".calculator-screen");
    const keys = document.querySelector(".calculator_keys");
    
    const buttons = [
        {text: '+',value: '+',class: "operator"},
        {text: '-',value: '-',class: "operator"},
        {text: 'x',value: '*',class: "operator"},
        {text: '÷',value: '/',class: "operator"},
        {text: '7',value: '7',class: "operator"},
        {text: '8',value: '8',class: "operator"},
        {text: '9',value: '9',class: "operator"},
        {text: 'AC',value: 'all-clear',class: "all-clear"},
        {text: '4',value: '4',class: "operator"},
        {text: '5',value: '5',class: "operator"},
        {text: '6',value: '6',class: "operator"},
        {text: '.',value: '.',class: "operator"},
        {text: '3',value: '3',class: "operator"},
        {text: '2',value: '2',class: "operator"},
        {text: '1',value: '1',class: "operator"},
        {text: '=',value: '=',class: "operator"},
       
    ];

    buttons.forEach((button) => {
        let btn = document.createElement("button");
        btn.innerText = button.text;
        btn.value = button.value;
        if (button.class) {
            btn.classList.add(button.class);
        }
        keys.appendChild(btn);
    });

    let display_value = "0";
    let first_value = null;
    let waitingfor_second_value = false;
    let operator = null;

    let operations = {
        '+': (value) => handleOperator(value),
        '-': (value) => handleOperator(value),
        '*': (value) => handleOperator(value),
        '/': (value) => handleOperator(value),
        '.': (value) => input_decimal(value),
        '=': () => calc(),
        'all-clear': () => cleardisplay(),

    }

    let calculate_object = {
        '+': (first_value,second_value) => {return first_value + second_value},
        '-': (first_value,second_value) => {return first_value - second_value},
        '*': (first_value,second_value) => {return first_value * second_value},
        '/': (first_value,second_value) => {return second_value === "0" ? "NaN" : first_value / second_value},
    };

   

    keys.addEventListener('click', function (e) {
        let element = e.target;
        const value = element.value;
        if (!element.matches('button')) {
            return ;
        } 

        let number = +value;

    if (typeof number === 'number' && number === number) {
      input_number(value);
    } else {
      operations[value](value);
    }
    update_display();
  });


  function update_display() {
    display.value = display_value
}

function cleardisplay() {
    display_value = "";
    first_value = null;
    waitingfor_second_value = false;
    operator = null;
    update_display();
}
  function input_number(num) {
    if (waitingfor_second_value) {
        display_value = num;
        waitingfor_second_value = false;
    } else {
        display_value = display_value ==='0' ? num : display_value + num;
    }
  }

    function input_decimal(dot) {
        if(!display_value.includes(dot)) {
            display_value += dot;
        }
    }
 

    function handleOperator(nextOperator) {
        let value = parseFloat(display_value);
        if (operator && waitingfor_second_value) {
            operator = nextOperator;
            return;
        }
        if (first_value === null) {
            first_value = value;
        }
        if (operator) {
            let result = perform_calculation(operator, first_value, value);
            display_value = String(result);
            first_value = result;
        }
        waitingfor_second_value = true;
        operator = nextOperator;
    }

    function perform_calculation(operator,first_value,second_value) {
        return calculate_object[operator](first_value, second_value);
    }

    function calc() {
        let second_value = parseFloat(display_value);
        const result = perform_calculation(operator, first_value, second_value);
        display_value = String(result);
        update_display();
        first_value = null;
        operator = null;
        waitingfor_second_value = false;
    }

});

