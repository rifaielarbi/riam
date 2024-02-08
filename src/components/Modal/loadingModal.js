import React from "react"
import PropTypes from 'prop-types'
import { Col, Modal, ModalBody, Row } from "reactstrap"
import { BarLoader,DoubleBubble, DoubleOrbit, SlidingPebbles,HalfMalf,TripleMaze } 
from 'react-spinner-animated';
import 'react-spinner-animated/dist/index.css'

const LoadingModal = ({ show }) => {
  return (
    <Modal isOpen={show}  centered={true} size="lg" style={{maxWidth: '200px', width: '100%'}}>
      <ModalBody className="py-3 px-5">
        <Row>
          <Col lg={12}>
            <div className="text-center">
            <TripleMaze 
                text={"Loading..."} 
                bgColor={"white"} 
                center={false} 
                // width={"180px"} 
                height={"150px"}
                />
            </div>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  )
}

LoadingModal.propTypes = {
    show: PropTypes.any
  }

export default LoadingModal
