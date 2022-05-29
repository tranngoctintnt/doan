import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GLOBALTYPES } from '../redux/actions/globalTypes';
import { createPost, updatePost } from '../redux/actions/postAction';

import camera from '../images/camera.svg';
import image from '../images/image.svg';

import Avatar from './Avatar';

const StatusModal = () => {
  const { auth, status, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);

  const [stream, setStream] = useState(false);
  const videoRef = useRef();
  const refCanvas = useRef();
  const [tracks, setTracks] = useState('');

  const handleChangeImage = (e) => {
    const files = [...e.target.files];
    let err = '';
    let newImages = [];

    files.forEach((file) => {
      if (!file) return (err = 'File does not exits.');
      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        return (err = 'Image format not supported.');
      }

      return newImages.push(file);
    });

    if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });

    setImages([...images, ...newImages]);
  };

  const deleteImages = (index) => {
    const newArray = [...images];
    newArray.splice(index, 1);
    setImages(newArray);
  };

  const handleStream = () => {
    setStream(true);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((mediaStream) => {
          videoRef.current.srcObject = mediaStream;

          videoRef.current.play();

          const track = mediaStream.getTracks();
          setTracks(track[0]);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleCapture = () => {
    const width = videoRef.current.clientWidth;
    const height = videoRef.current.clientHeight;

    refCanvas.current.setAttribute('width', width);
    refCanvas.current.setAttribute('height', height);

    const ctx = refCanvas.current.getContext('2d');

    ctx.drawImage(videoRef.current, 0, 0, width, height);

    let URL = refCanvas.current.toDataURL();
    setImages([...images, { camera: URL }]);
  };

  const handleStopStream = () => {
    tracks.stop();
    setStream(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (images.length === 0)
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: 'Please add your photo or content' },
      });

    if (status.onEdit) {
      dispatch(updatePost({ content, images, auth, status }));
    } else {
      dispatch(createPost({ content, images, auth, socket }));
    }

    setContent('');
    setImages([]);
    if (tracks) tracks.stop();
    dispatch({ type: GLOBALTYPES.STATUS, payload: false });
  };

  useEffect(() => {
    if (status.onEdit) {
      setContent(status.content);
      setImages(status.images);
    }
  }, [status]);

  return (
    <div className="status_modal">
      <form onSubmit={handleSubmit}>
        <div className="status_header">
          <h5 className="text-align-center m-0">Create Post</h5>
          <span onClick={() => dispatch({ type: GLOBALTYPES.STATUS, payload: false })}>
            &times;
          </span>
        </div>
        <div className="profile-status">
          <Avatar src={auth.user.avatar} size="medium-avatar" />
          <span className="text-bold">{auth.user.fullname}</span>
        </div>

        <div className="status_body">
          <textarea
            name="content"
            placeholder={`What's on your mind, ${auth.user.fullname} ?`}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>

          <div className="show_images" id="style-1">
            {/* <div className="photo-upload-item mr-2 item__upload text-center p-0" tabindex="0">
              <input
                accept="image/*, video/*, .mkv"
                multiple=""
                type="file"
                autoComplete="off"
                tabIndex="-1"
                style={{ display: 'none' }}
              />
              <i className="fa-solid fa-plus photo-upload__action"></i>
            </div> */}
            {images.map((img, index) => (
              <div key={index} id="file_img" className="mr-2">
                <img
                  src={img.camera ? img.camera : img.url ? img.url : URL.createObjectURL(img)}
                  alt="images"
                />

                <span onClick={() => deleteImages(index)}>&times;</span>
              </div>
            ))}
          </div>

          {stream && (
            <div className="stream position-relative">
              <video src="" autoPlay muted ref={videoRef} width="100%" height="100%"></video>
              <span onClick={handleStopStream}>&times;</span>
              <canvas ref={refCanvas} style={{ display: 'none' }} />
            </div>
          )}

          <div className="input_images">
            {stream ? (
              <img
                style={{ width: '40px', height: '40px' }}
                src={camera}
                alt="camera"
                onClick={handleCapture}
              />
            ) : (
              <>
                <img
                  style={{ width: '40px', height: '40px' }}
                  src={camera}
                  alt="camera"
                  onClick={handleStream}
                />

                <div className="file_upload">
                  {/* <i className="fas fa-image" /> */}
                  <img style={{ width: '40px', height: '40px' }} src={image} alt="images" />

                  <input
                    type="file"
                    name="file"
                    id="file"
                    multiple
                    accept="image/*"
                    onChange={handleChangeImage}
                  />
                </div>
              </>
            )}
            {/* <i className="fas fa-camera" /> */}
          </div>
        </div>

        <div className="status_footer">
          <button className="btn btn-primary w-100" type="submit">
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default StatusModal;
