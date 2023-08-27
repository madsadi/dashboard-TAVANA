import { Component } from "react"

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
 
    // Define a state variable to track whether is an error or not
    this.state = { hasError: false }
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    if(error.message.includes('exception')){
      return { hasError: true }
    }
  }
  componentDidCatch(error, errorInfo) {
    // You can use your own error logging service here
    console.log({ error, errorInfo })
  }
  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className={'flex flex-col h-full grow border border-border shadow-md rounded-md bg-gray-50'}>
          <div className="text-center m-auto w-full">
            <h2> آخ آخ آخ، فکر کنم یه مشکل کوچولو جلو کارتو گرفت </h2>
            <button
              type="button"
              className="bg-gray-400 rounded px-4 py-2 mt-5"
              onClick={() => {
                this.setState({ hasError: false })
              }}
            >
              صفحه رو بارگزاری کن دوباره
            </button>
          </div> 
        </div>
      )
    }
 
    // Return children components in case of no error
 
    return this.props.children
  }
}
 
export default ErrorBoundary