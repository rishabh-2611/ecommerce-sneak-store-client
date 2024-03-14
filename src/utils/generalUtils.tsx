export const jsonToFormData:Function = (json:Object, formData = new FormData(), parentKey = '') => {
    Object.entries(json).forEach(([key, value]) => {
      const propName = parentKey ? `${parentKey}[${key}]` : key;
      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          if (typeof item === 'object') {
            jsonToFormData(item, formData, `${propName}[${index}]`);
          } else {
            formData.append(`${propName}[${index}]`, item);
          }
        });
      } else if (typeof value === 'object') {
        jsonToFormData(value, formData, propName);
      } else {
        formData.append(propName, value);
      }
    });
    return formData;
};
