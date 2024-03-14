import { useRef } from 'react';
import { useDispatch } from 'react-redux';

import { addList } from '../store/todos';

import classes from './header.module.css';

export default function Header() {
  const input = useRef();
  const dispatsh = useDispatch();

  function onSubmit(e) {
    e.preventDefault();
    if (input.current.value.trim().length === 0) {
      return;
    }
    const time = prompt('Введите целое количество минут на даннаю задачу');
    const seconds = prompt('Введите количество минут на данную задачу');
    if (Number(time) && Number(seconds)) {
      dispatsh(addList([input.current.value, String(new Date()), Number(time), Number(seconds)]));
      input.current.value = '';
    } else {
      alert('Данные введены неверно');
    }
  }

  return (
    <header>
      <h1>Todos</h1>
      <form onSubmit={onSubmit}>
        <input ref={input} className={classes['new-todo']} placeholder="What needs to be done?" type="text" />
      </form>
    </header>
  );
}
