import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    Card
} from '@edx/paragon';

/**
 * <GradingRubric />
 */
export const GradingRubric = ({
}) => {
    return (
        <div className="gradding-rubric-container">
            <Card className="grading-rubric-card">
                <Card.Body>
                    <h3>Rubric</h3>
                    <p>Start grading</p>
                    <p>Start grading</p>
                    <p>Start grading</p>
                    <p>Start grading</p>
                    <p>Start grading</p>
                    <p>Start grading</p>
                    <p>Start grading</p>
                    <p>Start grading</p>
                    <p>Start grading</p>
                    <p>Start grading</p>
                    <p>Start grading</p>
                    <p>Start grading</p>
                    <p>Start grading</p>
                    <p>Start grading</p>
                    <p>Start grading</p>
                    <p>Start grading</p>
                    <p>Start grading</p>
                    <p>Start grading</p>
                    <p>Start grading</p>
                    <p>Start grading</p>
                    <p>Start grading</p>
                    <p>Start grading</p>
                    <p>Start grading</p>
                    <p>Start grading</p>
                    <p>Start grading</p>
                    <p>Start grading</p>
                    <p>Start grading</p>
                    <p>Start grading</p>
                    <p>Start grading</p>
                    <p>Start grading</p>
                    <p>Start grading</p>
                    <p>Start grading</p>
                    <p>Start grading</p>
                    <p>Start grading</p>
                    <p>Start grading</p>
                    <p>Start grading</p>
                    <p>Start grading</p>
                    <p>Start grading</p>
                    <p>Start grading</p>
                    <p>Start grading</p>
                    <p>Start grading</p>
                </Card.Body>
            </Card>
        </div>
    );
}

GradingRubric.defaultProps = {};
GradingRubric.propTypes = {
    text: PropTypes.node.isRequired
};

export const mapStateToProps = (state) => ({
});

export const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(GradingRubric);