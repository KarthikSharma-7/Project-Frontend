import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const { state } = useContext(UserContext);
  const navigate = useNavigate();

  const fetchingFunction = () => {
    fetch("/allposts", {
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("result", result);
        setData(result.posts);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchingFunction();
  }, []);

  const likePost = (postId) => {
    fetch(`likes/${postId}`, {
      method: "put",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        fetchingFunction();
      })
      .catch((err) => console.log(err));
  };

  const getProfile = (user) => {
    navigate(`/profile/${user}`);
  };

  const deletePost = (postId) => {
    fetch(`/delete/${postId}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.filter((item) => {
          return item._id !== result._id;
        });
        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="home">
        {data.map((item) => {
          return (
            <div key={item._id} className="card home-card">
              <h5>
                <span
                  onClick={() => {
                    getProfile(item.postedBy._id);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {item.postedBy.name}
                </span>
                {item.postedBy._id === state._id && (
                  <i
                    className="material-icons"
                    style={{ float: "right", cursor: "pointer" }}
                    onClick={() => deletePost(item._id)}
                  >
                    delete
                  </i>
                )}
              </h5>
              <div className="card-image">
                <img src={item.photo} alt="post" />
              </div>
              <div className="card-content">
                <i
                  className="material-icons"
                  style={{ marginRight: "15px", cursor: "pointer" }}
                  onClick={() => likePost(item._id)}
                >
                  thumb_up
                </i>
                <h6>{item.likes.length} likes</h6>
                <h6>{item.title}</h6>
                <p>{item.body}</p>
                <input type="text" placeholder="Add comment" />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
