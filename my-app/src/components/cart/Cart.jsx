import CartItem from "./cart-item/cartItem"
import style from './cart.module.css'

// const cartProducts =[
//   {
//     id:1,
//     title: 'iPhone XR_1',
//     description: 'Короткое описание продукта',
//     price: '42 999',
//     img: '/img/iphone-1.png'
//   },
//   {
//     id:1,
//     title: 'iPhone XR_2',
//     description: 'Короткое описание продукта',
//     price: '42 999',
//     img: '/img/iphone-1.png'
//   },
//   {
//     id:1,
//     title: 'iPhone XR_3',
//     description: 'Короткое описание продукта',
//     price: '42 999',
//     img: '/img/iphone-1.png'
//   },

// ]

const Cart = (props) =>{
    return(
        <div className={style.overlay}>
          <div className={style.cart}>
            <div className={style.title_block}>
            <h2>Корзина</h2>
            <button className={style.close_btn} onClick ={props.closeCart}>x</button>
            </div>

            {
               props.cartItem.length > 0 ? 
               <div className={style.cart_list}>
               {
                props.cartItem.map(obj =>{
                    return(
                      <CartItem 
                      key={obj.id} 
                      id={obj.id} 
                      title = {obj.title}
                      description={obj.description} 
                      price = {obj.price}
                      img = {obj.img}
                      onRemoveCartItem={props.onRemoveCartItem}
                      />  
                    )
                }
                )
               } 
              </div>
                : <h2>Ваша корзина пуста</h2>
            }

            
            <div className={style.total_price}>
              <p className={style.total_price_text}>Итог</p>
              <p className={style.total_price_summ}>{props.totalPrice} руб</p>
              <button>Заказать</button>
            </div>
          </div>
        </ div> 
    )
}

export default Cart