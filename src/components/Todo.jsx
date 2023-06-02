import * as React from "react";
import { TrashIcon } from '@heroicons/react/solid'; // Import the TrashIcon from Heroicon
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';

const DeleteButton = () => {
    return (
      <button className="flex items-center space-x-2 bg-primary hover:bg-red-700 text-gray font-bold py-2 px-4 rounded">
        <TrashIcon className="h-3 w-3" /> 
      </button>
    );
  };

  const CopyButton = ({ onClick }) => {
    return (
      <button
        className="flex items-center space-x-2 bg-primary hover:bg-blue-400 text-gray font-bold py-2 px-4 rounded" onClick={onClick}>
        <ContentCopyIcon className="h-3 w-3" />
      </button>
    );
  };
  
  const CommentButton = ({ onClick }) => {
    return (
      <button
        className="flex items-center space-x-2 bg-primary hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
        onClick={onClick}
      >
        <ChatOutlinedIcon className="h-3 w-3" />
      </button>
    );
  };
  


const Todo = (props) => {

    const [color, setColor] = React.useState(props?.color === 'red' ? 'bg-red-200' : 'bg-yellow-200')
    const [isHovered,setIsHovered]=React.useState(false);
    const handleMouseEnter=()=>{
        setIsHovered(true);
    }
    const handleMouseLeave=()=>{
        setIsHovered(false);
    }
    // hover:text-blue-600 hover:underline

    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="flex gap-4">
            <p  className={`max-w-[80%] ${props.status?.toLowerCase()?.trim() === 'verified' ? 'line-through text-gray-300' : 'hover:text-blue-600 hover:underline'} text-sm font-light hover:cursor-pointer`}>
                {props.todo}
            </p>
            <div className="flex justify-center items-center gap-4 h-fit">
                <div className={`h-6 w-6 rounded-full ${color} flex items-center justify-center`}>
                    <p className="font-light text-xs uppercase">{props.frequency[0]}</p>
                </div>
                <p className="text-gray-400 line text-xs font-normal">{props.status}</p>
                {props.comments ? <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                    <p className="font-light text-xs text-blue-900">2</p>
                </div> : null }
                {isHovered && (<div className="flex">
                 <div className="ml-1"><DeleteButton/></div>
                 <div className="ml-1"><CopyButton /></div>
                 <div className="ml-1"><CommentButton/></div>
            </div>)}
            </div>
        </div>
    )
}

export default Todo