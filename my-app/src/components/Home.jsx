// import Banner from "./banner/Banner"
import About from "./about/About"
import Products from "./products/Products"
import TextSlider from "./TextSlider/TestSlider"
const Home = (props) => {
    return(
       <>
            {/* <Banner/> */}
            <TextSlider/>
            <About/>
            <Products
            items = {props.items}
            cartItem = {props.cartItem} 
            setCartItem = {props.setCartItem}
            setSearch = {props.setSearch}
            search = {props.search}
            favoritesItems = {props.favoritesItems}
            setFavoritesItems = {props.setFavoritesItems}
            loading = {props.loading}
             />  
       </> 
    )
}

export default Home