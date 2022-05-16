import { useRef, useState, useEffect } from "react";

export default function JustePrix() {
  const [error, setError] = useState(0);
  const [status, setStatus] = useState(null);
  const [priceToFind, setPriceToFind] = useState(
    Math.round(Math.random() * 100)
  );
  const [isDone, setIsDone] = useState(false);
  const [formRestart, setFormRestart] = useState(null);
  const inputPrice = useRef(null);
  const btnSubmit = useRef(null);
  const gifts = [
    "cadeau 1",
    "cadeau 11",
    "cadeau 21",
    "cadeau 31",
    "cadeau 41",
  ];
  const [randomGift, setRandomGift] = useState(
    gifts[Math.ceil(Math.random() * gifts.length - 1)]
  );

  const inputPreparation = () => {
    inputPrice.current.value = "";
    inputPrice.current.focus();
  };

  const init = () => {
    setError(0);
    setPriceToFind(Math.round(Math.random() * 100));
    setRandomGift(gifts[Math.ceil(Math.random() * gifts.length - 1)]);
    setStatus(null);
    setIsDone(false);
    inputPreparation();
    btnSubmit.current.disabled = false;
  };

  const handleRestart = (e) => {
    e.preventDefault();
    init();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //end game?
    if (isDone) {
      btnSubmit.current.disabled = true;
      if (error >= 7) {
        setStatus("Vous avez perdu !");
      } else {
        setStatus("Vous avez gagné le lot suivant : " + randomGift);
        setFormRestart(
          <form onSubmit={(e) => handleRestart(e)}>
            <button type="submit" className="button is-secondary">
              Recommencer
            </button>
          </form>
        );
      }
      return false;
    }
    //if not end game
    if (priceToFind === parseInt(inputPrice.current.value)) {
      btnSubmit.current.disabled = true;
      setStatus("Vous avez gagné le lot suivant : " + randomGift);
      setFormRestart(
        <form onSubmit={(e) => handleRestart(e)}>
          <button type="submit" className="button is-secondary">
            Recommencer
          </button>
        </form>
      );
      setIsDone(true);
    } else {
      setError(error + 1);
      if (parseInt(inputPrice.current.value) > priceToFind) {
        setStatus("Plus petit!");
      } else {
        setStatus("Plus grand!");
      }
      if (error === 7) {
        btnSubmit.current.disabled = true;
        setFormRestart(
          <form onSubmit={(e) => handleRestart(e)}>
            <button type="submit" className="button is-secondary">
              Recommencer
            </button>
          </form>
        );
        setIsDone(true);
      }
    }
    inputPreparation();
  };

  useEffect(() => {
    inputPreparation();
  }, []);

  return (
    <>
      <div>Compteur d'erreur : {error} (vous avez 7 essais)</div>
      <div>Indication : {status} </div>
      <form onSubmit={(e) => handleSubmit(e)} className="has-text-centered">
        <input type="text" ref={inputPrice} className="input is-primary" />
        <input
          type="submit"
          ref={btnSubmit}
          value="Proposer"
          className="button is-primary mt-3"
        />
      </form>
      {formRestart}
    </>
  );
}
