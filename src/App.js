import { useEffect, useState } from 'react';

function App() {
  const PRODUCTS_PER_PAGE = 10;
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
      selectedPage <= products.length / PRODUCTS_PER_PAGE
    ) {
      setPage(selectedPage);
    }
  };
  return (
    <div>
      {products.length > 0 && (
        <div className='products'>
          {products
            .slice(
              page * PRODUCTS_PER_PAGE - PRODUCTS_PER_PAGE,
              page * PRODUCTS_PER_PAGE
            )
            .map((prod) => {
              return (
                <span key={prod.id} className='products__single'>
                  <img src={prod.thumbnail} alt={prod.title} />
                  <span>{prod.description}</span>
                </span>
              );
            })}
        </div>
      )}
      {products.length > 0 && (
        <div className='pagination'>
          <span
            className={page > 1 ? '' : 'pagination__disable'}
            onClick={() => selectPageHandler(page - 1)}
          >
            ◀️
          </span>
          {[...Array(products.length / PRODUCTS_PER_PAGE)].map((_, i) => {
            return (
              <span
                key={i}
                className={page === i + 1 ? 'pagination__selected' : ''}
                onClick={() => selectPageHandler(i + 1)}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            className={
              page < products.length / PRODUCTS_PER_PAGE
                ? ''
                : 'pagination__disable'
            }
            onClick={() => selectPageHandler(page + 1)}
          >
            ▶️
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
