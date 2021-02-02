import React, { useContext } from "react";
import { BowlingContext } from '../reducers/store';

const Frame = ({ players, frames, ...rest }) => {
  const [state, dispatch] = useContext(BowlingContext);
  const playerFrames = (allFrames, playerIdx, maxFrames) => {
    let frames = allFrames.map((frame) => frame[playerIdx]);
    let numEmptyFrames = maxFrames - frames.length;
    let emptyFrames = Array.from({length: numEmptyFrames}).map(() => []);

    return frames.concat(emptyFrames);
  };

  const scoreFrames = (frames, maxFrames, maxPins) => {
    const rolls = [].concat.apply([], frames);
    let multipliers = rolls.slice().map(() => 1);
    let rollIdx = -1;
    frames.slice(0, maxFrames - 1).forEach((frame) => {
      rollIdx += frame.length;
      const allPins = frame.reduce((res, curr) => res + curr, 0) === maxPins;
      const isStrike = allPins && frame.length === 1;
      const isSpare = allPins && frame.length === 2;
      if (rollIdx < rolls.length - 1) {
        if (isStrike || isSpare) {
          multipliers[rollIdx + 1]++;
          if (isStrike && rollIdx < rolls.length - 2) {
            multipliers[rollIdx + 2]++;
          }
        }
      }
    });
    return rolls.reduce((res, curr, index) => {
      return res + curr * multipliers[index];
    }, 0);
  };

  const renderFrames = (rolls, index) => {
    const isLastFrame = index === 9;
    const spareOrStrike = rolls.reduce((res, curr) => res + curr, 0) >= 10
    let scores = rolls.map((roll, idx) => {
      let rollString = roll;
      if (roll === 10) {
        rollString = 'X';
      }
      if (!isLastFrame && spareOrStrike && idx === 1) {
        rollString = '/';
      }
      if (isLastFrame && (idx === 1 || idx === 2)) {
        if (idx === 1 && rolls[0] === 10) {
          if (rolls[0] === 10) {
            rollString = rolls[1] === 10 ? 'X' : roll;
          } else {
            rollString = rolls[0] + roll === 10 ? '/' : roll;
          }
        } 
        if (idx === 2 && rolls[1]+rolls[2] === 10) {
          rollString = rolls[1] + roll === 10 ? '/' : roll;
        }
      }
      return(
        <div key={idx}>{rollString}</div>
      );
    });
    return (
      <div className={`frame-wrapper ${index === 9 && "last-frame-wrapper"}`} key={index}>
        <div className="cell">{index+1}</div>
        <div className="score-container">
          <div className="score-wrapper">
            {scores}
          </div>
        </div>
      </div>
    );
  };

  const renderScoreBoard = (player, index) => {
    let frames = playerFrames(state.frames, index, 10);
    let rolls = frames.map(renderFrames);
    let score = scoreFrames(frames, 10, 10);
    return (
      <div className="frame" key={index}>
        <h3>{player}: {score}</h3>
        <div className="frame-container">
          {rolls}
        </div>
      </div>
    );
  };
  return (
    <div>
      {players.map(renderScoreBoard)}
    </div>
  );
};

const ScoreBoard = props => {
  const [state, dispatch] = useContext(BowlingContext);
  return (
    <Frame players={state.players} frames={state.frames} />
  );
}

export default ScoreBoard;
