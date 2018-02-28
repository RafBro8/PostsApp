import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost} from "../actions/index";

class PostsShow extends Component {
    
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchPost(id);
    }

    render() {
        const { post } = this.props;

        if(!post) {
            return <div>Loading...</div>;
        }

        return (
            <div>
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

export default connect(mapStateToProps, { fetchPost })(PostsShow);

//componentDidMount gets executed immediately after Component is renedered

//this.props.match.params.id; is provided by React Router
//params will consist all possible wildcard value that exist in url like
//for example :id/commentId