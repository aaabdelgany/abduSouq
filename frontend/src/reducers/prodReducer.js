
const prodReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data;
    default:
      return state
  }
};

export default prodReducer;
