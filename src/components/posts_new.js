import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from "../actions/index";

class PostsNew extends Component {
    renderField(field) {

        const { meta: {touched, error }} = field;
        //use above to de-structure field, touched, error
        const className = `form-group ${touched && error ? 'has-danger' : ''}`


        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
            //field.meta.error points to validation below
            //touched means user entered the form field
        );
    }

    onSubmit(values) {
        this.props.createPost(values, () => {
            this.props.history.push('/');
            //history helps navigate automatically to specified route
            //put it inside a callback/action creator function so it doesn't execute too soon
        });
    }


    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Title of Post"
                    name="title"
                    component={this.renderField}
                />
                <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <Field
                    label="Post Content"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

//{values} values of title, categories, content
function validate(values) {
    const errors = {};

//validate the inputs from 'values

    if(!values.title || values.title.length < 3) {
        errors.title = "Enter a title that is at least 3 characters!";
    }
    if(!values.categories) {
        errors.categories = "Enter categories!";
    }
    if(!values.content) {
        errors.content = "Enter content!";
    }

//If errors is empty, the form is fine to submit
//If errors has *any* properties, redux form assumes form is invalid


    return errors;
}

export default reduxForm({
    validate,
    form: 'PostsNewForm'
}) (
    connect(null, { createPost }) (PostsNew)
);


//reduxForm is similar to connect

//{...field.input} can be used instead of onChange={field.input.onChange)
//or onFocus={field.input.onFocus) or onBlur={field.input.onBlur)

