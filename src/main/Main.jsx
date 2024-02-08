import TaskList from './TaskList';

export default function Main({ editStateList, activete, state, deleteTask, edit, tab }) {
  let newState = [];
  if (tab === 'All') {
    newState = state.map((item) => item);
  } else if (tab === 'Active') {
    newState = state.filter((item) => item.active);
  } else if (tab === 'Completed') {
    newState = state.filter((item) => !item.active);
  }
  return (
    <section className="main">
      <TaskList
        editStateList={editStateList}
        activete={activete}
        state={newState}
        deleteTask={deleteTask}
        edit={edit}
        tab={tab}
      />
    </section>
  );
}
