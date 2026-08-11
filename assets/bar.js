var params = new URLSearchParams(window.location.search);
var ROUTES = {
    home: 'home.html',
    services: 'services.html',
    qr: 'qr.html',
    more: 'more.html',
    moreid: 'moreid.html',
    id: 'id.html',
    shortcuts: 'shortcuts.html',
    pesel: 'pesel.html',
    scanqr: 'scanqr.html',
    showqr: 'showqr.html',
    gen: 'gen.html',
    card: 'card.html',
    address: 'address.html',
    change_password: 'change_password.html',
    biometrics: 'biometrics.html',
    appearance: 'appearance.html',
    language: 'language.html',
};

function sendTo(key){
    var qs = params.toString();
    var file = ROUTES[String(key)] || (String(key).endsWith('.html') ? String(key) : String(key) + '.html');
    var href = file + (qs ? `?${qs}` : '');
    location.href = href;
}

document.querySelectorAll(".bottom_element_grid").forEach((element) => {
    element.addEventListener('click', () => {
        sendTo(element.getAttribute("send"))
    })
})

function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  
    if (/windows phone/i.test(userAgent)) {
        return 1;
    }
  
    if (/android/i.test(userAgent)) {
        return 2;
    }
  
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return 3;
    }
  
    return 4;
  }
  
  if (getMobileOperatingSystem() == 2){
      var bb = document.querySelector(".bottom_bar");
      if (bb) bb.style.height = "70px";
}

// Global Theme & Language Manager
(function initThemeAndLanguage() {
    var theme = localStorage.getItem('appTheme') || 'dark';
    if (theme === 'system') {
        var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        theme = prefersDark ? 'dark' : 'light';
    }
    if (theme === 'light') {
        document.body.classList.add('light-theme');
    } else {
        document.body.classList.remove('light-theme');
    }

    var lang = localStorage.getItem('appLanguage') || 'pl';
    if (lang !== 'pl') {
        var dict = {
            en: {
                "Dokumenty": "Documents",
                "Usługi": "Services",
                "Kod QR": "QR Code",
                "Więcej": "More",
                "Zaloguj się": "Log in",
                "Wyloguj się": "Log out",
                "Twoje dane": "Your data",
                "Dane zameldowania": "Registered address",
                "Zmień hasło": "Change password",
                "Logowanie biometryczne": "Biometric login",
                "Powiadomienia": "Notifications",
                "Wygląd": "Appearance",
                "Wygląd aplikacji": "App appearance",
                "Język aplikacji": "App language",
                "Potwierdź": "Confirm",
                "Pozostałe skróty": "Other shortcuts",
                "Zastrzeż PESEL": "Restrict PESEL",
                "Wróć": "Back",
                "Dzień dobry!": "Good morning!",
                "Dobry wieczór!": "Good evening!",
                "Zaloguj się do aplikacji.": "Log in to application.",
                "Hasło": "Password",
                "Nie pamiętasz hasła?": "Forgot password?",
                "Imię (imiona)": "Given name(s)",
                "Nazwisko": "Surname",
                "Obywatelstwo": "Nationality",
                "Data urodzenia": "Date of birth",
                "Numer PESEL": "PESEL Number",
                "Dokument ważny": "Document valid",
                "Potwierdź swoje dane": "Confirm your data",
                "Dane dowodu osobistego": "ID card data",
                "Seria i numer mDowodu": "mID series and number",
                "Termin ważności": "Expiration date",
                "Data wydania": "Issue date",
                "Imię ojca": "Father's name",
                "Imię matki": "Mother's name",
                "Twoje dodatkowe dane": "Your additional data",
                "Nazwisko rodowe": "Family name",
                "Płeć": "Gender",
                "Mężczyzna": "Male",
                "Kobieta": "Female",
                "Nazwisko rodowe ojca": "Father's family name",
                "Nazwisko rodowe matki": "Mother's family name",
                "Miejsce urodzenia": "Place of birth",
                "Kraj urodzenia": "Country of birth",
                "Adres zameldowania na pobyt stały": "Permanent registered address",
                "Data zameldowania na pobyt stały": "Registration date",
                "Ostatnia aktualizacja": "Last update",
                "Aktualizuj": "Update",
                "Ulubione": "Favorites",
                "Dostosuj": "Customize",
                "Ochrona danych": "Data protection",
                "Zdrowie": "Health",
                "Sprawy urzędowe": "Official matters",
                "Kierowca i pojazdy": "Driver & vehicles",
                "Opłaty i podatki": "Fees & taxes",
                "Środowisko": "Environment",
                "Podróż": "Travel",
                "Podpisz dokument": "Sign document",
                "Bezpiecznie w sieci": "Safe online",
                "Alert powodziowy": "Flood alert",
                "Firma": "Business",
                "Punkty karne": "Penalty points",
                "Mandaty": "Fines",
                "Sprawdź dowód": "Check ID",
                "Sprawdź PESEL": "Check PESEL",
                "Recepty": "Prescriptions",
                "Załatw sprawę": "Settle a matter",
                "Twoje sprawy": "Your cases",
                "Odbiór dowodu": "ID pick-up",
                "Uprawnienia kierowcy": "Driving license",
                "Historia pojazdu": "Vehicle history",
                "ePłatności": "ePayments",
                "Dane paszportu": "Passport data",
                "Wydane certyfikaty": "Issued certificates",
                "Historia aktywności": "Activity history",
                "O aplikacji": "About app",
                "Pomoc techniczna": "Technical support",
                "Oceń aplikację": "Rate app",
                "Zagłosuj na pomysł": "Vote for an idea",
                "Dezaktywuj aplikację": "Deactivate app",
                "Seria i numer": "Series and number",
                "Status": "Status",
                "Wydany": "Issued",
                "Organ wydający": "Issuing authority",
                "Zmień PIN do podpisu osobistego": "Change personal signature PIN",
                "Pokaż kod QR": "Show QR code"
            },
            uk: {
                "Dokumenty": "Документи",
                "Usługi": "Послуги",
                "Kod QR": "QR-код",
                "Więcej": "Більше",
                "Zaloguj się": "Увійти",
                "Wyloguj się": "Вийти",
                "Twoje dane": "Ваші дані",
                "Dane zameldowania": "Адреса реєстрації",
                "Zmień hasło": "Змінити пароль",
                "Logowanie biometryczne": "Біометрична автентифікація",
                "Powiadomienia": "Сповіщення",
                "Wygląd": "Зовнішній вигляд",
                "Wygląd aplikacji": "Зовнішній вигляд додатка",
                "Język aplikacji": "Мова додатка",
                "Potwierdź": "Підтвердити",
                "Pozostałe skróty": "Інші ярлики",
                "Zastrzeż PESEL": "Заблокувати ІПН",
                "Wróć": "Назад",
                "Dzień dobry!": "Доброго дня!",
                "Dobry wieczór!": "Доброго вечора!",
                "Zaloguj się do aplikacji.": "Увійдіть у додаток.",
                "Hasło": "Пароль",
                "Nie pamiętasz hasła?": "Забули пароль?",
                "Imię (imiona)": "Ім'я",
                "Nazwisko": "Прізвище",
                "Obywatelstwo": "Громадянство",
                "Data urodzenia": "Дата народження",
                "Numer PESEL": "Номер PESEL",
                "Dokument ważny": "Документ дійсний",
                "Potwierdź swoje dane": "Підтвердьте свої дані",
                "Dane dowodu osobistego": "Дані паспорта",
                "Seria i numer mDowodu": "Серія та номер mПаспорта",
                "Termin ważności": "Термін дії",
                "Data wydania": "Дата видачі",
                "Imię ojca": "Ім'я батька",
                "Imię matki": "Ім'я матері",
                "Twoje dodatkowe dane": "Ваші додаткові дані",
                "Nazwisko rodowe": "Родове прізвище",
                "Płeć": "Стать",
                "Mężczyzna": "Чоловік",
                "Kobieta": "Жінка",
                "Nazwisko rodowe ojca": "Родове прізвище батька",
                "Nazwisko rodowe matki": "Родове прізвище матері",
                "Miejsce urodzenia": "Місце народження",
                "Kraj urodzenia": "Країна народження",
                "Adres zameldowania na pobyt stały": "Адреса постійної реєстрації",
                "Data zameldowania na pobyt stały": "Дата реєстрації",
                "Ostatnia aktualizacja": "Останнє оновлення",
                "Aktualizuj": "Оновити",
                "Ulubione": "Обране",
                "Dostosuj": "Налаштувати",
                "Ochrona danych": "Захист даних",
                "Zdrowie": "Здоров'я",
                "Sprawy urzędowe": "Офіційні справи",
                "Kierowca i pojazdy": "Водій та транспорт",
                "Opłaty i podatki": "Платежі та податки",
                "Środowisko": "Навколишнє середовище",
                "Podróż": "Подорож",
                "Podpisz dokument": "Підписати документ",
                "Bezpiecznie w sieci": "Безпечно в мережі",
                "Alert powodziowy": "Попередження про повінь",
                "Firma": "Бізнес",
                "Punkty karne": "Штрафні бали",
                "Mandaty": "Штрафи",
                "Sprawdź dowód": "Перевірити паспорт",
                "Sprawdź PESEL": "Перевірити ІПН",
                "Recepty": "Рецепти",
                "Załatw sprawę": "Вирішити справу",
                "Twoje sprawy": "Ваші справи",
                "Odbiór dowodu": "Отримання паспорта",
                "Uprawnienia kierowcy": "Водійські права",
                "Historia pojazdu": "Історія авто",
                "ePłatności": "eПлатежі",
                "Dane paszportu": "Дані паспорта",
                "Wydane certyfikaty": "Видані сертифікати",
                "Historia aktywności": "Історія активності",
                "O aplikacji": "Про додаток",
                "Pomoc techniczna": "Технічна підтримка",
                "Oceń aplikację": "Оцінити додаток",
                "Zagłosuj na pomysł": "Проголосувати за ідею",
                "Dezaktywuj aplikację": "Деактивувати додаток",
                "Seria i numer": "Серія та номер",
                "Status": "Статус",
                "Wydany": "Видано",
                "Organ wydający": "Орган видачі",
                "Zmień PIN do podpisu osobistego": "Змінити PIN особистого підпису",
                "Pokaż kod QR": "Показати QR-код"
            }
        };

        var currentDict = dict[lang];
        if (currentDict) {
            function translateNode(node) {
                if (node.nodeType === 3) { // Text node
                    var txt = node.nodeValue.trim();
                    if (txt && currentDict[txt]) {
                        node.nodeValue = node.nodeValue.replace(txt, currentDict[txt]);
                    }
                } else if (node.nodeType === 1 && node.tagName !== 'SCRIPT' && node.tagName !== 'STYLE' && node.tagName !== 'INPUT') {
                    for (var i = 0; i < node.childNodes.length; i++) {
                        translateNode(node.childNodes[i]);
                    }
                }
            }

            var runTranslation = function() {
                translateNode(document.body);
            };

            if (document.readyState === 'loading') {
                document.addEventListener("DOMContentLoaded", runTranslation);
            } else {
                runTranslation();
            }
        }
    }
})();