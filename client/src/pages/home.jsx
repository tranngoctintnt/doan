import React from 'react';
import Status from '../components/home/Status';
import Posts from '../components/home/Posts';
import { useSelector } from 'react-redux';

const Home = () => {
  const { homePosts } = useSelector((state) => state);
  return (
    <div className="home container row">
      <div className="col-md-8">
        <Status />
        {homePosts.results === 0 ? <h2 className="text-center">No Posts</h2> : <Posts />}
      </div>

      <div className="col-md-4">jkhsadkfk</div>
    </div>
  );
};

export default Home;
