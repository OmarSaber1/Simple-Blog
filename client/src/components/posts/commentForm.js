import React from "react";
import { addComment } from "../../actions/posts";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";

const DisplayingErrorMessagesSchema = Yup.object().shape({
  text: Yup.string().required("Required!"),
});

const CommentForm = ({ addComment, id }) => {
  return (
    <>
      <div
        style={{ backgroundColor: "violet" }}
        className="w-100 p-2 rounded-3"
      >
        Add a post...
      </div>

      <Formik
        initialValues={{
          text: "",
        }}
        validationSchema={DisplayingErrorMessagesSchema}
        onSubmit={(values, { resetForm }) => {
          addComment(id, { text: values.text });
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
              placeholder="Comment on  post..."
            ></Field>
            {touched.text && errors.text && (
              <div style={{ color: "red" }}>
                {" "}
                <small>*{errors.text}</small>{" "}
              </div>
            )}
            <button className="btn btn-primary w-100 mt-4 mb-4 " type="submit">
              Submit!
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default connect(null, { addComment })(CommentForm);
