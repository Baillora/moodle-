// ==UserScript==
// @name         DL cheat
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  nerealny port chita dla dll'a by baillora
// @author       Baillora
// @match        *://dl.sibsau.ru/*
// @match        *://dl2.sibsau.ru/*
// @match        *://dl3.sibsau.ru/*
// @icon         https://cdn.7tv.app/emote/64975644b8a4f964fc15e147/2x.webp
// @require      https://openuserjs.org/src/libs/sizzle/GM_config.js
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function() {
    'use strict';

    var cheater = {
        answers: [
            // Пример для вопросов с несколькими ответами
            {
                question: "Укажите устройства, подходящие для поиска неизлучающих закладок (несколько вариантов)",
                answers: [
                    "Нелинейный радиолокатор",
                    "Сканирующий радиоприемник",
                    "Рентгеновская установка",
                    "Обнаружитель пустот"
                ]
            },
            {
                question: "Какие извещатели применяют в помещениях, в которых при возгорании быстро повышается температура воздуха?",
                answer: "тепловые"
            },
            {
    question: "вопрос",
    answer: "ответ",
  },
  {
    question: "вопрос 2",
    answer: "ответ 2",
  },
  {
    question: "вопрос 3",
    answer: "ответ 3",
  },
  {
    question: "вопрос ...",
    answer: "ответ ...",
  },
        ],
    };

    // очистка текста
    function cleanText(text) {
        return text.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()@\+\?><\[\]\+]/g, '')
                   .replace(/\s+/g, ' ')
                   .trim()
                   .toLowerCase();
    }

    // поиск ответа в БД
    function findAnswer(question) {
        const cleanQuestion = cleanText(question);

        for (var i = 0; i < cheater.answers.length; i++) {
            const cleanAnswer = cleanText(cheater.answers[i].question);
            if (cleanQuestion === cleanAnswer) {
                return cheater.answers[i];
            }
        }
        return null;
    }

    function autoSelectAnswer() {
        var questionElements = document.querySelectorAll('.qtext p');

        console.log("Found", questionElements.length, "questions");

        questionElements.forEach(function(questionElement) {
            var questionText = questionElement.textContent.trim();
            var answerData = findAnswer(questionText);

            if (answerData) {
                if (Array.isArray(answerData.answers)) {
                    // Вопрос с несколькими ответами
                    var answerElements = questionElement.parentElement.parentElement.parentElement.querySelectorAll('.answer input[type="checkbox"]');
                    answerElements.forEach(function(answerElement) {
                        var label = answerElement.nextElementSibling.querySelector('p');
                        if (label && answerData.answers.includes(label.textContent.trim())) {
                            answerElement.checked = true;
                        }
                    });
                } else {
                    // Текстовый вопрос
                    var answerElement = questionElement.parentElement.parentElement.parentElement.querySelector('.form-inline input[type="text"]');
                    if (answerElement) {
                        answerElement.value = answerData.answer;
                    }
                }
            } else {
                console.log('Ответ не найден в базе данных для вопроса:', questionText);
                showNotification('Ответ не найден: ' + questionText);
            }
        });
    }

    function exportQuestionsAndAnswers() {
        var questionsAndAnswers = [];

        var questionElements = document.querySelectorAll('.qtext p');
        console.log("Экспортирование вопросов:", questionElements.length);

        questionElements.forEach(function(questionElement) {
            var questionText = questionElement.textContent.trim();
            var answerElement = questionElement.parentElement.parentElement.parentElement.querySelector('.outcome .rightanswer');
            var answerText = answerElement ? answerElement.textContent.replace('Правильный ответ: ', '').trim() : null;

            console.log("Вопрос: ", questionText, "Ответ: ", answerText);

            if (answerText) {
                questionsAndAnswers.push({
                    question: questionText,
                    answer: answerText
                });
            }
        });

        if (questionsAndAnswers.length > 0) {
            console.log("Вопросы для экспорта: ", questionsAndAnswers);
            downloadJSON(questionsAndAnswers, 'questions_and_answers.json');
        } else {
            alert('Вопросы и ответы не найдены.');
        }
    }

    function downloadJSON(data, filename) {
        var jsonStr = JSON.stringify(data, null, 4);
        var blob = new Blob([jsonStr], { type: "application/json" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    GM_registerMenuCommand('Экспортировать вопросы и ответы', exportQuestionsAndAnswers);

    function showNotification(message) {
        var notification = document.createElement('div');
        notification.textContent = message;
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.padding = '10px';
        notification.style.backgroundColor = '#FFFFFF'; // БГ для текствого поля
        notification.style.color = '#cbcccc';// Цвет текста
        notification.style.borderRadius = '5px';
        notification.style.zIndex = '9999';
        notification.style.display = 'none';
        notification.style.fontSize = '12px';// размер шрифта

        document.body.appendChild(notification);

        notification.style.display = 'block';
        setTimeout(function() {
            notification.style.display = 'none';
        }, 10000);
    }

    window.onload = function() {
        autoSelectAnswer();
    };

})();