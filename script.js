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

function submitForm() {
    const isFormValid = ['firstName', 'lastName', 'phoneNumber', 'school', 'age', 'gender', 'country']
        .every(id => validateField(id, `Please enter your ${id.replace(/([A-Z])/g, ' $1').toLowerCase()}.`));

    if (!isFormValid) return;

    const agePoints = getAgePoints(document.getElementById('age').value);
    const countryPoints = getCountryPoints(document.getElementById('country').value);
    const grades = ['englishGrade', 'mathGrade', 'physicsGrade', 'chemGrade', 'csGrade', 'bioGrade', 'agricGrade', 'civicGrade']
        .map(id => parseInt(document.getElementById(id).value, 10));
    const gradePoints = calculateGradePoints(grades);

    const totalPoints = agePoints + countryPoints + gradePoints;

    if (totalPoints >= 180) {
        alert('Congratulations! You are eligible for the scholarship.');
    } else {
        alert('Unfortunately, you do not meet the scholarship criteria.');
    }
}
