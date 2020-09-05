const redux = require('redux');

const createPolicy = (name, amount) => {
    return {
        type: 'CREATE_POLICY',
        payload: {
            name,
            amount,
        }
    }
};

const createClaim = (name, amountOfMoneyToCollect) => {
    return {
        type: 'CREATE_CLAIM', payload: { name, amountOfMoneyToCollect, }
    }
};

const deletePolicy = (name) => {
    return {
        type: 'DELETE_POLICY',
        payload: {
            name,
        }
    }
}

const claimsHistory = (oldListOfClaims = [], action) => {
    if (action.type === 'CREATE_CLAIM') {
        return [...oldListOfClaims, action.payload]
    }
    return oldListOfClaims;
}
const accounting = (bagOfMoney = 100, action) => {
    if (action.type === 'CREATE_CLAIM') {
        return bagOfMoney - action.payload.amountOfMoneyToCollect;
    } else if (action.type === 'CREATE_POLICY') {
        return bagOfMoney + action.payload.amount;
    }
    return bagOfMoney;
};

const policies = (listOfPolicies = [], action) => {
    if (action.type === 'CREATE_POLICY') {
        return [...listOfPolicies, action.payload.name]
    }
    else if (action.type === 'DELETE_POLICY') {
        return listOfPolicies.filter((name) => {
            return name !== action.payload.name;
        });
    }
    return listOfPolicies;
};
const { createStore, combineReducers } = redux;
const ourDepartments = combineReducers({
    claimsHistory,
    policies,
    accounting,
});

const store = createStore(ourDepartments);
const policy1 = createPolicy('john',1000);
const policy2 = createPolicy('jack',3000);
store.dispatch(policy1);
store.dispatch(policy2);
console.log(store.getState());
const claim1 = createClaim('john',200);
store.dispatch(claim1);
console.log(store.getState());
const delPolicy = deletePolicy('john');
store.dispatch(delPolicy);
console.log(store.getState());