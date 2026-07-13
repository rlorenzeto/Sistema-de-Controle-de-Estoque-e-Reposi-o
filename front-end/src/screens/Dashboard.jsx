import './Dashboard.css';
import SideBar from '../components/SideBar'
import Header from '../components/Header';

export default function Dashboard(){
    return(
        <>
        <div className="dashboard-container">
            <SideBar/>
            <div className="dashboard-panel">
                <Header title="Dashboard"/>
            </div>
        </div>
        </>
    );
}