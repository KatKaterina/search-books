const getDataRequest = async (queryString) => {
  const response = await fetch(queryString);
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  throw new Error('request error');
};

export default getDataRequest;
