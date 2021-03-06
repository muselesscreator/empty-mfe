import actions from 'data/actions';

const initialState = {
  allSubmissions: {
    /**
     * <submissionId>: {
     *   submissionId: '',
     *   username: ''
     *   teamName: ''
     *   dateSubmitted: 0,
     *   gradeStatus: ''
     *   grade: {
     *     pointsEarned: 0,
     *     pointsPossible: 0,
     *   }
     * }
     */
  },
};

// eslint-disable-next-line no-unused-vars
const grades = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.submissions.loadList.toString():
      return { ...state, allSubmissions: payload };
    default:
      return state;
  }
};

export { initialState };
export default grades;
