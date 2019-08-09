import React from "react";
import { Form, Field, withFormik } from "formik"; //withFormik hooks Form component with Formik backend and passes state variables down as props
import * as yup from "yup"; // import all stuff in yup and bundle into object called yup
// import axios from "axios";

// step 1 - created formik form
const FormComponent = props => {
  // console.log(props.values);
  // console.log(props.errors);
  // console.log(props.touched);
  const { values, touched, errors } = props;

  return (
    <Form>
      {touched.name && errors.name && <p className="error">{errors.name}</p>}
      <Field type="text" name="name" placeholder="name" />
      {touched.email && errors.email && <p className="error">{errors.email}</p>}
      <Field type="email" name="email" placeholder="email" />
      {/* ^^^ why is this being weird when commented out? */}
      {touched.password && errors.password && (
        <p className="error">{errors.password}</p>
      )}
      <Field type="password" name="password" placeholder="password" />
      {touched.terms && errors.terms && <p className="error">{errors.terms}</p>}
      <label>
        <Field type="checkbox" name="terms" />
        Agree to Terms
      </label>
      <button type="submit">Submit</button>
    </Form>
  );
};

// look up partial application and currying(?) to see more functions like withFormik()
const FormikForm = withFormik({
  mapPropsToValues: ({ name, email, password, terms }) => {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      terms: terms || false
    };
  },
  // step 2 - form validation and error messaging
  validationSchema: yup.object().shape({
    name: yup.string().required("Name is required."),
    email: yup
      .string()
      .email("Please enter a valid email.")
      .required("Email is required."),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters.")
      .required("Password is required."),
    terms: yup
      .boolean()
      .oneOf([true], "You must agree to the terms of service.")
      .required()
  })
  // step 3 - make a POST request
  // Submit
  // handleSubmit: (values, { resetForm }) => {
  //   axios.post("https://reqres.in/api/users");
  // }
})(FormComponent); // HOC - component that accepts a component as an argument. Similar to Route, which takes component as arg

export default FormikForm;
