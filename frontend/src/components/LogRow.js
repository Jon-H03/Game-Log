
import React from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';

function LogRow({ log, onDelete, onEdit }) {
    
    return (
        <tr>
            <td><i><AiFillDelete onClick={() => onDelete(log._id)} title="Clicking the delete icon will delete the entry." /></i></td>
            <td><i><AiFillEdit onClick={() => onEdit(log._id)} title="Editing will occur on a different screen." /></i></td>
            <td title="What is the name of the video game you completed?">{log.name}</td>
            <td title="What genre is that video game?">{log.genre}</td>
            <td title="What would you rate that video game?">{log.rating}</td>
            <td title="When did you complete the game?">{log.date.slice(0,10)}</td>
            <td></td>
        </tr>
    );
}

export default LogRow;