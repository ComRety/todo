import { useState } from 'react';

import Footer from './footer/Footer';
import Header from './header/Header';
import Main from './main/Main';
import './style.css';

let id = 0;

function App() {
  const [tab, setTab] = useState('All');

  const [count, setCount] = useState(0);

  const [taskList, setTaskList] = useState([]);

  const countTask = (state) => {
    const newState = state;
    let newCount = 0;
    newState.forEach((item) => {
      if (item.active) {
        newCount += 1;
      }
    });
    setCount(newCount);
  };

  const editStateList = (ids) => {
    const newState = [...taskList];
    newState.forEach((el, i) => {
      if (Number(el.id) === Number(ids)) {
        newState[i].editState = !newState[i].editState;
      }
    });
    setTaskList(newState);
    countTask(newState);
  };

  const deleteTask = (ids) => {
    const newState = taskList.filter((item) => {
      if (Number(item.id) === Number(ids)) {
        return false;
      }
      return true;
    });
    setTaskList(newState);
    countTask(newState);
  };

  const footer = (text) => {
    countTask(taskList);
    setTab(text);
  };

  const edit = (ids, value) => {
    const newState = [...taskList];
    newState.forEach((el, i) => {
      if (Number(el.id) === Number(ids)) {
        newState[i].value = value;
      }
    });
    setTaskList(newState);
    countTask(newState);
  };

  const addList = (value, data) => {
    const newState = [...taskList];
    let newCount = count;
    newState.push({ id, value, active: true, data, editState: true });
    newCount += 1;
    countTask(newState);
    setTaskList(newState);
    setCount(newCount);
    id += 1;
  };

  const activete = (ids) => {
    const newState = [...taskList];
    newState.forEach((el, i) => {
      if (Number(el.id) === Number(ids)) {
        newState[i].active = !newState[i].active;
      }
    });
    countTask(newState);
    setTaskList(newState);
  };

  const deleteCompleted = () => {
    const newState = taskList.filter((item) => {
      if (item.active) {
        return true;
      }
      return false;
    });
    setTaskList(newState);
    countTask(newState);
  };

  return (
    <section className="todoapp">
      <Header addList={addList} />
      <Main
        state={taskList}
        editStateList={editStateList}
        deleteTask={deleteTask}
        edit={edit}
        tab={tab}
        activete={activete}
      />
      <Footer count={count} tab={tab} footer={footer} deleteCompleted={deleteCompleted} />
    </section>
  );
}

export default App;
