import { CSVLink, CSVDownload } from "react-csv";


export const CSV = (props) => {
    return (<CSVDownload  data={props.body} headers={props.headers} filename={props.filename} target="_self" />)
}