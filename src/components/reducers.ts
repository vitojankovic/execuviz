const initialState = {
  userData: {
    userId: '',
    userName: '',
    userInfo: {},
  },
  companyData: [],
};

const rootReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_DECODED_TOKEN':
      return { ...state, decodedToken: action.payload }; 
    case 'SET_USER_DATA':
      return {
        ...state,
        userData: action.payload,
      };
    case 'SET_COMPANY_DATA':
      return {
        ...state,
        companyData: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
