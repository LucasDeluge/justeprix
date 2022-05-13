import { Fragment, useState } from "react";

function JustePrix() {
  // Créer un state pour le prix à trouver
  const [prix, setPrix] = useState(Math.round(Math.random() * 100));
  const [message, setMessage] = useState(null);

  const handleSubmit = (event) => {
    // Empêche l'envoi du formulaire et le reload de la page
    event.preventDefault();
    // alert(event.target[0].value + "," + prix);
    if (parseInt(event.target[0].value) === prix) {
      setMessage("gagné");
    } else {
      if (parseInt(event.target[0].value) > prix) {
        setMessage("Plus petit");
      } else {
        setMessage("Plus grand");
      }
    }
  };

  return (
    <Fragment>
      <form onSubmit={(event) => handleSubmit(event)}>
        <input type="text" placeholder="Proposer un prix" />
        <input type="submit" value="Proposer" />
      </form>
      <div>{message}</div>
    </Fragment>
  );
}

export default JustePrix;
