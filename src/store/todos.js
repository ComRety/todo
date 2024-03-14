import { createSlice } from '@reduxjs/toolkit';

const todos = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    id: 0,
    count: 0,
    tab: 'All',
  },
  reducers: {
    addList(state, actions) {
      state.todos.push({
        id: state.id,
        value: actions.payload[0],
        active: true,
        data: actions.payload[1],
        editState: true,
        minutes: actions.payload[2],
        seconds: actions.payload[3],
      });
      state.id += 1;
      state.count = state.todos.length;
    },
    deleteTask(state, actions) {
      state.todos.forEach((item, ids) => {
        if (Number(item.id) === Number(actions.payload)) {
          state.todos.splice(ids, 1);
          state.count = state.todos.length;
        }
      });
      state.count = state.todos.length;
    },
    secondsEdit(state, actions) {
      const sec = state.todos.find((i) => i.id === Number(actions.payload));
      if (sec.seconds === 1 && sec.minutes === 0) {
        sec.active = false;
      }
      sec.seconds -= 1;
    },
    minutesEdit(state, actions) {
      const min = state.todos.find((i) => i.id === Number(actions.payload));
      min.minutes -= 1;
      min.seconds = 59;
    },
    activete(state, actions) {
      const todo = state.todos.find((i) => i.id === Number(actions.payload));
      todo.active = !todo.active;
    },
    editStateList(state, actions) {
      const todo = state.todos.find((i) => i.id === Number(actions.payload));
      todo.editState = !todo.editState;
    },
    edit(state, actions) {
      const [idT, valueT] = actions.payload;
      const todo = state.todos.find((i) => i.id === Number(idT));
      todo.value = valueT;
    },
    deleteCompleted(state) {
      state.todos.forEach((item, ids) => {
        if (!item.active) {
          state.todos.splice(ids, 1);
          state.count = state.todos.length;
        }
        state.count = state.todos.length;
      });
    },
    footer(state, actions) {
      state.tab = actions.payload;
      state.count = state.todos.length;
    },
  },
});

export default todos.reducer;
export const { addList, deleteTask, secondsEdit, minutesEdit, activete, editStateList, edit, deleteCompleted, footer } =
  todos.actions;
