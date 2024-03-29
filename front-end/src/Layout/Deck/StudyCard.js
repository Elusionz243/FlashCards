import React, { useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { PropTypes } from "prop-types";

export default function StudyCard({ cards }) {
  const initialState = { flipped: false, currentCard: 0 };
  const [session, setSession] = useState(initialState);
  const history = useNavigate();
  const { deckId } = useParams();

  const handleNext = () => {
    if (session.currentCard < cards.length - 1) {
      setSession({
        ...session,
        currentCard: session.currentCard + 1,
        flipped: false,
      });
    } else {
      window.confirm(
        'Restart cards? \n \n \n Click "cancel" to return to the home page.'
      )
        ? setSession(initialState)
        : history("/");
    }
  };

  if (cards.length > 2) {
    return (
      <>
        <div className="card" style={{ width: "32rem" }}>
          <div className="card-body">
            <h5 className="card-title">
              Card {session.currentCard + 1} of {cards.length}
            </h5>
            <p className="card-text">
              {session.flipped
                ? cards[session.currentCard].back
                : cards[session.currentCard].front}
            </p>
            <button
              className="btn btn-secondary mr-2"
              onClick={() => setSession({ ...session, flipped: true })}
            >
              Flip
            </button>
            {session.flipped && (
              <button className="btn btn-primary" onClick={handleNext}>
                Next
              </button>
            )}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <h2>Not enough cards</h2>
        <p>
          You need at least 3 cards to study There are {cards.length} cards in
          this deck
        </p>
        <Link to={`/decks/${deckId}/cards/new`}>
          <button className="btn btn-primary">
            <i className="bi bi-plus"></i>Add Cards
          </button>
        </Link>
      </>
    );
  }
}

StudyCard.propTypes = {
  cards: PropTypes.array,
};
