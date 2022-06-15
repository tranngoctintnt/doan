import React, { useState, useEffect } from 'react';
import PostThumb from '../PostThumb';
import LoadIcon from '../../images/loading.gif';
import LoadMoreBtn from '../LoadMoreBtn';
import { getDataAPI } from '../../utils/fetchData';
import { PROFILE_TYPES } from '../../redux/actions/profileAction';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';

const Posts = ({ auth, id, dispatch, profile }) => {
  const [posts, setPosts] = useState([]);
  const [result, setResult] = useState(9);
  const [page, setPage] = useState(0);
  const [load, setLoad] = useState(false);

  // useEffect(() => {
  //   setLoad(true);
  //   profile.posts.forEach((data) => {
  //     if (data._id === id) {
  //       setPosts(data.posts);
  //       setResult(data.result);
  //       setPage(data.page);
  //       setLoad(false);
  //     }
  //   });
  // }, [profile.posts, id]);

  useEffect(() => {
    setLoad(true);
    getDataAPI(`user_posts/${id}`, auth.token)
      .then((res) => {
        setPosts(res.data.posts);
        setResult(res.data.result);
        setPage(res.data.page);
        setLoad(false);
      })
      .catch((err) => {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } });
      });

    return () => setPosts([]);
  }, [id, auth.token, dispatch]);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(`user_posts/${id}?limit=${page * 9}`, auth.token);
    const newData = { ...res.data, page: page + 1, _id: id };
    dispatch({ type: PROFILE_TYPES.UPDATE_POST, payload: newData });
    setLoad(false);
  };

  return (
    <div className="pb-4">
      <PostThumb posts={posts} result={result} />

      {load && (
        <img src={LoadIcon} alt="loading" style={{ width: '88px' }} className="d-block mx-auto" />
      )}

      <LoadMoreBtn result={result} page={page} load={load} handleLoadMore={handleLoadMore} />
    </div>
  );
};

export default Posts;
