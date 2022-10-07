import { useState } from "react";

export default function useGeneratePass() {
  const [password_length, setPasswordLength] = useState("0");
  const [password, setPassword] = useState(null);
  const [, setIsCopied] = useState(false);
  const [includeUpperCase, setIncludeUpperCase] = useState(false);
  const [includeLowerCase, setIncludeLowerCase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);  

  const lowercaseLetters = "abcdefghijklmnñopqrstuvwxyz";
  const uppercaseLetters = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
  const symbols = "!@#$%^&*)(_+=-}{><";
  const numbers = "0123456789";

  const onHandleCopy = () => {
    copyTextToClipboard(password)
      .then(() => {
        setIsCopied(true);
        alert("Password Copy To Clipboard");
      })
      .catch((err) => {
        setIsCopied(false);
        console.log(err);
      });
  };

  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  const stepsConversor = (input) => input / 5;

  function checksValidatior({ check_a, check_b, check_c, check_d }) {
    if (!check_a && !check_b && !check_c && !check_d) return true;
  } 

  function enableButton({
    password_length,
    includeSymbols,
    includeNumbers,
    includeLowerCase,
    includeUpperCase,
  }) {
    const cheksValidation =
      checksValidatior({
        check_a: includeUpperCase,
        check_b: includeLowerCase,
        check_c: includeNumbers,
        check_d: includeSymbols,
      }) === true;
    const passValidation = stepsConversor(password_length) === 0;
    if (!cheksValidation && !passValidation) return true;
  }

  function createPassword({
    password_length,
    includeUpperCase,
    includeLowerCase,
    includeNumbers,
    includeSymbols,
  }) {
    if (
      checksValidatior({
        check_a: includeUpperCase,
        check_b: includeLowerCase,
        check_c: includeNumbers,
        check_d: includeSymbols,
      })
    )
      return;
    let pass = "";
    let chars = "";

    includeUpperCase ? (chars += uppercaseLetters) : null;
    includeLowerCase ? (chars += lowercaseLetters) : null;
    includeNumbers ? (chars += numbers) : null;
    includeSymbols ? (chars += symbols) : null;

    const array = new Uint32Array(password_length);
    window.crypto.getRandomValues(array);    

    for (let i = 0; i < password_length; i++) {      
      pass += chars[array[i] % chars.length];
    }
    setPassword(pass);
    return pass;
  }

  function getStrength() {
    const LEVELS = ["", "WEAK", "MEDIUM", "STRONG"];

    const cheksValidation =
      checksValidatior({
        check_a: includeUpperCase,
        check_b: includeLowerCase,
        check_c: includeNumbers,
        check_d: includeSymbols,
      }) === true;

    if (password_length === 0) {
      return LEVELS[0];
    }

    if (cheksValidation) return LEVELS[0];

    if (stepsConversor(password_length) === 4) {
      return LEVELS[1];
    }

    if (stepsConversor(password_length) === 8) {
      return LEVELS[2];
    }
    
    if (
      stepsConversor(password_length) > 8 &&
      (includeSymbols && includeUpperCase && includeLowerCase)
    ) {
      return LEVELS[3];
    }

    if (stepsConversor(password_length) > 8) {
      return LEVELS[2];
    }

    return LEVELS[0];
  }

  return {
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
  };
}
