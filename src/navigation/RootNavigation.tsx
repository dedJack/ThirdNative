import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TaskList from '../screens/TaskList';


const Tab = createBottomTabNavigator();
const RootNavigation:React.FC=()=> {
  return (
    <Tab.Navigator>
        <Tab.Screen name="Tasks" component={TaskList}/>
    </Tab.Navigator>
  )
}

export default RootNavigation