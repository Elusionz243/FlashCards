import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { updateDeck, readDeck } from "../../utils/api/index";

export default function EditDeck() {
  const initialState = { name: "", description: "" };
  const [formData, setFormData] = useState(initialState);
  const [deck, setDeck] = useState({});
  const history = useNavigate();
  const { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    const loadDeck = async () => {
      const loadedDeck = await readDeck(deckId, abortController.signal);
      setDeck(() => loadedDeck);
      setFormData({
        id: deckId,
        name: loadedDeck.name,
        description: loadedDeck.description,
      });
    };
    loadDeck();
    return () => abortController.abort();
  }, [deckId]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const deckNum = await updateDeck(formData);
    history(`/decks/${deckNum.id}`);
  };
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item text-primary">
            <Link to="/">
              <i className="bi bi-house-door-fill"></i>Home
            </Link>
          </li>
          <li className="breadcrumb-item text-primary">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>
      <h1>Edit Deck</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="formGroupExampleInput">Name</label>
          <input
            name="name"
            type="text"
            className="form-control"
            value={formData.name}
            placeholder="Deck Name"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="formGroupExampleInput2">Description</label>
          <textarea
            name="description"
            style={{ resize: "none" }}
            rows="5"
            className="form-control"
            value={formData.description}
            placeholder="Brief description of the deck"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <Link to={`/decks/${deckId}`}>
            <button className="btn btn-secondary mr-2">Cancel</button>
          </Link>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
