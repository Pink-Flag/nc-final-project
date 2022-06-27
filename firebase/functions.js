import axios from "axios";

// const db = axios.create({
//     baseURL: 'https://test-bf064-default-rtdb.europe-west1.firebasedatabase.app/',

//     // headers: {'X-Custom-Header': 'foobar'}
//   })

export const fetchUsers = () => {
  return axios
    .get(
      "https://test-bf064-default-rtdb.europe-west1.firebasedatabase.app/db/0/users.json"
    )
    .then((response) => {
        
     return response.data
    });
};
