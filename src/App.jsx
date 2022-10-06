import { useState } from "react";
import CopyImg from "./assets/copy-img";
import styles from "./styles.module.css";

export default function App() {
  const [value, setValue] = useState("10");
  const [password, setPassword] = useState(null);


  const onHandleCopy = () => {
    console.log("copy");
  };

  function Password({ password }) {

    
    password = "1234"


    return (
      <div className={`flex ${styles.box} justify-between`}>
        <div className=""> {password} </div>
        <div className="">
          <CopyImg
            className="justify-center mx-2"
            fill="#A4FFAF"
            onClick={() => onHandleCopy()}
          />
        </div>
      </div>
    );
  }

  function Strength(){
    return (
      <h1>Strength</h1>
    )
  }

  function Generator({children, pass_length}) {


    const onHandleCopy = () => {
      console.log("copy");
    };

    function createPassword(pass_length){
      let pass
      const chars = '0123456789abcdefghijklmnopqrstuvwxyz'

      


      console.log("creating password...", pass_length)

    }  

    return (
      <div className={styles.box}>
        <form>
          <div className="flex">
            <div className="w-1/2 text-start ">Caracter Length</div>
            <div className="w-1/2 text-end">{value}</div>
          </div>

          <input
            className="w-full"
            type="range"
            min="1"
            max="20"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <div className="w-full">
            <label>
              <input type="checkbox" id="cbox1" value="first_checkbox" />{" "}
              Include Uppercase Letters{" "}
            </label>
          </div>

          <div className="w-full">
            <label>
              <input type="checkbox" id="cbox1" value="first_checkbox" />{" "}
              Include Lowercase Letters{" "}
            </label>
          </div>
          <div className="w-full">
            <label>
              <input type="checkbox" id="cbox1" value="first_checkbox" />{" "}
              Include Numbers{" "}
            </label>
          </div>
          <div className="w-full">
            <label>
              <input type="checkbox" id="cbox1" value="first_checkbox" />{" "}
              Include Symbols{" "}
            </label>
          </div>
        </form>
        {children}
        <button onClick={ () => createPassword(value) } >GENERATE</button>
      </div>
    );
  }

  return (
    <div className="grid place-items-center text-white">
      <h2>Password Generator</h2>
      <Password password={password} />
      <Generator>
          <Strength />
      </Generator>
    </div>
  );
}
