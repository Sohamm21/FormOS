// changing the form title
document.getElementById("edit-form-title").addEventListener("click", function () {
    var formTitle = document.getElementById("form-title");
    var newFormTitle = document.createElement("input");
    newFormTitle.className = "form-title-text";
    newFormTitle.type = "text";
    newFormTitle.value = formTitle.innerText;
    formTitle.innerHTML = "";
    formTitle.appendChild(newFormTitle);

    newFormTitle.addEventListener("blur", function () {
        var updatedTitle = newFormTitle.value;
        formTitle.removeChild(newFormTitle);

        if (updatedTitle.trim() === "") {
            alert("Title cannot be blank");
            formTitle.innerText = "Untitled Form";
        } else {
            formTitle.innerText = updatedTitle;
            document.title = updatedTitle;
        }
    });

    newFormTitle.focus();
});

var removeOption = document.createElement("button");
removeOption.className = "removeField";
removeOption.textContent = "Hide input fields";


// Question for the input field
function addQuestionLabel(text, elementType, className, blurCallback) {
    var labelContainer = document.createElement("div");
    labelContainer.className = "label-container";

    var question = document.createElement(elementType);
    question.textContent = text;
    question.className = className;
    labelContainer.appendChild(question);

    var editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "edit-button";
    labelContainer.appendChild(editButton);

    function enableEdit() {
        event.preventDefault()
        var inputElement = document.createElement("input");
        inputElement.type = "text";
        inputElement.className = "new-form-title-text";
        inputElement.value = question.textContent;
        question.innerHTML = "";
        question.appendChild(inputElement);

        inputElement.addEventListener("blur", function () {
            var updatedText = inputElement.value;
            question.removeChild(inputElement);
            question.textContent = updatedText;
            if (question.textContent == "") {
                alert("Please fill the required field");
                question.textContent = "Click here to write something";
            }
            if (blurCallback) {
                blurCallback(updatedText);
            }
        });
        inputElement.focus();
    }

    question.addEventListener("click", enableEdit);
    editButton.addEventListener("click", enableEdit);

    return labelContainer;
}




var counter = 1;
var checkboxCounter = 1;
var dropdownCounter = 1;
var textCounter = 1;
// Adding new input field
document.getElementById("addField").addEventListener("click", function () {
    document.getElementById('input-container').style.display = 'block';
    var inputContainer = document.getElementById("input-container");

    var inputWrapper = document.createElement("div");
    inputWrapper.className = "input-wrapper";

    var questionLabel = addQuestionLabel("Click here to write something", "h4", "question-label");
    inputWrapper.appendChild(questionLabel);

    var inputType = document.getElementById("inputType");
    var value = inputType.value;

    // if (value != "select" && value != "textarea") {
    if (value === "text") {
        // var input = document.createElement("input");
        // input.type = value;
        // input.placeholder = "Enter here";
        // input.className = "form-control";

        var getTextName = document.createElement("input");
        getTextName.type = value;
        getTextName.placeholder = "Enter text field name here";
        getTextName.className = "form-control";

        inputWrapper.appendChild(getTextName);
        
    }

    // if user selects the dropdown field 
    if (value === "select") {
        var dropdownGroupName = "dropdownGroup" + dropdownCounter;
        dropdownCounter++;

        var input = document.createElement("select");
        input.id = "dropdown";
        input.name = dropdownGroupName;
        input.className = "selection";

        var addOption = document.createElement("button");
        addOption.className = "dropdown-add";
        addOption.textContent = "+";

        var optionInput = document.createElement("input");
        optionInput.type = "text";
        optionInput.placeholder = "Enter the label";
        optionInput.className = "form-control";

        var valueInput = document.createElement("input");
        valueInput.type = "text";
        valueInput.placeholder = "Enter the value";
        valueInput.className = "form-control";

        addOption.addEventListener("click", function (event) {
            event.preventDefault();

            var optionValue = optionInput.value.trim();
            var valueDropdown = valueInput.value.trim();

            inputWrapper.appendChild(optionInput);
            inputWrapper.appendChild(valueInput);
            inputWrapper.appendChild(addOption);
            inputWrapper.appendChild(removeOption);

            if (optionValue !== "" && valueDropdown !== "") {
                var option = document.createElement("option");
                option.value = valueDropdown.toLowerCase();
                option.text = optionValue;
                input.appendChild(option);
                optionInput.value = "";
                valueInput.value = "";
            }
        });

        removeOption.addEventListener("click", function (event) {
            event.preventDefault();
            optionInput.remove();
            valueInput.remove();
            removeOption.remove();
        });
    }
    // console.log(value); 
    if (value === "textarea") {
        var textarea = document.createElement("textarea");
        textarea.className = "textarea";
        textarea.placeholder = "Enter here";
        textarea.style.resize = "none";
        textarea.style.overflow = "hidden";
        textarea.style.height = "100px";
        textarea.addEventListener("input", function () {
            textarea.style.height = "auto";
            textarea.style.height = (textarea.scrollHeight) + "px";
        });
        inputWrapper.appendChild(textarea);
    }

    if (value === "radio") {
        // var inputWrapper = document.createElement("div");
        // inputWrapper.className = "radio-wrapper";

        var addRadio = document.createElement("button");
        addRadio.textContent = "+";
        addRadio.className = "dropdown-add";

        var radioValueInput = document.createElement("input");
        radioValueInput.type = "text";
        radioValueInput.className = "form-control";
        radioValueInput.placeholder = "Enter the option value";

        var radioLabelInput = document.createElement("input");
        radioLabelInput.type = "text";
        radioLabelInput.className = "form-control";
        radioLabelInput.placeholder = "Enter the option label";

        inputWrapper.appendChild(addRadio);
        // inputWrapper.appendChild(radioValueInput);
        // inputWrapper.appendChild(radioLabelInput);
        // inputWrapper.appendChild(removeOption);

        var radioGroupName = "radioGroup" + counter;
        counter++;
        // console.log(radioGroupName);

        addRadio.addEventListener("click", function (event) {
            event.preventDefault();
            inputWrapper.appendChild(radioValueInput);
            inputWrapper.appendChild(radioLabelInput);
            inputWrapper.appendChild(removeOption);

            var radioValue = radioValueInput.value.trim();
            var radioLabel = radioLabelInput.value.trim();

            if (radioValue !== "" && radioLabel !== "") {
                var input = document.createElement("input");
                input.type = "radio";
                input.name = radioGroupName;
                input.id = radioValue.toLowerCase();
                input.value = radioValue.toLowerCase();

                var label = document.createElement("label");
                label.htmlFor = radioValue.toLowerCase();
                label.textContent = radioLabel;

                var newline = document.createElement("br");
                inputWrapper.appendChild(newline);
                inputWrapper.appendChild(input);
                inputWrapper.appendChild(label);

                radioValueInput.value = "";
                radioLabelInput.value = "";
            }
        });

        removeOption.addEventListener("click", function (event) {
            event.preventDefault();
            radioValueInput.remove();
            radioLabelInput.remove();
            removeOption.remove();
        });

    }

    if (value == "checkbox") {
        // var inputWrapper = document.createElement("div");
        // inputWrapper.className = "checkbox-wrapper";

        var addCheckbox = document.createElement("button");
        addCheckbox.textContent = "+";
        addCheckbox.className = "dropdown-add";

        var checkboxValueInput = document.createElement("input");
        checkboxValueInput.type = "text";
        checkboxValueInput.className = "form-control";
        checkboxValueInput.placeholder = "Enter the value";

        var checkboxLabelInput = document.createElement("input");
        checkboxLabelInput.type = "text";
        checkboxLabelInput.className = "form-control";
        checkboxLabelInput.placeholder = "Enter the label";

        var checkboxIdInput = document.createElement("input");
        checkboxIdInput.type = "text";
        checkboxIdInput.className = "form-control";
        checkboxIdInput.placeholder = "Enter the ID";

        inputWrapper.appendChild(addCheckbox);
        var checkboxGroupName = "checkboxGroup" + checkboxCounter;
        checkboxCounter++;

        addCheckbox.addEventListener("click", function () {
            event.preventDefault();
            var newline = document.createElement("br");

            inputWrapper.appendChild(checkboxValueInput);
            inputWrapper.appendChild(checkboxLabelInput);
            inputWrapper.appendChild(checkboxIdInput);

            inputWrapper.appendChild(removeOption);
            var checkboxValue = checkboxValueInput.value.trim();
            var checkboxLabel = checkboxLabelInput.value.trim();
            var checkboxID = checkboxIdInput.value.trim();

            if (checkboxValue !== "" && checkboxLabel !== "" && checkboxID !== "") {
                var input = document.createElement("input");
                input.type = "checkbox";
                input.name = checkboxGroupName;
                input.id = checkboxID.toLowerCase();
                input.value = checkboxValue.toLowerCase();

                var label = document.createElement("label");
                label.htmlFor = checkboxID.toLowerCase();
                label.textContent = checkboxLabel;

                inputWrapper.appendChild(newline);
                inputWrapper.appendChild(input);
                inputWrapper.appendChild(label);
                // inputWrapper.appendChild(newline);

                checkboxValueInput.value = "";
                checkboxLabelInput.value = "";
                checkboxIdInput.value = "";
            }
        });
        removeOption.addEventListener("click", function (event) {
            event.preventDefault();
            checkboxLabelInput.remove();
            checkboxValueInput.remove();
            checkboxIdInput.remove();
            removeOption.remove();
        });
    }


    var removeButton = document.createElement("button");
    removeButton.textContent = "x";
    removeButton.className = "removeField";
    

    if (value === "select") {
        inputWrapper.appendChild(input);
    }

    if (value == "select") {
        inputWrapper.appendChild(addOption);
    }

    inputWrapper.appendChild(removeButton);
    inputContainer.appendChild(inputWrapper);
    if (value == "radio") {
        inputContainer.appendChild(inputWrapper);
    }
    if (value == "checkbox") {
        inputContainer.appendChild(inputWrapper);
    }

    removeButton.addEventListener("click", function () {

        inputWrapper.remove();
        
        if (document.querySelector('.input-field').childNodes.length === 0) {
            document.querySelector('.input-field').style.display = 'none';
        }
    });
});


// Function to display error messages
function displayErrorMessage(element, message) {
    var errorElement = document.createElement("div");
    errorElement.className = "error-message";
    errorElement.textContent = message;
    element.parentNode.insertBefore(errorElement, element);
}

// "form-submit" event listener
document.getElementById("form-submit").addEventListener("click", function (event) {
    event.preventDefault();

    var inputWrappers = document.getElementsByClassName("input-wrapper");
    var isFormValid = true;

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

        var formData = {
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
    
                formData.inputFields.push(inputField);
            }
        }

        var jsonData = JSON.stringify(formData);
        // console.log(jsonData);
        localStorage.setItem('formData', jsonData);
        window.location.href = "/preview.html";
    } else {
        console.log("Form submission is not valid.");
    }
});
