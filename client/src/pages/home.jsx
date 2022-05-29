import React, { useEffect } from 'react';
import Status from '../components/home/Status';
import Posts from '../components/home/Posts';
import RightSideBar from '../components/home/RightSideBar';
import { useSelector } from 'react-redux';

let scroll = 0;

const Home = () => {
  const { homePosts } = useSelector((state) => state);
  window.addEventListener('scroll', () => {
    if (window.location.pathname === '/') {
      scroll = window.pageYOffset;
      return scroll;
    }
  });

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: scroll, behavior: 'smooth' });
    }, 100);
  }, []);
  return (
    <div className="home container row">
      <div className="left col-md-7">
        <Status />
        {homePosts.results === 0 && homePosts.posts.length === 0 ? (
          <h2 className="text-center">No Posts</h2>
        ) : (
          <Posts />
        )}
      </div>

      <div className="right col-md-5" style={{ marginBottom: '68px' }}>
        <RightSideBar />
      </div>
    </div>
  );
};

export default Home;
