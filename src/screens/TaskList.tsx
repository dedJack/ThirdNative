import React, {useState} from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addTodo, removeTodo} from '../store/taskSlice';
import {Tasks} from '../store/taskSlice';
import {RootState} from '../store/store';
import Animated, {FadeInLeft, FadeOutRight} from 'react-native-reanimated';

const TaskList: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  //TO send the value from reducer to store.
  //It will need reducer.
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      dispatch(addTodo(inputValue));
      setInputValue('');
      setModalVisible(false);
    }
  };

  //To get the value from state.
  const todoList = useSelector((state: RootState) => state.tasks);



  const createRenderTask = ({item}: {item: Tasks}) => (
    <Animated.View entering={FadeInLeft} exiting={FadeOutRight} 
    style={styles.container1} >
      <Text> {item.text}</Text>
      <TouchableOpacity
        style={[styles.addBtn,{bottom:0,right:0}]}
        onPress={()=>dispatch(removeTodo(item.id))}>
        <Text style={styles.addBtnText}>Remove</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tasks</Text>
      <FlatList
        data={todoList}
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
                onPress={handleAddTodo}
                style={[styles.cancleBtn, {backgroundColor: 'green'}]}>
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
    marginBottom: 5,
    borderWidth: 0.5,
    borderRadius: 5,
    marginHorizontal: 5,
    paddingHorizontal: 5,
    paddingVertical: 15,
  },
});

export default TaskList;
