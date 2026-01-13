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





