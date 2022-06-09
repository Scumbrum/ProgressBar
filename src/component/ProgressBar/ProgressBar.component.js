import { PureComponent } from 'react';
import "Component/ProgressBar/ProgressBar.style"
import PropTypes from 'prop-types';
class ProgressBar extends PureComponent{ 

    static propTypes = {
        steps: PropTypes.object,
        currentStep: PropTypes.string,
        maxWidth: PropTypes.number
    }

    constructor(props) {
        super(props)
        this.refers =  []
        this.state = {
            base:0
        }
    }

    componentDidMount() {
        let {steps} = this.props
        this.countWidth()
        for(let i in steps) { 
           this.refers.push(null)
        }
        window.addEventListener("resize", this.countWidth)
    }

    componentDidUpdate() {
        for(let i = 0 ; i<this.getStepNumber(); i++) {
            setTimeout(()=>this.refers[i].current.classList.add("complete"),0)
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.countWidth)
    }

    getStepNumber() {
        let currentStep= 0
        let count = 0
        for(let i in this.props.steps) { 
            if(i === this.props.currentStep) {
                currentStep = count + 1
            }
            count++
        }
        return currentStep
    }

    countWidth = () => {
        let {steps, maxWidth} = this.props
        let amount = 0
        for(let i in steps) { 
            amount++
        }
        const width = (maxWidth/amount) - 50
        this.amount = amount
        this.width = width
        let base = 0
        if(window.innerWidth > maxWidth) {
            this.setState({base:(window.innerWidth - maxWidth)/2})
        }
    }

    generateSteps = () => {
        let {steps, maxWidth} = this.props
        const currentStep = this.getStepNumber()
        const stepsList = []
        let count = 1
        for(let step in steps) {
            const status = currentStep < count ? "disactive" : currentStep === count ? "active" : "done"
            if(count ===1 || count === this.amount) {
                stepsList.push(this.getStepLine(count-1, this.width + this.state.base))
            } else {
                stepsList.push(this.getStepLine(count-1, this.width))
            }
            if(count < this.amount){
                stepsList.push(this.getStepComponent(steps[step], count, status))
            }
            count++
        }
        return stepsList
    }

    getStepComponent = (step, index, status) => {

        return (
            <li className={`ProgressItem ${status}`}>
                {status !== "done" ? 
                <span className='marker'>{index}</span>:
                <span className='marker'><i className='check'></i></span>}
                <p>{step.title.split(" ")[0]}</p>
            </li>
        )
    }

    getStepLine = (index, width) => {
        const ref = React.createRef()    
        this.refers[index]= ref
        return (
            <li className='ProgressLine' style={{width:width+"px"}}>
                <span className="progress" ref={ref}></span>
            </li>
        )
    }
   
    render() {
        return (
           <div className='ProgressContainer'>
               <ul className='ProgressBar'>
                    {this.generateSteps()}
               </ul>
           </div>
        )
    }
}

export default ProgressBar
