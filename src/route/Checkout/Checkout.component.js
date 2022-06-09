import {Checkout as SourseCheckout}from "SourceRoute/Checkout/Checkout.component"
import ProgressBar from "Component/ProgressBar/ProgressBar.component"
export class Checkout extends SourseCheckout{ 
   
    render() {
        return (
            <>
                <ProgressBar steps = {this.stepMap} currentStep = {this.props.checkoutStep} maxWidth = {1100}/>
                {super.render()}
            </>
        )
    }
}

export default Checkout
