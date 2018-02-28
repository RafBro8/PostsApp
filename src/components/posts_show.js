import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost} from "../actions/index";


class PostsShow extends Component {
    
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchPost(id);
    }

    onDeleteClick() {
        const { id } = this.props.match.params;

        this.props.deletePost(id, () => {
            this.props.history.push('/');
        });
    }

    render() {
        const { post } = this.props;

        if(!post) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <Link to="/">Back to Index</Link>
                <button
                className="btn btn-danger pull-xs-right"
                onClick={this.onDeleteClick.bind(this)}
                >
                    Delete Post
                </button>
                <h3>{post.title}</h3>
                <h6>Categories: {post.categories}</h6>
                <p>{post.content}</p>
            </div>
        );
    }
}

function mapStateToProps({ posts }, ownProps) {  //ownProps is the props object that is going to the component (in this example it is class PostsShow
    return {post: posts[ownProps.match.params.id]};
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);

//componentDidMount gets executed immediately after Component is renedered

//this.props.match.params.id; is provided by React Router
//params will consist all possible wildcard value that exist in url like
//for example :id/commentId