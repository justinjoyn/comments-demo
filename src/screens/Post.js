import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addComment } from '../ducks/posts';
import '../styles/post.css';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: null,
            commentInputActive: false,
            comment: ''
        };
    }

    static getDerivedStateFromProps(props) {
        const { posts } = props;
        return {
            post: posts[0]
        };
    }

    renderTags() {
        const { tags } = this.state.post;
        let renderedTags = [];
        tags.map((tag, i) => {
            renderedTags = renderedTags.concat(
                <span key={`tag_${i}`} className="Tag">
                    {tag}
                </span>
            );
            return null;
        });
        return renderedTags;
    }

    renderComments() {
        const { comments } = this.state.post;
        let renderedComments = [];
        comments.map((comment, i) => {
            renderedComments = renderedComments.concat(
                <div className="CommentContainer" key={`comment_${i}`}>
                    <div className="CommentUserContainer">
                        <img
                            src={require('../assets/images/user.jpg')}
                            alt=""
                            className="CommentUserImage"
                        />
                        <span className="CommentUserName">Charlotte Hansen</span>
                    </div>
                    <span className="CommentText">{comment}</span>
                </div>
            );
            return null;
        });
        return renderedComments;
    }

    handleKeyPress = event => {
        if (event.key === 'Enter') {
            const { comment, post } = this.state;
            if (comment.trim() !== '') this.props.addComment({ postId: post.id, comment: comment });
            this.setState({ comment: '', commentInputActive: false });
        }
    };

    renderCommentInput() {
        const { comment, commentInputActive } = this.state;
        if (commentInputActive)
            return (
                <div className="CommentInputContainer">
                    <textarea
                        autoFocus={true}
                        placeholder="Write a response and then press enter..."
                        rows="6"
                        className="CommentInput"
                        onKeyPress={this.handleKeyPress}
                        value={comment}
                        onChange={event => {
                            this.setState({
                                comment: event.target.value
                            });
                        }}
                    />
                </div>
            );

        return (
            <button
                className="CommentButton"
                onClick={() => this.setState({ commentInputActive: true })}>
                <div className="CommentButtonContent">
                    <img
                        src={require('../assets/images/chat.svg')}
                        alt=""
                        className="CommentButtonIcon"
                    />
                    <span className="CommentButtonText">Write a response</span>
                </div>
            </button>
        );
    }

    renderClaps() {
        const { post } = this.state;
        return (
            <div className="ClapsContainer">
                <button className="ClapButton">
                    <img
                        src={require('../assets/images/clapping.svg')}
                        alt="Clap"
                        className="Clap"
                    />
                </button>
                <span className="ClapCount">0</span>
            </div>
        );
    }

    render() {
        const { post } = this.state;
        return (
            <div className="Container">
                <p className="PostBody">{post.body}</p>
                <div className="TagsContainer">{this.renderTags()}</div>
                {this.renderClaps()}
                <hr className="Divider" />
                <span className="SectionHeading">Responses</span>
                {this.renderCommentInput()}
                <div className="Comments">{this.renderComments()}</div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addComment: payload => dispatch(addComment(payload))
    };
};

const mapStateToProps = state => ({
    posts: state.postsReducer.posts
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Post);
