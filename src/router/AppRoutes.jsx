import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/Main"
import DecisionPage from "../pages/Decision";

function AppRoutes(){
    return(
        <Routes>
            <Route path="/" element ={<MainPage/>}/>
            <Route path="/decision/:id" element ={<DecisionPage/>}/>
        </Routes>
    )
}

export default AppRoutes;