import React, { useState, useContext } from "react";
import { BowlingContext } from '../reducers/store';
import Button from '../components/Button';
import ScoreBoard from './ScoreBoard';
import PlayPins from './PlayPins';

const BowlingBoard = ({ children, ...rest }) => {
  const [inputValue, setInputValue] = useState('');
  const [state, dispatch] = useContext(BowlingContext);

  const updateInput = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddPlayer = () => {
    dispatch({
      type: 'ADD_PLAYER',
      payload: { player: inputValue },
    });
    setInputValue('');
  };

  const handleGameStart = () => {
    dispatch({
      type: 'START',
      payload: { started: true },
    });
  }

  const handleGameReset = () => {
    dispatch({
      type: 'RESET',
    });
  }

  const playerList = state.players.map((player, index) =>
    <li key={`${player}-${index}`}><span className="player-label">Player {index+1}:</span> {player}</li>
  );

  return (
    <div className="bowling-wrapper">
      <div className="bowling-container">
        <h1>🎳 Bowling Game</h1>
        <div className="player-wrapper">
          <div>
            <input
              className="player-input"
              type="text"
              value={inputValue}
              placeholder="Player name"
              onChange={updateInput}
            />
          </div>
          <div>
            <Button disabled={(state.players.length === 4 | state.started) ? true : false} onClick={handleAddPlayer}>
              Add Player Name
            </Button>
            <Button disabled={(state.players.length >= 2 | state.started) ? false : true} onClick={handleGameStart}>
              Start Game
            </Button>
            <Button disabled={(state.players.length >= 2 | state.started) ? false : true} onClick={handleGameReset}>
              Reset
            </Button>
          </div>
        </div>
        <div className="player-list">
          {state.players.length > 0 ? (
            <ul>{playerList}</ul>
          ) : (
            <div className="reminder">(Please enter at least 2 players and at most 4 players)</div>
          )}
        </div>
        {state.started && (
          <div>
            <ScoreBoard />
            <PlayPins />
          </div>
        )}
      </div>
    </div>
  );
};
export default BowlingBoard;
