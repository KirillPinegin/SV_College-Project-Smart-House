import React from "react";
import { withRouter } from "react-router-dom";
import './styles.css';

export default withRouter(function RoomsList({ rooms, history }) {
  const onAdd = () => {
    history.push("/addRoom");
  };

  const onRoomClick = (id) => {
    history.push(`/room/${id}`)
  }

  return (
    <div className="rooms-list">
      <div className="rooms">
        {rooms.map((room, index) => {
          return (
            <div className="room-card" style={{ backgroundColor: room.roomColor }} key={room.id} onClick={() => {
              onRoomClick(room.id);
            }}>
              <span>{room.roomName}</span>
            </div>
          );
        })}
      </div>

      <div className="button-bar">
        <button onClick={onAdd}>Add</button>
      </div>
    </div>
  );
});
