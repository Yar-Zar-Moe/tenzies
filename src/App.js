import React from "react";
import DiceButton from "./components/DiceButton";
import { nanoid } from "nanoid";

function App() {
  const [newDice, setNewDice] = React.useState(() => generateAllNewDice());
  const [isGameEnd, setIsGameEnd] = React.useState(false);
  const buttonRef = React.useRef(null);

  React.useEffect(() => {
    if (isGameEnd) {
      console.log("The button is focus.");
      buttonRef.current.focus();
    } else {
      buttonRef.current.blur();
    }
  }, [isGameEnd]);

  function generateAllNewDice() {
    return Array.from({ length: 10 }, () => ({
      value: Math.ceil(Math.random() * 6),
      isheld: false,
      id: nanoid(),
    }));
  }

  function btnRoll() {
    const newGenerateDie = generateAllNewDice();

    if (isGameEnd) {
      setIsGameEnd(false);
      setNewDice(newGenerateDie);
    } else {
      setNewDice((preVal) =>
        preVal.map((item, index) =>
          item.isheld ? item : newGenerateDie[index]
        )
      );
    }
  }

  function hold(id) {
    setNewDice((preVal) => {
      let preClickVal = 0;
      preVal.map((item) => (item.isheld ? (preClickVal = item.value) : NaN));
      return preVal.map((item) => {
        if (preClickVal == 0) {
          if (item.id == id) {
            return { ...item, isheld: !item.isheld };
          } else {
            return item;
          }
        } else {
          if (item.id == id && preClickVal == item.value) {
            return { ...item, isheld: !item.isheld };
          } else {
            return item;
          }
        }
      });
    });
    setNewDice((preVal) => {
      winGame(preVal);
      return preVal;
    });
  }

  function winGame(arr) {
    let dieVal = arr.map((item) => item.value);
    let heldVal = arr.map((item) => item.isheld);

    let newdieVal = [...new Set(dieVal)];
    let newheldVal = [...new Set(heldVal)];
    if (
      newdieVal.length == 1 &&
      newheldVal.length == 1 &&
      newheldVal[0] == true
    ) {
      setIsGameEnd(true);
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <main className="main p-4 bg-dark w-50">
        <div className="card p-4">
          <h1 className="text-center">Tenzies</h1>

          <p className="text-center w-75 align-self-center">
            {isGameEnd
              ? `Congratulation 🎉🥳🎊🎁. You win the game. Please click the "New Game" to start again.`
              : `Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.`}
          </p>
          <div className="dice-container mb-2 align-self-center">
            {newDice.map((die) => {
              return (
                <DiceButton
                  value={die.value}
                  id={die.id}
                  isheld={die.isheld}
                  hold={hold}
                />
              );
            })}
          </div>
          <button
            ref={buttonRef}
            onClick={btnRoll}
            className="roll-btn btn rounded-1 w-25 align-self-center mt-3"
          >
            {isGameEnd ? "New Game" : "Roll"}
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
