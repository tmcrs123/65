import { WRONG_LOGIN_MESSAGE, CLEAR_MESSAGE } from "../../actions/TYPES2";
import { ERROR } from "../../helpers/constants";

export default function(state = { type: "", message: "" }, action) {
  switch (action.type) {
    case WRONG_LOGIN_MESSAGE:
      console.log("in reducer");
      return { type: ERROR, message: "Wrong email and password combination." };
    case CLEAR_MESSAGE:
      return { type: "", message: "" };
    default:
      return state;
  }
}
