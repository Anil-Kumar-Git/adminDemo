const postConfig=(value)=>{
    return {
      method: "post",
      body: JSON.stringify(value),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  }

  export {
      postConfig
  }