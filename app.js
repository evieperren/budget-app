// Budget controller
let budgetController = (function () {
    let Expense = function (ID, description, value) {
        this.ID = ID;
        this.description = description;
        this.value = value;
    }
    let Income = function (ID, description, value) {
        this.ID = ID;
        this.description = description;
        this.value = value;
    }

    let data = {
        allItems: {
            exp: [],
            inc: [],
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };

    return {
        addItem: function (type, des, val) {
            let newItem;
            if (data.allItems[type].length > 0){
                id = data.allItems[type][data.allItems[type].length - 1].ID + 1;
            } else {
                ID = 0;
            }

            if (type === 'exp') {
                newItem = new Expense(ID, des, val)
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val)
            }

            data.allItems[type].push(newItem);
            return newItem;
        },
        testing: function(){
            console.log(data);
        }
    }

})();


// UI controller
let UIController = (function () {

    let DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
    }
    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMStrings.inputType).value, // will be inc or exp
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value,
            }

        },
        addListItem: function(obj, type){
            let html, newHtml;
            if(type === 'inc'){
                element = DOMStrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp'){
                element = DOMStrings.expensesContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">%percentage%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            // replace the placeholder text with actual text
            newHtml = html.replace('%id%', obj.ID);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            //insert html into the dom
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },
        clearFields: function(){
            let fields;
            fields = document.querySelectorAll(DOMStrings.inputDescription + ',' + DOMStrings.inputValue);
            Array.prototype.slice.call(fields);
        },
        getDOMStrings: function () {
            return DOMStrings;
        }

    }
})();

// global app controller
let appController = (function (budgetCtrl, UICtrl) {

    let setupEventListners = function () {
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (e) {
            if (e.keyCode === 13 || e.which === 13) {
                ctrlAddItem();
            }
        });
    }

    let DOM = UICtrl.getDOMStrings();
    let ctrlAddItem = function () {
        let input, newItem;

        input = UICtrl.getInput();
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        UICtrl.addListItem(newItem, input.type);
    };

    return {
        init: function () {
            console.log('application has started');
            setupEventListners()
        }
    }
})(budgetController, UIController);

appController.init();