import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";

// Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

// Import Components
import MiniWidgets from "./MiniWidgets";
import RecentlyActivity from "./RecentlyActivity";
import LatestTransactions from "./LatestTransactions";
import { GetDashboard } from "../../services/AuthServices/Api";

const Dashboard = () => {
    const [breadcrumbItems] = useState([
        { title: "Nazox", link: "/" },
        { title: "Dashboard", link: "#" },
    ]);
    const [DataDashboard, setDataDashboard] = useState([])
    const [latestFiles, setlatestFiles] = useState([])
    const [latestMembers, setlatestMembers] = useState([])

    const [reports,setreports] = useState([]);

    useEffect(() =>{    
        const Data = JSON.parse(localStorage.getItem("authUser"))

        const GetData = async () =>{
            await GetDashboard(Data.token).then(res =>{
                console.log(res)
                setDataDashboard(res.data)
                setreports([
                    { icon: "ri-stack-line", title: "Membres", value: res.data.NbMember },
                    { icon: "ri-store-2-line", title: "Membres non adhérents", value: res.data.MembersNI },
                    { icon: "ri-briefcase-4-line", title: "Total des fichiers importés", value: res.data.NbFiles },
                ])
                setlatestFiles(res.data.FilesRecent)

                for (let index = 0; index < res.data.latestMembers.length; index++) {
                    if(res.data.latestMembers[index].Membership == 0){
                        res.data.latestMembers[index].Membership = "Non"
                    } else{
                        res.data.latestMembers[index].Membership = "Oui"
                    }
                }
                console.log(res.data.FilesRecent)
                setlatestMembers(res.data.latestMembers)
            } )
        }
        GetData()
    },[])

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col xl={12}>
                            <Row>
                                <MiniWidgets reports={reports} />
                            </Row>
                            {/* revenue Analytics */}
                            {/* <RevenueAnalytics /> */}
                        </Col>
                        {/* <Col xl={4}>
                            <SalesAnalytics/>
                            <EarningReports/>
                        </Col> */}
                    </Row>
                    <Row>
                        {/* <Sources/> */}
                        <RecentlyActivity latestFiles={latestFiles}/>
                        {/* <RevenueByLocations/> */}
                        <LatestTransactions latestMembers={latestMembers}/>
                    </Row>
                    <Row>
                        {/* chat box */}
                        {/* <ChatBox/> */}
                        {/* latest transactions */}
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
}

export default Dashboard;
