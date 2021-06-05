import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions/auth";

//////// Yup Schema Object ////////////

const DisplayingErrorMessagesSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required!"),
  password: Yup.string()
    .min(8, "Email os Too Short!")
    .max(20, "Email is Too Long!")
    .required("Required"),
});

const Login = (props) => {
  if (props.isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className="w-100">
      <div className="row mt-5 ">
        <div className="col col-6 m-auto">
          <h1 className="text-center mb-5">
            <i className="fas fa-user-circle"></i>
            &nbsp;Login!
          </h1>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={DisplayingErrorMessagesSchema}
            onSubmit={(values) => {
              props.login({
                email: values.email,
                password: values.password,
              });
            }}
          >
            {({ errors, touched }) => (
              <Form>
                {console.log(errors)}
                {/* user name  */}

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
                <button
                  className="btn btn-primary w-100 mt-4 mb-4 "
                  type="submit"
                >
                  Login!
                </button>
                <small>Dont' have an account?</small>
                <button className="btn btn-success w-100 mt-1 p-0">
                  <Link
                    to="/register"
                    style={{
                      textDecoration: "none",
                      color: "white",
                      display: "block",
                      padding: "7px",
                    }}
                  >
                    SignUp!
                  </Link>
                </button>
              </Form>
            )}
          </Formik>
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

export default connect(mapStateToProps, { login })(Login);
