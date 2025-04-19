import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {FadeInLeft, FadeOutUp, Layout} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../store/store';
import {deleteTask, fetchTasks, getTask, Task} from '../store/taskSlice';

const TaskList: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  //TO send the value from reducer to store.
  //It will need reducer.
  const dispatch = useDispatch<AppDispatch>();

  //To get the value from state.
  const task = useSelector((state: RootState) => state.tasks.tasks);

  const handleAddTask = () => {
    dispatch(
      getTask({
        description: inputValue,
        completed: false,
      }),
    );
    setInputValue('');
    setModalVisible(false);
  };

  const handleDelete = (taskId: string) => {
    Alert.alert(
      'Delete Task', // Title
      'Do you want to delete this task?', // Message
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            dispatch(deleteTask(taskId));
          },
          style: 'destructive',
        },
      ],
    );
  };

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  const createRenderTask = ({item}: {item: Task}) => (
    <Animated.View
      entering={FadeInLeft}
      exiting={FadeOutUp}
      layout={Layout.springify()}
      style={styles.container1}>
      <TouchableOpacity style={{flex: 1}}>
        <Text style={{fontSize: 16, fontWeight: '500'}}>
          {item.description}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: '#e74c3c',
          paddingVertical: 6,
          paddingHorizontal: 12,
          borderRadius: 20,
        }}
        onPress={() => handleDelete(item.id)}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>Remove</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tasks</Text>
      <FlatList
        data={task}
        renderItem={createRenderTask}
        keyExtractor={item => item.id}
      />

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.addBtnText}>Add</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.header}>Add New Task</Text>
            <TextInput
              style={styles.input}
              value={inputValue}
              onChangeText={setInputValue}
              placeholder="Enter your task"
              placeholderTextColor={'grey'}
            />
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.cancleBtn}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.btnText}>cancle</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.cancleBtn, {backgroundColor: 'green'}]}
                onPress={handleAddTask}>
                <Text style={styles.btnText}>Add Task</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  header: {
    marginBottom: 15,
    fontSize: 25,
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  addBtn: {
    right: 10,
    bottom: 10,
    position: 'absolute',
    margin: 5,
    alignItems: 'center',
    paddingHorizontal: 10,
    width: 80,
    paddingVertical: 10,
    backgroundColor: 'purple',
    borderRadius: 20,
    shadowColor: 'black',
    shadowRadius: 5,
    elevation: 5,
  },
  addBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(33, 30, 30, 0.5)',
    justifyContent: 'center',
  },
  modalView: {
    width: '90%',
    margin: 15,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'lightgrey',
    fontSize: 18,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  btnContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  cancleBtn: {
    margin: 5,
    alignItems: 'center',
    paddingHorizontal: 7,
    width: 80,
    paddingVertical: 10,
    backgroundColor: 'red',
    borderRadius: 10,

    shadowColor: 'black',
    shadowRadius: 5,
    elevation: 5,
  },
  btnText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  container1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 5,
    borderLeftColor: '#8e44ad', // nice purple accent
  },
});

export default TaskList;
