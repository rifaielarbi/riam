import React, { useState, useEffect } from "react";
import { Row, Col, Button, Alert, Container, Label } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { registerUser, registerUserFailed, apiError } from '../../store/actions';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import logoRiam from '../../assets/images/LOGO-RIAM.jpeg';
import { AuthSignup } from '../../services/AuthServices/Api';

const Register = ({ user, loading, registerUser, apiError, registerUserFailed }) => {
    const [formData, setFormData] = useState({
        email: "",
        fullname: "",
        password: "",
        repetpassword : ""
    });
    const [loginSucces , setloginSucces] = useState(false)
    const [registrationError , setregistrationError] = useState(null)

    const handleSubmit = async (event, values) => {
        await AuthSignup(formData.fullname, formData.email,formData.password,0).then(async (res) =>{
            if(res['status'] == "success"){
                setloginSucces(true)
                setFormData({
                    email: "",
                    fullname: "",
                    password: "",
                    repetpassword : ""
                })
            } 
           
            // dispatch(loginUserSuccessful(res['data']))
            // await localStorage.setItem("authUser", JSON.stringify(res['data']));
            // navigate('/dashboard');
    
        }).catch(err =>{
            console.log(err.response.data['message'])
            if(err.response.data['message']  == "User Exist"){
                setregistrationError("L'adresse e-mail que vous avez fournie existe déjà. Veuillez utiliser une autre adresse e-mail pour vous inscrire.")
            }
        })
      };
    useEffect(() => {
        registerUserFailed("");
        apiError("");
        document.body.classList.add("auth-body-bg");
    }, [registerUserFailed, apiError]);

    return (
        <React.Fragment>
            <div>
                <Container fluid className="p-0">
                    <Row className="g-0">
                        <Col lg={4}>
                            <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100">
                                <div className="w-100">
                                    <Row className="justify-content-center">
                                        <Col lg={9}>
                                            <div>
                                                <div className="text-center">
                                                    <div>
                                                        <Link to="/" className="">
                                                            <img
                                                                src={logoRiam}
                                                                alt=""
                                                                height="80"
                                                                className="auth-logo logo-dark mx-auto"
                                                            />
                                                        </Link>
                                                    </div>
                                                    <h4 className="font-size-18 mt-4">Register account</h4>
                                                </div>

                                                {loginSucces == true && <Alert color="success">Registration Done Successfully.</Alert>}

                                                {registrationError && <Alert color="danger">{registrationError}</Alert>}

                                                <div className="p-2 mt-5">
                                                    <AvForm onValidSubmit={handleSubmit} className="form-horizontal" >
                                                        <div className="auth-form-group-custom mb-4">
                                                            <i className="ri-user-2-line auti-custom-input-icon"></i>
                                                            <Label htmlFor="username">Nom et Prénom</Label>
                                                            <AvField name="username" value={formData.username} type="text" className="form-control" id="username" placeholder="Entrer votre nom complet"
                                                                    onChange={(event)=>{
                                                                        setFormData((prevState) => ({
                                                                            ...prevState,
                                                                            fullname: event.target.value,
                                                                          }));
                                                                    }}

                                                            />
                                                        </div>

                                                        <div className="auth-form-group-custom mb-4">
                                                            <i className="ri-mail-line auti-custom-input-icon"></i>
                                                            <Label htmlFor="useremail">Email</Label>
                                                            <AvField name="email" value={formData.email} validate={{ email: true, required: true }} type="email" className="form-control" id="useremail" placeholder="Entrer l'adresse email"
                                                                  onChange={(event)=>{
                                                                    setFormData((prevState) => ({
                                                                        ...prevState,
                                                                        email: event.target.value,
                                                                      }));
                                                                }}
                                                            />
                                                        </div>

                                                        <div className="auth-form-group-custom mb-4">
                                                            <i className="ri-lock-2-line auti-custom-input-icon"></i>
                                                            <Label htmlFor="userpassword">Mot de passe</Label>
                                                            <AvField name="password" value={formData.password} type="password" className="form-control" id="userpassword" placeholder="Entrer le mot de passe"
                                                                 onChange={(event)=>{
                                                                    setFormData((prevState) => ({
                                                                        ...prevState,
                                                                        password: event.target.value,
                                                                      }));
                                                                }}
                                                            />
                                                        </div>

                                                        <div className="auth-form-group-custom mb-4">
                                                            <i className="ri-lock-2-line auti-custom-input-icon"></i>
                                                            <Label htmlFor="userpassword">Confirmer le mot de passe</Label>
                                                            <AvField name="password" value={formData.repetpassword} type="password" className="form-control" id="userpassword" placeholder="Entrer le mot de passe" />
                                                        </div>

                                                        <div className="text-center">
                                                            <Button color="primary" className="w-md waves-effect waves-light" type="submit">{loading ? "Chargement..." : "S'inscrire"}</Button>
                                                        </div>
                                                    </AvForm>
                                                </div>

                                                <div className="mt-5 text-center">
                                                    <p>Vous avez déjà un compte? <Link to="/login" className="fw-medium text-primary"> Login</Link> </p>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Col>
                        <Col lg={8}>
                            <div className="authentication-bg">
                                <div className="bg-overlay"></div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

const mapStatetoProps = state => {
    const { user, registrationError, loading } = state.Account;
    return { user, registrationError, loading };
};

export default connect(mapStatetoProps, { registerUser, apiError, registerUserFailed })(Register);
