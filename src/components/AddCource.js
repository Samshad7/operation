import axios from "axios";
import React, { useContext, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import url from "./api";
import { useNavigate } from "react-router-dom";
import dataContext from "./context/dataContext";
import './AddCourse.css';
import  ReactDOM  from "react-dom";
import Portal from "./Portal";

const AddCource = ({closeModal}) => {
  let initialState = { id: "", title: "", description: "" };
  const [course, setCourse] = useState(initialState);
  const history=useNavigate();
  const val=useContext(dataContext);

  console.log(val);

  const submitHandler = (e) => {
    e.preventDefault();
    if(course.id !="" || course.title!="" || course.description !=""){
    console.log(course);
    let ind=val.findIndex(x=>x.id==course.id);
    if(ind==-1){
      console.log(ind);
    setCourse(initialState);
    addData(course);
    history("/");
    }else{
      alert('Please do not provide duplicate records.');
    }
}else{
    toast.error("Please fill all fields.");
  }
  };

  //Post data
  const addData = async (data) => {
    try {
      const response = await axios.post(`${url}/courses`, data);
      console.log(response);
      console.log("success");
    } catch (error) {
      console.log(error);
      console.log("error");
    }
  };

  const clearForm = () => {
    setCourse(initialState);
  };
  const Component=(
    <>
    <div className="overlay">
      <div className="overlayContainer">
        <button onClick={()=>closeModal(false)}> X </button>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label>Course id</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter id"
            value={course.id}
            onChange={(e) => setCourse({ ...course, id: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Title"
            value={course.title}
            onChange={(e) => setCourse({ ...course, title: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Description"
            value={course.description}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
            required
          />
        </Form.Group>

        <Container className="text-center">
          <Button type="submit" variant="success">
            Add Course
          </Button>
          <Button variant="warning" onClick={clearForm}>
            Clear
          </Button>
        </Container>
      </Form>
      </div>
    </div>
    </>
    
  );
  // return (<Portal>
  //   {/* <Component /> */}
  //   <div>Hiiiii</div>
  // </Portal>)
  return <div>Hiiiii</div>
};

export default AddCource;
