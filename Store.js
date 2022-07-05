import { createStore } from "redux";

const inisialState = {
  students: [
    { id: 1, name: "saeed", family: "khanvari" },
    { id: 2, name: "pourya", family: "sanaye" },
  ],
  next_id: 3,
  id: 0,
  name: "",
  family: "",
};

function reducer(state = inisialState, action) {
  if (action.type == "SAVE_ITEM") {
    if (state.id == 0) {
      let nstd = {
        id: state.next_id,
        name: action.payload.name,
        family: action.payload.family,
      };
      console.log(nstd);
      return Object.assign({}, state, {
        students: state.students.concat(nstd),
        next_id: state.next_id + 1,
      });
    } else {
      let nstds = [];
      // nstds = new students
      for (let std of state.students) {
        if (std.id == state.id) {
          nstds.push({
            id: state.id,
            name: action.payload.name,
            family: action.payload.family,
          });
        } else {
          nstds.push(std);
        }
      }
      return Object.assign({}, state, {
        students: nstds,
        id: 0,
        name: "",
        family: "",
      });
    }
  } else if (action.type == "DELETE_ITEM") {
    return Object.assign({}, state, {
      students: state.students.filter((v) => v.id != action.payload),
    });
  } else if (action.type == "EDIT_ITEM") {
    let stds = state.students.filter((v) => v.id == action.payload)[0];
    console.log(stds);
    return Object.assign({}, state, {
      id: stds.id,
      name: stds.name,
      family: stds.family,
    });
  } else if ( action.type == 'CANCEL'){
    return Object.assign({},state,{id : 0 , name : action.payload.name ,family : action.payload.family})
  }
  return state;
}

const Store = createStore(reducer);

export default Store;
