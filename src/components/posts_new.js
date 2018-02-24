import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class PostsNew extends Component {
    renderTitleField(field) {
        return (
            <div>
                <input
                    type="text"
                    {...field.input}
                />
            </div>
        );
    }

    render() {
        return (
            <form>
                <Field
                name="title"
                component={this.renderTitleField}
                />
            </form>
        );
    }
}

export default reduxForm({
    form: 'PostsNewForm'
}) (PostsNew);


//reduxForm is similar to connect

//{...field.input} can be used instead of onChange={field.input.onChange)
//or onFocus={field.input.onFocus) or onBlur={field.input.onBlur)