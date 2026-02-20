    // ประกาศตัวแปรหลัก
let secretNumber; // ตัวเลขที่ต้องทาย
let attempts = 0; // จำนวนครั้งที่พยายามทาย
const maxAttempts = 10; // จำนวนครั้งที่อนุญาตให้ทาย

// อ้างอิงถึง Element ต่างๆ ใน HTML
const guessInput = document.getElementById('guessInput');
const checkButton = document.getElementById('checkButton');
const message = document.getElementById('message');
const newGameButton = document.getElementById('newGameButton');

// 1. ฟังก์ชันสำหรับเริ่มต้นเกมใหม่
function startNewGame() {
    // สุ่มตัวเลขระหว่าง 1 ถึง 100
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0; // รีเซ็ตจำนวนครั้ง
    
    // รีเซ็ตการแสดงผล
    message.textContent = `ผมคิดตัวเลขไว้แล้ว! ทายได้เลย (คุณมี ${maxAttempts} ครั้ง)`;
    guessInput.value = ''; // ล้างช่องใส่ตัวเลข
    guessInput.disabled = false; // เปิดใช้งานช่องใส่ตัวเลข
    checkButton.disabled = false; // เปิดใช้งานปุ่มทาย
    newGameButton.style.display = 'none'; // ซ่อนปุ่มเริ่มเกมใหม่
}

// 2. ฟังก์ชันสำหรับตรวจสอบการทายตัวเลข
function checkGuess() {
    const userGuess = parseInt(guessInput.value);

    // ตรวจสอบความถูกต้องของตัวเลขที่ใส่
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        message.textContent = 'กรุณาใส่ตัวเลขระหว่าง 1 ถึง 100 เท่านั้น!';
        return; // ออกจากฟังก์ชัน
    }

    attempts++; // เพิ่มจำนวนครั้งที่พยายามทาย
    const remainingAttempts = maxAttempts - attempts;
    
    // ตรวจสอบว่าทายถูกหรือไม่
    if (userGuess === secretNumber) {
        // ทายถูก
        message.textContent = `🎉 ยอดเยี่ยม! คุณทายถูกคือเลข ${secretNumber} ใน ${attempts} ครั้ง!`;
        endGame(true);
    } else if (attempts >= maxAttempts) {
        // ทายครบจำนวนครั้งที่กำหนด
        message.textContent = `😭 หมดโอกาสแล้ว! ตัวเลขที่ถูกต้องคือ ${secretNumber} ลองใหม่นะครับ!`;
        endGame(false);
    } else if (userGuess < secretNumber) {
        // ตัวเลขที่ทายต่ำเกินไป
        message.textContent = `ต่ำเกินไป! ลองทายอีกครั้ง (เหลือ ${remainingAttempts} ครั้ง)`;
    } else {
        // ตัวเลขที่ทายสูงเกินไป
        message.textContent = `สูงเกินไป! ลองทายอีกครั้ง (เหลือ ${remainingAttempts} ครั้ง)`;
    }

    // ล้างช่องใส่ตัวเลขเพื่อการทายครั้งต่อไป
    guessInput.value = '';
}

// 3. ฟังก์ชันสำหรับจบเกม
function endGame(isWin) {
    guessInput.disabled = true; // ปิดใช้งานช่องใส่ตัวเลข
    checkButton.disabled = true; // ปิดใช้งานปุ่มทาย
    newGameButton.style.display = 'block'; // แสดงปุ่มเริ่มเกมใหม่
}


// 4. การผูกเหตุการณ์ (Event Listeners)
// เมื่อคลิกที่ปุ่ม "ทาย!" ให้เรียกใช้ฟังก์ชัน checkGuess
checkButton.addEventListener('click', checkGuess);

// เมื่อกดปุ่ม Enter ในช่องใส่ตัวเลข ให้เรียกใช้ฟังก์ชัน checkGuess
guessInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkGuess();
    }
});

// เมื่อคลิกที่ปุ่ม "เริ่มเกมใหม่" ให้เรียกใช้ฟังก์ชัน startNewGame
newGameButton.addEventListener('click', startNewGame);

// เริ่มเกมทันทีที่หน้าเว็บโหลด
startNewGame();