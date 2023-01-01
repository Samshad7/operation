import React, { Fragment, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import axios from "axios";
import url from "./api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import AddCource from "./AddCource";
import { ReactDOM } from "react";

const Home = () => {
  const [data, setData] = useState([]);
  const [modal,setModal] = useState(false);

  const getData = async () => {
    try {
      const response = await axios.get(`${url}/courses`);
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  //Delete a course
  const deleteHandler = (id) => {
    axios.delete(`${url}/courses/${id}`).then(
      (response) => {
        const newData = data.filter((item) => item.id != id);
        setData(newData);
        toast.success("Course Deleted");
      },
      (error) => {
        toast.error("Course was not deleted.");
      }
    );
  };

  //Edit
  const editHandler = (id, title, description) => {
    localStorage.setItem("Id", id);
    localStorage.setItem("Title", title);
    localStorage.setItem("Description", description);
    localStorage.setItem("Data", data);
  };

  return (
    <Fragment>
      <div>
        <div class="neato-header">
          <h2>List of Courses</h2>
          <h1>Gorilla Courses</h1>
        </div>
      </div>
      <div style={{ margin: "10rem" }}>
        {/* <Link to="/add"> */}
          <Button size="lg" style={{ margin: "10px", marginLeft: "80%" }} onClick={()=>setModal(true)}>
            Add Course
          </Button>
        {/* </Link> */}
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0
              ? data.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.title}</td>
                      <td>{item.description}</td>
                      <td>
                        <Link to="/edit">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="27"
                            height="30"
                            fill="currentColor"
                            class="bi bi-pencil-square"
                            viewBox="0 0 16 16"
                            onClick={() =>
                              editHandler(
                                item.id,
                                item.title,
                                item.description,
                                data
                              )
                            }
                          >
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path
                              fill-rule="evenodd"
                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                            />
                          </svg>
                          {/* <Button
                            onClick={() =>
                              editHandler(
                                item.id,
                                item.title,
                                item.description,
                                data
                              )
                            }
                          >
                            Edit
                          </Button> */}
                        </Link>
                        &nbsp;
                        {/* <Button onClick={() => deleteHandler(item.id)}>
                          Delete
                        </Button> */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="27"
                          height="30"
                          fill="currentColor"
                          class="bi bi-trash-fill"
                          viewBox="0 0 16 16"
                          style={{ cursor: "pointer" }}
                          onClick={() => deleteHandler(item.id)}
                        >
                          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                        </svg>
                      </td>
                    </tr>
                  );
                })
              : "No Courses Available."}
          </tbody>
        </Table>
      </div>
      {modal && <AddCource closeModal={setModal} />}
    </Fragment>,
    document.getElementById("portal")
  );
};

export default Home;
