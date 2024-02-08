import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

//Import Components
import MiniWidgets from "./MiniWidgets";
import RevenueAnalytics from "./RevenueAnalytics";
import SalesAnalytics from "./SalesAnalytics";
import EarningReports from "./EarningReports";
import Sources from "./Sources";
import RecentlyActivity from "./RecentlyActivity";
import RevenueByLocations from "./RevenueByLocations";
import ChatBox from "./ChatBox";
import LatestTransactions from "./LatestTransactions";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems : [
                { title : "Nazox", link : "/" },
                { title : "Dashboard", link : "#" },
            ],
            reports : [
                { icon : "ri-stack-line", title : "Number of Sales", value : "1452", rate : "2.4%", desc : "From previous period" },
                { icon : "ri-store-2-line", title : "Sales Revenue", value : "$ 38452", rate : "2.4%", desc : "From previous period" },
                { icon : "ri-briefcase-4-line", title : "Average Price", value : "$ 15.4", rate : "2.4%", desc : "From previous period" },
            ]
        }
        // const Data = localStorage.getItem("nonMember")
        // alert(Data)

    }

    render() {
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                    {/* <Breadcrumbs title="Dashboard" breadcrumbItems={this.state.breadcrumbItems} /> */}
                        <Row>
                            <Col xl={12}>
                                <Row>
                                    <MiniWidgets reports={this.state.reports} />
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

                            <RecentlyActivity/>

                            {/* <RevenueByLocations/> */}
                            <LatestTransactions/>

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
}

export default Dashboard;
