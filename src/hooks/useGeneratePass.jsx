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

  function validateGeneration({ check_a, check_b, check_c, check_d }) {
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
      validateGeneration({
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
      validateGeneration({
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
    console.log({ array });

    // en base a lo que este seleccionado se debe generar un nuevo string con todos los caracteres:
    // chars debe estar vacio al comienzo, el boton se debe habilitar cuando el usuario al menos selecciona una opcion:

    for (let i = 0; i < password_length; i++) {
      console.log(i);
      pass += chars[array[i] % chars.length];
    }
    setPassword(pass);
    return pass;
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
  };
}
