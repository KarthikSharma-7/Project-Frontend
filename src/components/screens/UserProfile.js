import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import { useNavigate, useParams } from "react-router-dom";

const UserProfile = () => {
  const [userProf, setUserProf] = useState();
  const [userPosts, setUserPosts] = useState([]);
  const { state } = useContext(UserContext);
  const { userId } = useParams();
  const [value, setValue] = useState(true);
  const [followers, setFollowers] = useState(0);
  const [follow, setFollow] = useState(true);
  const navigate = useNavigate();

  const profile = () => {
    fetch(`/user/${userId}`, {
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => {
        res.json().then((result) => {
          const exs = localStorage.getItem("user");
          const wUser = JSON.parse(exs);
          if (result.user._id === wUser._id) {
            return navigate("/profile");
          }
          setUserProf(result.user);
          setUserPosts(result.posts);
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    profile();
  }, []);

  const followUser = (userId) => {
    fetch(`/follow/${userId}`, {
      method: "put",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.updatedUser) {
          setFollowers(result.followers);
          if (result.flag === 1) {
            setFollow(false);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div
        style={{
          maxWidth: "550px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            margin: "18px,0px",
            borderBottom: "1px solid grey",
          }}
        >
          <div>
            <img
              style={{ width: "160px", height: "160px", borderRadius: "80px" }}
              src="https://images.unsplash.com/photo-1505247964246-1f0a90443c36?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTAzfHxwZW9wbGV8ZW58MHwyfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              alt="Profile Picture"
            />
          </div>
          <div>
            <h5>{userProf?.name}</h5>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "108%",
              }}
            >
              <h6>{userPosts.length}Posts</h6>
              <h6>{followers}Followers</h6>
              <h6>40following</h6>
            </div>
            {value && (
              <div style={{ textAlign: "center" }}>
                {follow ? (
                  <button
                    style={{
                      cursor: "pointer",
                      marginTop: "10px",
                      marginRight: "8px",
                    }}
                    onClick={() => {
                      followUser(userProf._id);
                    }}
                  >
                    follow
                  </button>
                ) : (
                  <button
                    style={{
                      cursor: "pointer",
                      marginTop: "10px",
                      marginRight: "8px",
                    }}
                    onClick={() => {
                      followUser(userProf._id);
                    }}
                  >
                    unfollow
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="gallery">
          {userPosts.map((item) => {
            return (
              <img
                key={item._id}
                className="item"
                src={item.photo}
                alt={item.title}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
