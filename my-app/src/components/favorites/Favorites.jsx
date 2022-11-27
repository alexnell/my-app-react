import React from "react";
import axios from "axios";
import style from "./favorites.module.css"
import FavoritesCard from "./favoriesCard/favoritesCard";
import { AppContext } from "../../App";


const Favorites = (props) =>{

     const context = React.useContext(AppContext);
     
     const onAddToCard = async (objCart) =>{
        try{
            const findCartItem = context.cartItem.find((cartItem) => cartItem.myId === objCart.myId)
            if(findCartItem){
              //удаление с бэкенда
               axios.delete(`https://636d8fa9b567eed48ac423e6.mockapi.io//cart/${findCartItem.id}`)
              //  удаление с фронтенда
                context.setCartItem(prev => prev.filter(cartItem => cartItem.myId !== objCart.myId))
            }else{
                const {data} = await axios.post('https://636d8fa9b567eed48ac423e6.mockapi.io//cart',objCart)
         // вернуть все, что находится в массиве cartItems на данный момент
        // и добавить объект после того, как отобразились все данные массива
        context.setCartItem([...context.cartItem,data]);
        }
        }   
        catch{
            alert('Не удалось добавить товар в корзину')
        }
    }
    // const onAddToCard = (objCart) =>{
    //     axios.post('https://636d8fa9b567eed48ac423e6.mockapi.io//cart',objCart)
    //     context.setCartItem([...context.cartItem,objCart]);
    // }

    const onRemoveFavorites = (id) => {
        axios.delete(`https://636d8fa9b567eed48ac423e6.mockapi.io//favorites/${id}`)
        context.setFavoritesItems((prev) => prev.filter(item => Number(item.id) !== Number(id)))
    }


    
    return(
        <div className={style.product_section}>
            <div className = {style.search}>
            <h2>Избранные товары</h2>  
             <h2>{context.favoritesItems.length}</h2>     
            </div>    
                <div className={style.products}>
                  {
                    context.favoritesItems.map(obj =>{
                        return(
                           
                        <FavoritesCard 
                            myId = {obj.myId}   
                            key={obj.id} 
                            id={obj.id}
                            title = {obj.title} 
                            description = {obj.description} 
                            price = {obj.price} 
                            img = {obj.img}
                            onPlus = { (cartObj)=> {
                                onAddToCard(cartObj)
                            }
                        }
                            onFavorite ={
                                (id) =>{onRemoveFavorites(id)

                                }
                            }
                                                   
                        /> 

                            
                        )
                    })
                  }  
    
            </div>
        </div>  
        )
    }

export default Favorites