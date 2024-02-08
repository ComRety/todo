import Task from './Task';
import classes from './main.module.css';

export default function TaskList({ editStateList, state, activete, edit, deleteTask }) {
  return (
    <ul className={classes['todo-list']}>
      {state.map((item) => {
        const key = item.id;
        return (
          <Task
            editStateList={editStateList}
            editState={item.editState}
            isActive={item.active}
            activete={activete}
            key={key}
            edit={edit}
            deleteTask={deleteTask}
            id={item.id}
          >
            {{ value: item.value, data: item.data }}
          </Task>
        );
      })}
    </ul>
  );
}
