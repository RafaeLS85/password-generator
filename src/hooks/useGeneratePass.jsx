import { useState } from 'react'

export default function useGeneratePass(){
    const [ password_length, setPasswordLength ] = useState("8");
    const [password, setPassword] = useState(null);
    const [, setIsCopied] = useState(false);
    const [includeUpperCase, setIncludeUpperCase] = useState(false);
    const [includeLowerCase, setIncludeLowerCase] = useState(false);
    const [includeNumbers, setIncludeNumbers] = useState(false);
    const [includeSymbols, setIncludeSymbols] = useState(false);

	const lowercaseLetters = 'abcdefghijklmnñopqrstuvwxyz'
    const uppercaseLetters = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'
	const symbols = '!@#$%^&*)(_+=-}{><'
	const numbers = '0123456789'

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

      async function copyTextToClipboard(text) {
        if ('clipboard' in navigator) {
          return await navigator.clipboard.writeText(text);
        } else {
          return document.execCommand('copy', true, text);
        }
      }


      function createPassword(pass_length){

        let pass = ''
      
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





    return {
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
    }
}

