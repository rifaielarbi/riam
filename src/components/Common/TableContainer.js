import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  useFilters,
  useExpanded,
  usePagination,
} from "react-table";
import { Table, Row, Col, Button, Input, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { Filter, DefaultColumnFilter } from "./filters";
import JobListGlobalFilter from "../../components/Common/GlobalSearchFilter";
import ConfirmModal from "../Modal/ConfirmeModal";
import { UpdateMemberRole } from "../../services/MembersServices/Api";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  isJobListGlobalFilter
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);

  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <React.Fragment>
      <Col md={4}>
        <div className="search-box me-xxl-2 my-3 my-xxl-0 d-inline-block">
          <div className="position-relative">
            <label htmlFor="search-bar-0" className="search-label">
              <span id="search-bar-0-label" className="sr-only">
                Search this table
              </span>
              <input
                onChange={e => {
                  setValue(e.target.value);
                  onChange(e.target.value);
                }}
                id="search-bar-0"
                type="text"
                className="form-control"
                placeholder={`${count} records...`}
                value={value || ""}
              />
            </label>
            <i className="bx bx-search-alt search-icon"></i>
          </div>
        </div>
      </Col>
      {isJobListGlobalFilter && (
        <JobListGlobalFilter />
      )}
    </React.Fragment>
  );
};

const TableContainer = ({
  columns,
  data,
  isGlobalFilter,
  isJobListGlobalFilter,
  isAddOptions,
  isAddUserList,
  handleOrderClicks,
  handleUserClick,
  handleCustomerClick,
  isAddCustList,
  customPageSize,
  className,
  customPageSizeOptions,
  handleClickMember,
  userData,
  dropdownData

}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: {
        pageIndex: 0,
        pageSize: customPageSize,
        sortBy: [
          {
            desc: true,
          },
        ],
      },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination
  );
  const Roles = [
    {
      id : 2,
      label : 'Membre'
    },
    {
      id : 3,
      label : 'Consommateurs'
    },
    {
      id : 4,
      label : 'Distributeurs/producteurs'
    },
    {
      id : 5,
      label : 'COS'
    },
    {
      id : 6,
      label : 'BE'
    },
    {
      id : 7,
      label : 'Candidats avec CV'
    }

  ]
  toastr.options = {
    positionClass: "toast-bottom-right",
  }
  const [dropdownValues, setDropdownValues] = useState(dropdownData);
  const [showmodal,setshowmodal] = useState(false)
  const [memberID, setmemberId] = useState()
  const [Role, setRole] = useState()

  const generateSortingIndicator = column => {
    return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : "";
  };

  const onChangeInSelect = event => {
    setPageSize(Number(event.target.value));
  };

  const onChangeInInput = event => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0;
    gotoPage(page);
  };

  const handleDropdownChange = async (rowId, selectedValue) => {
    setmemberId(rowId)
    setRole(selectedValue)
    setshowmodal(true)
    // changeRoleUSer(rowId, selectedValue)
  };

  const changeRoleUSer  = async () =>{
    await UpdateMemberRole(userData.id,memberID,Role,userData.token).then(async (res) =>{
      if(res['status'] == 'success' &&res['data'] == true ){
        const label = await getRolelabel(Role)
        setDropdownValues((prevValues) => ({
          ...prevValues,
          [memberID]: label,
        }));
        setshowmodal(false)
        toastr.success("Le rôle de l'utilisateur a été modifié avec succès.")

      }
    })


    
  }

  const getRolelabel = (id) =>{
    const rolelabel = Roles.find((item) => item.id === id)
    return rolelabel['label']
  }

  // useEffect(() =>{
  //   data.map(item =>{
  //     console.log(item)
  //       const label =  getRolelabel(item.Role)
  //       setDropdownValues((prevValues) => ({
  //         ...prevValues,
  //         [item.id]: label,
  //       }));
  //   })
  //   console.log(dropdownValues)
  // },[])

  return (
    <Fragment>
      <Row className="mb-2">
        {/* <Col md={customPageSizeOptions ? 2 : 1}>
          <select
            className="form-select"
            value={pageSize}
            onChange={onChangeInSelect}
          >   
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </Col> */}
        {isGlobalFilter && (
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
            isJobListGlobalFilter={isJobListGlobalFilter}
          />
        )}
        {isAddOptions && (
          <Col sm="7">
            <div className="text-sm-end">
              <Button
                type="button"
                color="success"
                className="btn-rounded  mb-2 me-2"
                onClick={handleOrderClicks}
              >
                <i className="mdi mdi-plus me-1" />
                Add New Order
              </Button>
            </div>
          </Col>
        )}
        {isAddUserList && (
          <Col sm="7">
            <div className="text-sm-end">
              <Button
                type="button"
                color="primary"
                className="btn mb-2 me-2"
                onClick={handleUserClick}
              >
                <i className="mdi mdi-plus-circle-outline me-1" />
                Create New User
              </Button>
            </div>
          </Col>
        )}
        {isAddCustList && (
          <Col sm="7">
            <div className="text-sm-end">
              <Button
                type="button"
                color="success"
                className="btn-rounded mb-2 me-2"
                onClick={handleCustomerClick}
              >
                <i className="mdi mdi-plus me-1" />
                New Customers
              </Button>
            </div>
          </Col>
        )}
      </Row>

      <div className="table-responsive react-table" style={{paddingBottom : 250}}>
        <Table bordered hover {...getTableProps()} className={className} style={{paddingBottom : 10}}>
          <thead className="table-light table-nowrap">
            {headerGroups.map(headerGroup => (
              <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th key={column.id}>
                    <div className="mb-2" {...column.getSortByToggleProps()}>
                      {column.render("Header")}
                      {generateSortingIndicator(column)}
                    </div>
                    <Filter column={column} />
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map(row => {
              prepareRow(row);
              return (
                <Fragment key={row.getRowProps().key}>
                  <tr >
                    {row.cells.map(cell => {
                      console.log(cell.row.original.Role)
                      if(cell.column.Header != 'Accès') {
                      return (
                        <td key={cell.id} {...cell.getCellProps()} onClick={()=>{handleClickMember(row.original)}}>
                          {cell.render("Cell")}
                        </td>
                      );
                      } else if(cell.row.original.Membership == 1){
                        return(
                        <UncontrolledDropdown>
                            <DropdownToggle color="primary" type="button">
                            {dropdownValues[cell.row.original.id] || dropdownData[cell.row.original.id] }{" "} <i className="mdi mdi-chevron-down"></i>
                            </DropdownToggle>
                            <DropdownMenu onChange={(value) => {alert(value)}} style={{ zIndex: 1000 }}>
                              <DropdownItem href="#" onClick={(e) =>{handleDropdownChange(cell.row.original.id,2)}} >Membre</DropdownItem>
                              <DropdownItem href="#" onClick={(e) =>{handleDropdownChange(cell.row.original.id,3)}} >Consommateurs</DropdownItem>
                              <DropdownItem href="#" onClick={(e) =>{handleDropdownChange(cell.row.original.id,4)}}>Distributeurs/producteurs</DropdownItem>
                              <DropdownItem href="#" onClick={(e) =>{handleDropdownChange(cell.row.original.id,5)}}>COS</DropdownItem>
                              <DropdownItem href="#" onClick={(e) =>{handleDropdownChange(cell.row.original.id,6)}}>BE</DropdownItem>
                              <DropdownItem href="#" onClick={(e) =>{handleDropdownChange(cell.row.original.id,7)}}>Candidats avec CV</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        )
                      } else {
                        return (
                        <td key={cell.id} {...cell.getCellProps()}>
                           Non membre !
                        </td>
                        )
                      }
                    })}
                      {/* <td key={5} >
                          test
                        </td> */}
                  </tr>
                </Fragment>
                
              );
            })}
          </tbody>
              <ConfirmModal
                    show={showmodal}
                    title={"Confirmation de Changement de Rôle"}
                    message={"Êtes-vous sûr(e) de vouloir changer le rôle de cet membre ?"}
                    onDeleteClick={changeRoleUSer}
                    onCloseClick={() => setshowmodal(false)}
                />
        </Table>
      </div>

      <Row className="justify-content-md-end justify-content-center align-items-center">
        <Col className="col-md-auto">
          <div className="d-flex gap-1">
            <Button
              color="primary"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              {"<<"}
            </Button>
            <Button
              color="primary"
              onClick={previousPage}
              disabled={!canPreviousPage}
            >
              {"<"}
            </Button>
          </div>
        </Col>
        <Col className="col-md-auto d-none d-md-block">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </Col>
        <Col className="col-md-auto">
          <Input
            type="number"
            min={1}
            style={{ width: 70 }}
            max={pageOptions.length}
            defaultValue={pageIndex + 1}
            onChange={onChangeInInput}
          />
        </Col>

        <Col className="col-md-auto">
          <div className="d-flex gap-1">
            <Button color="primary" onClick={nextPage} disabled={!canNextPage}>
              {">"}
            </Button>
            <Button
              color="primary"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </Button>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

TableContainer.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
};

export default TableContainer;
