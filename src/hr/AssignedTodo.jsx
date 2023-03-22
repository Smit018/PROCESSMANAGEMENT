import { Button, CaretDownIcon, CircleArrowRightIcon, EditIcon, Menu, PeopleIcon, Popover, Position, TrashIcon } from 'evergreen-ui';
import * as React from 'react'
import { useParams } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';
import MultiSelect from '../components/MultiSelect';
import Todo from '../components/Todo';




const AssignedTodo = (props) => {
    const params = useParams()
    const [pageTitle, setPageTitle] = React.useState(`Assigned ${params?.type == 'to' ? 'To' : 'By'}`)
    const [color, setColor] = React.useState(params?.mode === 'overdue' ? 'red' : 'yellow')

    const paths = [
        { path: '/hr/dashboard', title: 'Dashboard' },
        { path: '', title: pageTitle, color: color },
    ];

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
            "name": "dapibus nulla suscipit ligula in lacus curabitur at ipsum ac tellus semper interdum mauris ullamcorper purus sit amet nulla quisque",
            "frequency": "Monthly",
            "createdAt": "2023-02-25T12:21:05Z",
            "status": "Accepted"
        }, {
            "id": 2,
            "name": "rutrum at lorem integer tincidunt ante vel ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est risus auctor sed tristique in tempus sit amet sem fusce consequat nulla nisl nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa donec dapibus duis at velit eu est congue elementum in hac habitasse platea dictumst morbi vestibulum velit id pretium iaculis diam erat fermentum",
            "frequency": "Yearly",
            "createdAt": "2023-02-09T08:03:54Z",
            "status": "Assigned"
        }, {
            "id": 3,
            "name": "vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque duis bibendum morbi non quam nec dui luctus rutrum nulla tellus in sagittis dui vel nisl duis ac",
            "frequency": "Daily",
            "createdAt": "2022-04-16T16:44:30Z",
            "status": "Accepted"
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

    console.log(params)




    return (
        <div className='w-full h-full flex flex-col'>
            <div>
                <Breadcrumbs paths={paths} />
            </div>
            <div className='my-4 bg-[#3366ff0d] rounded shadow-md flex w-full'>
                <div className='flex-auto px-10 py-4 flex flex-col'>
                    <p className='text-xl font-semibold'>36</p>
                    <span className='text-gray-400 font-semibold text-sm mt-1'>ASSIGNED</span>
                </div>
                <div className='flex-auto px-10 py-4 flex flex-col'>
                    <p className='text-xl font-semibold'>12</p>
                    <span className='text-gray-400 font-medium text-sm mt-1'>ACCEPTED</span>
                </div>
                <div className='flex-auto'></div>
            </div>
            <div className='flex justify-end gap-4 mb-4'>
                <MultiSelect
                    options={emp}
                    label={[pageTitle]}
                />
                <MultiSelect
                    options={[]}
                    label={'FILTER'}
                    filter={true}
                />
            </div>
            <div className='mb-4'>
                {todos?.map((todo, index) => (
                    <div className='mb-12' key={index}>
                        <h2 className='text-xl mb-8'>{todo?.name} ({todo.todos?.length})</h2>
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
    )
}

export default AssignedTodo