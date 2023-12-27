import {createSlice} from '@reduxjs/toolkit';

const initialState ={ 
    userInfo : null,
    productData : [],
}

const bnmarSlice = createSlice({
    name : "bnmar",
    initialState,
    reducers : {
        addToCart : (state , action)=>{
            const item = state.productData.find((item) => item.id === action.payload.id)
            if(item){
                item.quantity += action.payload.quantity;
            }else{
                state.productData.push(action.payload);
            }
            
        },
        removeFromCart : (state , action)=>{
            state.productData = state.productData.filter((product)=>
                product.id !== action.payload
            )
        },
        resetCart : (state)=>{
            state.productData = [];
        },
        increamentQuantity : (state , action)=>{
            const item = state.productData.find((product)=> product.id === action.payload)
            if(item){
                item.quantity++;
            }
        },
        decreamentQuantity : (state , action)=>{
            const item = state.productData.find((product)=> product.id === action.payload)
            if(item && item.quantity > 1){
                item.quantity--;
            }
        },
        addUser : (state , action)=>{
            state.userInfo = action.payload;
        },
        removeUser : (state)=>{
            state.userInfo = null;
        }
    }
})

export const {addToCart , removeFromCart , resetCart , increamentQuantity , 
            decreamentQuantity , addUser , removeUser} = bnmarSlice.actions;
export default bnmarSlice.reducer;