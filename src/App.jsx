import { useState } from "react";
import CopyImg from "./assets/copy-img";
import styles from "./styles.module.css";

export default function App() {
  const [value, setValue] = useState("8");
  const [password, setPassword] = useState(null);
  const [, setIsCopied] = useState(false);

  function Password({ password }) {

    const onHandleCopy = () => {
      copyTextToClipboard(password)
        .then(() => {
          setIsCopied(true);
          alert('Password Copy To Clipboard')
        })
        .catch((err) => {
          setIsCopied(false);
          console.log(err);
        });
    }
    
    return (
      <div className={`flex ${styles.box} justify-between`}>
        <div className={styles.password}> {password} </div>
        <div className={  password ? `cursor-pointer` : `opacity-20 pointer-events-none` }>
          <CopyImg
            className="justify-center mx-2 mt-1 "
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

    let pass = ''

    const onHandleCopy = () => {
      console.log("copy");
    };

    function createPassword(pass_length){
      
      const chars = '0123456789abcdefghijklmnopqrstuvwxyz'

      const array = new Uint32Array(pass_length)
      window.crypto.getRandomValues(array)
      console.log({array})

      // setPassword()

      for (let i = 0; i < pass_length; i++) {
        console.log(i)
        pass += chars[array[i] % chars.length ]
      }
      setPassword(pass)
      return pass
    }  

    return (
      <div className={styles.box}>
        <form>
          <div className="flex">
            <div className="w-1/2 text-start text-slate-500 text-sm ">Caracter Length</div>
            <div className={`w-1/2 text-end  ${styles.num_length}  `}>{value}</div>
          </div>

          <input
            className="w-full"
            type="range"
            min="4"
            max="16"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <div className="w-full">
            <label className="text-slate-500 text-sm" >
              <input type="checkbox" id="cbox1" value="first_checkbox"  />{" "}
              Include Uppercase Letters{" "}
            </label>
          </div>

          <div className="w-full">
            <label className="text-slate-500 text-sm">
              <input type="checkbox" id="cbox1" value="first_checkbox"   />{" "}
              Include Lowercase Letters{" "}
            </label>
          </div>
          <div className="w-full">
            <label className="text-slate-500 text-sm">
              <input type="checkbox" id="cbox1" value="first_checkbox"  />{" "}
              Include Numbers{" "}
            </label>
          </div>
          <div className="w-full">
            <label className="text-slate-500 text-sm">
              <input type="checkbox" id="cbox1" value="first_checkbox"  />{" "}
              Include Symbols{" "}
            </label>
          </div>
        </form>
        {children}
        <div className=" text-center ">
          <button className={`${styles.generate_btn} text-slate-900 `} onClick={ () => createPassword(value) } >GENERATE</button>
        </div>
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


export async function copyTextToClipboard(text) {
  if ('clipboard' in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand('copy', true, text);
  }
}