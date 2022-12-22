import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";

const Profile = () => {
  const [mypics, setMypics] = useState([]);
  const { state } = useContext(UserContext);

  useEffect(() => {
    fetch("/myposts", {
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setMypics(result.posts);
      })
      .catch((err) => console.log(err));
  }, []);
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
            <h5>{state ? state.name : "Loading.."}</h5>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "108%",
              }}
            >
              <h6>40posts</h6>
              <h6>40followers</h6>
              <h6>40following</h6>
            </div>
          </div>
        </div>
        <div className="gallery">
          {mypics.map((item) => {
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

export default Profile;
