const prodReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data;
    case 'MODIFY':
      const modifiedProd = action.data;
      const main = state.filter((item) => item._id !== modifiedProd._id);
      return main.concat(modifiedProd);
    default:
      return state;
  }
};

export default prodReducer;
