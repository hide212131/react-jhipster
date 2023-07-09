import React from "react";
import { FieldValues, RegisterOptions, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";
import { InputType } from "reactstrap/types/lib/Input";
import { translate } from "../language";


export interface ValidatedTextInputFieldProps {
  register:  UseFormRegister<FieldValues>,
  touchedFields: any, errors,
  setValue: UseFormSetValue<FieldValues>,
  nameIdCy: string,
  validate: RegisterOptions<FieldValues>,
  labelPlaceholderKey: string,
  inputPlaceholderKey?: string,
  type?: InputType,
  readOnly?: boolean,
  disabled?: boolean,
  updateValueOverrideMethod?: (event: any) => void,
}
export function ValidatedTextInput(
  {
    register,
    touchedFields,
    errors,
    setValue,
    nameIdCy,
    validate,
    labelPlaceholderKey,
    inputPlaceholderKey = '',
    type = 'text',
    readOnly = false,
    disabled = false,
    updateValueOverrideMethod,
  }: ValidatedTextInputFieldProps) {

  const updateValueDefaultMethod = event => {
    setValue(nameIdCy, event.target.value, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
  };

  const updateValue = updateValueOverrideMethod?? updateValueDefaultMethod;
  const placeHolderValue = inputPlaceholderKey ? translate(inputPlaceholderKey) : '';
  const labelName = `${nameIdCy}Label`;

  // Change 'ref' to 'innerRef' to make reactstrap compatible with react-hook-form.
  const registerRs = (name: string, options = {}) => {
    const useFormRegisterReturn = register(name, options);
    const innerRef = useFormRegisterReturn.ref;
    delete useFormRegisterReturn.ref;
    return { ...useFormRegisterReturn, innerRef };
  };

  return (
    <FormGroup>
      <Label id={labelName} for={nameIdCy}>
        {translate(labelPlaceholderKey)}
      </Label>
      <Input
        id={nameIdCy}
        name={nameIdCy}
        placeholder={ placeHolderValue }
        type={type}
        readOnly={readOnly}
        disabled={disabled}
        {...registerRs(nameIdCy, validate)}
        data-cy={nameIdCy}
        valid={touchedFields[nameIdCy] && !errors[nameIdCy]}
        invalid={!!errors[nameIdCy]}
        onChange={updateValue}
      />
      <FormFeedback hidden={!errors[nameIdCy]}>{errors[nameIdCy]?.message}</FormFeedback>
    </FormGroup>
  );
}
