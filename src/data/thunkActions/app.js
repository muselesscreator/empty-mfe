import { StrictDict } from 'utils';

import actions from 'data/actions';
import selectors from 'data/selectors';
import api from 'data/services/lms/api';
import { fetchSubmissionFromSelection } from './submissions';

const locationId = window.location.pathname.slice(1);

// eslint-disable-next-line no-unused-vars
export const initialize = () => (dispatch) => (
  api.initializeApp(locationId).then((response) => {
    dispatch(actions.app.loadOraMetadata(response.oraMetadata));
    dispatch(actions.app.loadCourseMetadata(response.courseMetadata));
    dispatch(actions.submissions.loadList(response.submissions));
  })
);

export const loadSelectionForReview = (selection) => (dispatch) => {
  const submissions = selection.map(row => row.original);
  dispatch(actions.submissions.updateSelection(submissions));
  dispatch(actions.app.setShowReview(true));
  dispatch(fetchSubmissionFromSelection());
};

export default StrictDict({
  initialize,
  loadSelectionForReview,
});
