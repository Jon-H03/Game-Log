import React, { useState } from 'react';
import TableHead from '../components/TableHead';
import { useNavigate } from 'react-router-dom';

export const EditPage = ({ game }) => {
    const [name, setName] = useState(game.name);
    const [genre, setGenre] = useState(game.genre);
    const [rating, setRating] = useState(game.rating);
    const [date, setDate] = useState(game.date);

    const navigate = useNavigate();

    const editGame = async () => {

        // remove const
        const response = await fetch(`/${game.id}` , {
            method: 'PUT',
            body: JSON.stringify({
                name: name,
                genre: genre,
                rating: rating,
                date: date
            }),
            headers: {
                'Content-Type': 'application/json',
            },

        });

        if (response.status === 200) {
            navigate("/");
            alert("Successfully edited video game!");
            
        } else {
    
            const errorMessage = await response.json();
            console.log(errorMessage);
            navigate(`/`);
            alert(`Failed to update video game. Status ${response.status}. ${errorMessage}.`)
        }     
    };
    
    return (
        <>
            <h2>Edit a Video Game Log</h2>
            <p>Use the icons to update one row of the video game log.</p>

            <table id="videogames">
                <caption>Edit a video game entry.</caption>
                <TableHead />
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td><label for="gamename">
                            <input type="text" value={name} id="gamename"
                                onChange={e => setName(e.target.value)}
                                autoFocus
                                />
                        </label></td>

                        <td><label for="gamegenre">
                                <input type="text"
                                 value={genre}
                                 id="gamegenre"
                                 name="genre"
                                 onChange={e => setGenre(e.target.value)} required
                                 />
                                </label>
                            </td>

                            <td><label for="gamerating" >
                                <input type="number"
                                    value={rating} id="gamerating" name="rating"
                                    onChange={e => setRating(e.target.value)} required
                                      />
                                </label>
                            </td>

                            <td><label for="gamedate" >
                                <input type="date"
                                    value={date} id="gamedate" name="date"
                                    onChange={e => setDate(e.target.value)} 
                                    required
                                    pattern="\d{2}-\d{2}-\d{2}"
                                      />
                                </label>
                            </td>
                            <td><button class="wait" onClick={editGame}>Save</button></td>
            
                    </tr>
                </tbody>
            </table>
        </>
    );
}
export default EditPage;