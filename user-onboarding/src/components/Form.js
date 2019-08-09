import React from "react";
import { Form, Field, withFormik } from "formik"; //withFormik hooks Form component with Formik backend and passes state variables down as props
import * as yup from "yup"; // import all of stuff in yup and bundle into object called yup
// import axios from "axios";

const FormComponent = props => {
  console.log(props);

  // const {values, touched, errors} = props

  return (
    <Form>
      {/* {props.errors.name && <p className="error">{props.errors.name}</p>} */}
      <Field type="text" name="name" placeholder="name" />
      {/* {props.errors.email && <p className="error">{props.errors.email}</p>} */}
      <Field type="email" name="email" placeholder="email" />
      {/* ^^^ why is this being weird when commented out? */}
      <Field type="password" name="password" placeholder="password" />
      <label>
        <Field type="checkbox" name="terms" />
        Agree to Terms
      </label>
      <button type="submit">Submit</button>
    </Form>
  );
};

// look up partial application and currying(?) to see more like withFormik()
const FormikForm = withFormik({
  mapPropsToValues: ({ name, email, password, terms }) => {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      terms: terms || false
    };
  },
  // later
  validationSchema: yup.object().shape({
    name: yup.string().required("Must enter name"),
    email: yup
      .string()
      .email("Must enter email")
      .required("need email"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    terms: yup
      .boolean()
      .oneOf([true], "Check it!")
      .required()
  })
  // Submit
  // handleSubmit: (values, { resetForm }) => {
  //   axios.post("https://reqres.in/api/users");
  // }
})(FormComponent); // HOC - component that accepts a component as an argument. Similar to Route, which takes component as arg

export default FormikForm;
