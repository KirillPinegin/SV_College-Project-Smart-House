import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState } from "react";
import RoomsList from "../RoomsList/RoomsList";
import AddRoom from "../NewRoom/AddRoom";
import Room from "../Room/Room";
import Header from "../Header/Header";

export default function House() {
  const [rooms, setRooms] = useState([]);

  //create copy from state for new room
  const onAddRoom = (room) => {
    const newRooms = [...rooms]; //spread operator doing copy for all objects in this array
    newRooms.push(room); //add for this copy our new room
    setRooms(newRooms); // and update all rooms  with our new room
  };

  const getRoomData = (id) => {
    // get id for our room whats we want to find
    const roomData = rooms.find((room) => room.id === id); // we find in array our room and return this room

    return roomData;
  };

  const updateRoom = (roomData) => {
    const roomsCopy = [...rooms];

    roomsCopy.forEach((room, idx) => {
      if (room.id === roomData.id) {
        // we find our room by id
        roomsCopy[idx] = roomData; // we replace old room with new one
      }
    });

    setRooms(roomsCopy); // and here we are update rooms list (array)
  };

  return (
    <Router>
      <Header /> {/* Our static component */}
      <Switch>  
        <Route
          exact
          path="/"    
          component={() => {
            return <RoomsList rooms={rooms} />;
          }}
        />
        <Route
          exact
          path="/addroom"
          component={() => {
            return <AddRoom onAddRoom={onAddRoom} />;
          }}
        />
        <Route
          exact
          path="/room/:id"
          component={(props) => {
            const { id } = props.match.params;    // id our room 
            const roomData = getRoomData(parseFloat(id));     // search for id our room we need to do parsefloat for replace string to number

            if (!roomData) {    // if we not found our room we return "Room is not found"
              return <div>Room not found</div>;
            }

            return <Room roomData={roomData} updateRoom={updateRoom} />;    // if we found room we show room component
          }}
        />
      </Switch>
    </Router>
  );
}
