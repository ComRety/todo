import { useDispatch, useSelector } from 'react-redux';

import { deleteCompleted } from '../store/todos';

import FooterList from './FooterList';
import classes from './footer.module.css';

export default function Footer() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.todos.count);
  const del = () => {
    dispatch(deleteCompleted());
  };

  return (
    <footer className={classes.footer}>
      <span className={classes['todo-count']}>{count} items left</span>
      <FooterList />
      <button type="button" className={classes['clear-completed']} onClick={del}>
        Clear completed
      </button>
    </footer>
  );
}
