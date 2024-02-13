import React, { useState, useEffect } from 'react';
import { Row, Col, Input, Button, Alert, Container, Label } from 'reactstrap';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { checkLogin, apiError, loginUserSuccessful } from '../../store/actions';
import { AuthLogin } from '../../services/AuthServices/Api';
import logoRiam from '../../assets/images/LOGO-RIAM.jpeg';
import { colors } from '../../helpers/colors';
import withRouter from '../../components/Common/withRouter';

const Login = (props) => {
  const [state, setState] = useState({ username: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.Login.user);
  const [loginError, setloginError] = useState(false)
  const [loginErrormsg, setloginErrormsg] = useState('')
  const handleUsernameChange = (event) => {
    setState((prevState) => ({
      ...prevState,
      username: event.target.value,
    }));
  };

  const handlePasswordChange = (event) => {
    setState((prevState) => ({
      ...prevState,
      password: event.target.value,
    }));
  };

  const handleSubmit = async (event, values) => {
    console.log(state.username + ' ' + state.password);
    await AuthLogin(state.username, state.password).then(async (res) =>{
        if(res['data'].membership == 1){
        dispatch(loginUserSuccessful(res['data']))
        await localStorage.setItem("authUser", JSON.stringify(res['data']));
        localStorage.setItem("nonMember", "false");
        // navigate('/dashboard');
        window.location.reload()

        } else {
          // await localStorage.setItem("authUser", JSON.stringify(res['data']));
          // await localStorage.setItem("nonMember", JSON.stringify('yes'));
          // await localStorage.setItem("authUser", JSON.stringify(res['data']));
          localStorage.setItem("nonMember", "true");
          navigate('/pricing');
        }

    }).catch(err =>{
      if(err.response.data['message']  == "Not found" || err.response.data['message']  == "Incorrect password" ){
        setloginError(true)
        setloginErrormsg("Les identifiants de connexion ne sont pas valides. Veuillez vérifier votre adresse mail et votre mot de passe et réessayer")
      }
    })
  };

  useEffect(() => {
    console.log(user)
    props.apiError('');
    document.body.classList.add('auth-body-bg');

    return () => {
      document.body.classList.remove('auth-body-bg');
    };
  }, []);

  return (
    <React.Fragment>
      <div>
        <Container fluid className="p-0">
          <Row className="g-0">
            <Col lg={4}>
              <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100" >
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
                                height="120"
                                className="auth-logo logo-dark mx-auto"
                              />
                            </Link>
                          </div>

                          <h4
                            className="font-size-18 mt-4"
                            style={{ color: colors.green }}
                          >
                            Espace reseau RIAM
                          </h4>
                        </div>
                        {/* {props.loginError && props.loginError ? (
                          <Alert color="danger">{props.loginError}</Alert>
                        ) : null} */}
                        {loginError && <Alert color="danger">{loginErrormsg}</Alert>}

                        <div className="p-2 mt-5">
                          <AvForm
                            className="form-horizontal"
                            onValidSubmit={handleSubmit}
                          >
                            <div className="auth-form-group-custom mb-4">
                              <i className="ri-user-line auti-custom-input-icon"></i>
                              <Label htmlFor="username">Email</Label>
                              <AvField
                                name="username"
                                value={state.username}
                                type="text"
                                className="form-control"
                                id="username"
                                validate={{ email: true, required: true }}
                                placeholder="Entrer l'adresse email"
                                onChange={handleUsernameChange}
                              />
                            </div>

                            <div className="auth-form-group-custom mb-4">
                              <i className="ri-lock-2-line auti-custom-input-icon"></i>
                              <Label htmlFor="userpassword">Mot de passe</Label>
                              <AvField
                                name="password"
                                value={state.password}
                                type="password"
                                className="form-control"
                                id="userpassword"
                                placeholder="Entrer le mot de passe"
                                onChange={handlePasswordChange}
                              />
                            </div>

                            {/* <div className="form-check">
                              <Input
                                type="checkbox"
                                className="form-check-input"
                                id="customControlInline"
                              />
                              <Label
                                className="form-check-label"
                                htmlFor="customControlInline"
                              >
                                Se souvenir de moi
                              </Label>
                            </div> */}

                            <div className="mt-4 text-center">
                              <Button
                                color="primary"
                                className="w-md waves-effect waves-light"
                                type="submit"
                              >
                                Connexion
                              </Button>
                            </div>

                            <div className="mt-4 text-center">
                              <Link
                                to="/forgot-password"
                                className="text-muted"
                              >
                                <i className="mdi mdi-lock me-1"></i> Mot de passe
                                oublié?
                              </Link>
                            </div>
                            <div className="mt-4 text-center">
                              <Link
                                to="/forgot-password"
                                className="text-muted"
                              >
                                <p>Vous n’avez pas de compte ? <Link to="/register" className="fw-medium text-primary"> S'inscrire </Link> </p>
                              </Link>
                            </div>
                          </AvForm>
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

const mapStatetoProps = (state) => {
  const { loginError } = state.Login;
  return { loginError };
};

export default withRouter(connect(mapStatetoProps, { checkLogin, apiError })(Login));
