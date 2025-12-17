import React from 'react'
import styles from './styles.module.css'

const Input = ({ label, name, value, onChange, type, errors }: { label: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, type: string, errors: { [key: string]: string } }) => {
  return (
    <div className={styles.formGroup}>
    <label>{label}</label>
    <input name={name} value={value} onChange={onChange} type={type} />
    {errors[name] && <small className={styles.error}>{errors[name]}</small>}
  </div> 
  )
}

export default Input
