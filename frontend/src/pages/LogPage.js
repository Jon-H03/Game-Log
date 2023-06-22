import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TableHead from '../components/TableHead';
import LogRow from '../components/LogRow';
import '../App.css';

function LogPage() {
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    async function fetchLogs() {
      try {
        const response = await fetch('/api/'); // Adjust the URL based on your server setup
        const data = await response.json();
        setLogs(data);
      } catch (error) {
        console.error('An error has occurred while fetching the logs:', error);
      }
    }

    fetchLogs();
  }, []);

  const updateLog = async () => {
    navigate(`/edit-game`);
  };

  const onDeleteGame = async (_id) => {
    const response = await fetch(`/api/${_id}`, { method: 'DELETE' }); // Adjust the URL based on your server setup
    if (response.status === 204) {
      const getResponse = await fetch("/api/logs"); // Adjust the URL based on your server setup
      const games = await getResponse.json();
      setLogs(games);
    } else {
      console.error(`Failed to delete game with id = ${_id}, status code: ${response.status}`);
    }
  };

  return (
    <>
      <h2>Video Game Log Page</h2>
      <article>
        <p>
          This page is for you to log all the games you've played and rate them.
          You can use it to create, view, update, and delete new/past logs about all the games you've played!
        </p>
        <table>
          <TableHead />
          <tbody>
            {logs.map((log) => (
              <LogRow log={log} onDelete={onDeleteGame} onEdit={updateLog} key={log._id} />
            ))}
          </tbody>
        </table>
      </article>
    </>
  );
}

export default LogPage;
