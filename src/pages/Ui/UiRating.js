import React, { Component } from "react";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Card, CardBody, Col, Container, Row } from "reactstrap";

// Rating Plugin
import Rating from "react-rating";

class UiRating extends Component {
  constructor(props) {
    super(props)
    this.state = {
      breadcrumbItems: [
        { title: "UI Elements", link: "#" },
        { title: "Rating", link: "#" },
      ],
      default: 0,
      half: 0,
      customize: 0,
    }
  }

  render() {
    return (
        <React.Fragment>
          <div className="page-content">
            <Container fluid={true}>
              <Breadcrumbs title="Rating" breadcrumbItems={this.state.breadcrumbItems} />

              <Row>
                <Col className="col-12">
                  <Card>
                    <CardBody>
                      <Row>
                        <Col xl="3" md="4" sm="6">
                          <div className="p-4 text-center">
                            <h5 className="font-size-15 mb-3">Default rating</h5>
                            <Rating
                                emptySymbol="mdi mdi-star-outline text-muted"
                                fullSymbol="mdi mdi-star text-primary"
                                onChange={(rate) => this.setState({ default: rate })}
                            />{" "}
                            <span>{this.state.default}</span>
                          </div>
                        </Col>

                        <Col xl="3" md="4" sm="6">
                          <div className="p-4 text-center">
                            <h5 className="font-size-15 mb-3">Half rating</h5>
                            <Rating
                                emptySymbol="mdi mdi-star-outline text-primary"
                                fullSymbol="mdi mdi-star text-primary"
                                fractions={2}
                                onChange={(rate) => this.setState({ half: rate })}
                            />
                            <span>{this.state.half}</span>
                          </div>
                        </Col>

                        <Col xl="3" md="4" sm="6">
                          <div className="p-4 text-center">
                            <h5 className="font-size-15 mb-3">Disabled rating</h5>
                            <Rating
                                readonly
                                emptySymbol="mdi mdi-star-outline text-muted"
                                fullSymbol="mdi mdi-star text-primary"
                            />
                          </div>
                        </Col>

                        <Col xl="3" md="4" sm="6">
                          <div className="p-4 text-center">
                            <h5 className="font-size-15 mb-3">
                              Readonly rating with a value
                            </h5>
                            <Rating
                                readonly
                                initialRating={3}
                                emptySymbol="mdi mdi-star-outline text-muted"
                                fullSymbol="mdi mdi-star text-primary"
                            />
                          </div>
                        </Col>

                        <Col xl="3" md="4" sm="6">
                          <div className="p-4 text-center">
                            <h5 className="font-size-15 mb-3">
                              Customized heart rating
                            </h5>
                            <Rating
                                emptySymbol="mdi mdi-heart-outline text-danger"
                                fullSymbol="mdi mdi-heart text-danger"
                                onChange={(rate) => this.setState({ customize: rate })}
                            />
                            <span>{this.state.customize}</span>
                          </div>
                        </Col>

                        <Col xl="3" md="4" sm="6">
                          <div className="p-4 text-center">
                            <h5 className="font-size-15 mb-3">Only fill selected</h5>
                            <Rating
                                emptySymbol="mdi mdi-star-outline text-primary"
                                fullSymbol="mdi mdi-star-outline text-primary"
                                onChange={(rate) => console.log("Rating:", rate)}
                            />
                          </div>
                        </Col>

                        <Col xl="3" md="4" sm="6">
                          <div className="p-4 text-center">
                            <h5 className="font-size-15 mb-3">Handle events</h5>
                            <Rating
                                emptySymbol="mdi mdi-star-outline text-muted"
                                fullSymbol="mdi mdi-star text-primary"
                                onChange={(rate) => alert("Rating: " + rate)}
                            />
                          </div>
                        </Col>

                        <Col xl="3" md="4" sm="6">
                          <div className="p-4 text-center">
                            <h5 className="font-size-15 mb-3">10 Star Rating</h5>
                            <Rating
                                stop={10}
                                emptySymbol="mdi mdi-star-outline text-muted"
                                fullSymbol="mdi mdi-star text-primary"
                                onChange={(rate) => this.setState({ default: rate })}
                            />
                          </div>
                        </Col>

                        <Col xl="3" md="4" sm="6">
                          <div className="p-4 text-center">
                            <h5 className="font-size-15 mb-3">
                              Fractional rating
                            </h5>
                            <Rating
                                fractions={6}
                                emptySymbol="mdi mdi-star-outline text-muted"
                                fullSymbol="mdi mdi-star text-primary"
                                onChange={(rate) => this.setState({ default: rate })}
                            />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </React.Fragment>
    )
  }
}

export default UiRating
