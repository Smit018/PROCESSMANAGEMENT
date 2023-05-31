import '../../App.css'
import React from 'react'
import { useState} from 'react';
import { AlphabetIcon } from '../../components/Icons';
import Todo from '../../components/Todo';
import DateSelect from '../../components/DateSelect';
import { useParams } from 'react-router-dom';



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
            "name": "hac habitasse platea dictumst morbi vestibulum velit id pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac",
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
            "name": "tempus sit amet sem fusce consequat nulla nisl nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa donec dapibus duis at velit eu est congue elementum in",
            "frequency": "Monthly",
            "createdAt": "2022-07-15T06:42:54Z",
            "status": "Assigned"
        }, {
            "id": 9,
            "name": "cursus id turpis integer aliquet massa id lobortis convallis tortor risus dapibus augue vel accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam sit amet turpis elementum ligula vehicula consequat morbi a ipsum integer a nibh in quis justo maecenas rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet maecenas leo odio condimentum id luctus nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas tristique est et tempus semper est quam pharetra magna ac consequat",
            "frequency": "Yearly",
            "createdAt": "2022-09-22T22:48:05Z",
            "status": "Accepted"
        }, {
            "id": 10,
            "name": "amet lobortis sapien sapien non mi integer ac neque duis bibendum morbi non quam nec dui luctus rutrum nulla tellus in sagittis dui vel nisl duis ac nibh fusce lacus purus",
            "frequency": "Yearly",
            "createdAt": "2022-12-25T11:53:20Z",
            "status": "Assigned"
        }]
    }, {
        "id": 2,
        "name": "Rodrique Bleakley",
        "todos": [{
            "id": 1,
            "name": "suspendisse potenti cras in purus eu magna vulputate luctus cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit amet justo morbi ut odio cras mi pede malesuada in imperdiet et commodo vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate",
            "frequency": "Monthly",
            "createdAt": "2022-12-06T23:43:08Z",
            "status": "Assigned"
        }, {
            "id": 2,
            "name": "luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat id mauris vulputate elementum",
            "frequency": "Yearly",
            "createdAt": "2022-11-16T19:36:36Z",
            "status": "Assigned"
        }, {
            "id": 3,
            "name": "morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat nulla tempus vivamus in felis eu sapien cursus vestibulum proin eu mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus",
            "frequency": "Monthly",
            "createdAt": "2022-09-23T13:55:34Z",
            "status": "Assigned"
        }, {
            "id": 4,
            "name": "et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat id mauris vulputate elementum nullam varius nulla facilisi cras non velit nec",
            "frequency": "Yearly",
            "createdAt": "2022-04-14T21:58:36Z",
            "status": "Accepted"
        }, {
            "id": 5,
            "name": "ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat id mauris vulputate elementum nullam varius nulla",
            "frequency": "Monthly",
            "createdAt": "2022-09-16T23:17:01Z",
            "status": "Completed"
        }, {
            "id": 6,
            "name": "in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget orci vehicula condimentum curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt",
            "frequency": "Monthly",
            "createdAt": "2023-01-01T00:59:13Z",
            "status": "Assigned"
        }, {
            "id": 7,
            "name": "nulla nisl nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa donec dapibus duis at velit eu est congue elementum in hac habitasse platea dictumst morbi vestibulum velit id pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin ut suscipit a feugiat et eros vestibulum ac est",
            "frequency": "Monthly",
            "createdAt": "2022-06-12T09:56:04Z",
            "status": "Assigned"
        }, {
            "id": 8,
            "name": "venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat id mauris vulputate elementum nullam varius nulla facilisi cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum",
            "frequency": "Yearly",
            "createdAt": "2022-11-03T21:22:40Z",
            "status": "Accepted"
        }, {
            "id": 9,
            "name": "orci vehicula condimentum curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat nulla tempus vivamus in felis eu sapien cursus vestibulum proin eu mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque duis bibendum morbi non quam nec dui luctus",
            "frequency": "Monthly",
            "createdAt": "2022-05-22T07:59:44Z",
            "status": "Assigned"
        }, {
            "id": 10,
            "name": "vehicula consequat morbi a ipsum integer a nibh in quis justo maecenas rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet maecenas",
            "frequency": "Yearly",
            "createdAt": "2022-09-10T06:12:40Z",
            "status": "Accepted"
        }]
    }]

    return (
        <div>

            <div className='flex gap-4'>
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
            </div>

            </div>
            
        </div>


)
}

export default Todos