import { Text, Spinner, toaster } from "evergreen-ui";



const showSpinner = () => (
    <div className='w-full h-96 flex justify-center items-center'>
        <Spinner />
    </div>
)

const showEmpty = () => (
    <div className='w-full h-96 flex justify-center items-center'>
        <Text size={400}>NO DATA FOUND!</Text>
    </div>
)

const showWaitToast = (msg, show, id) => {
    toaster.notify(msg, {
        isShown: show,
        id: id
    })
}


export { showSpinner, showEmpty, showWaitToast }