import React, { useContext } from 'react';
import { BowlingContext } from '../reducers/store';
import Button from '../components/Button';

const PlayPins = props => {
  const [state, dispatch] = useContext(BowlingContext);
  const renderPins = (playerIdx, numPins) => {
    const buttons = [];
    const handleKnockDown = (event) => {
      const pinScore = parseInt(event.target.innerText);
      dispatch({
        type: 'ROLL',
        payload: { player: playerIdx, pins: pinScore },
      });
    };
    for (let i = 0; i <= numPins; i++) {
      buttons.push((
        <Button key={i} onClick={handleKnockDown}>{i}</Button>
      ));
    }
    return buttons;
  };
  
  const framesCount = state.frames.length;
  const currentFrame = state.frames[framesCount - 1];
  let activePlayerIdx;

  const rolls = currentFrame.find((playerRoll, index) => {
    if (playerRoll.length <= 2) {
      const isLastFrame = framesCount === 10;
      const sumRolls = playerRoll.reduce((res, curr) => res + curr, 0);
      const spareOrStrike = sumRolls >= 10;

      if (isLastFrame && spareOrStrike) {
        activePlayerIdx = index;
        return true;
      }
      
      if (playerRoll.length < 2) {
        if (playerRoll.length === 1 && playerRoll[0] === 10) {
          return false;
        }
        activePlayerIdx = index;
        return true;
      }
    }
    return false;
  });
  let pins = 0;
  const activePlayer = state.players[activePlayerIdx];
  if (rolls && framesCount === 10 && rolls.length === 2 && rolls.reduce((res, curr) => res + curr, 0) >=10) {
    pins = rolls[0] === 10 ? 10 - rolls[1] : 10;
  } else {
    pins = rolls && rolls.length ? (10 - rolls[0] || 10) : 10;
  }

  return (
    <div>
      {rolls === undefined ? (
        <div>
          <h1>Game ended!</h1>
        </div>
      ) : (
        <div>
          <h1>It&#39;s {activePlayer + '\'s'} turn, Knock down</h1>
          <div className="pins-wrapper">
            {renderPins(activePlayerIdx, pins)} pins
          </div>
        </div>
      )}
    </div>
  );
}

export default PlayPins;
