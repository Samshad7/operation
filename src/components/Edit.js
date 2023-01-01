import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import url from "./api";

const Edit = () => {
  const initialState = { id: "", title: "", description: "" };
  const [updatedCourse, setUpdatedCourse] = useState(initialState);
  const history = useNavigate();

  useEffect(() => {
    setUpdatedCourse({
      id: localStorage.getItem("Id"),
      title: localStorage.getItem("Title"),
      description: localStorage.getItem("Description"),
    });
    // setCourse(localStorage.getItem("Data"));
  }, []);


  const updatePostData= async (value)=>{
    try{
        const response=await axios.put(`${url}/courses`,value);
        console.log(response);
    }catch(error){
        console.log(error);
        toast.error('Not updated');
    }
    

  }

  const submitEditHandler = (e) => {
    
    e.preventDefault();
    updatePostData(updatedCourse);
    history("/");

  };

  const cancelHandler = (e) => {
    e.preventDefault();
    history("/");
  };
  return (
    <div>
      <Form onSubmit={submitEditHandler}>
        <Form.Group className="mb-3">
          <Form.Label>id</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter id"
            value={updatedCourse.id}
            onChange={(e) =>
              setUpdatedCourse({ ...updatedCourse, id: e.target.value })
            }
            disabled
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Title"
            value={updatedCourse.title}
            onChange={(e) =>
              setUpdatedCourse({ ...updatedCourse, title: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Description"
            value={updatedCourse.description}
            onChange={(e) =>
              setUpdatedCourse({
                ...updatedCourse,
                description: e.target.value,
              })
            }
          />
        </Form.Group>

        <Container className="text-center">
          <Button type="submit" variant="success">
            Save Course
          </Button>
          <Button variant="warning" onClick={cancelHandler}>
            Cancel
          </Button>
        </Container>
      </Form>
    </div>
  );
};

export default Edit;
