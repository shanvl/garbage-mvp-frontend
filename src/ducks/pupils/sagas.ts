import db from "../../firebase/firebase";
import { takeLatest, all, call, put } from "redux-saga/effects";
import { pupilsActions } from "./actions";
import { PupilsActionTypes } from "./contstants";

const fetchAllPupilsSaga = function*() {
  try {
    const pupilsCollection = db.ref("pupils");
    const pupilsData = yield call([pupilsCollection, pupilsCollection.once], "value");
    const pupils = yield call([pupilsData, pupilsData.val]);

    yield put(pupilsActions.fetchAllPupilsSuccess({ entities: pupils }));
  } catch (error) {
    yield put(pupilsActions.fetchAllPupilsError({ error: "Не удалось скачать список учеников" }));
  }
};

const changeResourceSaga = function*(
  action: ReturnType<typeof pupilsActions.addResourceRequest> | ReturnType<typeof pupilsActions.subtractResourceRequest>
) {
  try {
    const { type, id, amount } = action.payload;
    const pupilRef = db.ref(`pupils/${id}/resources`);
    yield call([pupilRef, pupilRef.update], { [type]: amount });
    if (action.type === PupilsActionTypes.ADD_RESOURCE_REQUEST) {
      yield put(pupilsActions.addResourceSuccess(action.payload));
    } else {
      yield put(pupilsActions.subtractResourceSuccess(action.payload));
    }
  } catch (error) {
    if (action.type === PupilsActionTypes.ADD_RESOURCE_REQUEST) {
      yield put(pupilsActions.addResourceError({ error: error.message }));
    } else {
      yield put(pupilsActions.subtractResourceError({ error: error.message }));
    }
  }
};

const pupilsSaga = function*() {
  yield all([
    takeLatest(PupilsActionTypes.FETCH_ALL_PUPILS_REQUEST, fetchAllPupilsSaga),
    takeLatest(
      [PupilsActionTypes.ADD_RESOURCE_REQUEST, PupilsActionTypes.SUBTRACT_RESOURCE_REQUEST],
      changeResourceSaga
    ),
  ]);
};

export default pupilsSaga;
