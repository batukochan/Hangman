let settings = {
    startPoint: 100,
    endPoint: 1000,
    successPoint: 50,
    fault: 20
};

let words = [
    "PASSPORT",
    "TOURIST",
    "HOTEL",
    "SUITCASE",
    "CARAVAN",
    "AIRPORT",
    "BATHROOM",
    "GARDEN",
    "BALCONY",
    "BEDROOM",
    "HAIRDRESSER",
    "ENGINEER",
    "LAWYER",
    "COOKER",
    "HAMBURGER",
    "CUPBOARD",
    "BOTTLE",
    "MOUNTAIN",
    "ISLAND",
    "FOREST",
    "CUSTOMER",
    "SUPERMARKET",
    "MOTORBIKE",
    "SCOOTER",
    "LORRY",
    "PLANE",
    "TRAIN"
]

let mysteryWord = document.querySelector("#mysteryWord") // id değeri word olan elementi yakalar.

let playbtn = document.querySelector("#playbtn");

function play() {
    if (words.length != 0) {
        let randomNumber = Math.floor(Math.random() * words.length); // Listeden seçilecek kelime için random sayı üretildi.
        let showWord = words[randomNumber]; // Listeden gösterilecek kelime showWord değişkenine atandı.
        console.log(showWord)

        words.splice(randomNumber, 1) // Seçilen kelimeler listeden çıkartıldı.
        console.log(words)

        let showWordStr = showWord.split('') // Seçilen kelime işlenebilmek için array'e çevirildi.
        console.log(showWordStr)
        let wordCharCount = showWordStr.length
        // kelimeyi döngüye sokarak içerisinde bulunan karakterleri "_" ile değiştirmeliyiz. Döngü sayısını seçilen karakterin kelime sayısı olarak kullanabiliriz

        for (let index = 0; index <= wordCharCount ; index++) { showWordStr[index] = "_";}
        console.log(showWordStr)

        // Dönüştürülen kelime bir array olduğu için string ifadeye döndürmeliyiz. String ifadeye dönüştürülen kelime, HTML'de oluşturduğumuz text kısmına yazılmalıdır. Bu nedenle HTML kısmında bulunan ve işlem yapılacak olan elemente id ataması yapılıp, elementin value="" değerine string ifadeye dönüştürülen kelimenin değer ataması yapılmalıdır.
        mysteryWord.value = showWordStr.join(" ");
        playbtn.setAttribute("disabled",true);
    } 
    else{
        alert("Kelimelerin tükendiği yerdeyiz...");
        location.reload();
    }
}
