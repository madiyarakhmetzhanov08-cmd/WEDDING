// ====================================================================
// GOOGLE APPS SCRIPT КОДЫ
// Бұл кодты Google Таблица → Extensions → Apps Script бөліміне қойыңыз
// ====================================================================

function doPost(e) {
  try {
    // Таблицаны ашу (белсенді таблица қолданылады)
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // JSON деректерін алу
    var data = JSON.parse(e.postData.contents);
    
    // Жаңа жолға деректерді жазу
    sheet.appendRow([
      data.name,         // A бағаны — Қонақтың аты-жөні
      data.attendance,   // B бағаны — Қатысу жауабы
      data.timestamp,    // C бағаны — Жіберілген уақыты
      new Date()         // D бағаны — Серверлік уақыт белгісі
    ]);
    
    // Сәтті жауап қайтару
    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: 'success', 
        message: 'Деректер сәтті жазылды' 
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Қате болған жағдайда
    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: 'error', 
        message: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// GET сұранысын өңдеу (тестілеу үшін)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      status: 'active', 
      message: 'Той шақыру скрипті жұмыс істеп тұр!' 
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
