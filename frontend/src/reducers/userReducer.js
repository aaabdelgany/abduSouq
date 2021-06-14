const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data;
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};

export default userReducer;
