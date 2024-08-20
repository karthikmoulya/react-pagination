import { useEffect, useState } from 'react';

const App = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async () => {
    const res = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
    );
    const data = await res.json();

    if (data && data.products) {
      setProducts(data.products);
      setTotalPages(data.total);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages / 10 &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };

  return (
    <div>
      {products.length > 0 && (
        <span className='products'>
          {products.map((product) => {
            return (
              <span className='products__single' key={product.id}>
                <img src={product.thumbnail} alt={product.title} />
                <span>{product.title}</span>
              </span>
            );
          })}
        </span>
      )}

      {products.length > 0 && (
        <span className='pagination'>
          {page > 1 && (
            <span onClick={() => selectPageHandler(page + 1)}>▶️</span>
          )}
          {[...Array(Math.round(totalPages / 10))].map((_, i) => (
            <span
              onClick={() => selectPageHandler(i + 1)}
              key={i}
              className={page === i + 1 ? 'pagination__selected' : ''}
            >
              {i + 1}
            </span>
          ))}
          {page < Math.round(totalPages / 10) && (
            <span onClick={() => selectPageHandler(page - 1)}>◀️</span>
          )}
        </span>
      )}
    </div>
  );
};

export default App;
