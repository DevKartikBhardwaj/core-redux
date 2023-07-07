import { applyMiddleware, createStore, combineReducers } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import axios from "axios";
//store
const store = createStore(
  combineReducers({
    account: amountReducer,
    bonus: bonusReducer,
  }),
  applyMiddleware(logger.default, thunk.default)
  //                                           action1            action2
); //second argument is a middleware   dispatch-------->Middleware------>store

//aync api call
// async function getUser() {
//   const { data } = await axios.get("http://localhost:3000/accounts/1");
//   console.log(data);
// }
// getUser();
//reducer

function amountReducer(prevState = { amount: 1 }, action) {
  /*
  if (action.type === "increment") {
    return { amount: prevState.amount + 1 };
  }
  if (action.type === "incrementByAmount") {
    return { amount: prevState.amount + action.payload };
  }
  if (action.type === "decrement") {
    return { amount: prevState.amount - 1 };
  }
  return prevState;
  
  */

  //MORE CONVINIENT METHOD TO WRITE ABOVE CODE
  switch (action.type) {
    case "init":
      return { amount: action.payload };
    case "increment":
      return { amount: prevState.amount + 1 };
    case "decrement":
      return { amount: prevState.amount - 1 };
    case "incrementByAmount":
      return { amount: prevState.amount + action.payload };
    default:
      return prevState;
  }
}

function bonusReducer(prevState = { points: 0 }, action) {
  switch (action.type) {
    case "increment":
      return { points: prevState.points + 1 };
    default:
      return prevState;
  }
}

//checking current state
// store.subscribe(() => {
//   console.log(store.getState());
// });

//Action creators

/*
 ******IT WON'T WORK WE HAVE TO USE REDUX-THUNK WITH THIS TO PERFORM THE TASK
async function init() {                    
  const { data } = await axios.get("http://localhost:3000/accounts/1");
  return { type: "init", payload: data.amount };
}
SOLUTION TO THIS PROBLEM GIVEN BELOW

*/

function init(id) {
  return async (dispatch, getState) => {
    const { data } = await axios.get(`http://localhost:3000/accounts/${id}`);
    dispatch({ type: "init", payload: data.amount });
  };
}

function increment() {
  return { type: "increment" };
}
function decrement() {
  return { type: "decrement" };
}
function incrementByAmount() {
  return { type: "incrementByAmount", payload: 5 };
}

//dispatch
// setInterval(() => {
store.dispatch(increment());
// }, 5000);
