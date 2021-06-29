  const cartReducer = (state=[],action) => {
    switch(action.type){
        case 'ADD':
            try{
                const exisObj = state.find(cartObj=>cartObj._id===action.data._id)
                if(exisObj.qty>0&&exisObj.qty<exisObj.countInStock){
                    exisObj.qty+=1  
                }
                return state.filter(cartObj=>cartObj._id!==action.data._id).concat(exisObj)

            }
            catch{
                return state.concat({...action.data,qty:1})
            }
        case 'UPDATE':
            const exisObj = state.find(cartObj=>cartObj._id===action.data.id)
            exisObj.qty = action.data.qty
            return state.filter(cartObj=>cartObj._id!==action.data.id).concat(exisObj)
        case 'REMOVE':
            return state.filter(item=>item.id!==action.data)
        case 'CLEAR':
            return []
        default:
            return state
    }
}

export default cartReducer