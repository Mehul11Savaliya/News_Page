window.onload = () => {
  let btss = Array.from(document.querySelectorAll(".btn"));
  let data = document.getElementById("data");

  let updatecard = (title, auther, date, time, content, redmrurl, iurl) => {
  
    let card = document.createElement("div");
    card.setAttribute("class", "card mb-3");
    // let img = document.createElement("img");
    // img.setAttribute("class","img-fluid rounded-start");
    // img.setAttribute("src",iurl);
    // img.setAttribute("alt","loading img!");
    // let cardbdy = document.createElement("div");
    // cardbdy.setAttribute("class","card-img-overlay");
    // let ttl = document.createElement("h5");
    // ttl.setAttribute("class","card-title");
    // ttl.innerHTML=title;
    // let tnode =  `<p class="card-text">`+content+`</p>
    // <p class="card-text"><small class="text-muted">`+date+` || `+time+` || `+auther+`</small></p>
    // `;
    // card.appendChild(img);
    // cardbdy.appendChild(ttl);
    // cardbdy.innerHTML=tnode;
    // card.appendChild(cardbdy);
    card.innerHTML = `<div class="row g-0">
<div class="col-md-4">
  <img src="`+ iurl + `" class="img-fluid rounded-start" alt="loading img!">
</div>
<div class="col-md-8">
  <div class="card-body">
    <h5 class="card-title">`+ title + `</h5>
    <p class="card-text">`+ content + `</p>
    <p class="card-text"><small class="text-muted">`+ date + ` || ` + time + ` || ` + auther + `</small></p>
    <a href="`+ redmrurl + `" class="btn btn-primary">Read More</a>
  </div>
</div>
</div>`;
    data.appendChild(card);
  
  }

  let parser = (catagory) => {
    try {
      fetch(`https://inshorts.deta.dev/news?category=` + catagory)
        .then(response => response.json())
        .then(json => {
          let ar = json.data;
          for (let js of ar) {
            //(title,auther,date,time,content,redmrurl,iurl)
            updatecard(js.title, js.author, js.date, js.time, js.content, js.readMoreUrl, js.imageUrl);
          }
          $("#loadinsp").hide();
        })
    } catch (error) {
      alert("error");
    }
  }

    parser("all");

  let handle = (evt) => {
    if (evt.target.innerHTML == "Other-Catagory") {
    }
    else {
      $("#loadinsp").show();
      data.innerHTML = "";
     btss.forEach((bt)=>{
      if(bt!=evt.target){
            $(bt).removeClass("active");
      }
     });
     $(evt.target).addClass("active");

     let sp = document.getElementById("btt");
     sp.innerHTML=`Showing : `+evt.target.innerHTML+` NEWS `;
      parser(evt.target.innerHTML.toLowerCase());
    }
  }

  btss.forEach((bt) => {
    

    bt.addEventListener("click", handle);
  });
}