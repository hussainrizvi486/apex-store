import React, { useEffect, useState } from "react";
import { FieldValue, FormValues, FieldType, FormState, DataFormProps, TypeDFLayout, TypeField, TypeDFSection } from "./types";
import { Input } from "@components/ui/input";
import { FileDiff } from "lucide-react";
import { registerUser } from "@features/auth/api";
import { Checkbox } from "@components/ui/checkbox";



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


	return (
		<DFContext.Provider value={{ fields: fields, getValues, setValue, setError, values, state }}>
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
	if (!form) return <></>;

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
	}

	function handleBlur(value: FieldValue) {
		field.onBlur?.(value);
	}

	if (field.type === "checkbox") {
		return (
			<div className="flex items-center gap-2 mb-4 ">
				<DFInputField field={field} className={classNames} />
				<label htmlFor={field.name} className="text-sm block">{field.label} </label>
			</div>

		)
	}
	return (
		<div className="mb-4 ">

			<DFInputField field={field} className={classNames} />
		</div>
	)
}

const DFInputField = (props: { field: TypeField, className: string }) => {
	const { field, className } = props;


	if (field.type == "checkbox") {
		return (<Checkbox name={field.name} id={field.name} />)
	}

	// if (["currency", "float", "text", "number"].includes(field.type)) {
	return (
		<Input name={field.name} className={className} id={field.name} />
	)
	// }

	return (
		<></>
	)
}


export { DataForm };
