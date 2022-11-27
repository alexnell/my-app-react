import React from "react"
import style from './card.module.css'
import ContentLoader from "react-content-loader"
import { AppContext } from "../../../App"
const Card = (props) =>{

const context = React.useContext(AppContext)

//const[added, setAdded] = React.useState(props.isAdded)
// const[favorite, setFavorite] = React.useState(props.isFavorite)
    
  const onClickPlus = () =>{
    let id = props.id
    let myId = props.myId
    let title = props.title
    let key = props.key;
    let description = props.description
    let price = props.price
    let img = props.img
    props.onPlus({id,myId,key,title, description, price, img});
   // setAdded(!added)
    
  }

  const onClickFavorite = () =>{
    let id = props.id
    let myId = props.myId
    let title = props.title
    let description = props.description
    let price = props.price
    let img = props.img

    props.onFavorite({id, myId,title, description, price, img});
  //  setFavorite(!favorite)
    
  }
 
    return(
        <div className={style.product_item}>

          {
            props.isLoading ?
          <ContentLoader 
            speed={2}
            width={260}
            height={380}
            viewBox="0 0 303 463"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}
            >
            <rect x="0" y="358" rx="3" ry="3" width="130" height="12" /> 
            <rect x="0" y="18" rx="3" ry="3" width="160" height="14" /> 
            <rect x="0" y="50" rx="3" ry="3" width="303" height="288" /> 
            <rect x="0" y="423" rx="3" ry="3" width="113" height="22" /> 
            <rect x="199" y="411" rx="3" ry="3" width="52" height="36" /> 
            <rect x="0" y="374" rx="3" ry="3" width="172" height="16" />
        </ContentLoader>:
        <>
        {
          context.itemFavorited(props.id) === true ? <button className = {style.favorite_btn_added} onClick = {onClickFavorite}>Убрать из избранных</button> : <button className={style.favorite_btn}onClick={onClickFavorite}>Добавить в избранное</button>
        }

            
          <img className={style.product_img} src = {props.img} alt = {props.title} />
          <p className={style.product_title}>{props.title}</p>
          <p className={style.product_description}>{props.description}</p>
          <p className={style.price}>Цена</p>
          <div className={style.product_price}>
            <span>{props.price} руб</span>
            <button className= {context.itemAdded(props.myId) ? style.check_btn : style.plus_btn} onClick = {onClickPlus}>
            <img src={context.itemAdded(props.myId) ? './img/check.png' : './img/plus.png'} alt = ""/>
          
            </button>
          </div>
          </>
          } 
          
        </div>
        
    )
}
export default Card