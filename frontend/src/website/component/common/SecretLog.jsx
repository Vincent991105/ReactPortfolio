import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function SecretLog({ title, unit, data }) {
  const [state, setState] = useState(false);
  return (
    <div className="SecretLog">
      <h4>{title}</h4>
      <h3>
        {unit} {state ? data : "******************"}
      </h3>
      <span onClick={() => setState((prev) => !prev)}>
        {state ? <FaEye /> : <FaEyeSlash />}
      </span>
    </div>
  );
}

export default SecretLog;
