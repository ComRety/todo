import FooterList from './FooterList';
import classes from './footer.module.css';

export default function Footer({ tab, count, footer, deleteCompleted }) {
  return (
    <footer className={classes.footer}>
      <span className={classes['todo-count']}>{count} items left</span>
      <FooterList tab={tab} footer={footer} />
      <button type="button" className={classes['clear-completed']} onClick={deleteCompleted}>
        Clear completed
      </button>
    </footer>
  );
}
