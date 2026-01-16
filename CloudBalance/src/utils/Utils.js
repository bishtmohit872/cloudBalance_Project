import CryptoJS from "crypto-js";

export const setToken = (token)=>{
    localStorage.setItem('token',token)
}

export const getToken = ()=>{
    const status = localStorage.getItem('token')
    return status
}

export const removeToken=()=>{
    localStorage.removeItem("token")
}

export const deepObjectEntries=(obj)=> {
  return Object.entries(obj).map(([key, value]) => {
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      return [key, deepObjectEntries(value)];
    }
    return [key, value];
  });
}

// export const deepFromEntries = (entries)=>{
//   return entries.reduce((acc, [key, value]) => {
//     if (
//       Array.isArray(value) &&
//       value.length > 0 &&
//       Array.isArray(value[0])
//     ) {
//       acc[key] = deepFromEntries(value);
//     } else {
//       acc[key] = value;
//     }
//     return acc;
//   }, {});
// }

export const deepFromEntries=(entries)=>{
  const acc = {};

  for (let i = 0; i < entries.length; i++) {
    const key = entries[i][0];
    const value = entries[i][1];

    if (
      Array.isArray(value) &&
      value.length > 0 &&
      Array.isArray(value[0])
    ) {
      acc[key] = deepFromEntries(value);
    } else {
      acc[key] = value;
    }
  }

  return acc;
}





const SECRET_KEY = "frontend-secret-key-123"; 

export const encryptData = (data) => {
    return CryptoJS.AES.encrypt(
        JSON.stringify(data),
        SECRET_KEY
    ).toString();
};



export const decryptData = (cipherText) => {
    if (!cipherText) return null

    try {
        const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
        const decryptedText = bytes.toString(CryptoJS.enc.Utf8);

        if (!decryptedText) return null

        return JSON.parse(decryptedText)
    } catch (error) {
        console.error("Failed to decrypt or parse JSON:", error);
        return null
    }
};

