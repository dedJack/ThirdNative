import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Projects:React.FC=()=> {
  return (
    <View style={styles.container}><Text style={styles.header}>Projects</Text></View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
    },
    header:{
        fontSize:18,
        fontWeight:"bold",
    }
})

export default Projects