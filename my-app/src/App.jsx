import React from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom'
import './App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Cart from './components/cart/Cart';
import Favorites from './components/favorites/Favorites';
import Home from './components/Home';
// import CartItem from './components/cart/cart-item/cartItem';

//контекст
export const AppContext = React.createContext({})

function App() {
  
  //state для хранения товаров
  const[products,setProducts] = React.useState([]);
  //state состояния корзины
  const [cartOpened, setCartOpened] = React.useState(false);
  //state для хранения товаров в корзине
  const [cartItem,setCartItem] = React.useState([]);
  //state для поиска
  const [search, setSearch] = React.useState('')
  //state для хранения избранных товаров
  const [favoritesItems, setFavoritesItems] = React.useState([])
  //  state для хранения состояния загрузки
  const [loading, setLoading] = React.useState(true);
  
  // useEffect срабатывает 1 раз при передаче пустого массива []
  React.useEffect(() => {
    
    async function axiosData(){
      const cartData = await axios.get('https://636d8fa9b567eed48ac423e6.mockapi.io//cart')
      const favoriteData = await axios.get('https://636d8fa9b567eed48ac423e6.mockapi.io//favorites')
      const productsData = await axios.get('https://636d8fa9b567eed48ac423e6.mockapi.io//products')
     
      setLoading(false)  

      setCartItem(cartData.data)
      setFavoritesItems(favoriteData.data)
      setProducts(productsData.data)
    }
    axiosData()
    


  //   fetch('https://636d8fa9b567eed48ac423e6.mockapi.io/products'). 
  //   then((res) =>{
  //   return res.json()
  //   }).then((myJson) =>{
  //   setProducts(myJson)
  // });
  }, [])

  const onRemoveCartItem = (id) =>{
    axios.delete(`https://636d8fa9b567eed48ac423e6.mockapi.io//cart/${id}`)
    // все данные, которые находятся до выполнения prev.filter 
    // и отфильтровать их item.id !== id
    setCartItem((prev) => prev.filter(item =>Number(item.id) !== Number(id )))
  }

  const itemAdded = (myId) =>{
    //есть ли в cartItem объект
    return cartItem.some((objCart) => objCart.myId === myId)
  }

  const itemFavorited = (myId) =>{
    return favoritesItems.some((objFavorite) => objFavorite.myId === myId)
  }

  return (
    <AppContext.Provider value ={{
      products, 
      cartItem, 
      favoritesItems,
      setCartItem, 
      setFavoritesItems,
      setProducts,
      itemAdded,
      itemFavorited     
      }}>
    <div className="App">
      {cartOpened ? <Cart 
      onRemoveCartItem = {onRemoveCartItem}
      cartItem={cartItem}
      closeCart = { () => setCartOpened(!cartOpened)}
      totalPrice={
        cartItem.reduce((sum, objPrice) => sum + Number(objPrice.price), 0)
      }
      /> : null} 
       
        <Header 
      openCart={ () => setCartOpened(!cartOpened)}
                      cartItem={cartItem}
            />

        <Routes>
        <Route path='/favorites' element={
         <Favorites />
        }
        />
        <Route path='/' element={
          <Home
            items = {products}
            cartItem = {cartItem} 
            setCartItem = {setCartItem}
            setSearch = {setSearch}
            search = {search}
            favoritesItems = {favoritesItems}
            setFavoritesItems = {setFavoritesItems}
            loading = {loading}
          />
        }
        />
      </Routes> 
      
    <Footer/>
  </div>
  </AppContext.Provider>
  );
}

export default App;
