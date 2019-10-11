import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = props => {
    const [users, setUsers] = React.useState([]);

    React.useEffect(() => {
        if (props.status) {
            setUsers([...users, props.status]);
        }
    }, [props.status]);

    return (
        <div className="user-form">
            <Form>
                <Field type="text" name="name" placeholder="Name" />
                {props.touched.name && props.errors.name && (
                    <p className="error">{props.erros.name}</p>
                )}
                <Field type="text" name="email" placeholder="Email" />
                {props.touched.email && props.errors.email && (
                    <p className="error">{props.erros.email}</p>
                )}
                <Field type="text" name="password" placeholder="Password" />
                {props.touched.password && props.errors.password && (
                    <p className="error">{props.erros.password}</p>
                )}
                <label className="checkbox-container">
                    <Field type="checkbox" name="terms" checked={props.values.terms} />
                    Terms and Conditions
                    <span classname="checkmark" />
                </label>
                <button type="submit">Submit</button>
            </Form>
            {animals.map(user => {
                <ul key={user.id}>
                    <li>Name: {user.name}</li>
                    <li>Email: {user.email}</li>
                    <li>Password: {user.password}</li>
                </ul>
            })}
        </div>
    );
};

const myMapPropsToValues = props => {
    const returnObj = {
        name: props.name || "",
        email: props.email || "",
        password: props.password || "",
        terms: props.terms || false
    };
    return returnObj;
}

const myHandleSubmit = (values, { setStatus }) => {
    axios
    .post("https://reqres.in/api/users", values)
    .then(res => {
        setStatus(res.data);
    })
    .catch(err => console.log(err));
};

const yupSchema = Yup.object().shape({
    name: Yup.string().required("please type a name"),
    email: Yup.string().required("please type a email"),
    password: Yup.string().required("please type a password")
});

const formikObj = {
    mapPropsToValues: myMapPropsToValues,
    handleSubmit: myHandleSubmit,
    validationSchema: yupSchema
  };

const EnhancedFormHOC = withFormik(formikObj);

const EnhancedUserForm = EnhancedFormHOC(UserForm);

export default EnhancedUserForm;