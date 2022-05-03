import { GLOBALTYPES } from './globalTypes';
import { imageUpload } from '../../utils/imageUpload';
import { postDataAPI, getDataAPI, patchDataAPI } from '../../utils/fetchData';

export const POST_TYPES = {
  CREATE_POST: 'CREATE_POST',
  LOADING_POST: 'LOADING_POST',
  GET_POSTS: 'GET_POSTS',
  UPDATE_POST: 'UPDATE_POST',
};

export const createPost =
  ({ content, images, auth }) =>
  async (dispatch) => {
    let media = [];

    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
      if (images.length > 0) {
        media = await imageUpload(images);
      }

      //   console.log(media);
      const res = await postDataAPI('posts', { content, images: media }, auth.token);
      //   console.log(res);
      dispatch({ type: POST_TYPES.CREATE_POST, payload: { ...res.data.newPost, user: auth.user } });

      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    } catch (err) {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } });
    }
  };

export const getPosts = (token) => async (dispatch) => {
  // console.log(token);
  try {
    dispatch({ type: POST_TYPES.LOADING_POST, payload: true });
    const res = await getDataAPI('posts', token);
    // console.log(res);

    dispatch({ type: POST_TYPES.GET_POSTS, payload: res.data });

    dispatch({ type: POST_TYPES.LOADING_POST, payload: false });
  } catch (err) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } });
  }
};

export const updatePost =
  ({ content, images, auth, status }) =>
  async (dispatch) => {
    let media = [];
    const imgNewUrl = images.filter((img) => !img.url);
    const imgOldUrl = images.filter((img) => img.url);

    if (
      status.content === content &&
      imgNewUrl.length === 0 &&
      imgOldUrl.length === status.images.length
    )
      return;

    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
      if (imgNewUrl.length > 0) media = await imageUpload(imgNewUrl);

      const res = await patchDataAPI(
        `post/${status._id}`,
        {
          content,
          images: [...imgOldUrl, ...media],
        },
        auth.token
      );

      dispatch({ type: POST_TYPES.UPDATE_POST, payload: res.data.newPost });

      dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const likePost =
  ({ post, auth, socket }) =>
  async (dispatch) => {
    const newPost = { ...post, likes: [...post.likes, auth.user] };
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

    // socket.emit('likePost', newPost);

    try {
      await patchDataAPI(`post/${post._id}/like`, null, auth.token);

      // Notify
      // const msg = {
      //   id: auth.user._id,
      //   text: 'like your post.',
      //   recipients: [post.user._id],
      //   url: `/post/${post._id}`,
      //   content: post.content,
      //   image: post.images[0].url,
      // };

      // dispatch(createNotify({ msg, auth, socket }));
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const unLikePost =
  ({ post, auth, socket }) =>
  async (dispatch) => {
    const newPost = { ...post, likes: post.likes.filter((like) => like._id !== auth.user._id) };
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

    // socket.emit('unLikePost', newPost);

    try {
      await patchDataAPI(`post/${post._id}/unlike`, null, auth.token);

      // Notify
      // const msg = {
      //   id: auth.user._id,
      //   text: 'like your post.',
      //   recipients: [post.user._id],
      //   url: `/post/${post._id}`,
      // };
      // dispatch(removeNotify({ msg, auth, socket }));
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };
