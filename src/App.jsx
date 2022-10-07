import CopyImg from "./assets/copy-img";
import useGeneratePass from "./hooks/useGeneratePass";
import styles from "./styles.module.css";

export default function App() {
  const slider = document.getElementById("lengthRange");

  slider?.addEventListener("input", () => {
    let x = slider.value;
    let color = `linear-gradient( 90deg, rgb(117, 252, 117) ${x}%, rgb(214, 214, 214)  ${x}% )`;
    slider.style.background = color;
  });

  const {
    password,
    password_length,
    setPasswordLength,
    includeUpperCase,
    setIncludeUpperCase,
    includeLowerCase,
    setIncludeLowerCase,
    includeNumbers,
    setIncludeNumbers,
    includeSymbols,
    setIncludeSymbols,
    createPassword,
    onHandleCopy,
    stepsConversor,
    enableButton,
    getStrength,
  } = useGeneratePass();

  return (
    <main id="rafaels85" className="mt-8">
      <div className="grid place-items-center text-white">
        <h2>Password Generator</h2>
        <div className={`flex ${styles.box} justify-between`}>
          <div className={styles.password}> {password} </div>
          <div
            className={
              `${password ? 'cursor-pointer' : 'opacity-20 pointer-events-none' }`
            }
          >
            <CopyImg
              className="justify-center mx-0 mt-1 "
              fill="#A4FFAF"
              onClick={() => onHandleCopy()}
            />
          </div>
        </div>
        <div className={styles.box}>
          <form>
            <div className="flex">
              <div className="w-1/2 text-start text-slate-500 text-sm ">
                Caracter Length
              </div>
              <div className={`w-1/2 text-end  ${styles.num_length}  `}>
                {stepsConversor(password_length)}
              </div>
            </div>
            <input
              className={`w-full ${styles.slider} `}
              type="range"
              min="0"
              max="100"
              step="20"
              id="lengthRange"
              value={password_length}
              onChange={(e) => setPasswordLength(e.target.value)}
            />
            <div className="w-full">
              <label className="text-slate-500 text-sm">
                <input
                  type="checkbox"
                  className="accent-[#A4FFAF]"
                  id="upperCase"
                  checked={includeUpperCase}
                  onChange={() => setIncludeUpperCase(!includeUpperCase)}
                />{" "}
                Include Uppercase Letters
              </label>
            </div>

            <div className="w-full">
              <label className="text-slate-500 text-sm">
                <input
                  type="checkbox"
                  className="accent-[#A4FFAF]"
                  id="lowerCase"
                  checked={includeLowerCase}
                  onChange={() => setIncludeLowerCase(!includeLowerCase)}
                />{" "}
                Include Lowercase Letters{" "}
              </label>
            </div>
            <div className="w-full">
              <label className="text-slate-500 text-sm">
                <input
                  type="checkbox"
                  className="accent-[#A4FFAF]"
                  id="numbers"
                  checked={includeNumbers}
                  onChange={() => setIncludeNumbers(!includeNumbers)}
                />{" "}
                Include Numbers{" "}
              </label>
            </div>
            <div className="w-full">
              <label className="text-slate-500 text-sm">
                <input
                  type="checkbox"
                  className="accent-[#A4FFAF]"
                  id="symbols"
                  checked={includeSymbols}
                  onChange={() => setIncludeSymbols(!includeSymbols)}
                />{" "}
                Include Symbols{" "}
              </label>
            </div>
          </form>

          <div
            className={`flex justify-between bg-slate-900 px-2 py-2  mt-3 mb-3   `}
          >
            <h2 className="text-slate-500">STRENGTH</h2>

            <div>{getStrength()}</div>
          </div>

          <div className=" text-center ">
            <button
              className={`${styles.generate_btn} text-slate-900  
                        ${
                          enableButton({
                            password_length,
                            includeSymbols,
                            includeNumbers,
                            includeLowerCase,
                            includeUpperCase,
                          })
                            ? "cursor-pointer"
                            : "opacity-20 pointer-events-none"
                        } `}
              onClick={() =>
                createPassword({
                  password_length: stepsConversor(password_length),
                  includeUpperCase,
                  includeLowerCase,
                  includeNumbers,
                  includeSymbols,
                })
              }
            >
              GENERATE
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
