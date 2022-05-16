import { Fragment, useState } from "react";

function JustePrix() {
  // Créer un state pour le prix à trouver
  const [prix, setPrix] = useState(Math.round(Math.random() * 100));
  const [message, setMessage] = useState(null);
  const lot = [
    "Une cigarette",
    "Un gode",
    "Un cahier de dessins",
    "Une nuit avec Myriam",
  ];

  const handleSubmit = (event) => {
    const lotChoisi = Math.round(Math.random() * lot.length);
    // Empêche l'envoi du formulaire et le reload de la page
    event.preventDefault();
    alert(event.target[0].value + "," + prix);
    if (parseInt(event.target[0].value) === prix) {
      setMessage("Vous avez gagné : " + lot[lotChoisi]);
    } else {
      if (parseInt(event.target[0].value) > prix) {
        setMessage("Plus petit");
      } else {
        setMessage("Plus grand");
      }
    }
  };

  const handleReload = (restart, event) => {
    restart.reload();
    if (parseInt(event.target[0].value) === prix) {
      restart.style = { display: "block" };
    }
  };

  return (
    <Fragment>
      <form onSubmit={(event) => handleSubmit(event)}>
        <input type="text" autoFocus placeholder="Proposer un prix" />
        <input type="submit" value="Proposer" />
      </form>
      <div>{message}</div>
      <form
        onSubmit={(restart) => handleReload(restart)}
        style={{ display: "none" }}
      >
        <button>Recommencer</button>
      </form>
    </Fragment>
  );
}

export default JustePrix;
