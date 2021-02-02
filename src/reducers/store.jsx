import React, { createContext, useReducer } from 'react';

const calculateRoll = (state, payload) => {
  const newState = Object.assign({}, state);
  newState.frames = [...state.frames];

  const numFrames = newState.frames.length;
  const numPlayers = newState.players.length;
  const frame = newState.frames[numFrames - 1];
  const isLastPlayer = payload.player === numPlayers - 1;
  let rolls = frame[payload.player];
  rolls.push(payload.pins);

  const calculateFrame = () => {
    const isStrike = rolls.length === 1 ? rolls[0] === 10 : false;
    const hasRolledTwice = rolls.length === 2;
    if (numFrames !== 10 && isLastPlayer && (isStrike || hasRolledTwice)) {
      let nextFrame = newState.players.map(() => []);
      newState.frames.push(nextFrame);
    }
    if (numFrames === 10 && isLastPlayer) {
      newState.ended = true;
    }
  };

  calculateFrame();
  return newState;
};

const BowlingContext = createContext();

const initialState = {
  players: [],
  frames: [],
  started: false,
  ended: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PLAYER':
      return {
        ...state,
        players: [...state.players, action.payload.player],
      };
    case 'START':
      const initFrame = state.players.map(() => []);
      return {
        ...state,
        started: action.payload.started,
        frames: [[...initFrame]],
      };
    case 'ROLL':
      return calculateRoll(state, action.payload);
    case 'RESET':
      return initialState;
    default:
      throw new Error();
  }
};

const BowlingContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <BowlingContext.Provider value={[state, dispatch]}>
      {children}
    </BowlingContext.Provider>
  );
};

export { BowlingContext, BowlingContextProvider };
