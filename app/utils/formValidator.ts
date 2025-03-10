export default function formValidator(model: any, field: any) {
    let isValid = true;

    if (field) {
        isValid = formFieldValidator(model, field, isValid);
    }
    else {

        for (const f of Object.keys(model.value)) {
            isValid = formFieldValidator(model, f, isValid);
        }
    }
    return isValid;
}

export const formFieldValidator: any = (model: any, f: any, isValid: any) => {

    model.value[f].error = "";
    if (model.value[f].required) {
        if (!model.value[f].value) {
            model.value[f].error = "Field cannot be empty." + '\n';
            isValid = false
        }
    }

    if (model.value[f].validators?.length > 0) {
        model.value[f].validators?.forEach((obj: any) => {
            const validated_result = obj.function(model.value[f].value)
            if (!validated_result) {
                model.value[f].error += obj.errorMsg + '\n';
                isValid = false
            }
        });
    }

    return isValid;
}

// export const isYearInRange = (year: string) => /^(10[0-9]{2}|20[0-9]{2})$/.test(year);
export const isYearInRange = (year: string) => /^(16[0-9]{2}|1[6-9][0-9]{2}|20[0-9]{2})$/.test(year);
export const isValidUnits = (units: string) => /^(?!0$)\d{1,5}$/.test(units);

export const extractMonthYear = (dateString: any) => {
    const date: any = new Date(dateString);
    if (isNaN(date)) return "-";

    return date.toLocaleString("en-US", { month: "long", year: "numeric" });
}
