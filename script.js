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
        case '18-24':
            return 100;
        case '25-30':
            return 80;
        case '31-35':
            return 50;
        case '36-40':
            return 30;
        default:
            return 10;
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
    const pointsMap = {
        'A': 90,
        'B': 80,
        'C': 70,
        'D': 60,
        'E': 50,
        'F': 0
    };

    const totalPoints = grades.reduce((acc, val) => acc + pointsMap[val], 0);
    return totalPoints;
}

function onSubjectSelected(selectedDropdown) {
    const selectedValue = selectedDropdown.value;
    const allSelects = document.querySelectorAll('select[name^="select"]');

    allSelects.forEach(select => {
        const options = select.querySelectorAll('option:not(:first-child)');

        options.forEach(option => {
            if (selectedValue !== '' && selectedValue === option.value && selectedDropdown !== select) {
                option.disabled = true;
            } else {
                option.disabled = false;
            }
        });
    });
}

function submitForm(event) {
    event.preventDefault();

    const isFormValid = ['firstName', 'lastName', 'phoneNumber', 'school', 'age', 'gender', 'country']
        .every(id => validateField(id, `Please enter your ${id.replace(/([A-Z])/g, ' $1').toLowerCase()}.`));

    if (!isFormValid) return;

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const agePoints = getAgePoints(document.getElementById('age').value);
    const countryPoints = getCountryPoints(document.getElementById('country').value);
    const grades = ['englishGrade', 'mathGrade', 'physicsGrade', 'chemGrade', 'csGrade', 'bioGrade', 'agricGrade', 'civicGrade', 'civilGrade']
        .map(id => parseInt(document.getElementById(id).value, 10));

    const gradePoints = calculateGradePoints(grades);

    const totalPoints = agePoints + countryPoints + gradePoints;

    const resultMessage = totalPoints >= 180 ?
        `Congratulations, ${firstName} ${lastName}! You have scored ${totalPoints} points and are eligible for the scholarship.` :
        `Unfortunately, ${firstName} ${lastName}, you have only scored ${totalPoints} points and do not meet the scholarship criteria.`;

    alert(resultMessage);

    document.getElementById('result').textContent = resultMessage;
}
