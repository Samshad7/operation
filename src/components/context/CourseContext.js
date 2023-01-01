import React, { Children, useEffect, useState } from 'react';
import DataContext from './dataContext';
import url from '../api';
import axios from 'axios';

const CourseContext = (props) => {
     const [data,setData]=useState([]);
    const getData = async () => {
        try {
          const response = await axios.get(`${url}/courses`);
        //   console.log(response.data);
          setData(response.data);
        } catch (error) {
          console.log(error);
        }
      }; 
      useEffect(()=>{
        getData();
      },[])

  return (
    <DataContext.Provider value={data}>
        {props.children}
    </DataContext.Provider>
  )
}

export default CourseContext;