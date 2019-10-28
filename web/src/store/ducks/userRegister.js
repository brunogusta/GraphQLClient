export const Types = {
  REGISTER_REQUEST: 'userRegister/REGISTER_REQUEST',
  REGISTER_ERROR: 'userRegister/REGISTER_ERROR',
  REGISTER_LOADING: 'userRegister/REGISTER_LOADING',
  REGISTER_SUCCESS: 'userRegister/REGISTER_SUCCESS'
};

const INITIAL_VALUES = {
  error: false,
  errorMessage: '',
  loading: false,
  success: false,
  data: {}
};

export default function userRegister(state = INITIAL_VALUES, action) {
  switch (action.type) {
    case Types.REGISTER_ERROR:
      return {
        ...state,
        error: true,
        success: false,
        errorMessage: action.errorMessage
      };
    case Types.REGISTER_SUCCESS:
      return {
        ...state,
        error: false,
        success: true,
        errorMessage: action.errorMessage
      };
    default:
      return state;
  }
}

export const Creators = {
  handleRegisterSuccess: () => ({
    type: Types.REGISTER_SUCCESS
  }),
  handleRegisterError: action => ({
    type: Types.REGISTER_ERROR,
    payload: action.messageError
  })
};
