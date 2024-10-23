const questions = [
    {
        question: "ما هو لون السماء؟",
        options: ["أزرق", "أخضر", "أحمر", "أصفر"],
        answer: "أزرق"
    },
    {
        question: "ما هي عاصمة مصر؟",
        options: ["القاهرة", "الإسكندرية", "الجونة", "شرم الشيخ"],
        answer: "القاهرة"
    },
    {
        question: "ما هو أطول نهر في العالم؟",
        options: ["النيل", "الأمازون", "اليانغتسي", "الميزوري"],
        answer: "النيل"
    },
    {
        question: "ما هو أكبر محيط في العالم؟",
        options: ["المحيط الهادئ", "المحيط الأطلسي", "المحيط الهندي", "المحيط المتجمد الشمالي"],
        answer: "المحيط الهادئ"
    },
    {
        question: "ما هو الكوكب الأحمر؟",
        options: ["المريخ", "الزهرة", "الأرض", "المشتري"],
        answer: "المريخ"
    },
    {
        question: "ما هو الحيوان الأكثر سرعة؟",
        options: ["الفهد", "الحصان", "الطائر", "الأرنب"],
        answer: "الفهد"
    },
    {
        question: "ما هو عنصر الماء؟",
        options: ["H2O", "O2", "CO2", "NaCl"],
        answer: "H2O"
    },
    {
        question: "ما هو أقرب كوكب للشمس؟",
        options: ["عطارد", "Venus", "الأرض", "المريخ"],
        answer: "عطارد"
    },
    {
        question: "ما هو أكبر حيوان على وجه الأرض؟",
        options: ["الحوت الأزرق", "الفيل", "الدب القطبي", "الزرافة"],
        answer: "الحوت الأزرق"
    },
    {
        question: "ما هو العنصر الكيميائي الذي يرمز له بـ O؟",
        options: ["الأكسجين", "الهيدروجين", "الكربون", "النيتروجين"],
        answer: "الأكسجين"
    },
    {
        question: "ما هي أكبر قارة في العالم؟",
        options: ["آسيا", "أفريقيا", "أوروبا", "أمريكا الشمالية"],
        answer: "آسيا"
    },
    {
        question: "ما هو أقوى عظم في جسم الإنسان؟",
        options: ["عظم الفخذ", "عظم الساعد", "عظم الجمجمة", "عظم الساق"],
        answer: "عظم الفخذ"
    }
    // يمكنك إضافة المزيد من الأسئلة هنا، حتى تصل إلى 75 سؤال.
];

let currentQuestionIndex = 0;
let score = localStorage.getItem('score') ? parseInt(localStorage.getItem('score')) : 0;

document.getElementById('score').textContent = `النقاط: ${score}`;

document.getElementById('backButton').addEventListener('click', function() {
    window.history.back();
});

document.getElementById('themeToggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    const icon = document.body.classList.contains('dark-mode') 
        ? 'https://img.icons8.com/ios-filled/50/FFFFFF/moon.png' 
        : 'https://img.icons8.com/ios-filled/50/000000/sun.png';
    this.src = icon;
});

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('question').textContent = currentQuestion.question;
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';

    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option';
        button.textContent = option;

        button.addEventListener('click', function() {
            checkAnswer(option);
        });

        optionsContainer.appendChild(button);
    });

    optionsContainer.classList.add('fade-in');
    setTimeout(() => optionsContainer.classList.remove('fade-in'), 300);
}

function checkAnswer(selectedOption) {
    const feedback = document.getElementById('feedback');
    feedback.style.display = 'block';

    if (selectedOption === questions[currentQuestionIndex].answer) {
        feedback.textContent = 'إجابة صحيحة!';
        feedback.style.backgroundColor = 'green';
        score++;
    } else {
        feedback.textContent = 'إجابة خاطئة. الخيار الصحيح هو ' + questions[currentQuestionIndex].answer;
        feedback.style.backgroundColor = 'red';
    }

    currentQuestionIndex++;
    localStorage.setItem('score', score);

    if (currentQuestionIndex < questions.length) {
        setTimeout(() => {
            feedback.style.display = 'none';
            loadQuestion();
            document.getElementById('score').textContent = `النقاط: ${score}`;
        }, 1000);
    } else {
        showResult();
    }
}

function showResult() {
    const result = document.getElementById('result');
    result.style.display = 'block';
    result.textContent = `انتهى الاستبيان! نقاطك: ${score}/${questions.length}`;

    setTimeout(() => {
        result.style.display = 'none';
        resetQuiz();
    }, 2000);
}

function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    localStorage.removeItem('score');
    document.getElementById('score').textContent = `النقاط: ${score}`;
    loadQuestion();
}

// AI Feature: Simple Suggestion System
function aiSuggestion() {
    const suggestions = [
        "إذا كنت ترغب في تحسين إجاباتك، حاول دراسة المزيد عن الموضوعات.",
        "يمكنك مشاهدة فيديوهات تعليمية حول الأسئلة الصعبة.",
        "حاول قراءة الكتب والمقالات المتعلقة بالمعرفة العامة."
    ];
    return suggestions[Math.floor(Math.random() * suggestions.length)];
}

document.addEventListener('DOMContentLoaded', () => {
    loadQuestion();
    document.getElementById('feedback').textContent += " " + aiSuggestion();
});
