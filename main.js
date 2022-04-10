const timeCubes = document.querySelectorAll(".time-cube");
const date = document.querySelector(".title p");
const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

function update_time() {
    const now = new Date();
    const time = time_left(now);
    const timeLeft = compute_time(time);
    const nextDate = new Date(time * 1000 + now.valueOf());
    
    date.innerText = `Giveaway Ends On Friday, ${nextDate.getDate()} ${months[nextDate.getMonth()]} ${nextDate.getFullYear()} 12:00am`;
    timeCubes.forEach(cube => {
        cube.querySelector("h3").innerText = String(timeLeft[cube.id]).padStart(2, '0');
    });

    setTimeout(update_time, 1000);
}

update_time();

function compute_time(seconds) {
    const secsInMin = 60;
    const secsInHour = 60 * secsInMin;
    const secsInDay = 24 * secsInHour;
    let days, hours, minutes;

    days = Math.floor(seconds / secsInDay);
    seconds %= secsInDay;
    hours = Math.floor(seconds / secsInHour);
    seconds %= secsInHour;
    minutes = Math.floor(seconds / secsInMin);
    seconds %= secsInMin;

    return { days, hours, minutes, seconds };
}

function time_left(date) {
    const totalTime = 7 * 24 * 3600;
    const initial = 5.5 * 24 * 3600;
    let timePassed;

    timePassed = date.getDay() * 24 * 3600 + date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
    return initial - timePassed + (initial - timePassed > 0 ? 0 : totalTime);
}