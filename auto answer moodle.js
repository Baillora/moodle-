// Скрипт для автоматических ответов mooodle 
// Cheater это БД в неё нужно записать вопросы и ответы 
// если в вопросе несеольео ответов нужно записать их в 1 сточку (если скрипт находит вопрос то он в правом нижнем углу покажет еле видный текст (можно изменить в конце кода))
// Рекомендую использовать Bookmarklet с JS (Хороший сайт https://caiorss.github.io/bookmarklet-maker/)
// В вопросах игнорируется Капс и знаки припинаня для лучшего поиска
// Если вопроса в БД нет то будет писаться в правом нижнем углу "Ответ не найден" и вопрос который на сайте
// так же всё дублируется в консоль
// прога плохо работает с вопросами по типу установите соответствие мб в будушем добавлю как и с выбором из нескольких (писать так же как и с выбором из нескольких ответов)


var cheater = {
    answers: [
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

function findAnswer(question) {
  const cleanQuestion = question.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()@\+\?><\[\]\+]/g, '').replace(/\s/g, '').toLowerCase();

  for (var i = 0; i < cheater.answers.length; i++) {
      const cleanAnswer = cheater.answers[i].answer.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()@\+\?><\[\]\+]/g, '').replace(/\s/g, '').toLowerCase();
      if (cleanQuestion === cleanAnswer) {
          return cheater.answers[i].answer;
      }
  }
  return null;
}

function autoSelectAnswer() {
var questionElements = document.querySelectorAll('.qtext p');

questionElements.forEach(function(questionElement) {
  var questionText = questionElement.textContent.trim();
  var answerText = findAnswer(questionText);

  if (answerText) {
    var answerElements = questionElement.parentElement.parentElement.parentElement.querySelectorAll('.answer input[type="radio"]');
    var answerFound = false;
    answerElements.forEach(function(answerElement) {
      var label = answerElement.nextElementSibling.querySelector('p');
      if (label && label.textContent.trim() === answerText) {
        answerElement.checked = true;
        answerFound = true;
      }
    });
    if (!answerFound) {
      console.log('Ответ не найден для вопроса:', questionText, 'Причина: нет элемента с ответом. Предполагаемый ответ:', answerText);
      showNotification('' + questionText + 'Предполагаемый ответ:' + answerText);
    }
  } else {
    console.log('Ответ не найден в базе данных для вопроса:', questionText);
    showNotification('Ответ не найден' + questionText);
  }
});
}

function showNotification(message) {
var notification = document.createElement('div');
notification.textContent = message;
notification.style.position = 'fixed';
notification.style.bottom = '20px';
notification.style.right = '20px';
notification.style.padding = '10px';
notification.style.backgroundColor = '#FFFFFF'; // БГ для текствого поля
notification.style.color = '#cbcccc'; // Цвет текста
notification.style.borderRadius = '5px';
notification.style.zIndex = '9999';
notification.style.display = 'none';
notification.style.fontSize = '12px'; // размер шрифта

document.body.appendChild(notification);

notification.style.display = 'block';
setTimeout(function() {
  notification.style.display = 'none';
}, 10000); // Длительность показа сообщения
}

autoSelectAnswer();