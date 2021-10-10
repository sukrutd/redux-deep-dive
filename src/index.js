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
//================================CreateStore Demo============================================================

const initialState = { value: 0 };

const INCREMENT = "INCREMENT";
const ADD = "ADD";

// Action creators
const increment = () => ({ type: INCREMENT });

const add = (amount) => ({ type: ADD, payload: amount });

const reducer = (state = initialState, action) => {
  if (action.type === INCREMENT) {
    return { value: state.value + 1 };
  }

  if (action.type === ADD) {
    return { value: state.value + action.payload };
  }

  return state;
};

//============================================================================================================
/**

const logEnhancer = (createStore) => (reducer, initialState, enhancer) => {
  const logReducer = (state, action) => {
    const newState = reducer(state, action);

    console.group(action.type);
    console.log("%cPrevious state: ", "color: blue; font-weight: bold;", state);
    console.log("%cNext state: ", "color: green; font-weight: bold;", newState);
    console.groupEnd();

    return newState;
  };

  return createStore(logReducer, initialState, enhancer);
};
const store = createStore(reducer, logEnhancer);

 */

const logMiddleware = (store) => (next) => (action) => {
  console.group(action.type);
  console.log(
    "%cPrevious state: ",
    "color: blue; font-weight: bold;",
    store.getState()
  );

  next(action);

  console.log(
    "%cNext state: ",
    "color: green; font-weight: bold;",
    store.getState()
  );
  console.groupEnd();
};

const store = createStore(reducer, applyMiddleware(logMiddleware));
console.log(store);

const subscriber = () => console.log("SUBSCRIBER", store.getState());
store.subscribe(subscriber);

//store.dispatch(increment());
//store.dispatch(add(2));

//============================================================================================================
//================================bindActionCreators Demo=====================================================

const actions = bindActionCreators({ increment, add }, store.dispatch);
console.log(actions);

actions.increment();
actions.add(5);

// Simple implementation of bindActionCreators
const [boundIncrement, boundAdd] = [increment, add].map((fn) =>
  compose(store.dispatch, fn)
);

boundIncrement();
boundAdd(5);

//============================================================================================================
//========================================Redux Store Implementation==========================================

/**
 
const createStore = (reducer) => {
	let state;
	let listeners = [];

	const getState = () => state;

	const dispatch = (action) => {
		state = reducer(state, action);

		for (let i = 0; i < listeners.length; i++) {
			listeners[i]();
		}
	};

	const subscribe = (listener) => {
		listeners.push(listener);
	};

	return { getState, dispatch, subscribe };
};

 */
