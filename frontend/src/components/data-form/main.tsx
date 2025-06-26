import React, { useEffect, useState } from "react";
import { FieldValue, FormValues, FormState, DataFormProps, TypeDFLayout, TypeField, TypeDFSection } from "./types";
import { Input } from "@components/ui/input";
import { Checkbox } from "@components/ui/checkbox";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select";
import { cn } from "@utils/index";



const Section: React.FC<{
	children: React.ReactNode;
	label: string;
}> = ({ children, label }) => (
	<div className="mb-6 border-b border-gray-300 pb-6 ">
		<h2 className="text-base font-semibold mb-4">{label}</h2>
		<div className='flex gap-2'>
			{children}
		</div>
	</div>
);

const Column: React.FC<{ children: React.ReactNode }> = ({ children }) => (
	<div className="basis-full">
		{children}
	</div>
);




type DFContextValue = {
	values: FormValues | null | undefined;
	fields: TypeField[];
	state: FormState;
	isValid?: boolean;
	getValues?: () => FormValues;
	setValue?: (name: string, value: FieldValue) => void;
	setError?: (name: string, hasError?: boolean, message?: string) => void;
}

const DFContext = React.createContext<DFContextValue>({
	values: {},
	fields: [],
	state: {},
});

const DFProvider: React.FC<{
	children: React.ReactNode;
	fields: TypeField[];
	values?: FormValues | null;
}> = ({ children, fields, values }) => {


	const [state, setState] = React.useState<FormState>({});
	const [isValid, setIsValid] = React.useState<boolean>(false);


	const isEmpty = (value: FieldValue): boolean => {
		if (value === null || value === undefined) return true;
		if (typeof value === 'string') return value.trim() === '';
		if (typeof value === 'number') return false;
		if (typeof value === 'boolean') return false;
		if (Array.isArray(value)) return value.length === 0;
		return false;
	};


	const getValues = (): FormValues => {
		const values: FormValues = {};
		Object.keys(state).forEach(key => values[key] = state[key].value);
		return values;
	}

	const setValue = (name: string, value: FieldValue) => {
		setState((prev) => ({ ...prev, [name]: { ...prev[name], value: value } }))
	}

	const setError = (name: string, hasError: boolean = false, message: string = "") => {
		const currentState = { ...state[name], hasError: hasError, error: message };
		setState(prev => ({ ...prev, [name]: currentState }))
	}

	const validateField = (name: string): boolean => {
		const field = fields.find(f => f.name === name);
		const fieldState = state[name];


		if (!field || !fieldState) return false;

		let hasError = false;
		let errorMessage = "";

		if (field.required && isEmpty(fieldState.value)) {
			hasError = true;
			errorMessage = `${field.label} is required`;
		}

		// Type-specific validation
		else if (!isEmpty(fieldState.value)) {
			const validationResult = validateFieldType(field, fieldState.value);
			hasError = !validationResult.isValid;
			errorMessage = validationResult.message;
		}

		// Custom validation if provided
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
	};


	const formFields: Array<TypeField> = fields.map(field => field.columnBreak && !field.sectionBreak && field);


	useEffect(() => {
		const initialState: FormState = {};
		formFields.forEach((field) => {
			const value = values?.[field.name] || "";
			initialState[field.name] = {
				value: value,
				hasError: false,
				error: "",
				field: field
			};
		})

		setState(initialState);
	}, [formFields, values])


	useEffect(() => {
		const hasErrors = Object.values(state).some(fieldState => fieldState.hasError);
		setIsValid(!hasErrors);
	}, [state])

	return (
		<DFContext.Provider value={{ fields: fields, getValues, setValue, setError, values, state, isValid }}>
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
	const sections: TypeDFSection[] = fields.filter(field => field.sectionBreak);

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


const DataForm: React.FC<DataFormProps> = (props) => {
	const formLayout = React.useMemo(() => buildLayout(props.fields), [props.fields]);
	return (
		<DFProvider fields={props.fields}>
			{formLayout.map((section, index) => (
				<Section key={index} label={section.label || ""}>
					{section.columns?.map(((col, k) => (
						<Column key={k} >
							{col.map((field, l) => (
								<DFInput field={field} key={l} />
							))}
						</Column>
					)))}
				</Section>
			))}
		</DFProvider>
	)
}


const DFInput: React.FC<{ field: TypeField }> = (props) => {
	const form = useDFContext();

	const [classNames, setClassNames] = useState<string>("");
	const { field } = props;

	const fieldState = form.state[field.name];

	useEffect(() => {
		if (fieldState?.hasError) {
			setClassNames("ring ring-offset-3 ring-destructive");
		} else {
			setClassNames("");
		}

	}, [fieldState?.hasError])


	const handleChange = (value: FieldValue) => {
		field.onChange?.(value);
		form?.setValue?.(field.name, value);
	};

	const handleBlur = () => {
		// Validate field on blur
		// form?.validateField?.(field.name);
		field.onBlur?.(fieldState?.value);
	};


	const Field = () => <DFInputField
		field={field}
		className={classNames}
		onBlur={handleBlur}
		onChange={handleChange}
		value={fieldState?.value} />;



	if (field.type === "checkbox") {
		return (
			<div className="mb-4 ">
				<div className="flex items-center gap-2">
					<Field />
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
			<label htmlFor={field.name} className="text-sm block mb-2 font-medium">{field.label} </label>
			<Field />
			{fieldState?.hasError && (
				<span className="text-red-500 text-xs mt-1">{fieldState.error}</span>
			)}
		</div>
	)
}

const DFInputField = (props: {
	field: TypeField, className: string, onChange: (value: FieldValue) => void;
	onBlur: () => void;
	value: FieldValue;
}) => {

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
						{field.options?.map((option, index) => (
							<SelectItem className="text-sm" key={index} value={option.value}>
								{option.label}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		);
	}

	return (
		<Input
			name={field.name}
			className={className}
			onChange={(value) => onChange(value)}
			type={field.type === "number" || field.type === "float" || field.type === "currency" ? "number" : "text"}
			value={value as string || ""}
			onBlur={onBlur}
			placeholder={field.placeholder}
		/>
	)

}


export { DataForm };
