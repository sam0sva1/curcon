import { CHANGE_PRIMERY_COLOR } from '../actions/theme';


const initialState = {
  primeryColor: '#4F6D7A',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PRIMERY_COLOR:
      return {
        ...state,
        primeryColor: action.color,
      };
    default:
      return state;
  }
};
