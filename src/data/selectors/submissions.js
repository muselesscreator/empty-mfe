import _ from 'lodash';
import { createSelector } from 'reselect';

import { StrictDict } from 'utils';
import * as module from './submissions';

export const simpleSelectors = {
  list: state => state.submissions.list,
  selected: state => state.submissions.selected,
  activeIndex: state => state.submissions.activeIndex,
  current: state => state.submissions.current,
};

/**
 * Returns the submission list in default order for the table.
 */
export const listData = createSelector(
  [simpleSelectors.list],
  (list) => _.sortBy(
    Object.values(list),
    ['submissionId'],
  ),
);

/**
 * returns the selected submission id
 * @return {string} selected submission id
 */
export const selectedSubmissionId = createSelector(
  [module.simpleSelectors.selected, module.simpleSelectors.activeIndex],
  (selected, index) => selected[index],
);

/**
 * returns static data from the active selected submission
 * @return {obj} - staticData
 *  { submissionId, username, teamName, dateSubmitted }
 */
export const selectedStaticData = createSelector(
  [module.selectedSubmissionId, module.simpleSelectors.list],
  (submissionId, list) => {
    const submission = list[submissionId];
    const { grade, gradeStatus, ...staticData } = submission;
    return staticData;
  },
);

/**
 * Returns the username for the selected submission
 * @return {string} username
 */
export const selectedUsername = createSelector(
  [module.selectedStaticData],
  (staticData) => staticData.username,
);

/**
 * Returns the grade status for the selected submission
 * @return {string} grade status
 */
export const selectedGradeStatus = createSelector(
  [module.simpleSelectors.current],
  (current) => current.gradeStatus,
);

/**
 * Returns the grade data for the selected submission
 * @return {obj} grade data
 *  { score, overallFeedback, criteria }
 */
export const selectedGradeData = createSelector(
  [module.simpleSelectors.current],
  (current) => current.gradeData,
);

/**
 * Returns the response data for the selected submission
 * @return {obj} response
 *   { text, files: [] }
 */
export const selectedResponse = createSelector(
  [module.simpleSelectors.current],
  (current) => current.response,
);

export const selected = StrictDict({
  submissionId: module.selectedSubmissionId,
  staticData: module.selectedStaticData,
  username: module.selectedUsername,
  gradeStatus: module.selectedGradeStatus,
  gradeData: module.selectedGradeData,
  response: module.selectedResponse,
});

/**
 * Returns true iff there exists a selection previous to the current selection
 * in the queue.
 * @return {bool} has previous submission?
 */
export const hasPrevSubmission = createSelector(
  [simpleSelectors.activeIndex],
  (activeIndex) => activeIndex > 0,
);

/**
 * Returns true iff there exists a selection after the current selection
 * in the queue.
 * @return {bool} has next submission?
 */
export const hasNextSubmission = createSelector(
  [simpleSelectors.selected, simpleSelectors.activeIndex],
  (list, activeIndex) => activeIndex < list.length - 1,
);

/**
 * Returns the submissionId for the previous submission in the selection queu
 * @return {string} previous submission id (null if there isn't one)
 */
export const prevSubmissionId = createSelector(
  [simpleSelectors.selected, simpleSelectors.activeIndex],
  (list, activeIndex) => {
    if (activeIndex > 0) {
      return list[activeIndex - 1];
    }
    return null;
  },
);

/**
 * Returns the submissionId for the next submission in the selection queu
 * @return {string} next submission id (null if there isn't one)
 */
export const nextSubmissionId = createSelector(
  [simpleSelectors.selected, simpleSelectors.activeIndex],
  (list, activeIndex) => {
    if (activeIndex < list.length - 1) {
      return list[activeIndex + 1];
    }
    return null;
  },
);

export default StrictDict({
  ...simpleSelectors,
  listData,
  selectedSubmissionId,
  hasPrevSubmission,
  hasNextSubmission,
  nextSubmissionId,
  prevSubmissionId,
  selected,
});
