import { Login } from "@mui/icons-material";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar/SideBar";
import Departments from "../screens/Departments/Departments";
import Documents from "../screens/Documents/Documents";
import Employee from "../screens/Employee/Employee";
import Process from "../screens/Process/Process";
import Types from "../screens/Types/Types";
import Vendors from "../screens/Vendors/Vendors";
import WhatsappGroup from "../screens/WhatsappGroup/WhatsappGroup";
import AssignedToDo from "./AssignedToDo";
import Dashboard from "./Dashboard";


const AdminRoutes = () => (
    <Routes>
        <Route path='admin/login' element={<Login />} />
        <Route path='admin' element={<SideBar role="admin" />}>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='assigned/:type' element={<AssignedToDo />} />
            <Route path="processes" exact element={<Process />}></Route>
            <Route path="employees" exact element={<Employee />}></Route>
            <Route path="vendors" exact element={<Vendors />}></Route>
            <Route path="whatsapp-groups" element={<WhatsappGroup />}></Route>
            <Route path="documents" element={<Documents />}></Route>
            <Route path="department" element={<Departments />}></Route>
            <Route path="type" element={<Types />} />
        </Route>
    </Routes>
)

export default AdminRoutes;