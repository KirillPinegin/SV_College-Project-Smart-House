import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import AddAccessories from "../Accessories/AddAccessories";
import "./styles.css";
import { ACCESSORY_TYPES, ROOM_TYPES } from "../../constants";

//validation is stereo exist 
const isStereoExists = (room) => {    
  return room.accessories.find( 
    (accessory) => ACCESSORY_TYPES[accessory.type] === ACCESSORY_TYPES.STEREO // checking if our accessory its stereo   
  );
};

//validation if we can add boiler 
const canAddBoiler = (room, accessoryType) => {
  return (
    ROOM_TYPES[room.roomType] === ROOM_TYPES.BATHROOM &&
    ACCESSORY_TYPES[accessoryType] === ACCESSORY_TYPES.BOILER
  );
};

//validation for maximum accessories 
const canAddAccessory = (room) => {
  return room.accessories.length < 5;
};

// function with all validations 
const checkAccessory = (room, accessoryType) => {
  const hasStereo = isStereoExists(room);
  const isBoilerAllowed = canAddBoiler(room, accessoryType);
  const isAccessoryAllowed = canAddAccessory(room);

  if (!isAccessoryAllowed) {  
    return false;
  }

  if (
    ACCESSORY_TYPES[accessoryType] === ACCESSORY_TYPES.BOILER &&
    !isBoilerAllowed
  ) {
    return false;
  }

  if (ACCESSORY_TYPES[accessoryType] === ACCESSORY_TYPES.STEREO && hasStereo) {
    return false;
  }

  return true;
};

const Room = ({ roomData, updateRoom }) => {  // our component is show our room, default we not vision accessories
  const [showAccessories, setShowAccessories] = useState(false);  

  const onAddAccessory = (type) => {  // add accessory we give our accessories checked it and add new accessories 
    if (!checkAccessory(roomData, type)) {
      alert("ERROR");
      return;
    }

    // we update our room
    updateRoom({
      ...roomData,  
      accessories: [...roomData.accessories, { type, enabled: false }],
    });
    setShowAccessories(false);
  };

  const toggleAccessory = (index) => {
    const roomCopy = { ...roomData };

    const foundAccessory = roomCopy.accessories[index];

    foundAccessory.enabled = !foundAccessory.enabled;

    updateRoom(roomCopy);
  };

  const showAddAccessories = () => {
    setShowAccessories(true);
  };

  return (
    <div className="home-page">
      {showAccessories ? (
        <AddAccessories onAddAccessory={onAddAccessory} />
      ) : (
        <>
          <div className="room-data">
            <div>
              <span>Room Name: {roomData.roomName}</span>
            </div>
            <div>
              <span>Room Type: {ROOM_TYPES[roomData.roomType]}</span>
            </div>
            <div>
              <button onClick={showAddAccessories}>Add accessories</button>
            </div>
          </div>
          <div className="accessories-list">
            {roomData.accessories.map((accessory, idx) => {
              return (
                <div
                  className={accessory.enabled ? "enabled" : null}
                  key={`${accessory + idx}`}
                  onClick={(e) => {
                    toggleAccessory(idx);
                  }}
                >
                  {ACCESSORY_TYPES[accessory.type]}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default withRouter(Room);
