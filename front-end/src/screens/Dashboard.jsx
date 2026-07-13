import './Dashboard.css';
import SideBar from '../components/SideBar'

export default function Dashboard(){
    return(
        <>
        <div className="dashboard-container">
            <SideBar/>
            <div className="dashboard-panel">

            </div>
        </div>
        </>
    );
}