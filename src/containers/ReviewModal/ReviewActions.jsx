import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  ActionRow,
  Button,
  IconButton,
  Icon,
} from '@edx/paragon';

import { ChevronLeft, ChevronRight, Edit, Close } from '@edx/paragon/icons';


import selectors from 'data/selectors';

import StatusBadge from 'components/StatusBadge';
import './ReviewModal.scss';
import actions from 'data/actions';
import thunkActions from 'data/thunkActions';

export const ReviewActions = ({
  submission: { status, username },
  loadNext,
  loadPrev,
  activeIndex,
  selected,
  prefetchNext,
  prefetchPrev,
  onShowGradingRubricClick,
  showGradingRubric
}) => (
  <div className="review-actions">
    <ActionRow>
      <span className="review-actions-username">{username}{username}{username}{username}{username}
        <StatusBadge status={status} />
      </span>
      <div className="review-actions-grading-group">
        <Button variant="outline-primary" onClick={onShowGradingRubricClick}>{showGradingRubric ? 'Hide' : 'Show'} Rubric</Button>
        <Button
          variant="primary"
          iconAfter={showGradingRubric ? Close : Edit}
          onClick={onShowGradingRubricClick}
        >{showGradingRubric ? 'Stop Grading' : 'Start Grading'}</Button>
        <ActionRow.Spacer />
        <IconButton size="inline" src={ChevronLeft} iconAs={Icon} onClick={() => {
          loadPrev();
          prefetchPrev();
        }} />
        <span>{activeIndex + 1} of {selected.length}</span>
        <IconButton size="inline" src={ChevronRight} iconAs={Icon} onClick={() => {
          loadNext();
          prefetchNext();
        }} />

      </div>
    </ActionRow>
  </div>
);

let submissionPropType = PropTypes.shape({
  status: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
})

ReviewActions.propTypes = {
  submission: submissionPropType.isRequired,
  loadNext: PropTypes.func.isRequired,
  loadPrev: PropTypes.func.isRequired,
  activeIndex: PropTypes.number.isRequired,
  selected: PropTypes.arrayOf(submissionPropType).isRequired,
  onShowGradingRubricClick: PropTypes.func.isRequired,
  showGradingRubric: PropTypes.func.isRequired,
};

export const mapStateToProps = (state) => ({
  submission: selectors.submissions.currentSelection(state),
  selected: selectors.submissions.selected(state),
  activeIndex: selectors.submissions.activeIndex(state),
});

export const mapDispatchToProps = {
  loadNext: actions.submissions.loadNext,
  loadPrev: actions.submissions.loadPrev,
  prefetchPrev: thunkActions.submissions.prefetchPrev,
  prefetchNext: thunkActions.submissions.prefetchNext
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewActions);
