import React from "react";
import registerImg from "../../assets/register.jpg";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { register } from "../../actions/auth";

//////// Yup Schema Object ////////////

const DisplayingErrorMessagesSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Username is Too Short!")
    .max(15, "Username is Too Long!")
    .required("Required!"),
  email: Yup.string().email("Invalid email").required("Required!"),
  password: Yup.string()
    .min(8, "Email os Too Short!")
    .max(20, "Email is Too Long!")
    .required("Required"),
  reenterPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required!"),
});

const Register = ({ register, isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div style={{ height: "95vh" }}>
      <div className="row mt-4">
        <div className="col col-md-5">
          <h1 className="text-center mb-5">
            <i className="fas fa-user-circle"></i>
            &nbsp; Sign Up!
          </h1>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              reenterPassword: "",
            }}
            validationSchema={DisplayingErrorMessagesSchema}
            onSubmit={(values) => {
              register({
                name: values.name,
                email: values.email,
                password: values.password,
              });
            }}
          >
            {({ errors, touched }) => (
              <Form>
                {console.log(errors)}
                {/* user name  */}
                <Field
                  className={
                    !errors.name
                      ? "form-control  mt-3 "
                      : "form-control  mt-3 is-invalid"
                  }
                  placeholder="Username..."
                  type="text"
                  name="name"
                />
                {touched.name && errors.name && (
                  <div style={{ color: "red" }}>
                    {" "}
                    <small>*{errors.name}</small>{" "}
                  </div>
                )}
                {/* email  */}
                <Field
                  className={
                    !errors.email
                      ? "form-control  mt-3 "
                      : "form-control  mt-3 is-invalid"
                  }
                  placeholder="Email..."
                  type="text"
                  name="email"
                />
                {touched.email && errors.email && (
                  <div style={{ color: "red" }}>
                    {" "}
                    <small>*{errors.email}</small>{" "}
                  </div>
                )}
                {/* password  */}
                <Field
                  className={
                    !errors.password
                      ? "form-control  mt-3 "
                      : "form-control  mt-3 is-invalid"
                  }
                  placeholder="Password"
                  type="password"
                  name="password"
                />
                {touched.password && errors.password && (
                  <div style={{ color: "red" }}>
                    {" "}
                    <small>*{errors.password}</small>{" "}
                  </div>
                )}
                {/* match password  */}
                <Field
                  className={
                    !errors.reenterPassword
                      ? "form-control  mt-3 "
                      : "form-control  mt-3 is-invalid"
                  }
                  placeholder="re-enter password"
                  type="password"
                  name="reenterPassword"
                />
                {touched.reenterPassword && errors.reenterPassword && (
                  <div style={{ color: "red" }}>
                    {" "}
                    <small>*{errors.reenterPassword}</small>{" "}
                  </div>
                )}
                <button
                  className="btn btn-primary w-100 mt-4 mb-2 "
                  type="submit"
                >
                  SignUp!
                </button>
                <small>Already have an account?</small>
                <button className="btn btn-success w-100 p-0">
                  <Link
                    to="/login"
                    style={{
                      textDecoration: "none",
                      color: "white",
                      display: "block",
                      padding: "7px",
                    }}
                  >
                    Login!
                  </Link>
                </button>
              </Form>
            )}
          </Formik>
        </div>
        <div className="col col-md-7">
          <img src={registerImg} alt="" />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authReducer.isAuthenticated,
  };
};

export default connect(mapStateToProps, { register })(Register);
