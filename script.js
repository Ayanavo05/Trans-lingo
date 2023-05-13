//all variables 
const selectTag = document.querySelectorAll("select");
const fromtext =document.querySelector(".fromtext");
const totext=document.querySelector(".totext");
translation = document.querySelector("button");


icon =document.querySelectorAll(".idea");

//for getting option values.
selectTag.forEach(tag =>{
    for( const lang_code in languages){
        let option = `<option value="${lang_code}">${languages[lang_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
})

//translate button function & fetching api
translation.addEventListener("click",()=>{
    let text=fromtext.value;
    trans_from=selectTag[0].value;
    trans_to=selectTag[1].value;
    //api fetch
    let transapi=`https://api.mymemory.translated.net/get?q=${text}&langpair=${trans_from}|${trans_to}`;
    //work on api
    fetch(transapi).then(res => res.json()).then(data =>{
        console.log(data);
        totext.value=data.responseData.translatedText;
    });
});

//volume button
icon.forEach(icon =>{
    icon.addEventListener("click",({target}) =>{
        if(target.classList.contains("fa-copy")){
          if(target.id="from1"){
            navigator.clipboard.writeText(fromtext.value);
          } 
          else if(target.id="to1"){
            navigator.clipboard.writeText(totext.value);
            console.log("You are a good boy.");
          } 
        }
        else{
            let speech;
            //voice
            if(target.id="from2"){
                speech=new SpeechSynthesisUtterance(fromtext.value);
                speech.lang= selectTag[0].value;
            }
            else if(target.id="to2"){
                speech=new SpeechSynthesisUtterance(totext.value);
                speech.lang= selectTag[1].value;   
            }
            speechSynthesis.speak(speech);
        }
    })
})