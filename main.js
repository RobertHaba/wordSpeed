(() => {
    //DOM
    const currentWord = document.querySelector('#word');
    const inputWord = document.querySelector('#inputWord');
    const timeDisplay = document.querySelector('#timer');
    const scoreDisplay = document.querySelector('#score');
    const wordAgain = document.querySelector('#wordAgain');
    const gameOverDisplay = document.querySelector('#gameOverDisplay');
    const correctDisplay = document.querySelector('#correctDisplay');
    const currentTimeDisplay = document.querySelector('#currentyTime');
    //GLOBAL
    const leveles = {
        easy: 5,
        medium: 3,
        hard: 1
    }
    let currentLevel = leveles.medium
    const userOptions = {
        time: currentLevel,
        score: 0,
        isPlaying: true
    }
    const words = ['remove', 'addeventlistener', 'localstorage', 'this', 'queryselector', 'innerhtml', 'innertext', 'array', 'push', 'pop', 'shift', 'unshift', 'document', 'object', 'slice', 'split', 'const', 'let', 'arrowfunction', 'setinterval', 'settimeout', 'indexof', 'typeof', 'undefined', 'try', 'catch', 'finally']
    let lastRand, rand

    //FUNCTIONS
    const load = () => {
        addEvents()
        setInterval(timer, 1000)
        setInterval(checkProgress, 50)
    }
    const addEvents = () => {
        inputWord.addEventListener('keyup', showMatch)
    }
    const showMatch = () => {
        correctDisplay.style.display = 'none'
        if (matchValue()) {
            randWord()
            inputWord.value = ''
            gameOverDisplay.style.display = 'none'
            correctDisplay.style.display = 'block'
            userUpdate()
            scoreDisplay.innerText = userOptions.score
            currentWord.innerText = words[rand]
        }
    }
    const userUpdate = () => {
        if (userOptions.score == 10) {
            currentLevel = leveles.hard
            currentTimeDisplay.innerText = currentLevel
        }
        userOptions.time = currentLevel + 1
        userOptions.score += 1
        userOptions.isPlaying = true
    }
    const randWord = () => {
        rand = parseInt(words.length * Math.random(words.length))
        console.log('aktualny  ' + rand)
        if (lastRand === rand) {
            rand = ((rand + 1) >= words.length) ? rand - 1 : rand + 1
        }
        lastRand = rand
    }
    const matchValue = () => {
        return (inputWord.value.toLowerCase() == currentWord.innerText) ? true : false
    }
    const timer = () => {
        if (userOptions.time === 0) {
            userOptions.isPlaying = false
        } else if (userOptions.time > 0) {
            userOptions.time -= 1
        }
        timeDisplay.innerText = userOptions.time
    }
    const checkProgress = () => {
        if (!matchValue() && !userOptions.isPlaying) {
            correctDisplay.style.display = 'none'
            gameOverDisplay.style.display = 'block'
            wordAgain.innerText = currentWord.innerText
            currentLevel = leveles.medium
            currentTimeDisplay.innerText = currentLevel
            userOptions.score = 0;
            scoreDisplay.innerText = userOptions.score
        }
    }
    load()
})()