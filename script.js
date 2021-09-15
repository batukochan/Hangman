let settings = {
    startPoint: 100,
    endPoint: 1000,
    successPoint: 50,
    fault: 20
};

let words = ["PASSPORT", "TOURIST", "HOTEL", "SUITCASE", "CARAVAN","AIRPORT", "BATHROOM", "GARDEN", "BALCONY", "BEDROOM","ENGINEER", "LAWYER", "COOKER", "HAMBURGER","CUPBOARD", "BOTTLE", "MOUNTAIN", "ISLAND", "FOREST", "CUSTOMER","SUPERMARKET", "MOTORBIKE", "SCOOTER", "LORRY", "PLANE", ]

let mysteryWord = document.querySelector("#mysteryWord") // id değeri word olan elementi yakalar.
let playbtn = document.querySelector("#playbtn");


let randomNumber = Math.floor(Math.random() * words.length); // Listeden seçilecek kelime için random sayı üretildi.
let showWord = words[randomNumber]; // Listeden gösterilecek kelime showWord değişkenine atandı.
let showWordStr = showWord.split(''); // Seçilen kelime işlenebilmek için array'e çevirildi.
let wordCharCount = showWordStr.length; // Karakter sayısı
/**
 * Ekrandaki Play tuşuna tıklandığında, ekrana kelimeyi "_ _ _ _..." şeklinde yazdırır.
 * Play tuşuna basıldığında oyun başlar ve bir daha tıklama işlemi yapılamaz.
 * Reset tuşuna basıldığında oyun sıfırlanır. 
 */
function play() {
    if (words.length != 0) {
        words.splice(randomNumber, 1); // Seçilen kelimeler listeden çıkartıldı.
        // kelimeyi döngüye sokarak içerisinde bulunan karakter sayısı kadar "_" ekrana yazdırılmalıdır.. Döngü sayısını seçilen karakterin kelime sayısı olarak kullanabiliriz
        for (index = 0; index < wordCharCount; index++) { panelDiv(); }
        // Dönüştürülen kelime bir array olduğu için string ifadeye döndürmeliyiz. String ifadeye dönüştürülen kelime, HTML'de oluşturduğumuz text kısmına yazılmalıdır. Bu nedenle HTML kısmında bulunan ve işlem yapılacak olan elemente id ataması yapılıp, elementin value="" değerine string ifadeye dönüştürülen kelimenin değer ataması yapılmalıdır.
        playbtn.setAttribute("disabled", true);
    }
    else {
        alert("Kelimelerin tükendiği yerdeyiz...");
        location.reload();
    }
}

var panelDivs = document.querySelector("#divPanel");
/**
 * Div oluşturur.
 */
function panelDiv() {
    var etiket = document.createElement("div"); //JavaScript ile DIV oluşturma  
    etiket.classList = "wordPanel"; //nesneye .kutu stilini ekleme
    panelDivs.appendChild(etiket); //nesneyi panel divine ekleme
}

let myButtons = document.querySelectorAll("Button");
for (i = 0; i < myButtons.length; i++) {
    myButtons[i].addEventListener("click", wordClick);
} // button elementine sahip kutuların, click anında wordClick fonksiyonunu çalıştırması için kullanıldı.

let trueCounter = 0;
let mistakeCounter = 0; // hataların sayıldığı değişkendir.
let isHanged = false; //Bu değişken sayesinde, adamın asılma durumu kontrol edilir.
/**
 * Seçilen harf kelimede var mı kontrol eder.
 * Eğer harf varsa olan harfler açılır. Oyun puanına 50 eklenir. //function
 * Eğer harf yoksa adam asılmaya başlanır ve her yanlış harfde 20 puan kesilir //function
 * 
 */
function wordClick(event) {

    let char = event.target.value; // Harf
    let charIndex = showWordStr.indexOf(char); // Harfin indeksi
    let charIndex2 = showWordStr.indexOf(char, charIndex+1); // Harfin indeksi
    let selectedDiv = document.getElementsByClassName("wordPanel"); // wordPanel adına sahip div elementleri array olarak alındı.

    if (charIndex == -1 ) { //eğer harf yoksa
        mistakeCounter += 1;
        settings.startPoint -= settings.fault;
        pointer();
        document.querySelector("#hangmanPosition").setAttribute("src", `./images/man${mistakeCounter + 1}.png`)
        if (mistakeCounter == 6) {
            isHanged = true;
        }
    } else { // harf varsa
        trueCounter += 1;
        settings.startPoint += settings.successPoint;
        selectedDiv[charIndex].innerHTML = char;
        if (charIndex2 >= 0){
        selectedDiv[charIndex2].innerHTML = char;}
        if (trueCounter == showWordStr.length){
        playbtn.removeAttribute("disabled", true);
        }
        pointer();
        }
     end();
    }

    /**
     * pointbox'a atama yapıldığı durumlarda kullanılır.
     */
    function pointer() {
        document.getElementById("pointBox").innerHTML = settings.startPoint;
    }

    /**
     * Tuşların çalışma durumunu kontrol eder.
     */
    function buttonsControlDisabled() {
        for (i = 0; i < myButtons.length; i++) {
            myButtons[i].setAttribute("disabled", true);
        }
    }


    /**
     * Oyunun bittiği durumlarda kullanılır.
     */
    function end() {
        if (settings.startPoint <= 0 || settings.startPoint >= settings.endPoint || isHanged == true) {
            pointer();
            setTimeout(function () {
                alert("Tehlikeli oyunlar oynamak istiyor insan; bir yandan da kılına zarar gelsin istemiyor.");
                location.reload();
            }, 500);
            buttonsControlDisabled(); // Tuşlar etkisiz duruma getirildi.
        }
    }
