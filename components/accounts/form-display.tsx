import { Button } from "@nextui-org/react";
import React from "react";

interface Field {
  id: string;
  label: string;
  type: string;
}

interface Value {
  key: string;
  value: string;
}

interface FormDataProps {
  fields: Field[];
  values: Value[];
}

const FormDisplay: React.FC<FormDataProps> = ({ fields, values }) => {
  const valuesMap = new Map(values?.map((item) => [item.key, item.value]));

  const handleDownload = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "true"); // Optional: provide download name
    document.body.appendChild(link);
    link.click();
    link.parentNode!.removeChild(link);
  };

  const renderInput = (field: Field) => {
    const value = valuesMap.get(field.id) || "";

    if (field.type === "textarea") {
      return (
        <textarea
          className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-[#CBD5E0] h-32 resize-y"
          value={value}
          readOnly
        />
      );
    } else if (value.endsWith(".pdf") || value.endsWith(".jpg")) {
      return (
        <Button onClick={() => handleDownload(value)} color="primary">
          Download do documento
        </Button>
      );
    } else {
      return (
        <input
          type="text"
          className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-[#CBD5E0]"
          value={value}
          readOnly
        />
      );
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg">
      {fields?.map((field) => (
        <div key={field.id} className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            {field.label}
          </label>
          {renderInput(field)}
        </div>
      ))}
    </div>
  );
};

export default FormDisplay;
