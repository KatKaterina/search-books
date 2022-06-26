const getStringRequest = (param) => {
  const {
    url = null,
    key = null,
    query = null,
    typeSort = null,
    typeFilter = null,
    stepPagination = null,
    startIndex = null,
  } = param;

  const sortingParam = typeSort ? `&orderBy=${typeSort}` : '';
  const filterParam = typeFilter && typeFilter !== 'all' ? `subject:${typeFilter}` : '';
  const maxResultsParam = stepPagination ? `&maxResults=${stepPagination}` : '';
  const startIndexParam = startIndex ? `&startIndex=${startIndex}` : '';
  const keyParam = key ? `&key=${key}` : '&key=AIzaSyCV4k8_s1dPfFNiTZOTUdkBa0XIjsePUMs';
  const urlRequest = url || 'https://www.googleapis.com/books/v1/volumes?';
  const fieldParam = '&fields=totalItems,items(id,etag,volumeInfo)';
  const queryString = `${urlRequest}q=${query}+${filterParam}${sortingParam}${fieldParam}${maxResultsParam}${startIndexParam}${keyParam}`;
  console.log(queryString);
  return queryString;
};
export default getStringRequest;
