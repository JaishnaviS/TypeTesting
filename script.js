const quoteDisplayElement = document.getElementById('quote-display');
const quoteInputElement = document.getElementById('quote-input');
const timerElement = document.getElementById('timer');
const accuracyElement = document.getElementById('accuracy');
const wpmElement = document.getElementById('wpm');

const quotes = [
    "The quick brown fox jumps over the lazy dog.",
    "A journey of a thousand miles begins with a single step.",
    "To be or not to be, that is the question.",
    "All that glitters is not gold."
];

let currentQuote = '';
let startTime;
let timerInterval;

function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

function startTypingTest() {
    currentQuote = getRandomQuote();
    quoteDisplayElement.innerHTML = '';
    currentQuote.split('').forEach(character => {
        const characterSpan = document.createElement('span');
        characterSpan.innerText = character;
        quoteDisplayElement.appendChild(characterSpan);
    });
    quoteInputElement.value = '';
    startTimer();
}

function startTimer() {
    timerElement.innerText = 'Time: 0s';
    startTime = new Date();
    timerInterval = setInterval(() => {
        timerElement.innerText = `Time: ${getTimerTime()}s`;
    }, 1000);
}

function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000);
}

function calculateAccuracy() {
    const quoteChars = currentQuote.split('');
    const inputChars = quoteInputElement.value.split('');
    let correctChars = 0;

    quoteChars.forEach((char, index) => {
        if (char === inputChars[index]) {
            correctChars++;
        }
    });

    return Math.floor((correctChars / quoteChars.length) * 100);
}

function calculateWPM() {
    const wordsTyped = quoteInputElement.value.split(' ').length;
    const timeTaken = getTimerTime();
    return Math.floor((wordsTyped / timeTaken) * 60);
}

quoteInputElement.addEventListener('input', () => {
    const arrayQuote = currentQuote.split('');
    const arrayValue = quoteInputElement.value.split('');

    let correct = true;
    arrayQuote.forEach((character, index) => {
        const characterSpan = quoteDisplayElement.querySelectorAll('span')[index];
        const inputChar = arrayValue[index];

        if (inputChar == null) {
            characterSpan.classList.remove('correct');
            characterSpan.classList.remove('incorrect');
            correct = false;
        } else if (inputChar === character) {
            characterSpan.classList.add('correct');
            characterSpan.classList.remove('incorrect');
        } else {
            characterSpan.classList.remove('correct');
            characterSpan.classList.add('incorrect');
            correct = false;
        }
    });

    if (correct) {
        clearInterval(timerInterval);
        accuracyElement.innerText = `Accuracy: ${calculateAccuracy()}%`;
        wpmElement.innerText = `WPM: ${calculateWPM()}`;
    } else {
        accuracyElement.innerText = `Accuracy: ${calculateAccuracy()}%`;
    }
});

startTypingTest();
