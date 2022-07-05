import "./App.css";
// import { useSelector } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import { type } from "@testing-library/user-event/dist/type";
import "bootstrap/dist/css/bootstrap.css";
import { Button } from "react-bootstrap";
import { useEffect } from "react";
// Put any other imports below so that CSS from your
// components takes precedence over default styles.

function App() {
  const students = useSelector((state) => state.students);
  const name = useSelector((state) => state.name);
  const family = useSelector((state) => state.family);
  const dispatch = useDispatch();
  const txtName = useRef();
  const txtFamily = useRef();
  
  useEffect(() => {
    txtName.current.value = name
    txtFamily.current.value = family
  })

  return (
    <div style={{ textAlign: "center" }}>
      <table className="table h4">
        <tr id="row1">
          <th className="p-4" id="cell1-0">
            id
          </th>
          <th className="p-4" id="cell1-1">
            name
          </th>
          <th className="p-4" id="cell1-2">
            family
          </th>
        </tr>
        {students.map((v, i) => (
          <tr>
            <td className="p-4" id="cell0-0">
              {v.id}
            </td>
            <td className="p-4" id="cell0-1">
              {v.name}
            </td>
            <td className="p-4" id="cell0-2">
              {v.family}
            </td>
            <td className="p-4">
              <Button
                variant="danger"
                className="p-2"
                active
                onClick={() => {
                  dispatch({ type: "DELETE_ITEM", payload: v.id });
                }}
              >
                Delete
              </Button>
            </td>
            <td className="p-4">
              <Button
                className="p-2"
                variant="primary"
                active
                onClick={() => {
                  dispatch({ type: "EDIT_ITEM", payload: v.id });
                }}
              >
                Edit
              </Button>
            </td>
          </tr>
        ))}
      </table>
      <input
        className="rounded p-3 m-2"
        placeholder="Enter Your Name"
        type="text"
        ref={txtName}
      />
      <input
        className="rounded p-3 m-2"
        placeholder="Enter Your familyName"
        type="text"
        ref={txtFamily}
      />
      <div className="d-flex justify-content-center my-3 ">
        <Button
          className="p-3"
          variant="success"
          onClick={() => {
            dispatch({
              type: "SAVE_ITEM",
              payload: {
                name: txtName.current.value,
                family: txtFamily.current.value,
              },
            });
          }}
        >
          Save Item
        </Button>
      </div>
      <div className="d-flex justify-content-center my-3 ">
        <Button
          className="p-3"
          variant="danger"
          onClick={() => {
            dispatch({
              type: "CANCEL",
              payload: {
                id : 0,
                name: '',
                family: '',
              },
            });
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default App;
