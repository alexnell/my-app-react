import axios from "axios";
import React from "react";
import Card from "./card/Card";
import style from './product.module.css';


const Products = (props) => {
  //asinc асинхронная функция
    const onAddToCard = async (objCart) =>{
        try{
            const findCartItem = props.cartItem.find((cartItem) => cartItem.myId === objCart.myId)
            if(findCartItem){
              //удаление с бэкенда
               axios.delete(`https://636d8fa9b567eed48ac423e6.mockapi.io//cart/${findCartItem.id}`)
              //  удаление с фронтенда
                props.setCartItem(prev => prev.filter(cartItem => cartItem.myId !== objCart.myId))
            }else{
                const {data} = await axios.post('https://636d8fa9b567eed48ac423e6.mockapi.io//cart',objCart)
         // вернуть все, что находится в массиве cartItems на данный момент
        // и добавить объект после того, как отобразились все данные массива
        props.setCartItem([...props.cartItem,data]);
        }
        }   
        catch{
            alert('Не удалось добавить товар в корзину')
        }
    }


    
  const onAddToFavorite = async (objFavorite) => {
    try{
      const findFavoriteItem =  props.favoritesItems.find(favoriteItem => favoriteItem.myId === objFavorite.myId)
      if (findFavoriteItem)  {
        axios.delete(`https://636d8fa9b567eed48ac423e6.mockapi.io//favorites/${findFavoriteItem.id}`)
        props.setFavoritesItems(prev => prev.filter(favoriItem => favoriItem.myId !== objFavorite.myId))
      }else{
        const {data} = await axios.post('https://636d8fa9b567eed48ac423e6.mockapi.io//favorites', objFavorite)
        props.setFavoritesItems([...props.favoritesItems, data]);
      }
    }
    catch{
      alert('Не удалось добавить товар в избранное')
    }
  }
  const onSearchInput = (inputValue)=>{
        props.setSearch(inputValue.target.value)
  }

  const renderCard = () => {
    const filterItems = props.items.filter((item) =>
    item.title.toLowerCase().includes(props.search.toLowerCase())
  )
      return(
      props.loading ? [...Array(6)] : filterItems
    ).map((obj, index) => {
      return (
                        <Card 
                        key = {index}
                        {...obj}
                        

                        isLoading = {props.loading}
                        // isAdded={props.cartItem.some((objIsAdded) => objIsAdded.myId ===obj.myId)}
                        // isFavorite={props.favoritesItems.some((objIsFavorite)=> objIsFavorite.myId === obj.myId)}


                        onPlus = { (cartObj)=> {
                            onAddToCard(cartObj)
                        }
                    }
                        onFavorite = {
                            (favoriteObj) =>{
                                onAddToFavorite(favoriteObj)
                            }
                        }
                        /> 
                    )
                })
  }

    return(
    <div className={style.product_section}>
        <div className = {style.search}>
        <h2>{props.search ? 'Поиск по запросу: ' + props.search : 'Все смартфоны'}</h2>  
            <div className={style.search_block}>
                <img src="/img/search.png" alt="search" />
                <input onChange={onSearchInput} placeholder = "Поиск по товарам"/>
                
            </div> 

          </div>    
            <div className={style.products}>
              {
               renderCard()
              }  

        </div>
    </div>  
    );
}
export default Products