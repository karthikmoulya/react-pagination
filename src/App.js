import { useEffect, useState } from 'react';

const App = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    const res = await fetch('https://dummyjson.com/products');
    const data = await res.json();

    if (data && data.products) {
      setProducts(data.products);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= products.length / 10 &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };

  return (
    <div>
      {products.length > 0 && (
        <span className='products'>
          {products.slice(page * 10 - 10, page * 10).map((product) => {
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
          {[...Array(products.length / 10)].map((_, i) => (
            <span
              onClick={() => selectPageHandler(i + 1)}
              key={i}
              className={page === i + 1 ? 'pagination__selected' : ''}
            >
              {i + 1}
            </span>
          ))}
          {page < products.length / 10 && (
            <span onClick={() => selectPageHandler(page - 1)}>◀️</span>
          )}
        </span>
      )}
    </div>
  );
};

export default App;
