//Action Types
export const LOGGED_IN = `auth/LOGGED_IN`;
export const LOGGED_OUT = `auth/LOGGED_OUT`;

export const initialState = {
  isLoggedIn: false,
  user: null,
  can: null,
  token: null,
  homeScreen: null,
};

//REDUCER
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGGED_IN: {
      let { user, can, token } = action;
      let { viewProduction, viewInstallation, viewProject, viewInvoice } = can;
      // let dashKey =  {
      //   'production': viewProduction && !viewProject && !viewInvoice,
      //   'installation': viewInstallation && !viewProject && !
      // }
      // const homeScreen =
      //   {

      //   } [dashKey]
      return { ...state, isLoggedIn: true, user, token, can };
    }

    case LOGGED_OUT: {
      return { ...state, ...initialState };
    }

    default:
      return state;
  }
};

export default authReducer;
