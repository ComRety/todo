import { formatDistanceToNow } from 'date-fns';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { secondsEdit, minutesEdit, activete, editStateList, edit, deleteTask } from '../store/todos';

import classes from './main.module.css';

export default function Task({ editState, children, id, isActive }) {
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();

  const rog = useRef();
  const time = useRef(0);

  const input = useRef();

  function toggle() {
    dispatch(activete(id));
    clearInterval(rog.current);
    time.current = 0;
  }

  function editing() {
    dispatch(editStateList(id));
    input.current.value = children.value;
  }

  function edits(event) {
    event.preventDefault();
    if (input.current.value.trim().length !== 0) {
      dispatch(edit([id, input.current.value]));
      dispatch(editStateList(id));
    } else {
      dispatch(edit([id, children.value]));
      dispatch(editStateList(id));
    }
  }

  function deletes() {
    dispatch(deleteTask(id));
    clearInterval(rog.current);
  }

  const start = () => {
    todos.forEach((i) => {
      if (i.id === id) {
        if (time.current === 0) {
          if (i.active) {
            time.current += 1;
            rog.current = setInterval(() => {
              dispatch(secondsEdit(id));
            }, 1000);
          }
        }
      }
    });
  };

  const pause = () => {
    clearInterval(rog.current);
    time.current = 0;
  };

  useEffect(() => {
    todos.forEach((i) => {
      if (i.id === id) {
        if ((i.seconds === -1 && i.minutes >= 1) || (i.seconds === 0 && i.minutes === 0)) {
          if (i.minutes >= 1) {
            dispatch(minutesEdit(id));
          } else {
            pause();
          }
        }
      }
    });
  });

  const minFn = () => {
    const min = todos.find((i) => i.id === id);
    return min.minutes;
  };

  const secFn = () => {
    const ces = todos.find((i) => i.id === id);
    return ces.seconds;
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
            <div className={classes.time}>{minFn() < 10 ? `0${minFn()}` : minFn()}</div>
            <div className={classes.time}>:</div>
            <div className={classes.time}>{secFn() < 10 ? `0${secFn()}` : secFn()}</div>
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
