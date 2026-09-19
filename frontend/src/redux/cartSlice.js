import {createSlice} from '@reduxjs/toolkit'

const initialState={
    cartItems:localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) :[]
}

const cartSlice=createSlice({
name:"cart",
initialState,
reducers:{
addToCart: (state, action) => {
    const item = action.payload;

    const existingItem = state.cartItems.find(
        (x) => x.productId === item.productId
    );

    if (existingItem) {
        existingItem.quantity++;
    } else {
        state.cartItems.push({
            ...item,
            quantity: 1
        });
    }
    localStorage.setItem('cartItems',JSON.stringify(state.cartItems));
},
removeByQuantity:(state,action)=>{

    console.log("ACTION PAYLOAD:", action.payload);
console.log("CART:", state.cartItems);
    const product=action.payload;

    const existingItem=state.cartItems.find((x)=>x.productId===product.productId);

   if (existingItem) {
    existingItem.quantity--;

    if (existingItem.quantity <= 0) {
      state.cartItems = state.cartItems.filter(
        (x) => x.productId !== product.productId
      );
    }
  }

localStorage.setItem('cartItems',JSON.stringify(state.cartItems));
},
removeFromCart: (state, action) => {

    const itemId = action.payload;

    state.cartItems = state.cartItems.filter(
        (x) => x.productId !== itemId
    );

    localStorage.setItem(
        'cartItems',
        JSON.stringify(state.cartItems)
    );
},

clearCart:(state)=>{
    state.cartItems=[];
    localStorage.removeItem('cartItems')
}
}

})

export const {addToCart,removeFromCart,clearCart,removeByQuantity}=cartSlice.actions;
export default cartSlice.reducer;