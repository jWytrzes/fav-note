import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GridTemplate from 'templates/GridTemplate';
import Card from 'components/molecules/Card/Card';

const Notes = ({ notes }) => (
  <GridTemplate pageType="notes" notesCount={notes.length}>
    {notes.map(item => (
      <Card
        id={item.id}
        cardType="notes"
        title={item.title}
        content={item.content}
        created={item.created}
        key={item.id}
      />
    ))}
  </GridTemplate>
);

Notes.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      // cardType: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      created: PropTypes.string.isRequired,
    }),
  ),
};

Notes.defaultProps = {
  notes: [],
};

const mapStateToProps = ({ notes }) => {
  return { notes };
};

export default connect(mapStateToProps)(Notes);
