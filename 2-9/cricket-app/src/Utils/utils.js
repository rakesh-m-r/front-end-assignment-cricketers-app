export const getAge = (dobTimestamp) => {
    const dobDate = new Date(dobTimestamp);

    // Current date
    const currentDate = new Date();

    // Calculate the age
    let age = currentDate.getFullYear() - dobDate.getFullYear();

    // Check if the birthday has occurred this year
    if (
        currentDate.getMonth() < dobDate.getMonth() ||
        (currentDate.getMonth() === dobDate.getMonth() &&
            currentDate.getDate() < dobDate.getDate())
    ) {
        // If the birthday hasn't occurred yet, subtract 1 from the age
        age--;
    }
    return age;
}