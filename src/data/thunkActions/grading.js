import { StrictDict } from 'utils';

import actions from 'data/actions';
import selectors from 'data/selectors';
import api from 'data/services/lms/api';
import { gradingStatuses as statuses } from 'data/services/lms/constants';
import * as module from './grading';

/**
 * Prefetch the "next" submission in the selected queue.  Only fetches the response info.
 */
export const prefetchNext = () => (dispatch, getState) => (
  api.fetchSubmissionResponse(
    selectors.grading.nextSubmissionId(getState()),
  ).then((response) => {
    dispatch(actions.grading.preloadNext(response));
  })
);

/**
 * Prefetch the "previous" submission in the selected queue.  Only fetches the response info.
 */
export const prefetchPrev = () => (dispatch, getState) => (
  api.fetchSubmissionResponse(
    selectors.grading.prevSubmissionId(getState()),
  ).then((response) => {
    dispatch(actions.grading.preloadPrev(response));
  })
);

/**
 * Fetches the current status for the "next" submission in the selected queue,
 * and calls loadNext with it to update the current selection index info.
 * If the new index has a next submission available, preload its response.
 */
export const loadNext = () => (dispatch, getState) => {
  const nextId = selectors.grading.nextSubmissionId(getState());
  return api.fetchSubmissionStatus(nextId).then((response) => {
    console.log({ loadNext: response });
    dispatch(actions.grading.loadNext({ ...response, submissionId: nextId }));
    if (response.gradeStatus === statuses.inProgress) {
      dispatch(module.startGrading());
    } else {
      dispatch(actions.app.setGrading(false));
    }
    if (selectors.grading.hasNextSubmission(getState())) {
      dispatch(module.prefetchNext());
    }
  });
};

/**
 * Fetches the current status for the "previous" submission in the selected queue,
 * and calls loadPrev with it to update the current selection index info.
 * If the new index has a previous submission available, preload its response.
 */
export const loadPrev = () => (dispatch, getState) => {
  const prevId = selectors.grading.prevSubmissionId(getState());
  return api.fetchSubmissionStatus(prevId).then((response) => {
    dispatch(actions.grading.loadPrev({ ...response, submissionId: prevId }));
    if (response.gradeStatus === statuses.inProgress) {
      dispatch(module.startGrading());
    } else {
      dispatch(actions.app.setGrading(false));
    }
    if (selectors.grading.hasPrevSubmission(getState())) {
      dispatch(module.prefetchPrev());
    }
  });
};

/**
 * Load a list of selected submissionIds, sets the app to review mode, and fetches the current
 * selected submission's full data (grade data, status, and rubric).
 * Then loads current selection and prefetches neighbors.
 * @param {string[]} submissionIds - ordered list of submissionIds for selected submissions
 */
export const loadSelectionForReview = (submissionIds) => (dispatch, getState) => {
  dispatch(actions.grading.updateSelection(submissionIds));
  return api.fetchSubmission(
    selectors.grading.selectedSubmissionId(getState()),
  ).then((response) => {
    dispatch(actions.grading.loadSubmission({
      ...response,
      submissionId: submissionIds[0],
    }));
    dispatch(actions.app.setShowReview(true));
    if (selectors.grading.hasNextSubmission(getState())) {
      dispatch(prefetchNext());
    }
    if (selectors.grading.hasPrevSubmission(getState())) {
      dispatch(prefetchPrev());
    }
  });
};

export const startGrading = () => (dispatch, getState) => {
  console.log('start grading');
  return api.lockSubmission(
    selectors.grading.selectedSubmissionId(getState()),
  ).then(() => {
    console.log('succeed at locking');
    dispatch(actions.app.setGrading(true));
    let gradeData = selectors.grading.selected.gradeData(getState());
    if (gradeData === undefined) {
      gradeData = selectors.app.emptyGrade(getState());
    }
    dispatch(actions.grading.startGrading(gradeData));
  }).catch((error) => {
    console.log({ error });
  });
};

export default StrictDict({
  loadSelectionForReview,
  loadNext,
  loadPrev,
  startGrading,
});
