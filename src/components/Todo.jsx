import * as React from "react";


const Todo = (props) => {

    const [color, setColor] = React.useState(props?.color === 'red' ? 'bg-red-200' : 'bg-yellow-200')

    return (
        <div className="flex gap-4">
            <p className="max-w-[80%] text-sm font-light hover:text-blue-600 hover:underline hover:cursor-pointer">
                {props.todo}
            </p>
            <div className="flex justify-center items-center gap-4 h-fit">
                <div className={`h-6 w-6 rounded-full ${color} flex items-center justify-center`}>
                    <p className="font-light text-xs uppercase">{props.frequency[0]}</p>
                </div>
                <p className="text-gray-400 text-xs font-normal">{props.status}</p>
                {props.comments ? <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                    <p className="font-light text-xs text-blue-900">2</p>
                </div> : null}
            </div>
        </div>
    )
}

export default Todo