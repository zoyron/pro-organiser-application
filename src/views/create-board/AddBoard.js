import React, { useState } from 'react';
import commonStyles from './../../common/styles/styles.module.css';
import styles from './AddBoard.module.css';
import { addBoard } from '../../utils/data';
import { Error } from '../../common/error/Error';

export const AddBoard = ({ history }) => {
  const [name, setName] = useState('');
  const [teamMember, setTeamMember] = useState('');
  const [type, setType] = useState('');
  const [error, setError] = useState('');

  const saveBoard = () => {
    if (!name && !teamMember) {
      return setError('Name and Team Members are required fields');
    }

    const teamMembers = teamMember.split(',');
    const id = name.split(/\s+/).join('-').toLowerCase();

    const newBoard = {
      name,
      teamMembers,
      type
    };

    addBoard(id, newBoard)
      .then(created => {
        if (created) {
          history.push('/');
        } else {
          setError('Could not add Board');
        }
      })
      .catch(err => {
        setError('Could not add Board. Some error occured.');
      });
  };

  return (
    <div className={styles.container}>
      {error && <Error>{error}</Error>}
      <h2 className={commonStyles.title}>Create a board</h2>
      <div className={styles.field}>
        <label htmlFor="name">Enter a name for your board</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
          id="name"
          placeholder="eg. Agile Sprint Board"
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="team">Add your Team members</label>
        <input
          type="text"
          name="team"
          id="team"
          value={teamMember}
          onChange={e => setTeamMember(e.target.value)}
          placeholder="Add your team members(separated by commas)"
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="type">Enter the type for your board</label>
        <input
          type="text"
          name="type"
          id="type"
          value={type}
          onChange={e => setType(e.target.value)}
          placeholder="eg. Design UX"
        />
      </div>
      <div className={styles.field}>
        <button
          type="submit"
          onClick={saveBoard}
          className={commonStyles.info}
          id="CreateBoard"
        >
          Create
        </button>
      </div>
    </div>
  );
};