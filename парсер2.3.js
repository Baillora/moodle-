(function () {
  function loadScript(url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    if (script.readyState) {  // IE
      script.onreadystatechange = function () {
        if (script.readyState === "loaded" || script.readyState === "complete") {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      script.onload = function () {
        callback();
      };
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  }

  function generateRandomName(length) {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  function parseCorrectAnswers() {
    var results = [];
    $(".que").each(function () {
      var text = $(".qtext", this).text().trim().replace(/\n/g, " ");
      var answer = $(".rightanswer", this).text().trim().replace(/\n/g, " ");
      if (answer.startsWith("Правильный ответ: ")) {
        answer = answer.replace("Правильный ответ: ", "Ответ: ");
      } else {
        if ($("span", $(".rightanswer", this)).length > 1) {
          answer = [];
          $("span", $(".rightanswer", this)).each(function () {
            answer.push("Ответ: " + $(this).text().trim());
          });
          answer = answer.join(", ");
        } else {
          answer = "Ответ: " + answer.replace("Правильные ответы: ", "");
        }
      }
      results.push({ question: text, answer: answer });
    });

    var textToSave = "";
    results.forEach(function (item) {
      textToSave += item.question + " " + item.answer + "\n";
    });

    var fileName = generateRandomName(15) + ".txt";
    var blob = new Blob([textToSave], { type: "text/plain;charset=utf-8" });
    saveAs(blob, fileName);
    alert("Парсинг завершён скрипт by Baillora, GitHub: https://github.com/Baillora");
    console.log("Файл " + fileName + " сохранен. Парсинг скрипт by Baillora, GitHub: https://github.com/Baillora");
  }

  function saveAs(blob, filename) {
    var link = document.createElement('a');
    if (typeof link.download === 'string') {
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(blob);
    }
  }

  loadScript('https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.8/FileSaver.js', function () {
    window.saveAs = saveAs;
    parseCorrectAnswers();
  });
})();
