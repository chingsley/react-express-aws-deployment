import * as ACTION_TYPES from "../actions/action_types";

const initialState = {
  is_authenticated: false,
  profile: null,
  db_profile: null,
  db_posts: null,
  post_comments: null,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN_SUCCESS:
      return {
        ...state,
        is_authenticated: true,
      };
    case ACTION_TYPES.LOGIN_FAILURE:
      return {
        ...state,
        is_authenticated: false,
      };
    case ACTION_TYPES.ADD_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    case ACTION_TYPES.REMOVE_PROFILE:
      return {
        ...state,
        profile: null,
      };
    case ACTION_TYPES.SET_DB_PROFILE:
      return {
        ...state,
        db_profile: action.payload,
      };
    case ACTION_TYPES.REMOVE_DB_PROFILE:
      return {
        ...state,
        db_profile: null,
      };
    case ACTION_TYPES.FETCH_DB_POSTS:
      return {
        ...state,
        db_posts: action.payload,
      };
    case ACTION_TYPES.REMOVE_DB_POSTS:
      return {
        ...state,
        db_posts: null,
      };
    case ACTION_TYPES.FETCH_POST_COMMENTS:
      return {
        ...state,
        post_comments: action.payload,
      };
    case ACTION_TYPES.REMOVE_POST_COMMENTS:
      return {
        ...state,
        post_comments: null,
      };
    default:
      return state;
  }
};

export default AuthReducer;
