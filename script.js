// Adjusted to directly work with the provided HTML structure

// Validation Functions
function validateField(id, errorMessage) {
    const input = document.getElementById(id);
    const isValid = input.value.trim() !== '';
    input.style.borderColor = isValid ? '' : 'red'; // Change border color based on validity
    if (!isValid) {
        alert(errorMessage); // Using alert for demonstration; you might want to display this differently
    }
    return isValid;
}

// Helper to get age points
function getAgePoints(ageRange) {
    switch (ageRange) {
        case '18-24': return 100;
        case '25-30': return 80;
        case '31-35': return 50;
        case '36-40': return 30;
        default: return 10; // Assuming '41 and above'
    }
}

// Helper to get country points
function getCountryPoints(country) {
    const points = {
        'Africa': 50,
        'Asia': 40,
        'South America': 30,
        'North America': 20,
        'Rest': 10 // Assuming 'Rest of the World'
    };
    return points[country] || 0;
}

// Helper to calculate grade points
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

// Main function to submit form
function submitForm() {
    const isFormValid = ['firstName', 'lastName', 'phoneNumber', 'school', 'age', 'gender', 'country']
        .every(id => validateField(id, `Please enter your ${id.replace(/([A-Z])/g, ' $1').toLowerCase()}.`));

    // If form is not valid, stop submission
    if (!isFormValid) return;

    // Calculate points
    const agePoints = getAgePoints(document.getElementById('age').value);
    const countryPoints = getCountryPoints(document.getElementById('country').value);
    const grades = ['englishGrade', 'mathGrade', 'physicsGrade', 'chemGrade', 'csGrade', 'bioGrade', 'agricGrade', 'civicGrade']
        .map(id => parseInt(document.getElementById(id).value, 10));
    const gradePoints = calculateGradePoints(grades);

    const totalPoints = agePoints + countryPoints + gradePoints;

    // Decision based on total points
    if (totalPoints >= 180) {
        alert('Congratulations! You are eligible for the scholarship.');
    } else {
        alert('Unfortunately, you do not meet the scholarship criteria.');
    }
}
