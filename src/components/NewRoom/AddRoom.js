import React from "react";
import { withRouter } from "react-router-dom";
import "./styles.css";
import { ROOM_TYPES } from "../../constants";
import { useState } from "react";

const roomTypeKeys = Object.keys(ROOM_TYPES);   // we doing array from our objects and give keys for him 

const getRoomsOptions = () => {   
  return roomTypeKeys.map((roomType) => {   // we run on all room types and return options for all types
    return (
      <option key={roomType} value={roomType}>
        {ROOM_TYPES[roomType]}
      </option>
    );
  });
};

const AddRoom = ({ onAddRoom, history }) => {     
  const [roomType, setRoomType] = useState(roomTypeKeys[0]);  // started room 
  const [roomName, setRoomName] = useState("");   // room name
  const [roomColor, setRoomColor] = useState("#ffffff");  // default color 

  // update room type
  const onRoomTypeChange = (e) => {     
    const roomTypeKey = e.target.value;   
    setRoomType(roomTypeKey);
  };

  // update room name
  const onRoomNameChange = (e) => {
    const roomName = e.target.value;
    setRoomName(roomName);
  };

  // update room color
  const onRoomColorChange = (e) => {
    const roomColor = e.target.value;
    setRoomColor(roomColor);
  };

  // creat new room
  const onRoomCreate = () => {
    if (!isRoomValid()) {   // if room is not valid show error
      alert("ERROR");
      return;
    }
    onAddRoom({ accessories: [], roomType, roomName, roomColor, id: new Date().getTime() });  

    history.push("/");    // we go to home page after creating new room 
  };

    //checking if room is valid 
  const isRoomValid = () => {   
    return !!roomType && !!roomName && !!roomColor;
  };

  return (
    <div className="add-room">
      <div>
        <label>Select Room Type</label>
        <br />
        <select name="rooms-list" onChange={onRoomTypeChange} value={roomType}>
          <>{getRoomsOptions()}</>
        </select>
      </div>
      <div>
        <input
          className="roomName"
          placeholder="Room name"
          value={roomName}
          onChange={onRoomNameChange}
        />
      </div>
      <div>
        <label>Select Room Color</label>
        <br />
        <input
          className="roomColor"
          placeholder="Color"
          type="color"  // color picker 
          value={roomColor}
          onChange={onRoomColorChange}
        ></input>
      </div>
      <div>
        <button onClick={onRoomCreate}>Create</button>
      </div>
    </div>
  );
};

export default withRouter(AddRoom);
