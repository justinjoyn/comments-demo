//ACTIONS
export const ADD_COMMENT = 'comments/post/ADD_COMMENT';
export const CLAP = 'comments/post/CLAP';

//REDUCER
const initialState = {
    post: {
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
};

export default function reducer(state = initialState, action = {}) {
    let post = state.post;
    switch (action.type) {
        case ADD_COMMENT:
            let comments = post.comments
                ? [...post.comments, action.payload.comment]
                : [action.payload.comment];
            return {
                ...state,
                post: { ...post, comments: comments }
            };
        case CLAP:
            let claps = post.claps + 1;
            return {
                ...state,
                post: { ...post, claps: claps }
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

export function clap(payload) {
    return { type: CLAP, payload: payload };
}
