import CopyImg from "./assets/copy-img";
import useGeneratePass from "./hooks/useGeneratePass";
import styles from "./styles.module.css";

export default function App() { 

  const { 
    password, 
    password_length, 
    setPasswordLength,
    includeUpperCase, 
    setIncludeUpperCase,
    includeLowerCase, 
    setIncludeLowerCase, 
    includeNumbers,
    setIncludeNumbers ,
    includeSymbols,
    setIncludeSymbols,
    createPassword,
    onHandleCopy
  } = useGeneratePass()

  return (
    <div className="grid place-items-center text-white">
      <h2>Password Generator</h2>     
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
      <div className={styles.box}>
        <form>
          <div className="flex">
            <div className="w-1/2 text-start text-slate-500 text-sm ">Caracter Length</div>
            <div className={`w-1/2 text-end  ${styles.num_length}  `}>{password_length}</div>
          </div>
          <input
            className="w-full"
            type="range"
            min="4"
            max="16"
            value={password_length}
            onChange={(e) => setPasswordLength(e.target.value)}
          />
          <div className="w-full">
            <label className="text-slate-500 text-sm" >
              <input type="checkbox" id="upperCase" value="first_checkbox" checked={includeUpperCase} onChange={ () => setIncludeUpperCase(!includeUpperCase) } />{" "}
              Include Uppercase Letters
            </label>
          </div>

          <div className="w-full">
            <label className="text-slate-500 text-sm">
              <input type="checkbox" id="lowerCase" value="first_checkbox" checked={includeLowerCase} onChange={ () => setIncludeLowerCase(!includeLowerCase) }  />{" "}
              Include Lowercase Letters{" "}
            </label>
          </div>
          <div className="w-full">
            <label className="text-slate-500 text-sm">
              <input type="checkbox" id="numbers" value="first_checkbox" checked={includeNumbers } onChange={ () => setIncludeNumbers(!includeNumbers) } />{" "}              Include Numbers{" "}
            </label>
          </div>
          <div className="w-full">
            <label className="text-slate-500 text-sm">
              <input type="checkbox" id="symbols" value="first_checkbox"  checked={includeSymbols } onChange={ () => setIncludeSymbols (!includeSymbols ) } />{" "}
              Include Symbols{" "}
            </label>
          </div>
        </form>
        <h1>Strength</h1>
        <div className=" text-center ">
          <button className={`${styles.generate_btn} text-slate-900 `} onClick={ () => createPassword(password_length) } >GENERATE</button>
        </div>
      </div>    
    </div>
  );
}