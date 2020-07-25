import React, { useState } from "react";
import { ACCESSORY_TYPES } from "../../constants";

const accessoriesTypesKeys = Object.keys(ACCESSORY_TYPES);

export default function AddAccessories({ onAddAccessory }) {
  const [selectedAccessory, setSelectedAccessory] = useState(
    accessoriesTypesKeys[0]
  );

  const getAccessoriesTypes = () => {
    return accessoriesTypesKeys.map((accessoriesType) => {
      return (
        <option key={accessoriesType} value={accessoriesType}>
          {ACCESSORY_TYPES[accessoriesType]}
        </option>
      );
    });
  };

  const onAccNameChange = (e) => {
    setSelectedAccessory(e.target.value);
  };

  return (
    <div>
      <div>
        <label>Chose Accessory</label>
        <br />
      </div>
      <div>
        <select onChange={onAccNameChange} value={selectedAccessory}>
          <React.Fragment>{getAccessoriesTypes()}</React.Fragment>
        </select>
      </div>
      <div>
        <button
          onClick={() => {
            onAddAccessory(selectedAccessory);
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}
