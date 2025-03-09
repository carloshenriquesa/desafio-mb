export async function postRegisterService(data) {
  return fetch(`${import.meta.env.VITE_API_URL}/registration`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then((response) => {
    if (!response.ok) {
      return response.json().then(errorData => {
        console.log(errorData);
        throw new Error(errorData.message);
      });
    }
    return response.json();
  })
  .then((data) => {
    return data;
  })
  .catch((error) => {
    throw error;
  });
}