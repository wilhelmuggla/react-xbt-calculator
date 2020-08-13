import React, {useContext} from "react";
import { ProcentContext } from "../context/procentContext";
import Switch from "react-switch";


const ProcentSwitch = () => {
    const { showProcent, changeSetProcent } = useContext(ProcentContext);

  return (
    <Switch
      className="float-right react-switch"
      onChange={changeSetProcent}
      checked={showProcent}
      offColor="#FFC300"
      onColor="#FFC300"
      uncheckedIcon={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            fontSize: 16,
            color: "#000",
            paddingRight: 2,
          }}
        >
          Kr
        </div>
      }
      checkedIcon={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            fontSize: 16,
            color: "#000",
            paddingRight: 2,
          }}
        >
          %
        </div>
      }
    />
  );
};

export default ProcentSwitch;