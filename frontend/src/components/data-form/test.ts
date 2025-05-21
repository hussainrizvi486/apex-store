export const fieldsObject = {
    "Customer": [
        {
            name: "username",
            label: "Username",
            type: "text",
            required: true,
        },
        {
            name: "password",
            label: "Password",
            type: "text",
            required: true,
        },
        {
            name: "bio",
            label: "Biography",
            type: "textarea",
        },
        {
            name: "role",
            label: "Role",
            type: "select",
            options: [
                { label: "Admin", value: "admin" },
                { label: "User", value: "user" },
                { label: "Guest", value: "guest" },
            ],
            required: true,
        },
        {
            name: "skills",
            label: "Skills",
            type: "autocomplete",
            options: [
                { label: "React", value: "react" },
                { label: "TypeScript", value: "typescript" },
                { label: "Node.js", value: "nodejs" },
                { label: "CSS", value: "css" },
            ],
        },
        {
            name: "agreeToTerms",
            label: "I agree to the terms and conditions",
            type: "checkbox",
            required: true,
        },
    ],

    "form1": [
        {
            name: "fullName",
            label: "Full Name",
            type: "text",
            required: true,
        },
        {
            name: "email",
            label: "Email Address",
            type: "text",
            required: true,
        },
        {
            name: "phone",
            label: "Phone Number",
            type: "text",
        },
        {
            name: "message",
            label: "Message",
            type: "textarea",
        },
        {
            name: "category",
            label: "Category",
            type: "select",
            options: [
                { label: "Support", value: "support" },
                { label: "Sales", value: "sales" },
                { label: "General", value: "general" },
            ],
            required: true,
        },
        {
            name: "tags",
            label: "Tags",
            type: "autocomplete",
            options: [
                { label: "Urgent", value: "urgent" },
                { label: "Follow-up", value: "followup" },
                { label: "New Customer", value: "new" },
                { label: "VIP", value: "vip" },
            ],
        },
        {
            name: "subscribe",
            label: "Subscribe to newsletter",
            type: "checkbox",
        },
    ],

    // E-commerce Product Form
    "Product": [
        // label: Basic Information
        {
            label: "Basic Information",
            name: "basic_information",
            sectionBreak: true
        },
        {
            label: "Product Type",
            name: "product_type",
            type: "select",
            options: [
                { label: "Template", value: "template" },
                { label: "Variant", value: "variant" },
                { label: "Product", value: "product" }
            ],
            required: true,
        },
        {
            label: "Product Name",
            name: "product_name",
            type: "text",
            placeholder: "Enter product name",
            required: true,
        },
        {
            label: "Brand",
            name: "brand",
            type: "text",
            placeholder: "Enter brand name"
        },

        {
            columnBreak: true
        },


        {
            label: "SKU",
            name: "sku",
            type: "text",
            placeholder: "Enter stock keeping unit",
            required: true,
        },
        {
            label: "Barcode",
            name: "barcode",
            type: "text",
            placeholder: "Enter barcode"
        },
        {
            label: "Category",
            name: "category",
            type: "autocomplete",
            options: [
                { label: "Electronics", value: "electronics" },
                { label: "Clothing", value: "clothing" },
                { label: "Home & Garden", value: "home_garden" },
                { label: "Sports & Outdoors", value: "sports" },
            ],
            required: true,
        },

        // label: Descriptions
        {
            label: "Product Descriptions",
            name: "product_description",
            sectionBreak: true
        },
        {
            label: "Description",
            name: "description",
            type: "textarea",
            required: true,
        },
        {
            columnBreak: true
        },
        {
            label: "Short Description",
            name: "short_description",
            type: "textarea",
            maxLength: 200,
        },

        // label: Pricing & Unit
        {
            label: "Pricing & Unit",
            name: "pricing_and_unit",
            sectionBreak: true
        },
        {
            label: "Price ($)",
            name: "price",
            type: "text",
            placeholder: "0.00",
            required: true,
        },
        {
            label: "Compare at Price ($)",
            name: "compare_price",
            type: "text",
            placeholder: "0.00",
        },
        {
            columnBreak: true
        },
        {
            label: "Cost Price ($)",
            name: "cost_price",
            type: "text",
            placeholder: "0.00",
        },
        {
            label: "UOM",
            name: "uom",
            type: "autocomplete",
            options: [
                { label: "Each", value: "each" },
                { label: "Kilogram", value: "kg" },
                { label: "Gram", value: "g" },
                { label: "Liter", value: "l" },
            ]
        },

        // label: Inventory
        {
            label: "Inventory",
            name: "inventory",
            sectionBreak: true

        },
        {
            label: "Maintain Stock",
            name: "maintain_stock",
            type: "checkbox",
        },
        {
            label: "Stock Quantity",
            name: "stock_quantity",
            type: "text",
            placeholder: "0",
        },
        {
            columnBreak: true
        },
        {
            label: "Weight (kg)",
            name: "weight",
            type: "text",
            placeholder: "0.00",
        },

        // label: Visibility & Status
        {
            label: "Visibility & Status",
            name: "visibility_and_status",
            sectionBreak: true
        },
        {
            label: "Publish",
            name: "is_published",
            type: "checkbox",
            defaultValue: true,
        },
        {
            label: "Disabled",
            name: "disabled",
            type: "checkbox",
        },
        {
            label: "Visibility",
            name: "visibility",
            type: "select",
            options: [
                { label: "Public", value: "public" },
                { label: "Private", value: "private" },
                { label: "Hidden", value: "hidden" },
            ],
            required: true
        },

        // label: SEO Metadata
        {
            label: "SEO Metadata",
            name: "seo_metadata",
            sectionBreak: true
        },
        {
            label: "Meta Title",
            name: "meta_title",
            type: "text",
            placeholder: "Enter meta title"
        },
        {
            columnBreak: true
        },
        {
            label: "Meta Description",
            name: "meta_description",
            type: "textarea",
            placeholder: "Enter meta description"
        }
    ],
    // Job Application Form
    "jobApplicationForm": [
        {
            name: "position",
            label: "Position Applied For",
            type: "select",
            options: [
                { label: "Software Engineer", value: "software_engineer" },
                { label: "Product Manager", value: "product_manager" },
                { label: "UX Designer", value: "ux_designer" },
                { label: "Marketing Specialist", value: "marketing_specialist" },
                { label: "Sales Representative", value: "sales_representative" },
            ],
            required: true,
        },
        {
            name: "firstName",
            label: "First Name",
            type: "text",
            required: true,
        },
        {
            name: "lastName",
            label: "Last Name",
            type: "text",
            required: true,
        },
        {
            name: "email",
            label: "Email Address",
            type: "text",
            required: true,
        },
        {
            name: "phone",
            label: "Phone Number",
            type: "text",
            required: true,
        },
        {
            name: "address",
            label: "Address",
            type: "texteditor",
            required: true,
        },
        {
            name: "education",
            label: "Highest Level of Education",
            type: "select",
            options: [
                { label: "High School", value: "high_school" },
                { label: "Associate's Degree", value: "associates" },
                { label: "Bachelor's Degree", value: "bachelors" },
                { label: "Master's Degree", value: "masters" },
                { label: "Doctorate", value: "doctorate" },
            ],
            required: true,
        },
        {
            name: "experience",
            label: "Years of Experience",
            type: "select",
            options: [
                { label: "Less than 1 year", value: "less_than_1" },
                { label: "1-3 years", value: "1_3_years" },
                { label: "3-5 years", value: "3_5_years" },
                { label: "5-10 years", value: "5_10_years" },
                { label: "10+ years", value: "10_plus_years" },
            ],
            required: true,
        },
        {
            name: "skills",
            label: "Skills",
            type: "multiselect",
            options: [
                { label: "JavaScript", value: "javascript" },
                { label: "React", value: "react" },
                { label: "Node.js", value: "nodejs" },
                { label: "Python", value: "python" },
                { label: "UI/UX Design", value: "ui_ux" },
                { label: "Project Management", value: "project_management" },
                { label: "Marketing", value: "marketing" },
                { label: "Sales", value: "sales" },
            ],
        },
        {
            name: "coverLetter",
            label: "Cover Letter",
            type: "texteditor",
            required: true,
        },
        {
            name: "salary",
            label: "Expected Salary ($)",
            type: "text",
            placeholder: "Enter expected annual salary",
        },
        {
            name: "startDate",
            label: "Available Start Date",
            type: "date",
            required: true,
        },
        {
            name: "relocate",
            label: "Willing to Relocate",
            type: "checkbox",
        },
        {
            name: "remote",
            label: "Interested in Remote Work",
            type: "checkbox",
        },
        {
            name: "termsAgreed",
            label: "I agree that all information provided is accurate and complete",
            type: "checkbox",
            required: true,
        },
    ],

    // Event Registration Form
    "eventRegistrationForm": [
        {
            name: "eventName",
            label: "Event Name",
            type: "select",
            options: [
                { label: "Annual Conference 2025", value: "conference_2025" },
                { label: "Product Launch Webinar", value: "product_launch" },
                { label: "Tech Workshop Series", value: "tech_workshop" },
                { label: "Networking Meetup", value: "networking" },
            ],
            required: true,
            defaultValue: "conference_2025",
        },
        {
            name: "registrationType",
            label: "Registration Type",
            type: "select",
            options: [
                { label: "Individual", value: "individual" },
                { label: "Group", value: "group" },
                { label: "Corporate", value: "corporate" },
                { label: "Student", value: "student" },
            ],
            required: true,
        },
        {
            name: "fullName",
            label: "Full Name",
            type: "text",
            required: true,
        },
        {
            name: "email",
            label: "Email Address",
            type: "text",
            required: true,
        },
        {
            name: "organization",
            label: "Organization/Company",
            type: "text",
        },
        {
            name: "jobTitle",
            label: "Job Title",
            type: "text",
        },
        {
            name: "phone",
            label: "Phone Number",
            type: "text",
            required: true,
        },
        {
            name: "dietaryRestrictions",
            label: "Dietary Restrictions",
            type: "multiselect",
            options: [
                { label: "None", value: "none" },
                { label: "Vegetarian", value: "vegetarian" },
                { label: "Vegan", value: "vegan" },
                { label: "Gluten-Free", value: "gluten_free" },
                { label: "Dairy-Free", value: "dairy_free" },
                { label: "Nut Allergy", value: "nut_allergy" },
            ],
            defaultValue: ["none"],
        },
        {
            name: "workshops",
            label: "Workshop Selection",
            type: "multiselect",
            options: [
                { label: "Introduction to AI", value: "intro_ai" },
                { label: "Advanced Data Analytics", value: "data_analytics" },
                { label: "Cloud Computing Essentials", value: "cloud_computing" },
                { label: "Cybersecurity Best Practices", value: "cybersecurity" },
                { label: "Digital Marketing Strategies", value: "digital_marketing" },
            ],
        },
        {
            name: "accommodationNeeded",
            label: "Accommodation Needed",
            type: "checkbox",
        },
        {
            name: "checkInDate",
            label: "Check-in Date",
            type: "date",
            dependsOn: "accommodationNeeded",
        },
        {
            name: "checkOutDate",
            label: "Check-out Date",
            type: "date",
            dependsOn: "accommodationNeeded",
        },
        {
            name: "specialRequests",
            label: "Special Requests or Accommodations",
            type: "textarea",
        },
        {
            name: "howHeard",
            label: "How did you hear about this event?",
            type: "select",
            options: [
                { label: "Email", value: "email" },
                { label: "Social Media", value: "social_media" },
                { label: "Website", value: "website" },
                { label: "Word of Mouth", value: "word_of_mouth" },
                { label: "Other", value: "other" },
            ],
        },
        {
            name: "marketingConsent",
            label: "I agree to receive marketing communications about future events",
            type: "checkbox",
        },
        {
            name: "termsAgreed",
            label: "I agree to the event terms and conditions",
            type: "checkbox",
            required: true,
        },
    ],

    // Survey Form
    "surveyForm": [
        {
            name: "satisfaction",
            label: "Overall, how satisfied are you with our product/service?",
            type: "rating",
            max: 5,
            required: true,
        },
        {
            name: "usageFrequency",
            label: "How often do you use our product/service?",
            type: "select",
            options: [
                { label: "Daily", value: "daily" },
                { label: "Weekly", value: "weekly" },
                { label: "Monthly", value: "monthly" },
                { label: "Rarely", value: "rarely" },
                { label: "Never", value: "never" },
            ],
            required: true,
        },
        {
            name: "features",
            label: "Which features do you find most valuable?",
            type: "multiselect",
            options: [
                { label: "User Interface", value: "ui" },
                { label: "Performance", value: "performance" },
                { label: "Reliability", value: "reliability" },
                { label: "Customer Support", value: "support" },
                { label: "Documentation", value: "documentation" },
                { label: "Price", value: "price" },
            ],
        },
        {
            name: "improvements",
            label: "What areas would you like to see improved?",
            type: "checkbox-group",
            options: [
                { label: "User Interface", value: "ui" },
                { label: "Performance", value: "performance" },
                { label: "Reliability", value: "reliability" },
                { label: "Customer Support", value: "support" },
                { label: "Documentation", value: "documentation" },
                { label: "Price", value: "price" },
            ],
        },
        {
            name: "easeOfUse",
            label: "How easy is our product to use?",
            type: "rating",
            max: 5,
            required: true,
        },
        {
            name: "recommendLikelihood",
            label: "How likely are you to recommend our product to others?",
            type: "slider",
            min: 0,
            max: 10,
            step: 1,
            required: true,
        },
        {
            name: "feedback",
            label: "Please provide any additional feedback or suggestions",
            type: "textarea",
        },
        {
            name: "contactPermission",
            label: "May we contact you for follow-up questions?",
            type: "checkbox",
        },
        {
            name: "email",
            label: "Email Address",
            type: "text",
            dependsOn: "contactPermission",
        },
    ],

    // Project Management Form
    "projectForm": [
        {
            name: "projectName",
            label: "Project Name",
            type: "text",
            required: true,
        },
        {
            name: "projectCode",
            label: "Project Code",
            type: "text",
            required: true,
            pattern: "^[A-Z]{3}-[0-9]{4}$",
            patternError: "Project code must be in format ABC-1234",
        },
        {
            name: "client",
            label: "Client",
            type: "autocomplete",
            options: [
                { label: "Acme Corporation", value: "acme" },
                { label: "Globex Industries", value: "globex" },
                { label: "Initech", value: "initech" },
                { label: "Umbrella Corp", value: "umbrella" },
            ],
            required: true,
        },
        {
            name: "projectType",
            label: "Project Type",
            type: "select",
            options: [
                { label: "Web Development", value: "web_dev" },
                { label: "Mobile App", value: "mobile_app" },
                { label: "Desktop Software", value: "desktop" },
                { label: "Consulting", value: "consulting" },
                { label: "Maintenance", value: "maintenance" },
            ],
            required: true,
        },
        {
            name: "priority",
            label: "Priority",
            type: "select",
            options: [
                { label: "Low", value: "low" },
                { label: "Medium", value: "medium" },
                { label: "High", value: "high" },
                { label: "Critical", value: "critical" },
            ],
            required: true,
        },
        {
            name: "startDate",
            label: "Start Date",
            type: "date",
            required: true,
        },
        {
            name: "endDate",
            label: "End Date",
            type: "date",
            required: true,
        },
        {
            name: "budget",
            label: "Budget ($)",
            type: "text",
            placeholder: "0.00",
            required: true,
        },
        {
            name: "description",
            label: "Project Description",
            type: "texteditor",
            required: true,
        },
        {
            name: "objectives",
            label: "Project Objectives",
            type: "textarea",
            required: true,
        },
        {
            name: "scope",
            label: "Project Scope",
            type: "textarea",
            required: true,
        },
        {
            name: "teamMembers",
            label: "Team Members",
            type: "multiselect",
            options: [
                { label: "John Doe - Developer", value: "john_dev" },
                { label: "Jane Smith - Designer", value: "jane_design" },
                { label: "Mike Johnson - PM", value: "mike_pm" },
                { label: "Sarah Williams - QA", value: "sarah_qa" },
                { label: "David Brown - DevOps", value: "david_devops" },
            ],
            required: true,
        },
        {
            name: "milestones",
            label: "Project Milestones",
            type: "table",
            columns: [
                { key: "name", label: "Milestone Name" },
                { key: "date", label: "Target Date" },
                { key: "deliverable", label: "Deliverable" },
            ],
        },
        {
            name: "risks",
            label: "Project Risks",
            type: "textarea",
        },
        {
            name: "assumptions",
            label: "Assumptions",
            type: "textarea",
        },
        {
            name: "dependencies",
            label: "Dependencies",
            type: "textarea",
        },
        {
            name: "approved",
            label: "Project Approved",
            type: "checkbox",
        },
    ],

    // Healthcare Patient Intake Form
    "patientIntakeForm": [
        {
            name: "firstName",
            label: "First Name",
            type: "text",
            required: true,
        },
        {
            name: "lastName",
            label: "Last Name",
            type: "text",
            required: true,
        },
        {
            name: "dateOfBirth",
            label: "Date of Birth",
            type: "date",
            required: true,
        },
        {
            name: "gender",
            label: "Gender",
            type: "select",
            options: [
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
                { label: "Non-binary", value: "non-binary" },
                { label: "Prefer not to say", value: "not_specified" },
            ],
            required: true,
        },
        {
            name: "address",
            label: "Address",
            type: "textarea",
            required: true,
        },
        {
            name: "phoneNumber",
            label: "Phone Number",
            type: "text",
            required: true,
        },
        {
            name: "email",
            label: "Email Address",
            type: "text",
            required: true,
        },
        {
            name: "emergencyContactName",
            label: "Emergency Contact Name",
            type: "text",
            required: true,
        },
        {
            name: "emergencyContactPhone",
            label: "Emergency Contact Phone",
            type: "text",
            required: true,
        },
        {
            name: "emergencyContactRelation",
            label: "Relationship to Patient",
            type: "text",
            required: true,
        },
        {
            name: "insuranceProvider",
            label: "Insurance Provider",
            type: "text",
            required: true,
        },
        {
            name: "insurancePolicyNumber",
            label: "Policy Number",
            type: "text",
            required: true,
        },
        {
            name: "insuranceGroupNumber",
            label: "Group Number",
            type: "text",
        },
        {
            name: "primaryPhysician",
            label: "Primary Care Physician",
            type: "text",
        },
        {
            name: "currentMedications",
            label: "Current Medications",
            type: "table",
            columns: [
                { key: "name", label: "Medication Name" },
                { key: "dosage", label: "Dosage" },
                { key: "frequency", label: "Frequency" },
            ],
        },
        {
            name: "allergies",
            label: "Allergies",
            type: "multiselect",
            options: [
                { label: "None", value: "none" },
                { label: "Penicillin", value: "penicillin" },
                { label: "Sulfa Drugs", value: "sulfa" },
                { label: "Aspirin", value: "aspirin" },
                { label: "Latex", value: "latex" },
                { label: "Other", value: "other" },
            ],
        },
        {
            name: "otherAllergies",
            label: "Other Allergies",
            type: "textarea",
            dependsOn: "allergies",
            showIf: (values) => values.allergies && values.allergies.includes("other"),
        },
        {
            name: "medicalConditions",
            label: "Medical Conditions",
            type: "checkbox-group",
            options: [
                { label: "None", value: "none" },
                { label: "Diabetes", value: "diabetes" },
                { label: "Hypertension", value: "hypertension" },
                { label: "Asthma", value: "asthma" },
                { label: "Heart Disease", value: "heart_disease" },
                { label: "Cancer", value: "cancer" },
                { label: "Arthritis", value: "arthritis" },
                { label: "Other", value: "other" },
            ],
        },
        {
            name: "otherConditions",
            label: "Other Medical Conditions",
            type: "textarea",
            dependsOn: "medicalConditions",
            showIf: (values) => values.medicalConditions && values.medicalConditions.includes("other"),
        },
        {
            name: "surgicalHistory",
            label: "Surgical History",
            type: "textarea",
        },
        {
            name: "familyMedicalHistory",
            label: "Family Medical History",
            type: "textarea",
        },
        {
            name: "isSmoker",
            label: "Do you smoke?",
            type: "select",
            options: [
                { label: "Never", value: "never" },
                { label: "Former", value: "former" },
                { label: "Current", value: "current" },
            ],
            required: true,
        },
        {
            name: "alcoholConsumption",
            label: "Alcohol Consumption",
            type: "select",
            options: [
                { label: "None", value: "none" },
                { label: "Occasional", value: "occasional" },
                { label: "Moderate", value: "moderate" },
                { label: "Heavy", value: "heavy" },
            ],
            required: true,
        },
        {
            name: "reasonForVisit",
            label: "Reason for Visit",
            type: "textarea",
            required: true,
        },
        {
            name: "hipaaConsent",
            label: "I acknowledge that I have received a copy of the Notice of Privacy Practices",
            type: "checkbox",
            required: true,
        },
        {
            name: "consentToTreat",
            label: "I consent to treatment and agree to the terms of service",
            type: "checkbox",
            required: true,
        },
    ]
};

// Expo