import { FC, useEffect, useRef, useState } from "react"
import { Animated } from "react-native"
import { hocStyles } from "@styles/GlobalStyles"


interface CartAnimationWrapperProps{
    cartCount: number
    children: React.ReactNode
}

const CartAnimationWrapper:FC<CartAnimationWrapperProps>= ({cartCount, children}) =>{

    const slideAnimated = useRef(new Animated.Value(0)).current

    const [hasAnimated, setHasAnimated] = useState(false)

    useEffect(()=>{
        if(cartCount > 0 && !hasAnimated) {
            Animated.timing(slideAnimated, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            }).start(()=> setHasAnimated(true))
        }
        else if(cartCount === 0 && hasAnimated) {
            Animated.timing(slideAnimated, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }).start(()=> setHasAnimated(false))
        }
    }, [cartCount, hasAnimated])

    const slideUpStyle ={
        transform: [
            {
                translateY: slideAnimated.interpolate({
                    inputRange: [0, 1],
                    outputRange: [100, 0]
                })
            }
        ],
        opacity: slideAnimated
    }

    return(
        <Animated.View style={[hocStyles.cartContainer,slideUpStyle]} >{children}</Animated.View>
    )
}

export default CartAnimationWrapper