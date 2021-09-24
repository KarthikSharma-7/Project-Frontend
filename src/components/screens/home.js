import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import { useHistory } from "react-router";

const Home = () => {
    const [data, setData] = useState([]);
    const { state } = useContext(UserContext);
    const history=useHistory();

    useEffect(() => {
        fetch('/allposts', {
            method: "get",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                setData(result.posts);
            })
            .catch(err => console.log(err));
    }, []);

    const deletePost=(postId)=>{
        fetch(`/delete/${postId}`,{
            method:"delete",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
            })
            .then(res=>res.json())
            .then(result=>{
                console.log(result);
              const newData=data.filter(item=>{
                  return item._id !== result._id
              })
              setData(newData);
        }).catch(err=>console.log(err))
    }

    
    return (
        <>
            <div className='home'>
                {
                    data.map(item => {
                        return (
                            <div className='card home-card'>
                                <h5>{item.postedBy.name} {item.postedBy._id===state._id
                                && <i className="material-icons" style={{float:'right'}} onClick={()=>deletePost(item._id)}>delete</i>
                                }</h5>
                                <div className='card-image'>
                                    <img src={item.photo}
                                        alt='post' />
                                </div>
                                <div className='card-content'>
                                    <i className="material-icons" >thumb_up</i>
                                    <i className="material-icons">thumb_down</i>
                                    <h6>{item.title}</h6>
                                    <p>{item.body}</p>
                                    <input type="text" placeholder="Add comment" />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Home;