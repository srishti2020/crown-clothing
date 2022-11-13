import './cart-item.styles.scss'

const CartItem = ({cartItem})=> {
    console.log(cartItem)
    
    const {name, imageUrl, price,  quantity} = cartItem;
    console.log(cartItem)
    return (
        <div className='cart-item-container'>
            <img src={imageUrl} alt={`${name}`} />
            <div className='item-details'>
            <span className='name'>{name}</span>
            <span className='price'>{quantity} X ${price}</span>
            </div>
        </div>
    )
}

export default CartItem;