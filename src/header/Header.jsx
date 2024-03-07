import { useRef } from 'react';

import classes from './header.module.css';

export default function Header({ addList }) {
  const input = useRef();

  function onSubmit(e) {
    e.preventDefault();
    if (input.current.value.trim().length === 0) {
      return;
    }
    const time = prompt('Введите целое количество минут на даннаю задачу');
    if (Number(time)) {
      addList(input.current.value, new Date(), Number(time));
      input.current.value = '';
    } else {
      alert('Данные введены неверно');
    }
    console.log(Number(time));
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
