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
                    <p className="error">{props.errors.name}</p>
                )}
                <Field type="text" name="email" placeholder="Email" />
                {props.touched.email && props.errors.email && (
                    <p className="error">{props.errors.email}</p>
                )}
                <Field type="text" name="password" placeholder="Password" />
                {props.touched.password && props.errors.password && (
                    <p className="error">{props.errors.password}</p>
                )}

                <Field type="text" name="home" placeholder="Hometown" />
                {props.touched.home && props.errors.home && (
                    <p className="error">{props.errors.home}</p>
                )}
                <Field type="text" name="age" placeholder="Age" />
                {props.touched.age && props.errors.age && (
                    <p className="error">{props.errors.age}</p>
                )}
                <Field type="text" name="pockets" placeholder="Pockets" />
                {props.touched.pockets && props.errors.pockets && (
                    <p className="error">{props.errors.pockets}</p>
                )}

                <Field component="select" name="role" className="role-select">
                    <option>Please Select</option>
                    <option value="Student">Student</option>
                    <option value="Team Lead">Team Lead</option>
                    <option value="Section Lead">Section Lead</option>
                    <option value="Instructor">Instructor</option>
                </Field>
                <label className="checkbox-container">
                    <Field
                        type="checkbox"
                        name="terms"
                        checked={props.values.terms}
                    />
                    Terms and Conditions
                    <span className="checkmark" />
                </label>
                <button type="submit">Submit</button>
            </Form>
            {users.map(user => (
                <ul key={user.id}>
                    <li>Name: {user.name}</li>
                    <li>Email: {user.email}</li>
                    <li>Password: {user.password}</li>
                    <li>Role: {user.role}</li>
                    <li>Hometown: {user.home}</li>
                    <li>Age: {user.age}</li>
                    <li>Pockets: {user.pockets}</li>
                </ul>
            ))}
        </div>
    );
};

const myMapPropsToValues = props => {
    const returnObj = {
        name: props.name || "",
        email: props.email || "",
        password: props.password || "",
        role: props.role || "",
        home: props.home || "",
        age: props.age || "",
        pockets: props.pockets || "",
        terms: props.terms || false
    };
    return returnObj;
}

const myHandleSubmit = (values, { setStatus }) => {
    axios
        .post("https://reqres.in/api/users", values)
        .then(res => {
            console.log(res);
            setStatus(res.data);
        })
        .catch(err => console.log(err));
};

const yupSchema = Yup.object().shape({
    name: Yup.string().required("please type a name"),
    email: Yup.string().required("please type an email"),
    password: Yup.string().required("please type a password"),
    role: Yup.string().required("please select a role")
});

const formikObj = {
    mapPropsToValues: myMapPropsToValues,
    handleSubmit: myHandleSubmit,
    validationSchema: yupSchema
};

const EnhancedFormHOC = withFormik(formikObj);

const EnhancedUserForm = EnhancedFormHOC(UserForm);

export default EnhancedUserForm;