import { useDispatch, useSelector } from 'react-redux';

import { footer } from '../store/todos';

import classes from './footer.module.css';

export default function FooterItem({ children }) {
  const tab = useSelector((state) => state.todos.tab);
  const dispatch = useDispatch();
  return (
    <li>
      <button
        type="button"
        className={String(tab) === String(children) ? classes.selected : ''}
        onClick={() => dispatch(footer(children))}
      >
        {children}
      </button>
    </li>
  );
}
