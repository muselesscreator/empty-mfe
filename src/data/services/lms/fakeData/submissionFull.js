import submissionList from './submissionList';

const responseText = (submissionId) => `<div><h1>Title (${submissionId})</h1>
Phasellus tempor eros aliquam ipsum molestie, vitae varius lectus tempus. Morbi iaculis, libero euismod vehicula rutrum, nisi leo volutpat diam, quis commodo ex nunc ut odio. Pellentesque condimentum feugiat erat ac vulputate. Pellentesque porta rutrum sagittis. Curabitur vulputate tempus accumsan. Fusce bibendum gravida metus a scelerisque. Mauris fringilla orci non lobortis commodo. Quisque iaculis, quam a tincidunt vehicula, erat nisi accumsan quam, eu cursus ligula magna id odio. Nulla porttitor, lorem gravida vehicula tristique, sapien metus tristique ex, id tincidunt sapien justo nec sapien. Maecenas luctus, nisl vestibulum scelerisque pharetra, ligula orci vulputate turpis, in ultrices mauris dolor eu enim. Suspendisse quis nibh nec augue semper maximus. Morbi maximus eleifend magna.

Phasellus porttitor vel magna et auctor. Nulla porttitor convallis aliquam. Donec cursus, ipsum ut egestas bibendum, purus metus dignissim est, ac condimentum leo felis eget diam. In magna mi, tincidunt id sapien id, fermentum vestibulum quam. Quisque et dui sed urna convallis rutrum pellentesque quis sapien. Cras non lectus velit. Praesent semper eros id risus mollis, quis interdum quam imperdiet. Sed nec vulputate tortor, at tristique tortor.
</div>`;

// eslint-disable-next-line
export const mockSubmission = (submissionId) => ({
  response: {
    text: responseText(submissionId),
    files: [],
  },
  gradeStatus: submissionList[submissionId].gradeStatus,
  lockStatus: submissionList[submissionId].lockStatus,
  score: submissionList[submissionId].score,
});

export const mockSubmissionStatus = (submissionId) => ({
  gradeData: submissionList[submissionId].gradeData,
  gradeStatus: submissionList[submissionId].gradeStatus,
  lockStatus: submissionList[submissionId].lockStatus,
});
