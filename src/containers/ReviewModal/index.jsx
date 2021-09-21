import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  FullscreenModal,
  Row,
  Col,
} from '@edx/paragon';

import selectors from 'data/selectors';
import actions from 'data/actions';

import ReviewActions from './ReviewActions';
import ResponseContainer from './ResponseContainer';

import './ReviewModal.scss';
import { GradingRubric } from './GradingRubric';

/**
 * <ReviewModal />
 */
export const ReviewModal = ({
  setShowReview,
  oraName,
  isOpen,
}) => {
  const [showGradingRubric, setshowGradingRubric] = useState(false)
  const toggleShowGradingRubric = () => {
    setshowGradingRubric(!showGradingRubric);
  }

  return (
    <FullscreenModal
      title={oraName}
      isOpen={isOpen}
      beforeBodyNode={(
        <ReviewActions onShowGradingRubricClick={toggleShowGradingRubric} showGradingRubric={showGradingRubric} />
      )}
      onClose={() => setShowReview(false)}
      modalBodyClassName="fullscreen-modal-body"
    >
      <div class="content-block">
        <Row>
          <Col><ResponseContainer /></Col>
          {
            showGradingRubric && <GradingRubric />
          }
        </Row>
      </div>
    </FullscreenModal>
  );
}

ReviewModal.defaultProps = {};
ReviewModal.propTypes = {
  oraName: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setShowReview: PropTypes.func.isRequired,
};

export const mapStateToProps = (state) => ({
  isOpen: selectors.app.showReview(state),
  oraName: selectors.app.oraName(state)
});

export const mapDispatchToProps = {
  setShowReview: actions.app.setShowReview,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewModal);