export const Types = {
  LOGIN_ACTION: 'userLoged/LOGIN_ACTION',
  LOGOUT_ACTION: 'userLoged/LOGOUT_ACTION'
};

const INITIAL_VALUES = {
  isLoged: false,
  userData: {}
};

export default function userLoged(state = INITIAL_VALUES, action) {
  switch (action.type) {
    case Types.LOGIN_ACTION:
      return {
        ...state,
        isLoged: true,
        userData: action.payload
      };
    case Types.LOGOUT_ACTION:
      return {
        isLoged: false,
        userData: {}
      };
    default:
      return state;
  }
}
