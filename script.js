function validateField(id, errorMessage) {
    const input = document.getElementById(id);
    const isValid = input.value.trim() !== '';
    input.style.borderColor = isValid ? '' : 'red';
    if (!isValid) {
        alert(errorMessage);
    }
    return isValid;
}

function getAgePoints(ageRange) {
    switch (ageRange) {
        case '18-24': return 100;
        case '25-30': return 80;
        case '31-35': return 50;
        case '36-40': return 30;
        default: return 10;
    }
}

function getCountryPoints(country) {
    const points = {
        'Africa': 50,
        'Asia': 40,
        'South America': 30,
        'North America': 20,
        'Rest': 10 
    };
    return points[country] || 0;
}

function calculateGradePoints(grades) {
    const average = grades.reduce((acc, val) => acc + val, 0) / grades.length;
    if (average >= 90) return 150;
    else if (average >= 85) return 140;
    else if (average >= 75) return 120;
    else if (average >= 65) return 100;
    else if (average >= 60) return 80;
    else if (average >= 50) return 50;
    else if (average >= 40) return 20;
    return 0;
}

function onSubjectSelected(selectId) {
    // First, collect all selected values from all dropdowns
    const allSelects = document.querySelectorAll('select[name^="select"]');
    const selectedValues = Array.from(allSelects).map(select => select.value);

    // Now, update each select element
    allSelects.forEach(select => {
        // Remember the current value for this select
        const currentValue = select.value;
        // Get all options for the select, excluding the first placeholder
        const options = select.querySelectorAll('option:not(:first-child)');

        options.forEach(option => {
            if (selectedValues.includes(option.value) && currentValue !== option.value) {
                // If this option is selected in another dropdown, hide or disable it
                option.disabled = true; // or option.style.display = 'none';
            } else {
                // Otherwise, make sure it's available for selection
                option.disabled = false; // or option.style.display = 'block';
            }
        });
    });
}


function submitForm(event) {
    // Prevent form's default submission behavior
    event.preventDefault();

    const isFormValid = ['firstName', 'lastName', 'phoneNumber', 'school', 'age', 'gender', 'country']
        .every(id => validateField(id, `Please enter your ${id.replace(/([A-Z])/g, ' $1').toLowerCase()}.`));

    if (!isFormValid) return;

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const agePoints = getAgePoints(document.getElementById('age').value);
    const countryPoints = getCountryPoints(document.getElementById('country').value);
    const grades = ['englishGrade', 'mathGrade', 'physicsGrade', 'chemGrade', 'csGrade', 'bioGrade', 'agricGrade', 'civicGrade']
        .map(id => parseInt(document.getElementById(id).value, 10));
    const gradePoints = calculateGradePoints(grades);

    const totalPoints = agePoints + countryPoints + gradePoints;

    const resultMessage = totalPoints >= 180 ?
        `Congratulations, ${firstName} ${lastName}! You have scored ${totalPoints} points and are eligible for the scholarship.` :
        `Unfortunately, ${firstName} ${lastName}, you have only scored ${totalPoints} points and do not meet the scholarship criteria.`;

    alert(resultMessage);

    // Display the result on the webpage
    document.getElementById('result').textContent = resultMessage;
}

