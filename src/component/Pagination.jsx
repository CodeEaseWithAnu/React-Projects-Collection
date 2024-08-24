import React,{useState,useEffect} from 'react'
import axios from 'axios'
import './Pagination.css'

const Pagination = () => {
  const [products,setProduct] = useState([])  ;
  const [totalProducts,setTotalProducts] = useState(0);
  const [currentPage,setCurrentPage] = useState(1);
  const perPage = 40;
  
  const fetchProduct = async ()=>{
    const offset = (currentPage-1) * perPage;  
    try{
         const response = await axios.get(`https://dummyjson.com/products`,{
            params:{
                limit:perPage,
                skip:offset
            }
         });
        setProduct(response.data.products)
        setTotalProducts(response.data.total)
         
      }catch(error){
              console.log("Error while fetch product"+error );
              
      }
  }
  useEffect(()=>{
    fetchProduct();
  },[currentPage])
  const totalPage = Math.ceil(totalProducts/perPage)
  const pageNumber = Array.from({length:totalPage},(_,i)=>i+1)
const handlePrevious=()=>{
   if(currentPage>1)
   {
       setCurrentPage(currentPage-1)
   }
}
const handleNext=()=>{
    if(currentPage<totalPage)
    {
        setCurrentPage(currentPage+1)
    }
}
const handlePageNumberClick=(pageNumber)=>{
    setCurrentPage(pageNumber)
}
  
  return (
    <div className="container">
      <h1>Product List</h1>
      {products.length > 0 && (
        <div className="products">
          {products.map((prod) => (
            <div className="products-single" key={prod.id}>
              <img src={prod.thumbnail} alt={prod.title} className="product-img" />
              <span className="product-title">{prod.title}</span>
            </div>
          ))}
        </div>
      )}
      <div className='pagination'>

        <button
        className='pagination-button'
        onClick={handlePrevious}
        disabled={currentPage===1}
        >⬅️</button>
        {
            pageNumber.map((pageNum)=>(
                <button
                className={`pagination-button ${currentPage===pageNum ? 'active' : ''}`}
                key={pageNum}    
                onClick={()=>handlePageNumberClick(pageNum)}            
                >
                    {pageNum}
                </button>
            ))
        }
        <button
        className='pagination-button'
        onClick={handleNext}
        disabled={currentPage===totalPage}
        >
            ➡️
        </button>
      </div>
      </div>
  )
}

export default Pagination
