import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Tasks {
  id: string;
  text: string;
  completed: boolean;
}

interface TaskState {
  tasks: Tasks[];
  status: 'Idle' | 'loading' | 'succeded' | 'failed';
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  status: 'Idle',
  error: null,
};

const tasksSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, actions: PayloadAction<string>) => {
      const newTask: Tasks = {
        id: Date.now().toString(),
        text: actions.payload,
        completed: false,
      };
      state.tasks.push(newTask);
    },
    removeTodo: (state, actions: PayloadAction<string>) => {
        state.tasks = state.tasks.filter(tasks => tasks.id !== actions.payload)
    },
  },
});

export const {addTodo, removeTodo} = tasksSlice.actions;
export default tasksSlice.reducer;
