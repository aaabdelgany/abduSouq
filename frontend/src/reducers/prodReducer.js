const prodReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data;
    case 'GET':
      return state.find((prod) => prod.id === action.data);
    default:
      return state;
  }
};

export default prodReducer;
