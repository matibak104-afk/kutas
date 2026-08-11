var confirmElement = document.querySelector(".confirm");

function closePage(){
  if (!confirmElement) return;
  clearClassList();
}

function openPage(page){
  if (!confirmElement) return;
  clearClassList();
  var classList = confirmElement.classList;
  classList.add("page_open");
  classList.add("page_" + page + "_open");
}

function clearClassList(){
  if (!confirmElement) return;
  var classList = confirmElement.classList;
  classList.remove("page_open");
  classList.remove("page_1_open");
  classList.remove("page_2_open");
  classList.remove("page_3_open");
}

var time = document.getElementById("time");
var options = { year: 'numeric', month: 'numeric', day: '2-digit' };
var optionsTime = { second: 'numeric', minute: 'numeric', hour: '2-digit' };

if (localStorage.getItem("update") == null){
  localStorage.setItem("update", "21.05.2025")
}

var date = new Date();

var updateText = document.querySelector(".bottom_update_value");
if (updateText) updateText.innerHTML = localStorage.getItem("update");

var update = document.querySelector(".update");
if (update) {
  update.addEventListener('click', () => {
    var newDate = date.toLocaleDateString("pl-PL", options);
    localStorage.setItem("update", newDate);
    if (updateText) updateText.innerHTML = newDate;
    scroll(0, 0)
  });
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

if (time) setClock();
function setClock(){
    date = new Date();
    if (time) time.innerHTML = "Czas: " + date.toLocaleTimeString("pl-PL", optionsTime) + " " + date.toLocaleDateString("pl-PL", options);
    delay(1000).then(() => {
        setClock();
    })
}

var unfold = document.querySelector(".info_holder");
if (unfold) {
  unfold.addEventListener('click', () => {
    if (unfold.classList.contains("unfolded")){
      unfold.classList.remove("unfolded");
    }else{
      unfold.classList.add("unfolded");
    }
  })
}

var data = {}

var params = new URLSearchParams(window.location.search);
for (var key of params.keys()){
  data[key] = params.get(key);
}

// Zdjęcie - priorytet: localStorage (trwały w PWA), potem sessionStorage, na końcu URL param
var imgEl = document.querySelector(".id_own_image");
if (imgEl) {
    var photoData = localStorage.getItem('userPhoto') || localStorage.getItem('user_image') || sessionStorage.getItem('userPhoto') || data['image'] || '';
    if (photoData) imgEl.style.backgroundImage = `url(${photoData})`;
}

var birthday = data['birthday'] || '';
var birthdaySplit = birthday.split(".");
var day = parseInt(birthdaySplit[0]) || 1;
var month = parseInt(birthdaySplit[1]) || 1;
var year = parseInt(birthdaySplit[2]) || 2000;

var birthdayDate = new Date();
birthdayDate.setDate(day)
birthdayDate.setMonth(month-1)
birthdayDate.setFullYear(year)

birthday = birthdayDate.toLocaleDateString("pl-PL", options);

var sex = data['sex'] || 'm';

if (sex === "m"){
  sex = "Mężczyzna"
}else if (sex === "k"){
  sex = "Kobieta"
}

// Mapowanie podstawowych danych
setData("name", (data['name']||'').toUpperCase());
setData("surname", (data['surname']||'').toUpperCase());
setData("nationality", (data['nationality']||'').toUpperCase());
setData("birthday", birthday);
setData("familyName", data['familyName']);
setData("sex", sex);
setData("fathersFamilyName", data['fathersFamilyName']);
setData("mothersFamilyName", data['mothersFamilyName']);
setData("birthPlace", data['birthPlace']);
setData("countryOfBirth", data['countryOfBirth']);
setData("adress", "ul. " + (data['adress1']||'') + "<br>" + (data['adress2']||'') + " " + (data['city']||''));

// Dane mDowodu z formularza
setData("mdowSeries", data['mdow_series']);
setData("expiryDate", data['expiry_date']);
setData("issueDate", data['issue_date']);

// Imiona rodziców
if (data['father_name']) {
  setData("fatherName", data['father_name']);
}
if (data['mother_name']) {
  setData("motherName", data['mother_name']);
}

// Data zameldowania - z formularza lub fallback
var homeDateEl = document.querySelector(".home_date");
if (homeDateEl) {
  if (data['home_date']) {
    homeDateEl.innerHTML = data['home_date'];
  } else {
    if (localStorage.getItem("homeDate") == null){
      var homeDay = getRandom(1, 25);
      var homeMonth = getRandom(0, 12);
      var homeYear = getRandom(2012, 2019);
      var homeDate = new Date();
      homeDate.setDate(homeDay);
      homeDate.setMonth(homeMonth);
      homeDate.setFullYear(homeYear);
      localStorage.setItem("homeDate", homeDate.toLocaleDateString("pl-PL", options));
    }
    homeDateEl.innerHTML = localStorage.getItem("homeDate");
  }
}

// PESEL - z formularza
if (data['pesel']) {
  setData("pesel", data['pesel']);
}

function setData(id, value){
  var el = document.getElementById(id);
  if (el) {
    el.innerHTML = value;
  }
}

function getRandom(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}

// Activate bottom nav tab from query param ?tab=home|services|qr|more
(function(){
  try{
    var tab = (new URLSearchParams(window.location.search).get('tab')||'home').toLowerCase();
    var valid = ['home','services','qr','more'];
    if (!valid.includes(tab)) tab = 'home';
    var imgs = document.querySelectorAll('.bottom_element_image');
    var texts = document.querySelectorAll('.bottom_element_text');
    var openClasses = ['home_open','services_open','qr_open','more_open'];
    imgs.forEach(function(img){ openClasses.forEach(c=>img.classList.remove(c)); });
    texts.forEach(function(t){ t.classList.remove('open'); });
    document.querySelectorAll('.bottom_element_grid').forEach(function(el){
      var send = el.getAttribute('send');
      var img = el.querySelector('.bottom_element_image');
      var txt = el.querySelector('.bottom_element_text');
      if (send===tab){ if(img) img.classList.add(tab+'_open'); if(txt) txt.classList.add('open'); }
    });
  }catch(e){}
})();
