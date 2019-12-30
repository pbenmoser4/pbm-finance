import React, { Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form } from 'semantic-ui-react';

const renderSearchInput = ({input, meta}) => {
  return (
    <Form.Input
      {...input}
      icon='search'
      autoComplete='off'
    />
  )
}

const SearchForm = props => {
  const { handleSubmit, reset } = props;

  return (
    <Fragment>
      <Form onSubmit={handleSubmit}>
        <Form.Group widths="equal">
          <Field
            component={renderSearchInput}
            name="searchTerm"
            placeholder="Search Ticker"
          />
        </Form.Group>
      </Form>
    </Fragment>
  )
}

export default reduxForm({
  form: "tickerSearch"
})(SearchForm);
