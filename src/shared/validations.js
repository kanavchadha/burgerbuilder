export const checkValidity = (value,rules)=>{
    let isValid = true;
    
    if(rules.required){
        isValid = value.trim() !== '' && isValid;
    }
    if(rules.minLength){
        isValid = rules.minLength <= value.length && isValid
    }
    if(rules.maxLength){
        isValid = rules.maxLength >= value.length && isValid
    }
    return isValid;
}
