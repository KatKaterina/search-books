const uploadBooks = (dataBooks, allBooks, countItemsLoad) => {
  const books = dataBooks.map(({ id, etag, volumeInfo }) => {
    const {
      title,
      categories,
      previewLink,
      imageLinks,
      authors,
      description,
    } = volumeInfo;
    const firstCategory = categories && categories.length > 0 ? categories[0] : '';
    const authorsView = authors && authors.length > 1 ? authors.join(', ') : authors;
    const imgLink = imageLinks && imageLinks.thumbnail ? imageLinks.thumbnail : null;
    return {
      id,
      etag,
      title,
      categories: categories || [],
      previewLink: previewLink || '',
      authors: authors || [],
      description: description || '',
      imgLink,
      imgDescr: 'book',
      subtitle: authorsView,
      category: firstCategory,
    };
  });
  if (countItemsLoad !== 0) {
    return [...allBooks, ...books];
  }
  return books;
};

export default uploadBooks;
