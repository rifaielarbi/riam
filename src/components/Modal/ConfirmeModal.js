import React from "react"
import PropTypes from 'prop-types'
import { Col, Modal, ModalBody, Row } from "reactstrap"

const ConfirmModal = ({ show, onDeleteClick, onCloseClick,title,message }) => {
  return (
    <Modal isOpen={show} toggle={onCloseClick} centered={true}>
      <ModalBody className="py-3 px-5">
        <Row>
          <Col lg={12}>
            <div className="text-center">
              <i
                className="mdi mdi-alert-circle-outline"
                style={{ fontSize: "5em", color: "orange" }}
              />
              <h2 style={{fontSize : 18}} >{title}</h2>
              <h4 style={{fontSize : 16}}>{message}</h4>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="text-center mt-3">
              <button
                type="button"
                className="btn btn-success btn-lg me-2"
                onClick={onDeleteClick}
              >
                Oui
              </button>
              <button
                type="button"
                className="btn btn-danger btn-lg me-2"
                onClick={onCloseClick}
              >
                Non
              </button>
            </div>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  )
}

ConfirmModal.propTypes = {
  onCloseClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  show: PropTypes.any
}

export default ConfirmModal
