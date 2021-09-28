import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import Footer from '@edx/frontend-component-footer';

import selectors from 'data/selectors';

import ListView from 'containers/ListView';
import './App.scss';

import { Hyperlink, Icon, Button, Container } from '@edx/paragon'
import { ArrowBack } from '@edx/paragon/icons';

import { Header } from 'containers/CourseHeader';

const App = ({ courseMetadata }) => (
  <Router>
    <div>
      <Header
        courseTitle={courseMetadata.title}
        courseNumber={courseMetadata.number}
        courseOrg={courseMetadata.org}
      />
      <main className="p-4">
        <div className="my-4">
          <Hyperlink destination={`${process.env.LMS_BASE_URL}/courses/${courseMetadata.courseId}/instructor#view-open_response_assessment`}>
            <ArrowBack className="mr-3" />
            Back to all open responses
          </Hyperlink>
        </div>
        <ListView />
      </main>
      <Footer logo={process.env.LOGO_POWERED_BY_OPEN_EDX_URL_SVG} />
    </div>
  </Router>
);
App.defaultProps = {
  courseMetadata: {
    title: '',
    number: null,
    org: '',
    courseId: ''
  },
};
App.propTypes = {
  courseMetadata: PropTypes.shape({
    title: PropTypes.string,
    number: PropTypes.string,
    org: PropTypes.string,
    courseId: PropTypes.string
  }),
};

export const mapStateToProps = (state) => ({
  courseMetadata: selectors.app.courseMetadata(state),
});

export default connect(mapStateToProps)(App);
