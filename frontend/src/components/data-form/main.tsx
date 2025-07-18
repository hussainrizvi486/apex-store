import React, { useEffect, useState, useCallback, useMemo } from "react";
import { cn } from "@utils/index";
import { Input } from "@components/ui/input";
import { Checkbox } from "@components/ui/checkbox";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select";
import { AutoComplete } from "@components/ui/autocomplete";
import { Column, Section } from "./components/layout";
import { FieldValue, FormValues, FormState, TypeDFLayout, TypeField, TypeDFSection } from "./types";
import { TableInput } from "@components/table-input/index";


type DFContextValue = {
	values: FormValues | null | undefined;
	fields: TypeField[];
	state: FormState;
	isValid?: boolean;
	onSave?: (values: FormValues) => void;
	triggerSave?: () => void;
	getValues: () => FormValues;
	setValue?: (name: string, value: FieldValue) => void;
	setError?: (name: string, hasError?: boolean, message?: string) => void;
}

const DFContext = React.createContext<DFContextValue>({
	getValues: () => ({}),
	values: {},
	fields: [],
	state: {},
});

const getFormFields = (fields: TypeField[]): TypeField[] => {
	return fields.filter(field => !field.columnBreak && !field.sectionBreak);
}

const getInitialState = (fields: TypeField[], values?: FormValues | null): FormState => {
	const state: FormState = {};

	fields.forEach((field) => {
		const value = values?.[field.name] || field.defaultValue || "";
		state[field.name] = {
			value: value,
			hasError: false,
			error: "",
			field: field
		};
	})
	return state
}

interface DataFormProviderProps {
	children: React.ReactNode;
	fields: TypeField[];
	onSave?: (values: FormValues) => void;
	values?: FormValues | null;
}

const DataFormProvider: React.FC<DataFormProviderProps> = ({ children, fields, values, onSave }) => {
	const formFields: Array<TypeField> = useMemo(() => getFormFields(fields), [fields]);
	const [state, setState] = useState<FormState>(getInitialState(fields, values));
	const [isValid, setIsValid] = useState<boolean>(false);

	const isEmpty = useCallback((value: FieldValue): boolean => {
		if (value === null || value === undefined) return true;
		if (typeof value === 'string') return value.trim() === '';
		if (typeof value === 'number') return false;
		if (typeof value === 'boolean') return false;
		if (Array.isArray(value)) return value.length === 0;
		return false;
	}, []);

	const getValues = useCallback((): FormValues => {
		const values: FormValues = {};
		Object.keys(state).forEach(key => values[key] = state[key].value);
		return values;
	}, [state]);

	const setValue = useCallback((name: string, value: FieldValue) => {
		setState((prev) => {
			if (prev[name]?.value === value) return prev;
			return {
				...prev,
				[name]: { ...prev[name], value: value }
			};
		});
	}, []);

	const setError = useCallback((name: string, hasError: boolean = false, message: string = "") => {
		setState(prev => {
			const state = prev[name];
			if (state?.hasError === hasError && state?.error === message) {
				return prev;
			}

			return {
				...prev,
				[name]: { ...state, hasError: hasError, error: message }
			};
		});
	}, []);

	const validateFieldType = useCallback((field: TypeField, value: FieldValue): { isValid: boolean; message: string } => {
		switch (field.type) {
			case "number":
				if (typeof value === 'string' && isNaN(Number(value))) {
					return { isValid: false, message: `${field.label} must be a valid number` };
				}
				break;
			case "float":
			case "currency":
				if (typeof value === 'string' && (isNaN(parseFloat(value)) || !isFinite(parseFloat(value)))) {
					return { isValid: false, message: `${field.label} must be a valid decimal number` };
				}
				break;
			case "date":
				if (value && !(value instanceof Date) && isNaN(Date.parse(value as string))) {
					return { isValid: false, message: `${field.label} must be a valid date` };
				}
				break;
		}
		return { isValid: true, message: "" };
	}, []);

	const validateField = useCallback((name: string): boolean => {
		const field = fields.find(f => f.name === name);
		const fieldState = state[name];

		if (!field || !fieldState) return false;
		let hasError = false;
		let errorMessage = "";
		const isRequired = field.requiredOn ? field.requiredOn(getValues()) : field.required;

		if (isRequired && isEmpty(fieldState.value)) {
			hasError = true;
			errorMessage = `${field.label} is required`;
		}
		else if (!isEmpty(fieldState.value)) {
			const validationResult = validateFieldType(field, fieldState.value);
			hasError = !validationResult.isValid;
			errorMessage = validationResult.message;
		}

		if (!hasError && field.validate) {
			const customValidation = field.validate(fieldState.value);
			if (typeof customValidation === 'string') {
				hasError = true;
				errorMessage = customValidation;
			} else if (typeof customValidation === 'boolean' && !customValidation) {
				hasError = true;
				errorMessage = `${field.label} is invalid`;
			}
		}

		setError(name, hasError, errorMessage);
		return !hasError;
	}, [fields, state, isEmpty, validateFieldType, setError]);

	const handleSave = useCallback(() => {
		formFields.forEach(field => {
			validateField(field.name);
		});

		if (!isValid) {
			return;
		}

		const values = getValues();
		onSave?.(values);
	}, [formFields, validateField, isValid, getValues, onSave]);

	useEffect(() => {
		setIsValid(!Object.values(state).some(fieldState => fieldState.hasError));
	}, [state]);

	const contextValue = useMemo(() => ({
		fields: fields,
		triggerSave: handleSave,
		getValues,
		setValue,
		setError,
		values,
		state,
		isValid
	}), [fields, handleSave, getValues, setValue, setError, values, state, isValid]);

	return (
		<DFContext.Provider value={contextValue}>
			{children}
		</DFContext.Provider>
	)
}

const useDFContext = () => {
	const context = React.useContext(DFContext);
	if (!context) {
		throw new Error("useDFContext must be used within a DataFormProvider");
	}
	return context;
}

const buildLayout = (fields: TypeField[]) => {
	const layout: TypeDFLayout = [];
	const sections: TypeDFSection[] = fields.filter(field => field.sectionBreak)

	if (!sections.length) {
		const section: TypeDFSection = { label: '' };
		const columns: TypeField[][] = [[]];
		let colIndex = 0;

		fields.forEach(field => {
			if (field.columnBreak) {
				colIndex += 1;
				columns.push([]);
			}
			else {
				columns[colIndex].push(field);
			}
		})

		section.columns = columns;
		layout.push(section);
		return layout;
	}
	sections.forEach(section => {
		const startIndex = fields.findIndex(v => v.name === section.name);
		const columns: TypeField[][] = [[]];
		let colIndex = 0;

		for (let i = startIndex + 1; i < fields.length; i++) {
			const field = fields[i];
			if (field.sectionBreak) break;

			if (field.columnBreak === true) {
				colIndex += 1;
				columns.push([]);
			} else {
				columns[colIndex].push(field);
			}
		}

		layout.push({
			columns: columns,
			label: section.label || "",
			name: section.name || "",
		});
	});

	return layout;
}

const DataFormTrigger: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {

	const form = useDFContext();

	const handleClick = useCallback(() => {
		form.triggerSave?.();
		console.log(form.getValues?.())
	}, [form]);

	return (
		<div onClick={handleClick}> {children}</div>
	);
};

const DataForm: React.FC = () => {
	const form = useDFContext();
	const formLayout = useMemo(() => buildLayout(form.fields), [form.fields]);

	return (<div>
		{formLayout.map((section, index) => (
			<Section key={index} label={section.label || ""}>
				{section.columns?.map(((col, k) => (
					<Column key={k} >
						{col.map((field) => (
							<DFInput field={field} key={field.name} />
						))}
					</Column>
				)))}
			</Section>
		))}
	</div>)
}

const DFInput: React.FC<{ field: TypeField }> = React.memo((props) => {
	const form = useDFContext();
	const { field } = props;
	const fieldState = form.state[field.name];

	const classNames = useMemo(() => {
		return fieldState?.hasError ? "ring ring-offset-3 ring-destructive" : "";
	}, [fieldState?.hasError]);

	const handleChange = useCallback((value: FieldValue) => {
		form?.setValue?.(field.name, value);
	}, [form, field.name]);

	const handleBlur = useCallback(() => {
		field.onBlur?.(fieldState?.value);
	}, [field, fieldState?.value]);


	const { dependsOn, requiredOn } = field;

	if (dependsOn && !dependsOn(form.getValues())) {
		return <></>
	}


	const required: boolean = Boolean(requiredOn ? requiredOn(form.getValues()) : field.required)

	if (field.type === "checkbox") {
		return (
			<div className="mb-4 ">
				<div className="flex items-center gap-2">
					<DFInputField
						field={field}
						className={classNames}
						onBlur={handleBlur}
						onChange={handleChange}
						value={fieldState?.value}
					/>
					<label htmlFor={field.name} className="text-sm block font-medium">{field.label} </label>
				</div>
				{fieldState?.hasError && (
					<span className="text-red-500 text-xs mt-1">{fieldState.error}</span>
				)}
			</div>
		)
	}

	return (
		<div className="mb-4 ">
			<label htmlFor={field.name} className="text-sm block mb-2 font-medium">
				{field.label} {required ? <span className="text-destructive">*</span> : <></>}
			</label>

			<DFInputField
				field={field}
				className={classNames}
				onBlur={handleBlur}
				onChange={handleChange}
				value={fieldState?.value}
			/>

			{fieldState?.hasError && (
				<span className="text-red-500 text-xs mt-1">{fieldState.error}</span>
			)}
		</div>
	)
});

interface DFInputFieldProps {
	field: TypeField,
	className: string,
	onChange: (value: FieldValue) => void;
	onBlur: () => void;
	value: FieldValue;
}

const DFInputField: React.FC<DFInputFieldProps> = React.memo((props) => {
	const { field, className, onChange, onBlur, value } = props;

	if (field.type == "checkbox") {
		return (<Checkbox
			name={field.name}
			id={field.name}
			checked={Boolean(value)}
			onBlur={onBlur}
			onCheckedChange={(checked) => onChange(checked)}
		/>)
	}


	if (field.type == "textarea") {
		return (
			<textarea name={field.name} className={cn("w-full text-sm p-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary", className)} rows={6}
				onChange={(event) => onChange(event.target.value)}
			>
				{value as string || ""}
			</textarea>
		)
	}

	if (field.type === "select") {
		return (
			<Select
				value={value as string || ""}
				onValueChange={(val) => onChange(val)}
			>
				<SelectTrigger className={cn(className)} onBlur={onBlur}>
					<SelectValue placeholder={field.placeholder || "Select"} />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						{field.options?.map((option) => (
							<SelectItem className="text-sm" key={option.value} value={option.value} >
								{option.label}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		);
	}

	if (field.type == "autocomplete") {
		return (
			<AutoComplete label={field.label} className={className} onChange={onChange} getOptions={field.getOptions} renderOption={field.renderOption} />
		)
	}

	if (field.type == "custom" && field.component) {
		return field.component({ form: useDFContext() });
	}
	if (field.type == "table" && field?.fields?.length) {
		return <TableInput fields={field.fields} />;
	}

	return (
		<Input
			name={field.name}
			className={className}
			type={field.type === "number" || field.type === "float" || field.type === "currency" ? "number" : "text"}
			onChange={(event) => onChange(event.target.value)}
			onBlur={onBlur}
			defaultValue={value as string || ""}
			placeholder={field.placeholder}
		/>
	)
});

export { DataFormProvider, DataForm, DataFormTrigger, DFInputField };