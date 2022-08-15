import React, { useState } from "react";
import Header from "./Common/Header";
import NotFound from "./Common/NotFound";
import Home from "./Home/Home";
import CreateDeck from "./Home/CreateDeck";
import Study from "./Deck/Study";
import Deck from "./Deck/Deck";
import { Routes, Route } from "react-router-dom";
import EditDeck from "./Deck/EditDeck";
import AddCard from "./Cards/AddCard";
import EditCard from "./Cards/EditCard";

function Layout() {
  const [numOfDecks, setNumOfDecks] = useState(0);

  const updateDecks = (value) => {
    setNumOfDecks(() => numOfDecks + value);
  };

  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={<Home numOfDecks={numOfDecks} updateDecks={updateDecks} />}
          />
          <Route path="/decks/:deckId/study" element={<Study />} />
          <Route path="/decks/new" element={<CreateDeck />} />
          <Route path="/decks/:deckId/edit" element={<EditDeck />} />
          <Route
            path="/decks/:deckId"
            element={<Deck updateDecks={updateDecks} />}
          />
          <Route
            path="/decks/:deckId/cards/:cardId/edit"
            element={<EditCard />}
          />
          <Route path="/decks/:deckId/cards/new" element={<AddCard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default Layout;
