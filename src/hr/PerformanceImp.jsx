import { Button, Link, Table } from 'evergreen-ui';
import * as React from 'react'
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';
import { showEmpty, showSpinner } from '../components/GlobalComponent';
import Paginator from '../components/Paginator/Paginator';
import { DateFormat } from '../services/dateFormat';


const today = new Date().getTime()

const PerformanceImp = () => {

    const tc = React.useRef(null)

    const [employeeData, setEmployeeData] = React.useState(employee)
    const [page, setPage] = React.useState(1);
    const [pageLimit, setPageLimit] = React.useState(10);
    const [totalData, setTotalData] = React.useState(0);
    const [tableHeight, setTableHeight] = React.useState(tc?.current?.scrollHeight - 140)

    const [showTable, setShowTable] = React.useState(false)


    const paths = [
        { path: '/hr/pip', title: 'Performance Improvement Plan' },
    ];

    React.useEffect(() => {
        setTableHeight(tc?.current?.scrollHeight - 140)
        setShowTable(true)
    }, [tableHeight])

    const changePage = (type) => {
        // const _search = search ? `"name":{"regexp":"/${search}/i"},` : ''
        const filter = { where: '', include: '', order: '' }
        if (type === 'next') {
            const _page = page + 1
            setPage(_page)
            // filter.where = `"where": {${_search} "memberType":"EMPLOYEE", "deleted": {"neq": true}}, "limit": ${pageLimit}, "skip": ${(_page - 1) * pageLimit}`
            // employeeUrl(filter)
        }
        else if (type === 'prev') {
            const _page = page - 1
            setPage(_page)
            // filter.where = `"where": {${_search} "memberType":"EMPLOYEE","deleted": {"neq": true}}, "limit": ${pageLimit}, "skip": ${(_page - 1) * pageLimit}`
            // employeeUrl(filter)
        }
        else {
            setPage(type)
            // filter.where = `"where": {${_search} "memberType":"EMPLOYEE","deleted": {"neq": true}}, "limit": ${pageLimit}, "skip": ${(type - 1) * pageLimit}`
            // employeeUrl(filter)
        }
    }

    return (
        <div className='w-full h-full flex flex-col'>
            <div>
                <Breadcrumbs paths={paths} />
            </div>
            <div className='my-6 bg-[#3366ff0d] rounded shadow-md flex w-full'>
                <div className='flex-auto px-10 py-4 flex flex-col'>
                    <p className='text-xl font-semibold'>36</p>
                    <span className='text-gray-400 font-semibold text-sm mt-1'>Pending</span>
                </div>
                <div className='flex-auto px-10 py-4 flex flex-col'>
                    <p className='text-xl font-semibold'>12</p>
                    <span className='text-gray-400 font-medium text-sm mt-1'>Continue</span>
                </div>
                <div className='flex-auto px-10 py-4 flex flex-col'>
                    <p className='text-xl font-semibold'>42</p>
                    <span className='text-gray-400 font-medium text-sm mt-1'>Discontinue</span>
                </div>
            </div>
            <div ref={tc} className='flex-auto my-4 overflow-hidden'>
                {showTable ? <Table className='flex flex-col' aria-label="simple table">
                    <Table.Head>
                        <Table.TextHeaderCell className="tableH-Color">S.NO</Table.TextHeaderCell>
                        <Table.TextHeaderCell className="tableH-Color">Name</Table.TextHeaderCell>
                        <Table.TextHeaderCell className="tableH-Color">Employee Code</Table.TextHeaderCell>
                        <Table.TextHeaderCell className="tableH-Color">ENDS ON</Table.TextHeaderCell>
                        <Table.TextHeaderCell className="tableH-Color">RECOMMENDATION</Table.TextHeaderCell>
                    </Table.Head>
                    <Table.Body height={tableHeight} className='flex-auto'>
                        {!employeeData ? showSpinner() : employeeData?.length === 0 ? showEmpty() : employeeData.map((item, index) => {
                            return (
                                <Link key={item.id} to={item.id}>
                                    <Table.Row key={index}>
                                        <Table.TextCell className="tableB-Color">{index + 1}</Table.TextCell>
                                        <Table.TextCell className="tableB-Color">{item.name}</Table.TextCell>
                                        <Table.TextCell className="tableB-Color">{item.employeeCode}</Table.TextCell>
                                        <Table.TextCell className={"tableB-Color"}>
                                            <p className={today < new Date(item?.endsOn) ? "text-red-500" : ""}>{(item.endsOn) ? DateFormat(item.endsOn) : "-"}</p>
                                        </Table.TextCell>
                                        <Table.TextCell className="tableB-Color">{item.recommendation || <p className='text-blue-600 hover:underline cursor-pointer'>Add Recommendation</p>}</Table.TextCell>
                                    </Table.Row>
                                </Link>
                            )
                        })}
                    </Table.Body>
                    <Paginator
                        page={page}
                        total={totalData}
                        limit={pageLimit}
                        prev={(e) => changePage('prev')}
                        next={(e) => changePage('next')}
                        pageChange={(e) => changePage(e)}
                    />
                </Table> 
                : showSpinner()
            }
            </div>
        </div>
    )
}

export default PerformanceImp


const employee = [{
    "id": 1,
    "name": "Jonis Blanch",
    "employeeCode": "PG-MBA",
    "endsOn": "2023-02-18T19:13:45Z",
    "recommendation": ""
}, {
    "id": 2,
    "name": "Spense Larrie",
    "employeeCode": "CR-A",
    "endsOn": "2025-04-16T08:12:43Z",
    "recommendation": "congue vivamus metus arcu adipiscing molestie hendrerit at"
}, {
    "id": 3,
    "name": "Jecho Baccus",
    "employeeCode": "CA-QC",
    "endsOn": "2024-09-11T16:50:19Z",
    "recommendation": ""
}, {
    "id": 4,
    "name": "Ezekiel Guinnane",
    "employeeCode": "MR-08",
    "endsOn": "2024-05-24T18:35:45Z",
    "recommendation": "luctus cum sociis natoque penatibus"
}, {
    "id": 5,
    "name": "Odelle Prince",
    "employeeCode": "PG-WPD",
    "endsOn": "2024-07-26T12:31:58Z",
    "recommendation": "libero ut massa volutpat convallis"
}, {
    "id": 6,
    "name": "Ruthe Nisbet",
    "employeeCode": "US-IA",
    "endsOn": "2024-12-05T23:58:38Z",
    "recommendation": "mus vivamus vestibulum sagittis sapien cum"
}, {
    "id": 7,
    "name": "Farris Cottie",
    "employeeCode": "CK-U-A",
    "endsOn": "2023-06-07T14:37:40Z",
    "recommendation": "mattis odio donec vitae nisi nam ultrices libero non mattis"
}, {
    "id": 8,
    "name": "Clarabelle Melland",
    "employeeCode": "ID-KU",
    "endsOn": "2023-12-16T12:09:08Z",
    "recommendation": "habitasse platea dictumst morbi vestibulum velit id pretium iaculis"
}, {
    "id": 9,
    "name": "Reggi Agius",
    "employeeCode": "BR-AP",
    "endsOn": "2024-03-05T13:38:04Z",
    "recommendation": "interdum in ante vestibulum ante ipsum primis in faucibus orci"
}, {
    "id": 10,
    "name": "Waite Lording",
    "employeeCode": "US-AK",
    "endsOn": "2025-03-10T07:37:07Z",
    "recommendation": "augue vestibulum ante ipsum primis"
}, {
    "id": 11,
    "name": "Vivi Stobbe",
    "employeeCode": "US-MI",
    "endsOn": "2024-03-29T13:35:27Z",
    "recommendation": "orci mauris lacinia sapien quis libero nullam sit amet turpis"
}, {
    "id": 12,
    "name": "Shari Delamar",
    "employeeCode": "KE-700",
    "endsOn": "2023-09-15T01:16:51Z",
    "recommendation": "nisl nunc rhoncus dui vel sem sed sagittis nam congue"
}, {
    "id": 13,
    "name": "Phillis Joncic",
    "employeeCode": "CA-SK",
    "endsOn": "2023-11-25T01:35:02Z",
    "recommendation": "nisl aenean lectus pellentesque eget"
}, {
    "id": 14,
    "name": "Carmita Borthwick",
    "employeeCode": "BR-SP",
    "endsOn": "2024-10-29T09:20:38Z",
    "recommendation": "elit sodales scelerisque mauris sit amet eros suspendisse"
}, {
    "id": 15,
    "name": "Becki Fonzone",
    "employeeCode": "US-TX",
    "endsOn": "2023-11-03T13:08:37Z",
    "recommendation": "velit nec nisi vulputate nonummy maecenas tincidunt lacus"
}, {
    "id": 16,
    "name": "Patrizius Dilloway",
    "employeeCode": "VN-60",
    "endsOn": "2025-08-03T08:05:22Z",
    "recommendation": "id pretium iaculis diam erat fermentum"
}, {
    "id": 17,
    "name": "Kelsey McGlaughn",
    "employeeCode": "US-CA",
    "endsOn": "2023-05-13T11:55:10Z",
    "recommendation": "eu felis fusce posuere felis sed lacus"
}, {
    "id": 18,
    "name": "Elden Blaske",
    "employeeCode": "US-AK",
    "endsOn": "2025-05-10T06:31:09Z",
    "recommendation": "amet eros suspendisse accumsan tortor quis turpis sed"
}, {
    "id": 19,
    "name": "Nyssa Armall",
    "employeeCode": "DE-HE",
    "endsOn": "2023-06-05T05:55:38Z",
    "recommendation": "proin interdum mauris non ligula pellentesque ultrices phasellus id sapien"
}, {
    "id": 20,
    "name": "Nigel Lafee",
    "employeeCode": "US-GA",
    "endsOn": "2023-05-08T07:42:33Z",
    "recommendation": "eu est congue elementum in hac habitasse platea dictumst morbi"
}, {
    "id": 21,
    "name": "Nissie Kelbie",
    "employeeCode": "IN-AS",
    "endsOn": "2024-10-26T22:26:07Z",
    "recommendation": "in lacus curabitur at ipsum ac tellus semper interdum"
}, {
    "id": 22,
    "name": "Myrvyn Meriott",
    "employeeCode": "FR-Q",
    "endsOn": "2025-04-02T15:27:12Z",
    "recommendation": "porta volutpat quam pede lobortis"
}, {
    "id": 23,
    "name": "Forrester Chastey",
    "employeeCode": "IN-AR",
    "endsOn": "2023-05-29T22:56:55Z",
    "recommendation": "quis augue luctus tincidunt nulla mollis"
}, {
    "id": 24,
    "name": "Conrade Jewson",
    "employeeCode": "JP-07",
    "endsOn": "2024-11-07T05:32:19Z",
    "recommendation": "enim leo rhoncus sed vestibulum"
}, {
    "id": 25,
    "name": "Ainsley Roelofsen",
    "employeeCode": "GB-ENG",
    "endsOn": "2024-10-06T10:13:33Z",
    "recommendation": "sit amet sem fusce consequat"
}, {
    "id": 26,
    "name": "Brandon Doumerque",
    "employeeCode": "LS-F",
    "endsOn": "2025-04-10T11:06:54Z",
    "recommendation": "hac habitasse platea dictumst etiam faucibus cursus"
}, {
    "id": 27,
    "name": "Daven Bea",
    "employeeCode": "US-OR",
    "endsOn": "2025-04-07T12:29:04Z",
    "recommendation": "interdum venenatis turpis enim blandit mi"
}, {
    "id": 28,
    "name": "Chase Hearsey",
    "employeeCode": "AU-NSW",
    "endsOn": "2023-06-09T22:21:55Z",
    "recommendation": "mauris ullamcorper purus sit amet"
}, {
    "id": 29,
    "name": "Maighdiln Mulvihill",
    "employeeCode": "US-AK",
    "endsOn": "2024-03-21T09:59:35Z",
    "recommendation": "ut mauris eget massa tempor convallis nulla neque libero"
}, {
    "id": 30,
    "name": "Maressa Balassi",
    "employeeCode": "ID-SG",
    "endsOn": "2025-06-11T01:53:04Z",
    "recommendation": "penatibus et magnis dis parturient montes nascetur ridiculus mus"
}, {
    "id": 31,
    "name": "Gordan Patsall",
    "employeeCode": "CO-CAS",
    "endsOn": "2023-10-26T10:37:10Z",
    "recommendation": "adipiscing elit proin risus praesent lectus"
}, {
    "id": 32,
    "name": "Cullen De Marchi",
    "employeeCode": "US-NC",
    "endsOn": "2024-08-15T12:20:31Z",
    "recommendation": "id consequat in consequat ut nulla"
}, {
    "id": 33,
    "name": "Sibeal Heatly",
    "employeeCode": "KP-01",
    "endsOn": "2023-05-24T11:44:42Z",
    "recommendation": "quis turpis sed ante vivamus tortor duis"
}, {
    "id": 34,
    "name": "May Fossitt",
    "employeeCode": "US-FL",
    "endsOn": "2023-11-21T13:12:48Z",
    "recommendation": "molestie lorem quisque ut erat curabitur gravida nisi"
}, {
    "id": 35,
    "name": "Nita Ubee",
    "employeeCode": "US-MN",
    "endsOn": "2023-07-10T09:45:50Z",
    "recommendation": "id turpis integer aliquet massa"
}, {
    "id": 36,
    "name": "Helene Burel",
    "employeeCode": "AU-QLD",
    "endsOn": "2025-01-04T18:38:00Z",
    "recommendation": "ut odio cras mi pede"
}, {
    "id": 37,
    "name": "Ginnie Redier",
    "employeeCode": "HN-GD",
    "endsOn": "2025-06-20T15:39:25Z",
    "recommendation": "mollis molestie lorem quisque ut erat curabitur gravida nisi at"
}, {
    "id": 38,
    "name": "Tiebold Siviter",
    "employeeCode": "US-DE",
    "endsOn": "2025-08-11T16:03:06Z",
    "recommendation": "volutpat quam pede lobortis ligula sit amet eleifend"
}, {
    "id": 39,
    "name": "Galven Wethers",
    "employeeCode": "AU-QLD",
    "endsOn": "2023-10-05T23:48:44Z",
    "recommendation": "imperdiet nullam orci pede venenatis non sodales"
}, {
    "id": 40,
    "name": "Waylon Ackerley",
    "employeeCode": "AU-QLD",
    "endsOn": "2024-05-28T10:39:15Z",
    "recommendation": "nulla elit ac nulla sed vel enim sit"
}, {
    "id": 41,
    "name": "Felix MacCollom",
    "employeeCode": "BR-RS",
    "endsOn": "2025-05-18T20:22:31Z",
    "recommendation": "rhoncus dui vel sem sed"
}, {
    "id": 42,
    "name": "Angelina Tosh",
    "employeeCode": "GH-WP",
    "endsOn": "2024-09-30T04:47:59Z",
    "recommendation": "mauris lacinia sapien quis libero nullam sit amet"
}, {
    "id": 43,
    "name": "Culver Kasparski",
    "employeeCode": "AU-QLD",
    "endsOn": "2025-03-24T14:44:27Z",
    "recommendation": "tempus sit amet sem fusce consequat nulla nisl"
}, {
    "id": 44,
    "name": "Shelba McGeneay",
    "employeeCode": "ID-PB",
    "endsOn": "2023-11-24T14:02:02Z",
    "recommendation": "adipiscing elit proin interdum mauris non ligula pellentesque ultrices"
}, {
    "id": 45,
    "name": "Mair Hincks",
    "employeeCode": "US-WI",
    "endsOn": "2023-07-28T18:57:46Z",
    "recommendation": "neque aenean auctor gravida sem praesent id massa id"
}, {
    "id": 46,
    "name": "Gilly Gavan",
    "employeeCode": "CU-01",
    "endsOn": "2023-07-21T11:25:24Z",
    "recommendation": "sit amet eleifend pede libero"
}, {
    "id": 47,
    "name": "Abbi Stephenson",
    "employeeCode": "DE-NW",
    "endsOn": "2023-10-09T23:17:54Z",
    "recommendation": "faucibus orci luctus et ultrices"
}, {
    "id": 48,
    "name": "Nixie Roostan",
    "employeeCode": "CL-BI",
    "endsOn": "2025-03-10T07:04:59Z",
    "recommendation": "nullam sit amet turpis elementum ligula vehicula consequat"
}, {
    "id": 49,
    "name": "Mabelle Golland",
    "employeeCode": "US-AK",
    "endsOn": "2024-07-08T05:12:35Z",
    "recommendation": "ac nulla sed vel enim"
}, {
    "id": 50,
    "name": "Gerik Champagne",
    "employeeCode": "MR-11",
    "endsOn": "2024-11-13T21:31:30Z",
    "recommendation": "sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc"
}, {
    "id": 51,
    "name": "Courtenay Studeart",
    "employeeCode": "AU-QLD",
    "endsOn": "2024-11-21T05:14:14Z",
    "recommendation": "in sapien iaculis congue vivamus metus"
}, {
    "id": 52,
    "name": "Dolli Balderston",
    "employeeCode": "US-NC",
    "endsOn": "2024-10-29T08:24:10Z",
    "recommendation": "cubilia curae duis faucibus accumsan odio curabitur convallis"
}, {
    "id": 53,
    "name": "Tommy Allett",
    "employeeCode": "PG-GPK",
    "endsOn": "2023-11-19T08:01:47Z",
    "recommendation": "rutrum neque aenean auctor gravida sem praesent"
}, {
    "id": 54,
    "name": "Pen Mouncey",
    "employeeCode": "US-FL",
    "endsOn": "2023-09-09T11:36:33Z",
    "recommendation": "vel nisl duis ac nibh fusce lacus purus aliquet"
}, {
    "id": 55,
    "name": "Junina Writer",
    "employeeCode": "MX-OAX",
    "endsOn": "2025-07-18T09:43:56Z",
    "recommendation": "elementum ligula vehicula consequat morbi"
}, {
    "id": 56,
    "name": "Gregg Abrahamson",
    "employeeCode": "PG-NIK",
    "endsOn": "2024-11-17T11:38:43Z",
    "recommendation": "nisl ut volutpat sapien arcu sed augue aliquam erat volutpat"
}, {
    "id": 57,
    "name": "Bartholemy Firle",
    "employeeCode": "PG-NIK",
    "endsOn": "2025-08-04T23:29:27Z",
    "recommendation": "iaculis congue vivamus metus arcu adipiscing molestie hendrerit at"
}, {
    "id": 58,
    "name": "Shantee Yearne",
    "employeeCode": "PY-8",
    "endsOn": "2024-10-03T10:29:41Z",
    "recommendation": "morbi porttitor lorem id ligula"
}, {
    "id": 59,
    "name": "Brittan Henstridge",
    "employeeCode": "NZ-AUK",
    "endsOn": "2024-10-27T17:04:35Z",
    "recommendation": "nisi volutpat eleifend donec ut dolor morbi"
}, {
    "id": 60,
    "name": "Abdul Holehouse",
    "employeeCode": "PY-16",
    "endsOn": "2024-08-03T14:22:47Z",
    "recommendation": "eget tempus vel pede morbi porttitor lorem"
}, {
    "id": 61,
    "name": "Chris Vallantine",
    "employeeCode": "CA-ON",
    "endsOn": "2025-04-27T14:49:53Z",
    "recommendation": "vulputate luctus cum sociis natoque penatibus"
}, {
    "id": 62,
    "name": "Eal Hakes",
    "employeeCode": "GR-84",
    "endsOn": "2025-05-24T17:18:13Z",
    "recommendation": "magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis"
}, {
    "id": 63,
    "name": "Andros Dolton",
    "employeeCode": "AU-VIC",
    "endsOn": "2023-05-25T18:28:16Z",
    "recommendation": "arcu sed augue aliquam erat volutpat in congue etiam justo"
}, {
    "id": 64,
    "name": "Toni Middis",
    "employeeCode": "GP-U-A",
    "endsOn": "2024-08-08T21:05:36Z",
    "recommendation": "malesuada in imperdiet et commodo vulputate"
}, {
    "id": 65,
    "name": "Obadiah Farrants",
    "employeeCode": "PT-11",
    "endsOn": "2023-09-09T18:30:45Z",
    "recommendation": "at nunc commodo placerat praesent blandit nam nulla integer pede"
}, {
    "id": 66,
    "name": "Breena Camolli",
    "employeeCode": "AU-WA",
    "endsOn": "2024-11-01T06:58:45Z",
    "recommendation": "donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi"
}, {
    "id": 67,
    "name": "Poul Smooth",
    "employeeCode": "VE-K",
    "endsOn": "2023-11-06T16:18:18Z",
    "recommendation": "duis ac nibh fusce lacus purus"
}, {
    "id": 68,
    "name": "Minna Bompas",
    "employeeCode": "GR-14",
    "endsOn": "2024-03-16T17:39:33Z",
    "recommendation": "purus eu magna vulputate luctus cum sociis"
}, {
    "id": 69,
    "name": "Duncan Pady",
    "employeeCode": "NP-DH",
    "endsOn": "2024-07-18T19:26:12Z",
    "recommendation": "montes nascetur ridiculus mus etiam vel augue vestibulum rutrum"
}, {
    "id": 70,
    "name": "Andriana Letherbury",
    "employeeCode": "TR-43",
    "endsOn": "2025-08-06T15:07:25Z",
    "recommendation": "in leo maecenas pulvinar lobortis est phasellus sit"
}, {
    "id": 71,
    "name": "Sidonnie Roscamps",
    "employeeCode": "NG-PL",
    "endsOn": "2024-07-09T18:36:15Z",
    "recommendation": "elit sodales scelerisque mauris sit amet eros suspendisse"
}, {
    "id": 72,
    "name": "Lyle Tipton",
    "employeeCode": "AF-KDZ",
    "endsOn": "2024-03-27T19:59:40Z",
    "recommendation": "venenatis tristique fusce congue diam id ornare imperdiet"
}, {
    "id": 73,
    "name": "Lynea Dulany",
    "employeeCode": "AT-2",
    "endsOn": "2023-04-30T17:11:20Z",
    "recommendation": "a pede posuere nonummy integer non velit donec"
}, {
    "id": 74,
    "name": "Jasper Cortes",
    "employeeCode": "TR-38",
    "endsOn": "2024-06-16T12:15:51Z",
    "recommendation": "aenean fermentum donec ut mauris eget massa tempor convallis nulla"
}, {
    "id": 75,
    "name": "Falito Goult",
    "employeeCode": "CA-NT",
    "endsOn": "2024-08-05T05:47:18Z",
    "recommendation": "quam a odio in hac habitasse platea dictumst maecenas ut"
}, {
    "id": 76,
    "name": "Warden Monteaux",
    "employeeCode": "US-NY",
    "endsOn": "2024-06-03T00:47:06Z",
    "recommendation": "iaculis justo in hac habitasse platea dictumst"
}, {
    "id": 77,
    "name": "Conrade Pitt",
    "employeeCode": "US-MO",
    "endsOn": "2025-08-22T00:51:02Z",
    "recommendation": "id nisl venenatis lacinia aenean"
}, {
    "id": 78,
    "name": "Wood Gayler",
    "employeeCode": "GB-ENG",
    "endsOn": "2023-12-03T01:16:35Z",
    "recommendation": "adipiscing lorem vitae mattis nibh ligula nec"
}, {
    "id": 79,
    "name": "Lorena Surmeyers",
    "employeeCode": "PG-CPM",
    "endsOn": "2025-06-17T22:21:09Z",
    "recommendation": "in felis donec semper sapien a libero nam dui proin"
}, {
    "id": 80,
    "name": "Candide Hadlee",
    "employeeCode": "MX-GRO",
    "endsOn": "2024-08-26T14:29:32Z",
    "recommendation": "tempus vel pede morbi porttitor lorem id ligula"
}, {
    "id": 81,
    "name": "Ruben Howgate",
    "employeeCode": "US-MI",
    "endsOn": "2025-05-15T17:18:39Z",
    "recommendation": "odio justo sollicitudin ut suscipit a feugiat et eros vestibulum"
}, {
    "id": 82,
    "name": "Cosmo Machen",
    "employeeCode": "US-MO",
    "endsOn": "2024-09-05T18:01:33Z",
    "recommendation": "tristique fusce congue diam id"
}, {
    "id": 83,
    "name": "Callean Zanre",
    "employeeCode": "ID-RI",
    "endsOn": "2024-04-09T04:48:17Z",
    "recommendation": "quisque porta volutpat erat quisque"
}, {
    "id": 84,
    "name": "Hetti Sisson",
    "employeeCode": "MX-MEX",
    "endsOn": "2023-11-07T04:25:51Z",
    "recommendation": "nulla suspendisse potenti cras in purus eu magna vulputate"
}, {
    "id": 85,
    "name": "Morley Avery",
    "employeeCode": "CA-NT",
    "endsOn": "2024-11-03T23:04:43Z",
    "recommendation": "morbi non quam nec dui luctus rutrum nulla tellus"
}, {
    "id": 86,
    "name": "Pen Eccleshall",
    "employeeCode": "US-MS",
    "endsOn": "2023-10-02T11:02:13Z",
    "recommendation": "nunc purus phasellus in felis donec semper sapien"
}, {
    "id": 87,
    "name": "Sansone Gierhard",
    "employeeCode": "US-FL",
    "endsOn": "2023-04-27T09:23:49Z",
    "recommendation": "erat curabitur gravida nisi at nibh"
}, {
    "id": 88,
    "name": "Enos Joblin",
    "employeeCode": "PG-SHM",
    "endsOn": "2024-05-17T09:31:46Z",
    "recommendation": "id nisl venenatis lacinia aenean sit"
}, {
    "id": 89,
    "name": "Othella Belasco",
    "employeeCode": "GB-WLS",
    "endsOn": "2025-09-07T17:57:04Z",
    "recommendation": "ac diam cras pellentesque volutpat dui maecenas tristique"
}, {
    "id": 90,
    "name": "Quinn Cleminson",
    "employeeCode": "US-TX",
    "endsOn": "2025-07-05T00:45:10Z",
    "recommendation": "tincidunt in leo maecenas pulvinar lobortis est"
}, {
    "id": 91,
    "name": "Melinde Rime",
    "employeeCode": "ID-PA",
    "endsOn": "2023-08-15T22:22:33Z",
    "recommendation": "amet nulla quisque arcu libero"
}, {
    "id": 92,
    "name": "Jojo Yushkov",
    "employeeCode": "DE-NW",
    "endsOn": "2023-11-11T16:14:17Z",
    "recommendation": "morbi vel lectus in quam fringilla"
}, {
    "id": 93,
    "name": "Ban Pyper",
    "employeeCode": "US-VA",
    "endsOn": "2023-06-30T22:27:40Z",
    "recommendation": "imperdiet sapien urna pretium nisl"
}, {
    "id": 94,
    "name": "Obediah Chown",
    "employeeCode": "IT-45",
    "endsOn": "2024-08-08T03:22:20Z",
    "recommendation": "aliquam sit amet diam in magna bibendum imperdiet"
}, {
    "id": 95,
    "name": "Erin Brownsill",
    "employeeCode": "US-AK",
    "endsOn": "2024-11-22T16:13:36Z",
    "recommendation": "non sodales sed tincidunt eu"
}, {
    "id": 96,
    "name": "Terry Ventura",
    "employeeCode": "GB-ENG",
    "endsOn": "2024-05-17T14:35:25Z",
    "recommendation": "massa id lobortis convallis tortor risus"
}, {
    "id": 97,
    "name": "Birdie Maunder",
    "employeeCode": "MG-D",
    "endsOn": "2025-01-13T14:11:10Z",
    "recommendation": "dis parturient montes nascetur ridiculus mus"
}, {
    "id": 98,
    "name": "Adriena Reyes",
    "employeeCode": "US-TX",
    "endsOn": "2023-11-04T22:04:43Z",
    "recommendation": "lectus aliquam sit amet diam in magna bibendum imperdiet"
}, {
    "id": 99,
    "name": "Theobald Malan",
    "employeeCode": "AU-VIC",
    "endsOn": "2025-08-24T23:34:11Z",
    "recommendation": "ultrices posuere cubilia curae mauris viverra diam vitae"
}, {
    "id": 100,
    "name": "Claudio Heeran",
    "employeeCode": "TD-SA",
    "endsOn": "2025-07-10T12:57:13Z",
    "recommendation": "at feugiat non pretium quis lectus suspendisse potenti in"
}]
