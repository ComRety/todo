import { formatDistanceToNow } from 'date-fns';
import { useEffect, useRef, useState } from 'react';

import classes from './main.module.css';

export default function Task({ editStateList, editState, activete, children, edit, deleteTask, id, isActive }) {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  const rog = useRef();

  const input = useRef();

  function toggle() {
    activete(id);
    clearInterval(rog.current);
  }

  function editing() {
    editStateList(id);
    input.current.value = children.value;
  }

  function edits(event) {
    event.preventDefault();
    if (input.current.value.trim().length !== 0) {
      edit(id, input.current.value);
      editStateList(id);
    } else {
      edit(id, children.value);
      editStateList(id);
    }
  }

  function deletes() {
    deleteTask(id);
    clearInterval(rog.current);
  }

  const start = () => {
    rog.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  useEffect(() => {
    if (seconds === 60) {
      setMinutes((prev) => prev + 1);
      setSeconds(0);
    }
  }, [seconds]);

  useEffect(() => {
    if (minutes === 60) {
      setHours((prev) => prev + 1);
      setMinutes(0);
    }
  }, [minutes]);

  const pause = () => {
    clearInterval(rog.current);
  };

  return (
    <li id={id} className={`${!isActive ? classes.completed : ''} ${!editState ? classes.editing : ''}`}>
      <div className={classes.view}>
        <input
          id={`one${String(id)}`}
          type="checkbox"
          defaultChecked={!isActive}
          className={classes.toggle}
          onClick={toggle}
        />
        <label htmlFor={`one${String(id)}`}>
          <span className={classes.title}>{children.value}</span>
          <div className={classes.description}>
            <button
              type="button"
              className={`${classes.icon} ${classes['icon-play']}`}
              aria-label="start"
              onClick={start}
            />
            <button
              type="button"
              className={`${classes.icon} ${classes['icon-pause']}`}
              aria-label="pause"
              onClick={pause}
            />
            <div className={classes.time}>{hours}</div>
            <div className={classes.time}>:</div>
            <div className={classes.time}>{minutes < 10 ? `0${minutes}` : minutes}</div>
            <div className={classes.time}>:</div>
            <div className={classes.time}>{seconds < 10 ? `0${seconds}` : seconds}</div>
          </div>
          <span className={classes.created}>{`created ${formatDistanceToNow(children.data, {
            addSuffix: true,
          })}`}</span>
        </label>
        <button
          type="button"
          className={`${classes.icon} ${classes['icon-edit']}`}
          onClick={editing}
          aria-label="Редактировать"
        />
        <button
          type="button"
          className={`${classes['icon-destroy']} ${classes.icon}`}
          onClick={deletes}
          aria-label="Удалить"
        />
      </div>
      <form onSubmit={edits}>
        <input ref={input} type="text" className={classes.edit} />
      </form>
    </li>
  );
}
