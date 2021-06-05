import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { addPost } from "../../actions/posts";
import { connect } from "react-redux";

const DisplayingErrorMessagesSchema = Yup.object().shape({
  text: Yup.string().required("Required!"),
});

const createPost = ({ addPost }) => {
  return (
    <>
      <div
        style={{ backgroundColor: "skyblue" }}
        className="w-50 p-2 rounded-1"
      >
        Add a post...
      </div>

      <Formik
        initialValues={{
          text: "",
        }}
        validationSchema={DisplayingErrorMessagesSchema}
        onSubmit={(values, { resetForm }) => {
          addPost({ text: values.text });
          resetForm({});
        }}
      >
        {({ errors, touched }) => (
          <Form>
            {console.log(errors)}
            <Field
              className="p-3 w-100 h-25"
              name="text"
              cols="30"
              rows="5"
              placeholder="Create a post..."
            ></Field>
            {touched.text && errors.text && (
              <div style={{ color: "red" }}>
                {" "}
                <small>*{errors.text}</small>{" "}
              </div>
            )}
            <button className="btn btn-primary w-25 mt-4 mb-4 " type="submit">
              Post!
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default connect(null, { addPost })(createPost);
