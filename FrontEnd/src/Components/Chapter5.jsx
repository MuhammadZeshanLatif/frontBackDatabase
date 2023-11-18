import { useEffect, useReducer, useState } from 'react';
import './Chapter5.css'
import cardData from '../Data/data.js'
const Chap5 = () => {
  function videoReducer(videos,action){

  }
  const [videos,dispatch]=useReducer(videoReducer,cardData)
  // let [videos, setvideos] = useState(cardData);
  let [editVideo, setEditVideo] = useState(null);
  let deleteCard = (id) => {
    setvideos(videos.filter(v => v.id !== id));
  }
  let updateCard = (id) => {
    setEditVideo(videos.find(v => v.id === id));
  }
  let editCard = (video) => {
    dispatch({type:'Add',payload:video})
    let index=videos.findIndex(idx=>idx.id==video.id);
    let newCard=[...videos]
    newCard.splice(index,1,video)
    setvideos(newCard);
    console.log(newCard);
  }
  return (
    <>
      <div>

        {/* <button onClick={() => {
          setvideos([...videos, {
            "id": videos.length + 1,
            "title": `Image ${Math.floor(Math.random() * 100)}`,
            "views": `${(Math.random() * 10).toFixed(2)}K`,
            "Likes": `${(Math.random() * 10).toFixed(2)}K`,
            "verified": Math.random() >= 0.5
          }])
        }}>Add</button> */}
        <AddVideo addCard={videos} setAddCard={setvideos} editCard={editCard} updateCard={editVideo} ></AddVideo>
      </div>
      {videos.map((data) => (

        <ReactCard
          id={data.id}
          title={data.title}
          likes={data.Likes}
          views={data.views}
          verification={data.verified}
          deleteCard={deleteCard}
          updateCard={updateCard}
        >
          <Buttons></Buttons>
        </ReactCard>
      ))}

    </>
  )
}

const ReactCard = ({ id, title, views, verification, likes, children, deleteCard, updateCard }) => {
  return (
    <>
      <div className="card">
        <button className='delete' onClick={() => deleteCard(id)}>X</button>
        <button className='edit' onClick={() => updateCard(id)}>/</button>
        <div>
          <img src={`https://picsum.photos/id/${id}/160/90`} alt="" />
        </div>
        <div>
          <p>{views}</p>
          <p>{likes}</p>
        </div>
        <p>Verified:{verification ? " ✅" : "❌"}</p>
        <h3>{title}</h3>
        <div>{children}</div>
      </div>

    </>
  )
}
const Buttons = () => {
  let [btnStatus, setBtnStatus] = useState(false);

  let playPause = (e) => {
    e.stopPropagation();
    setBtnStatus(!btnStatus)
  }
  return (
    <>
      <button onClick={playPause}>{btnStatus ? "play" : "pause"}</button>
    </>
  )
}


const AddVideo = ({ addCard, setAddCard, updateCard, editCard }) => {

  let [video, setVedio] = useState({
    "views": `${(Math.random() * 10).toFixed(2)}K`,
    "Likes": `${(Math.random() * 10).toFixed(2)}K`,
    "verified": Math.random() >= 0.5
  });
  let handleChange = (e) => {
    e.stopPropagation();
    setVedio({ ...video, [e.target.name]: e.target.value })
  }
  let handleClick = (e) => {
    e.preventDefault();
    if (updateCard) {
      editCard(video);
    } else {
      setAddCard([...addCard, { ...video, id: addCard.length + 1 }])
    }
    setVedio({ ...video, title: "" });
    
  }
  useEffect(() => {
    if (updateCard) {
      setVedio(updateCard)
    }
  }, [updateCard])
  return (
    <>
      <form>
        <input type="text" value={video?.title} name="title" onChange={handleChange} id="title" placeholder="Add video title here" />
        <input type="submit" onClick={handleClick} value={updateCard ? "Update" : "Add"} />
      </form>
    </>
  )
}
export default Chap5;