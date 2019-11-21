import { fork } from "redux-saga/effects";
import pupilsSaga from "../ducks/pupils/sagas";

export default function* rootSaga() {
  yield fork(pupilsSaga);
}
