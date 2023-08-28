document.addEventListener("DOMContentLoaded", function () {
    var jsonData = localStorage.getItem('formData');

    if (jsonData) {
        var formData = JSON.parse(jsonData);
        var formTitle = formData.formTitle;

        var formTitleElement = document.getElementById("form-title");
        if (formTitleElement) {
            formTitleElement.textContent = formTitle;
        }

        document.title = formTitle;

        document.getElementById('input-container').style.display = 'block';
        var inputContainer = document.getElementById("input-container");

        var checkboxCounter = 1;
        var radioCounter = 1;
        var dropdownCounter = 1;

        if (inputContainer) {
            formData.inputFields.forEach(function (inputField) {
                var questionLabel = inputField.label;
                var inputTagName = inputField.tagName;
                var inputType = inputField.type;

                var inputWrapper = document.createElement("div");
                inputWrapper.className = "input-wrapper";

                //appending the question
                var questionLabelElement = document.createElement("h4");
                questionLabelElement.textContent = questionLabel;
                questionLabelElement.className = 'question-label';
                inputWrapper.appendChild(questionLabelElement);

                var inputElement;
                inputElement = document.createElement(inputTagName);

                if (inputType === "text") {
                    // console.log(inputField);
                    inputElement.type = inputType;
                    inputElement.className = 'form-control';
                    inputElement.placeholder = "Enter here";
                    inputElement.name = inputField.name;
                    inputWrapper.appendChild(inputElement);
                    inputContainer.appendChild(inputWrapper);
                }
                else if (inputTagName === "TEXTAREA") {
                    // inputElement = document.createElement(inputTagName);
                    // console.log(inputField);
                    inputElement.className = 'textarea';
                    inputElement.style.resize = "none";
                    inputElement.style.overflow = "hidden";
                    inputElement.style.height = "100px";
                    inputElement.placeholder = "Enter here";
                    inputElement.addEventListener("input", function () {
                        inputElement.style.height = "auto";
                        inputElement.style.height = (inputElement.scrollHeight) + "px";
                    });
                    inputWrapper.appendChild(inputElement);
                    inputContainer.appendChild(inputWrapper);
                }
                else if (inputTagName === "INPUT" && inputType == "checkbox") {
                    var inputValue = inputField.value;

                    var checkboxGroupName = "checkboxGroup" + checkboxCounter;
                    checkboxCounter++;

                    for (var i = 0; i < inputValue.length; i++) {
                        var input = document.createElement("input");
                        var label = document.createElement("label");
                        var newline = document.createElement("br");

                        input.type = inputType;
                        input.name = checkboxGroupName;
                        input.id = inputValue[i].id;
                        input.value = inputValue[i].value;

                        label.htmlFor = inputValue[i].id.toLowerCase();
                        label.textContent = inputValue[i].label;

                        inputWrapper.appendChild(input);
                        inputWrapper.appendChild(label);
                        inputWrapper.appendChild(newline);
                        inputContainer.appendChild(inputWrapper)
                    }
                }
                else if (inputTagName === "INPUT" && inputType == "radio") {
                    // console.log(inputField);
                    var inputValue = inputField.value;

                    var radioGroupName = "radioGroup" + radioCounter;
                    radioCounter++;

                    for (var i = 0; i < inputValue.length; i++) {
                        // console.log(inputField);
                        var input = document.createElement("input");
                        var label = document.createElement("label");
                        var newline = document.createElement("br");

                        input.type = inputType;
                        input.name = radioGroupName;
                        input.id = inputValue[i].value;
                        input.value = inputValue[i].value;
                        
                        label.htmlFor = inputValue[i].value;
                        label.textContent = inputValue[i].label;

                        inputWrapper.appendChild(input);
                        inputWrapper.appendChild(label);
                        inputWrapper.appendChild(newline);
                        inputContainer.appendChild(inputWrapper);
                    }
                }
                else if (inputTagName === "SELECT") {
                    console.log(inputField);
                    var inputValue = inputField.value;

                    var dropdownGroupName = "dropdownGroup" + dropdownCounter;
                    dropdownCounter++;

                    var input = document.createElement("select");
                    input.id = "dropdown";
                    input.name = dropdownGroupName;
                    input.className = "selection";
                    inputContainer.appendChild(inputWrapper);

                    for (var i = 0; i < inputValue.length; i++) {
                        var option = document.createElement("option");
                        option.value = inputValue[i].value.toLowerCase();
                        option.text = inputValue[i].label;
                        input.appendChild(option);
                    }
                    inputWrapper.appendChild(input);
                    inputContainer.appendChild(inputWrapper);
                }
            });
        }
    }
});

function displayErrorMessage(element, message) {
    var errorElement = document.createElement("div");
    errorElement.className = "error-message";
    errorElement.textContent = message;
    element.parentNode.insertBefore(errorElement, element);
}

document.getElementById("user-submit").addEventListener("click", function (event) {
    event.preventDefault();

    var inputWrappers = document.getElementsByClassName("input-wrapper");
    var isFormValid = true;
    // console.log("Hi");
    for (var i = 0; i < inputWrappers.length; i++) {
        var inputWrapper = inputWrappers[i];
        var inputType = inputWrapper.querySelector("input[type='text'], select, textarea, input[type='radio'], input[type='checkbox']");

        if (inputType) {
            var isEmpty = false;

            if (inputType.tagName === "INPUT" || inputType.tagName === "TEXTAREA") {
                isEmpty = inputType.value.trim() === "";
            } else if (inputType.tagName === "SELECT") {
                isEmpty = inputType.children.length === 0;
            } else if ((inputType.tagName === "INPUT" && (inputType.type === "radio" || inputType.type === "checkbox")) && !inputType.checked) {
                isEmpty = true;
            }

            var errorMessage = inputWrapper.querySelector(".error-message");
            if (isEmpty) {
                isFormValid = false;
                if (!errorMessage) {
                    displayErrorMessage(inputType, "This field cannot be left blank.");
                }
            } else if (errorMessage) {
                errorMessage.remove();
            }
        }
    }

    if (isFormValid) {
        console.log("Form submission is valid.");

        var userFormData = {
            formTitle: document.querySelector(".form-title-container h1").textContent,
            inputFields: []
        };

        for (var i = 0; i < inputWrappers.length; i++) {
            var inputWrapper = inputWrappers[i];
            var inputType = inputWrapper.querySelector("input[type='text'], select, textarea, input[type='radio'], input[type='checkbox']");

            if (inputType) {
                var inputTypeValue = "";
    
                if (inputType.tagName === "INPUT") {
                    if (inputType.type === "radio") {
                        const radios = document.querySelectorAll(`input[type="radio"][name="${inputType.name}"]`);
                        let radioOptions = [];
                    
                        radios.forEach(radio => {
                            const option = {
                                label: radio.nextElementSibling.textContent, 
                                value: radio.value,
                                checked: radio.checked
                            };
                            radioOptions.push(option);
                        });
                    
                        inputTypeValue = radioOptions;
                    }
                    else if (inputType.type === "checkbox") {
                        const checkboxes = document.querySelectorAll(`input[type="checkbox"][name="${inputType.name}"]`);
                        let checkboxOptions = [];
                    
                        checkboxes.forEach(checkbox => {
                            const option = {
                                label: checkbox.nextElementSibling.textContent, 
                                value: checkbox.value,
                                id: checkbox.id,
                                checked: checkbox.checked
                            };
                            checkboxOptions.push(option);
                        });
                    
                        inputTypeValue = checkboxOptions;
                    } else {
                        inputTypeValue = inputType.value;
                    }
                } else if (inputType.tagName === "SELECT") {
                    var options = inputType.getElementsByTagName("option");
                    var selectOptions = [];
                
                    for (var j = 0; j < options.length; j++) {
                        var option = options[j];
                        selectOptions.push({
                            label: option.textContent,
                            value: option.value
                        });
                    }
                
                    inputTypeValue = selectOptions;
                } else if (inputType.tagName === "TEXTAREA") {
                    inputTypeValue = inputType.value;
                }
    
                var questionLabel = inputWrapper.querySelector(".question-label");
                var label = questionLabel ? questionLabel.textContent : "No Label";
    
                var inputField = {
                    label: label,
                    tagName: inputType.tagName,
                    type: inputType.type,
                    value: inputTypeValue
                };
    
                if (inputType.type === "checkbox" || inputType.type === "radio") {
                    inputField.name = inputType.name;
                }
                if(inputType.type === "text"){
                    inputField.name = inputType.value;
                }
    
                userFormData.inputFields.push(inputField);
            }
        }

        var userJsonData = JSON.stringify(userFormData);
        console.log(userJsonData);
        localStorage.setItem('userFormData', userJsonData);
        window.location.href = "/submission.html";
    } else {
        console.log("Form submission is not valid.");
    }
});
