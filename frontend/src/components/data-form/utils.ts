import { FieldValue, TypeField, TypeDFLayout, TypeDFSection, FormValues } from "./index";


class DFFormObject {
    fields: TypeField[];
    formLayout: TypeDFLayout;

    constructor(fields: TypeField[]) {
        this.fields = fields;
        this.formLayout = this.buildLayout();
    }


    buildSections() {
        const sections: TypeDFSection[] = this.fields.filter(field => field.sectionBreak);
        if (!sections.length) {
            sections.push({ label: '', sectionBreak: true });
        }
        return sections;
    }

    buildLayout() {
        const layout: TypeDFLayout = [];
        const sections = this.fields.filter(field => field.sectionBreak);

        if (!sections?.length) {
            const section: TypeDFSection = { label: '', name: 'default', sectionBreak: true };
            const columns: TypeField[][] = [[]];
            let columnIndex = 0;

            this.fields.forEach(field => {
                if (field.columnBreak) {
                    columnIndex += 1;
                    columns.push([]);
                }
                else {
                    columns[columnIndex].push(field);
                }
            })

            section.columns = columns;
            layout.push(section);
        }
        else {

            sections.forEach(section => {
                const startIndex = this.fields.findIndex(v => v.name === section.name);
                const columns: TypeField[][] = [[]];
                let columnIndex = 0;

                for (let i = startIndex + 1; i < this.fields.length; i++) {
                    const field = this.fields[i];

                    if (field.sectionBreak) break;

                    if (field.columnBreak === true) {
                        columnIndex += 1;
                        columns.push([]);
                    } else {
                        columns[columnIndex].push(field);
                    }
                }

                layout.push({
                    label: section.label,
                    name: section.name,
                    columns: columns,
                });
            });
        }
        return layout;
    }

    getInputFields() {
        return this.fields.filter(field => !field.sectionBreak && !field.columnBreak);

    }
    validateForm(values: FormValues) {
        const errors: FormValues = {};
        this.getInputFields().forEach((field) => {
            const key = field.name;
            const value = values[key];
            if (field.required && !["number", "float", "currency"].includes(field.type)) {

                if (!value || value == "" || value == undefined || value == null) {
                    errors[key] = `This field is required`;
                }
            }
        });

        return errors;
    }
}

export { DFFormObject };