import classes from './footer.module.css';

export default function FooterItem({ tab, children, footer }) {
  return (
    <li>
      <button
        type="button"
        className={String(tab) === String(children) ? classes.selected : ''}
        onClick={() => footer(children)}
      >
        {children}
      </button>
    </li>
  );
}
