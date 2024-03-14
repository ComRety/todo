import { useSelector } from 'react-redux';

import TaskList from './TaskList';

export default function Main() {
  const todos = useSelector((state) => state.todos.todos);
  const tab = useSelector((state) => state.todos.tab);
  let newState = [];
  if (tab === 'All') {
    newState = todos.map((item) => item);
  } else if (tab === 'Active') {
    newState = todos.filter((item) => item.active);
  } else if (tab === 'Completed') {
    newState = todos.filter((item) => !item.active);
  }
  return (
    <section className="main">
      <TaskList state={newState} />
    </section>
  );
}
