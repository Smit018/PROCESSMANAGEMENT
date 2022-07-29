import { CSVLink, CSVDownload } from "react-csv";


const csvData = [
    ["firstname", "lastname", "email"],
    ["Ahmed", "Tomi", "ah@smthing.co.com"],
    ["Raed", "Labes", "rl@smthing.co.com"],
    ["Yezzi", "Min l3b", "ymin@cocococo.com"]
];

export const CSV = (props) => {
    return (<CSVDownload  data={csvData} target="_self" />)
}