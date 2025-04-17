import React from 'react'
import Projects from '../screens/Projects';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TaskList from '../screens/TaskList';


const Tab = createBottomTabNavigator();
const RootNavigation:React.FC=()=> {
  return (
    <Tab.Navigator>
        <Tab.Screen name="Tasks" component={TaskList}/>
        <Tab.Screen name="Projects" component={Projects} />
    </Tab.Navigator>
  )
}

export default RootNavigation