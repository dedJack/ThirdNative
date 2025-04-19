import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Task {
  id: string;
  description: string;
  completed: boolean;
}

interface TaskState {
  tasks: Task[];
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
  error: string | null;
}

export const initialState: TaskState = {
  tasks: [],
  status: 'idle',
  error: null,
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  try {
    const storedTask = await AsyncStorage.getItem('tasks');
    return storedTask ? JSON.parse(storedTask) : [];
  } catch (error) {
    console.error(error);
  }
});

export const getTask = createAsyncThunk(
  'tasks/getTask',
  async (task: Omit<Task, 'id'>) => {
    try {
      const newTask = {...task, id: Date.now().toString()};
      const storedTask = await AsyncStorage.getItem('tasks');

      let oldTask: Task[] = [];

      // Make sure the parsed value is an array
      if (storedTask) {
        const parsed = JSON.parse(storedTask);
        if (Array.isArray(parsed)) {
          oldTask = parsed;
        }
      }

      oldTask.push(newTask);
      await AsyncStorage.setItem('tasks', JSON.stringify(oldTask));

      return newTask;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId: string, {getState}) => {
    try {
      const state = getState() as {tasks: TaskState};
      const updatedTask = state.tasks.tasks.filter(item => item.id !== taskId);
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTask));

      return taskId;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
);

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(getTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.tasks = state.tasks.filter(item => item.id !== action.payload);
      });
  },
});

export default taskSlice.reducer;
