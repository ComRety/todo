import FooterItem from './FooterItem';
import classes from './footer.module.css';

export default function FooterList({ tab, footer }) {
  return (
    <ul className={classes.filters}>
      <FooterItem tab={tab} footer={footer}>
        All
      </FooterItem>
      <FooterItem tab={tab} footer={footer}>
        Active
      </FooterItem>
      <FooterItem tab={tab} footer={footer}>
        Completed
      </FooterItem>
    </ul>
  );
}
