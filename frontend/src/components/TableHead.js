
import React from 'react';
import { GrAddCircle } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';

const TableHead = () => {
    const navigate = useNavigate();

    const createPage = () => {
        navigate("/add-game");
    }

    return (
        <>
            <tr className='table-head'>
                <td>Delete</td>
                <td>Edit</td>
                <td>Game Title</td>
                <td>Genre</td>
                <td>Rating</td>

                <td>Date</td>
                
                <td><button onClick={createPage}>< GrAddCircle /></button></td>
            </tr>
        </>
    )
}
export default TableHead;