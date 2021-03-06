import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  ActionRow,
  Button,
} from '@edx/paragon';
import { Edit } from '@edx/paragon/icons';

import actions from 'data/actions';
import selectors from 'data/selectors';
import thunkActions from 'data/thunkActions';

import StatusBadge from 'components/StatusBadge';
import SubmissionNavigation from './SubmissionNavigation';
import './ReviewModal.scss';

export const ReviewActions = ({
  gradeStatus,
  toggleShowRubric,
  showRubric,
  username,
  startGrading,
}) => (
  <div>
    <ActionRow className="review-actions">
      <span className="review-actions-username">
        {username}
        <StatusBadge className="review-actions-status" status={gradeStatus} />
      </span>
      <div className="review-actions-group">
        <Button variant="outline-primary" onClick={toggleShowRubric}>
          {showRubric ? 'Hide' : 'Show'} Rubric
        </Button>
        <Button variant="primary" iconAfter={Edit} onClick={startGrading}>Start Grading</Button>
        <SubmissionNavigation />
      </div>
    </ActionRow>
  </div>
);
ReviewActions.propTypes = {
  gradeStatus: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  showRubric: PropTypes.bool.isRequired,
  toggleShowRubric: PropTypes.func.isRequired,
  startGrading: PropTypes.func.isRequired,
};

export const mapStateToProps = (state) => ({
  username: selectors.grading.selected.username(state),
  gradeStatus: selectors.grading.selected.gradeStatus(state),
  showRubric: selectors.app.showRubric(state),
});

export const mapDispatchToProps = {
  toggleShowRubric: actions.app.toggleShowRubric,
  startGrading: thunkActions.grading.startGrading,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewActions);
