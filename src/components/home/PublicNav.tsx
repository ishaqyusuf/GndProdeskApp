import { Text } from '@rneui/base';
import { useAuth } from '@src/auth-provider';
import useConsole from '@src/utils/use-console';
import { fetchApi } from '@src/utils/use-fetch';
import React, { useContext, useEffect, useState } from 'react';
import {  Dimensions, ScrollView, StyleSheet,  View } from 'react-native'; 
import { createNavCardItem, NavCardItem2 } from './NavCardItem'; 

const PublicNav = ({navigation,type }) => {
        let _item = createNavCardItem;
  const _card = {
    production: {
      pending: _item('0','Pending','folder-open','ProjectsScreen','#edd0a1'),
      late: _item('0','Late','office','ProjectsScreen','#f57749'),
      completed:_item('20','Completed','office','ProjectsScreen','#7cf578'),
      total: _item('0','Total','office','ProjectsScreen','#b3c2b2')
    },
    installation: {
      pending: _item('0','Pending','folder-open','InstallationsScreen','#edd0a1'),
      completed:_item('20','Completed','office','InstallationsScreen','#7cf578'),
      total: _item('0','Total','office','InstallationsScreen','#b3c2b2')
    }
  }[type]
 const _rows = {
      production: [
        ['pending','late'],
        ['completed','total']
      ],
      installation: [
        ['pending','completed'],
        ['total']
      ]
    }[type]
    useConsole.log(JSON.stringify(_card))
    useConsole.log(JSON.stringify(_rows))
  const auth = useAuth()
    const [data,setData] = useState<any>({
      title: `${type} Overview`,
      cards: _card
    })
   
    useEffect(() => {
      fetchApi({
        debug: true
      }).get('unit-tasks',{
        page: type,
        stats: true,
      }).then(data => {
        useConsole.log(data)
        let card  =data.card;
        Object.entries(data)
        .map(([k,v]) => card[k].title = v)
        setData({
          ...data,
          card
        })
      })
    },[])
    

  return (
    <View className="flex-col">
         <View className="m-4">
          <Text className="text-xl capitalize font-bold">
            {data.title}
            </Text>   
         </View>
         <View className="px-2" style={styles.app}>
      {_rows.map(sec => (<Row className="">
         {sec.map(n => 
  <Col numRows={sec.length} className="m-4">
     {/* <View className="bg-red-400 m-2">
       <Text>
        {
          JSON.stringify(data.cards[n])
        }
      </Text>
     </View> */}
    <NavCardItem2  className="m-4 " navigation={navigation} nav={data.cards[n]}/> 
  </Col>
  )}  
      </Row>))} 
    </View>   
    </View>
  );
}
export default PublicNav;
const styles = StyleSheet.create({
   
  app: {
    flex: 4, // the number of columns you want to devide the screen into
    marginHorizontal: "auto",
    width: Dimensions.get('screen').width, 
  },
  row: {
    flexDirection: "row"
  },
  "1col":  {
   
    flex:  1
  },
  "2col":  {
    
    flex:  2
  },
  "3col":  {
    flex:  3
  },
  "4col":  {
    flex:  4
  }
});

// RN Code
const Col = ({ numRows, children }) => {
  return  (
    <View style={styles[`${numRows}col`]}>{children}</View>
  )
}

const Row = ({ children }) => (
  <View style={styles.row}>{children}</View>
)