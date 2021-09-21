import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    Card
} from '@edx/paragon';

import createDOMPurify from 'dompurify';

import parse from 'html-react-parser';

import selectors from 'data/selectors';

/**
 * <ResponseContainer />
 */
export const ResponseContainer = ({
    text
}) => {
    return (
        <Card className="response-card">
            <Card.Body>
                {text}
                {text}
                {text}
            </Card.Body>
        </Card>
    );
}

ResponseContainer.defaultProps = {};
ResponseContainer.propTypes = {
    text: PropTypes.node.isRequired
};

const purify = createDOMPurify(window);

export const mapStateToProps = (state) => ({
    text: parse(purify.sanitize(selectors.submissions.selectedResponse(state)?.text))
});

export const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(ResponseContainer);