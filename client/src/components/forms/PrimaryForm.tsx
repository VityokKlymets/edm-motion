import { FC } from "react"
import { Formik } from "formik"
import LoadingSpinner from "components/forms/LoadingSpinner"
import styles from "styles/forms/primary-form.module.sass"

type FieldType = "text" | "password" | "email" | "checkbox"

interface IField {
  name: string
  type: FieldType
  label?: string
  placeholder?: string
  icon?: any
}

interface IProps {
  fields: IField[]
  submitText?: string
  loading?: boolean
  initialValues: object
  onSubmit: (data) => void
  validate: (values) => object
}

const PrimaryForm: FC<IProps> = ({
  initialValues,
  loading,
  fields,
  onSubmit,
  validate,
  submitText,
}) => {
  return (
    <Formik validate={validate} onSubmit={onSubmit} initialValues={initialValues}>
      {({ values, errors, handleChange, handleSubmit, handleBlur }) => (
        <form onSubmit={handleSubmit} className={styles.primary}>
          <LoadingSpinner loading={loading} />
          {fields.map(({ name, label, type, placeholder, icon }) => (
            <div key={name}>
              <div
                className={`${styles.form_field} ${icon ? styles.form_field_with_icon : ""} ${
                  styles[`form_field_type_${type}`]
                }`}
              >
                {icon && (
                  <div
                    style={{
                      backgroundImage: `url(${icon})`,
                    }}
                    className={styles.form_field_icon}
                  />
                )}
                <label htmlFor={name}>{label || name}</label>
                <input
                  placeholder={placeholder}
                  name={name}
                  type={type}
                  value={values[name]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id={name}
                />
              </div>
              {errors[name] && <span className={styles.error}>{errors[name]}</span>}
            </div>
          ))}
          <button type="submit">{submitText || "submit"}</button>
        </form>
      )}
    </Formik>
  )
}

export default PrimaryForm
