import Task from './Task';
import classes from './main.module.css';

export default function TaskList({ state }) {
  return (
    <ul className={classes['todo-list']}>
      {state.map((item) => {
        const key = item.id;
        return (
          <Task times={item.times} editState={item.editState} isActive={item.active} key={key} id={item.id}>
            {{ value: item.value, data: item.data }}
          </Task>
        );
      })}
    </ul>
  );
}
