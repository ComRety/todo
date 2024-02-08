import { useRef } from 'react';

import classes from './header.module.css';

export default function Header({ addList }) {
  const input = useRef();

  function onSubmit(e) {
    e.preventDefault();
    if (input.current.value.trim().length === 0) {
      return;
    }
    addList(input.current.value, new Date());
    input.current.value = '';
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
