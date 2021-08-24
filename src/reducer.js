export const initialState = {
    numberCart: 0,
    basket: [],
    product: [],
};

export const getBasketTotal = (basket) => basket.reduce((amount, item) => item.price * item.quantity + amount, 0);
export const cartListItem = (basket) => basket.reduce((amount, item) => amount + item.quantity, 0)

const reducer = (state, action) => {

    console.log(action);
    switch (action.type) {
        case "ADD_TO_BASKET":

            const storeExist = state.basket.find((x) => x.id === action.item.id ? true : false)
            return {
                ...state,
                basket: storeExist ? state.basket.map((x) => x.id === action.item.id ? x.quantity < x.stok ? { ...x, quantity: x.quantity + 1 } : x : x) : [...state.basket, { ...action.item, quantity: 1 }]
            }

        case "INCREASE_QUANTITY":
            return {
                ...state,
                basket: state.basket.map((x) => x.id === action.id ? { ...x, quantity: x.quantity + 1 } : x)
            }

        // eslint-disable-next-line no-fallthrough
        case "DECREASE_QUANTITY":
            const items = state.basket.find((x) => x.id === action.id)
            if (items.quantity > 1) {
                return {
                    ...state,
                    basket: state.basket.map((x) => x.id === action.id ? { ...x, quantity: x.quantity - 1 } : x)
                }
            }


        // eslint-disable-next-line no-fallthrough
        case "REMOVE_FROM_BASKET":

            return {
                ...state,
                basket: state.basket.filter((x) => x.id !== action.id)
            };

        case "REMOVE_SPEK_BASKET":
            return {
                ...state,
                basket: state.basket.filter((y) => y.storeId !== action.id)
            };



        case "RESET_BASKET":
            return {
                ...state,
                basket: []
            }

        default:
            return state;
    }
};

export default reducer;