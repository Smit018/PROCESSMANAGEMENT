import '../../App.css'
import React from 'react'
import { useState} from 'react';
import { AlphabetIcon } from '../../components/Icons';
import Todo from '../../components/Todo';
import DateSelect from '../../components/DateSelect';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';



const Todos = () => {
    const [dates, setDates] = useState({
        from: new Date(new Date().setDate(-30)),
        to: new Date()
    })
    const params = useParams()
    const [color, setColor] = React.useState(params?.mode === 'overdue' ? 'red' : 'yellow')

    const emp = [{
        "id": 0,
        "name": "All"
    }, {
        "id": 1,
        "name": "Natalina Buxcy"
    }, {
        "id": 2,
        "name": "Gill Bynold"
    }, {
        "id": 3,
        "name": "Rudolph Kerfut"
    }, {
        "id": 4,
        "name": "Magdalena Ellens"
    }, {
        "id": 5,
        "name": "Joby Minnette"
    }, {
        "id": 6,
        "name": "Tan Duer"
    }, {
        "id": 7,
        "name": "Wandis Friar"
    }, {
        "id": 8,
        "name": "Kat Chatain"
    }, {
        "id": 9,
        "name": "Jorey Edge"
    }, {
        "id": 10,
        "name": "Fanni Defrain"
    }]

    const todos = [{
        "id": 1,
        "name": "Antonietta Hoult",
        "todos": [{
            "id": 1,
            "name": "llamcorper purus sit amet nulla quisque",
            "frequency": "Monthly",
            "createdAt": "2023-02-25T12:21:05Z",
            "status": "Accepted"
        }, {
            "id": 2,
            "name": "rutrum at lorem integer tincidunt ante vel ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo placerat",
            "frequency": "Yearly",
            "createdAt": "2023-02-09T08:03:54Z",
            "status": "Assigned"
        }, {
            "id": 3,
            "name": "vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque duis bibendum morbi non quam nec dui luctus rutrum nulla tellus in sagittis dui vel nisl duis ac",
            "frequency": "Daily",
            "createdAt": "2022-04-16T16:44:30Z",
            "status": "Verified"
        }, {
            "id": 4,
            "name": "natoque penatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit amet justo morbi",
            "frequency": "Yearly",
            "createdAt": "2023-01-20T00:03:58Z",
            "status": "Accepted"
        }, {
            "id": 5,
            "name": "hac habitasse platea dictumst morbi vestibulum velit id pretium iaculis diam erat ferment",
            "frequency": "Yearly",
            "createdAt": "2022-09-12T00:50:01Z",
            "status": "Assigned"
        }, {
            "id": 6,
            "name": "nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa donec dapibus duis at velit eu",
            "frequency": "Monthly",
            "createdAt": "2022-11-09T15:15:09Z",
            "status": "Assigned"
        }, {
            "id": 7,
            "name": "mi integer ac neque duis bibendum morbi non quam nec dui luctus rutrum nulla tellus in sagittis dui vel nisl",
            "frequency": "Yearly",
            "createdAt": "2023-01-27T05:52:07Z",
            "status": "Accepted"
        }, {
            "id": 8,
            "name": "tempus sit amet sem enim blandit mi in porttitor pede justo eu massa donec dapibus duis at velit eu est congue elementum in",
            "frequency": "Monthly",
            "createdAt": "2022-07-15T06:42:54Z",
            "status": "Assigned"
        }, {
            "id": 9,
            "name": "cenas rhoncus aliquam lacuue viverra pede ac diam cras pellentesque volutpat dui maecenas tristique est et tempus semper est quam pharetra magna ac consequat",
            "frequency": "Yearly",
            "createdAt": "2022-09-22T22:48:05Z",
            "status": "Accepted"
        }]
    }]

    return (
        <div>

            <div className=''>
            <div className='mb-4'>
                {todos?.map((todo, index) => (
                    <div className='mb-12' key={index}>
                        <h2 className='text-xl mb-8'>Recent Todos</h2>
                        {todo?.todos?.map((_todo, _index) => (
                            <div key={_index} className='mb-8'>
                                <Todo
                                    todo={_todo?.name}
                                    frequency={_todo?.frequency}
                                    status={_todo?.status}
                                    color={color}
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </div >
            <div className="flex justify-end mb-5">
               <Button variant="text"> VIEW ALL </Button>
            </div>
            </div>
            
        </div>


)
}

export default Todos