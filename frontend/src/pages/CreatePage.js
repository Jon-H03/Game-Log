import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TableHead from '../components/TableHead';

export const CreatePage = () => {
  const [name, setName] = useState('Legend of Zelda');
  const [genre, setGenre] = useState('Action/Adventure');
  const [rating, setRating] = useState("10");
  const [date, setDate] = useState('');

  const navigate = useNavigate();

  const addGame = async () => {
    const newGame = { name, genre, rating, date };

    const response = await fetch('/api/logs', { // Adjust the URL based on your server setup
      method: 'POST',
      body: JSON.stringify(newGame),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 201) {
      alert("Successfully added video game into log!")
    } else {
      alert(`Failed to add new entry due to missing input (status code: ${response.status})`)
    }
    navigate("/");
  };

  return (
    <>
      <h2>Log a new video game!</h2>
      <article>
        <p>Add a video game you just finished.</p>
        <table id="games">
          <caption>Add a video game to the log.</caption>
          <TableHead />
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td>
                <input
                  type="text"
                  placeholder="Game Title"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Genre"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Rating"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </td>
              <td>
                <button onClick={addGame}>Add Game</button>
              </td>
            </tr>
          </tbody>
        </table>
      </article>
    </>
  );
};

export default CreatePage;