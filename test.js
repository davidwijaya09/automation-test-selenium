const { Builder, By, Key, until } = require('selenium-webdriver');

async function testForm(firstName, lastName, email, gender, subject, hobby, address, state, city, phoneNumber) {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('https://demoqa.com/automation-practice-form');

        // Personal Info
        await driver.findElement(By.id('firstName')).sendKeys(firstName);
        await driver.findElement(By.id('lastName')).sendKeys(lastName);
        await driver.findElement(By.id('userEmail')).sendKeys(email);
        await driver.findElement(By.id('userNumber')).sendKeys(phoneNumber);

        // Gender
        await driver.findElement(By.xpath(`//label[text()="${gender}"]`)).click();

        // Date of Birth - just using the current date for simplicity
        await driver.findElement(By.id('dateOfBirthInput')).click();
        let currentDate = new Date().getDate().toString();
        await driver.findElement(By.xpath(`//div[@class='react-datepicker__day' and text()="${currentDate}"]`)).click();

        // Subjects
        const subjectInput = await driver.findElement(By.id('subjectsInput'));
        await subjectInput.sendKeys(subject);
        await driver.wait(until.elementIsVisible(await driver.findElement(By.className('css-1n7v3ny-option'))), 5000);
        await driver.findElement(By.id('react-select-2-option-0')).click();


        // Hobbies
        await driver.findElement(By.xpath(`//label[text()="${hobby}"]`)).click();

        // Address
        await driver.findElement(By.id('currentAddress')).sendKeys(address);

        // State and City
        await driver.findElement(By.id('state')).click();
        await driver.findElement(By.id(`react-select-3-option-${state}`)).click();
        await driver.findElement(By.id('city')).click();
        await driver.findElement(By.id(`react-select-4-option-${city}`)).click();

        // Submit form
        await driver.findElement(By.id('submit')).click();

        // Wait for an element on the next page to ensure the form submission was successful
        await driver.wait(until.elementLocated(By.id('example-modal-sizes-title-lg')), 10000);

        console.log('Form filled and submitted successfully');
    } catch (error) {
        console.log('Error encountered:', error);
    } finally {
        await driver.quit();
    }
}

// Test Cases
const testCases = [
    {
        firstName: 'Test',
        lastName: 'User1',
        email: 'testuser1@example.com',
        gender: 'Male',
        subject: 'Math',
        hobby: 'Sports',
        currentAddress: '123 Test Street, Test City',
        state: 0,
        city: 0,
        phoneNumber: '1234567890'
    },
    {
        firstName: 'Test',
        lastName: 'User2',
        email: 'testuser2@example.com',
        gender: 'Female',
        subject: 'Physics',
        hobby: 'Reading',
        currentAddress: '456 Sample Road, Sample City',
        state: 1,
        city: 1,
        phoneNumber: '9876543210'
    },
    {
        firstName: 'Test',
        lastName: 'User3',
        email: 'testuser3@@example.com',
        gender: 'Female123',
        subject: 'Physics',
        hobby: 'Reading',
        currentAddress: '456 Sample Road, Sample City',
        state: "aaaaa",
        city: 1,
        phoneNumber: '9876543210'
    }

];

// Run test cases
testCases.forEach(testCase => {
    testForm(
        testCase.firstName,
        testCase.lastName,
        testCase.email,
        testCase.gender,
        testCase.subject,
        testCase.hobby,
        testCase.address,
        testCase.state,
        testCase.city,
        testCase.phoneNumber
    );
});
