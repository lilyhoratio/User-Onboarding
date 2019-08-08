import React from "react";
import { Form, Field, withFormik } from "formik"; //withFormik hooks Form component with Formik backend and passes state variables down as props
import * as yup from "yup"; // import all of stuff in yup and bundle into object called yup

const FormComponent = props => {
  console.log(props);
  return (
    <Form>
      <Field type="text" name="name" placeholder="name" />
      <Field type="email" name="email" placeholder="email" />
      <Field type="password" name="password" placeholder="password" />
      <label>
        <Field type="checkbox" name="tos" />
        Agree to Terms
      </label>
      <button type="submit">Submit</button>
    </Form>
  );
};

// look up partial application and currying to see more like withFormik()
const FormikForm = withFormik({
  mapPropsToValues: ({ name, email, password }) => {
    return {
      name: name || "",
      email: email || "",
      password: password || ""
    };
  },
  // later
  validationSchema: yup.object().shape({})
})(FormComponent); // HOC - component that accepts a component as an argument. Similar to Route, which takes component as arg

export default FormComponent;
