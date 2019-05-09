import _ from 'lodash';

//ACTIONS
export const ADD_COMMENT = 'comments/posts/ADD_COMMENT';

//REDUCER
const initialState = {
    posts: [
        {
            id: 1,
            body:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
                'Morbi fringilla nisl non sapien molestie rhoncus. Maecenas vel tristique velit. ' +
                'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. ' +
                'Sed molestie metus suscipit ligula rhoncus efficitur. Aenean nec mi eu purus condimentum convallis. ',
            tags: ['Lorem', 'Ipsum', 'Dolor', 'Sit'],
            comments: [],
            claps: 0
        }
    ]
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case ADD_COMMENT:
            let posts = state.posts;
            let index = _.findIndex(posts, post => {
                return post.id === action.payload.postId;
            });
            posts[index].comments = posts[index].comments
                ? [...posts[index].comments, action.payload.comment]
                : [action.payload.comment];

            return {
                ...state,
                posts: posts
            };
        default:
            return {
                ...state
            };
    }
}

//ACTION CREATORS
export function addComment(payload) {
    return { type: ADD_COMMENT, payload: payload };
}
