import {
  compose,
  createStore,
  applyMiddleware,
  bindActionCreators
} from "redux";

//================================Compose Demo===============================================================

const addBoundarySpaces = (string) => " " + string.trim() + " ";

const makeLouder = (string) => string.toUpperCase();

const repeatThreeTimes = (string) => string.repeat(3);

console.log(compose(repeatThreeTimes, makeLouder, addBoundarySpaces)("hello"));

//============================================================================================================

//================================CreateStore Demo===============================================================

const initialState = { value: 0 };

const INCREMENT = "INCREMENT";

const incrementAction = { type: INCREMENT };

const reducer = (state, action) => {
  if (action.type === INCREMENT) {
    return { value: state.value + 1 };
  }

  return state;
};

const store = createStore(reducer);

console.log(store);

//============================================================================================================
