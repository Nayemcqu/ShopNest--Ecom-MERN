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
        (x) => x._id === item._id
    );

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        state.cartItems.push({
            ...item,
            quantity: 1
        });
    }
    localStorage.setItem('cartItems',JSON.stringify(state.cartItems));
},
removeByQuantity:(action,state)=>{

    const product=action.payload;

    const existingItem=state.cartItems.find((x)=>x._id===product._id);

   if (existingItem) {
    existingItem.quantity--;

    if (existingItem.quantity <= 0) {
      state.cartItems = state.cartItems.filter(
        (x) => x._id !== product._id
      );
    }
  }

localStorage.setItem('cartItems',JSON.stringify(state.cartItems));
},
removeFromCart: (state, action) => {

    const itemId = action.payload;

    state.cartItems = state.cartItems.filter(
        (x) => x._id !== itemId
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