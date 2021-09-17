import { StrictDict } from 'utils';

import actions from 'data/actions';
import selectors from 'data/selectors';
import api from 'data/services/lms/api';

export const prefetchPrev = () => (dispatch, getState) => {
    const prevSubmissionId = selectors.submissions.prevSubmissionId(getState());
    prevSubmissionId && api.fetchSubmission(prevSubmissionId).then((response) => {
        dispatch(actions.submissions.preloadPrev(response.submission));
    })
};

export const prefetchNext = () => (dispatch, getState) => {
    const nextSubmissionId = selectors.submissions.nextSubmissionId(getState())
    nextSubmissionId && api.fetchSubmission(nextSubmissionId).then((response) => {
        dispatch(actions.submissions.preloadNext(response.submission));
    })
};

export const fetchSubmissionFromSelection = () => (dispatch, getState) => {
    console.log({
        fetchSubmission: selectors.submissions.selectedSubmissionId(getState()),
    });
    return (
        api.fetchSubmission(
            selectors.submissions.selectedSubmissionId(getState()),
        ).then((response) => {
            dispatch(actions.submissions.loadSubmission(response.submission));
            dispatch(prefetchNext());
            dispatch(prefetchPrev());
            return true;
        })
    );
};

export default StrictDict({
    prefetchPrev,
    prefetchNext,
});
