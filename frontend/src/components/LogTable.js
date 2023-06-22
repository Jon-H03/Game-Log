import React from 'react';
import { FaPlus } from 'react-icons/fa';
import LogRow from './LogRow';


function LogTable({ game, onCreate }) {
    return (
      <table>
        <caption>
          <button onClick={onCreate}>
            <FaPlus /> Create Document
          </button>
        </caption>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        
      </table>
    );
  }
export default LogTable;  