import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function Rform() {
  const [formErrors, setErrors] = useState({
    email: [],
    password: [],
    confirmPassword: [],
  });

  const [success, setSuccess] = useState(false);

  const valSchema = yup.object().shape({
    email: yup
      .string()
      .required("email is required")
      .email("only accepts an email"),
    password: yup.string().required("password cannot be empty"),
    confirmPassword: yup
      .string()
      .required("confirmation of password is important")
      .oneOf([yup.ref("password"), null], "password doesn't match"),
    refer: yup
      .number()
      .required("please input refer number")
      .typeError("only accepts a number")
      .positive("entry should be greater than 0")
      .integer("input integer value"),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(valSchema),
    mode: "onTouched",
  });

  let referedStatus = watch("askRefer", false);

  const onSubmit = async (formData) => {
    let url = "http://localhost:4000/things/register";
    try {
      const fetchResult = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await fetchResult.json();

      if (!fetchResult.ok) {
        setSuccess(false);

        if (fetchResult.status === 422) {
          let errors = {
            email: [],
            password: [],
            confirmPassword: [],
          };

          result.error.map((elem, index) => {
            errors[elem.param].push(elem.msg);
          });
          setErrors(errors);
        } else {
          let errorObject = {
            type: "Error",
            message: result.message || "Error occured in process",
            data: result.data || "",
            code: result.code || "",
          };

          // this is because error constructor only accepts string and our detail is object
          let error = new Error();
          // to accomodate our errorObject, we use spreadoperator to assign into the error object- job done !!!
          error = { ...error, ...errorObject };
          throw error;
        }
      } else {
        setSuccess(true);
      }
    } catch (error) {
      console.log(`error on submiting file ${error}`);
    }
  };

  return (
    <div className="container" onSubmit={handleSubmit(onSubmit)}>
      <form>
        <div className="form-group">
          <label>Email address</label>
          <input
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            {...register("email")}
          />
          <small className="form-text text-muted">
            We don't share the credential.
          </small>
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
          <ul>
            {formErrors.email.map((elem) => (
              <li className="error-message">{elem}</li>
            ))}
          </ul>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}
          <ul>
            {formErrors.password.map((elem) => (
              <li className="error-message">{elem}</li>
            ))}
          </ul>
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="error-message">{errors.confirmPassword.message}</p>
          )}
          <ul>
            {formErrors.confirmPassword.map((elem) => (
              <li className="error-message">{elem}</li>
            ))}
          </ul>
        </div>

        <div className="form-check">
          <input type="checkbox" id="askRefer" {...register("askRefer")} />
          <label className="form-check-label" htmlFor="askRefer">
            Refered ?
          </label>
        </div>

        {referedStatus && (
          <div className="form-group">
            <label htmlFor="referedNumber">Refereed Number</label>
            <input
              type="text"
              className="form-control"
              placeholder="refer number"
              {...register("refer")}
            />
            {errors.refer && (
              <p className="error-message">{errors.refer.message}</p>
            )}
          </div>
        )}

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Rform;
