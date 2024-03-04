let subjects = ['English', 'Mathematics', 'Physics', 'Chemistry', 'Computer-Science', 'Biology', 'Agric-Science', 'Civil-Engineering'];

let selectObj = {};

function validateField(id, errorMessage) {
    const input = document.getElementById(id);
    const isValid = input.value.trim() !== '';
    input.style.borderColor = isValid ? '' : 'red';
    if (!isValid) {
        alert(errorMessage);
    }
    return isValid;
}

function populateSubjects() {
    let subjectDropdowns = document.querySelectorAll('select[id$="Grade"]');
    
    subjectDropdowns.forEach((dropdown) => {
        subjects.forEach((subject) => {
            let option = document.createElement('option');
            option.value = subject;
            option.textContent = subject;
            dropdown.appendChild(option);
        });

        dropdown.addEventListener('change', (e) => {
            selectObj[e.target.id] = e.target.value;

            subjectDropdowns.forEach((otherDropdown) => {
                if (otherDropdown !== dropdown) {
                    let options = otherDropdown.querySelectorAll('option');
                    options.forEach((option) => {
                        option.disabled = Object.values(selectObj).includes(option.value);
                    });
                }
            });
        });
    });

    console.log('Subject Dropdowns:', subjectDropdowns);
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

function calculateGradePoints(subjects) {
    const pointsMap = {
        'English': 90,
        'Mathematics': 80,
        'Physics': 70,
        'Chemistry': 60,
        'Computer-Science': 50,
        'Biology': 40,
        'Agric-Science': 30,
        'Civil-Engineering': 20
    };

    const totalPoints = subjects.reduce((acc, subject) => {
        const points = pointsMap[subject] || 0;
        console.log(`Subject: ${subject}, Points: ${points}`);
        return acc + points;
    }, 0);

    console.log('Total Grade Points:', totalPoints);
    return totalPoints;
}


function onSubjectSelected(selectedIndex) {
    const allSelects = document.querySelectorAll('select[id$="Grade"]');
    const selectedValue = allSelects[selectedIndex]?.value;

    if (selectedValue !== undefined) {
        allSelects.forEach((select, index) => {
            if (index !== selectedIndex) {
                const options = select.querySelectorAll('option:not(:first-child)');

                options.forEach(option => {
                    option.disabled = false;
                });

                const selectedOption = select.querySelector(`option[value="${selectedValue}"]`);
                if (selectedOption) {
                    selectedOption.disabled = true;
                }
            }
        });
    }
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

    const grades = ['englishGrade', 'mathGrade', 'physicsGrade', 'chemGrade', 'csGrade', 'bioGrade', 'agricGrade', 'civicGrade']
        .map(id => document.getElementById(id).value);

    if (grades.some(grade => !grade)) {
        const errorMessage = "PLEASE SELECT THE GRADES FOR ALL SUBJECTS.";
        alert(errorMessage);

        // Redirect to the error page with the error message
        window.location.href = `error.html?error=${encodeURIComponent(errorMessage)}&firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}`;
        return;
    }

    
    const gradePoints = calculateGradePoints(grades);

    const totalPoints = agePoints + countryPoints + gradePoints;
    
    const resultMessage = `THE RESULTS FOR ${firstName} ${lastName}:\n\n` +
        `YOUR AGE POINTS ARE: ${agePoints}\n` +
        `YOUR COUNTRY POINTS ARE: ${countryPoints}\n` +
        `YOUR GRADE POINTS ARE: ${gradePoints}\n` +
        `YOUR TOTAL POINTS ARE: ${totalPoints}\n\n` +
        (totalPoints >= 180 ?
            `CONGRATULATIONS! YOU ARE ELIGIBLE FOR THE SCHOLARSHIP.` :
            `UNFORTUNATELY, YOU DO NOT MEET THE SCHOLARSHIP CRITERIA.`);

    alert(resultMessage);

    if (totalPoints >= 180) {
        window.location.href = 'success.html';
    } else {
        const errorMessage = `Unfortunately, ${firstName} ${lastName}, you did not meet the scholarship criteria.`;

        window.location.href = `error.html?error=${encodeURIComponent(errorMessage)}&firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}`;
    }
}



populateSubjects();
