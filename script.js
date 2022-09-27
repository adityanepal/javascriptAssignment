var alldata = [];
sdata=sessionStorage.getItem("data");
var eid=0;
if(sdata != null)
{
  const data = csvToArray(sdata);
  console.log(data);
  for(let i=0;i<data.length;i++){
      const a = new Object();
      a.id=data[i].id;
      a.Title=data[i].Title;
      a.Description=data[i].Description;
      a.Completed=data[i].Completed;
      alldata.push(a);
    if(data[i].Completed == "yes"){
      document.querySelector('#notelist').innerHTML += `
          <li class="checked" style="margin-bottom:1%;" id="${data[i].id}">
            <p>${data[i].Title}</p>
            <p>${data[i].Description}</p>
            <button class="buttonEdit" id="buttonEdit" name="buttonEdit"><i class="fa fa-edit"></i></button></i>
            <span class="close">\u00D7</span>
          </li>
      `;
    }else{
      document.querySelector('#notelist').innerHTML += `
          <li class="" style="margin-bottom:1%;" id="${data[i].id}">
            <p>${data[i].Title}</p>
            <p>${data[i].Description}</p>
            <button class="buttonEdit" id="buttonEdit" name="buttonEdit"><i class="fa fa-edit"></i></button></i>
            <span class="close">\u00D7</span>
          </li>
      `;
    };
  }
}
const myForm = document.getElementById("myForm");
const csvFile = document.getElementById("csvFile");
myForm.onchange = function (e) {
  e.preventDefault();
  const input = csvFile.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const text = e.target.result;
    const data = csvToArray(text);
    console.log(e.target);
    for(let i=0;i<data.length;i++){
      const a = new Object();
      a.id=data[i].id;
      a.Title=data[i].Title;
      a.Description=data[i].Description;
      a.Completed=data[i].Completed;
      alldata.push(a);
    }
    console.log(alldata);
    sessionStorage.removeItem("data");
    sesdatachange();
    for(let i=0;i<data.length;i++){
      if(data[i].Completed == "yes"){
        document.querySelector('#notelist').innerHTML += `
            <li class="checked" style="margin-bottom:1%;" id="${data[i].id}">
              <p>${data[i].Title}</p>
              <p>${data[i].Description}</p>
              <button class="buttonEdit" id="buttonEdit" name="buttonEdit"><i class="fa fa-edit"></i></button></i>
              <span class="close">\u00D7</span>
            </li>
        `;
      }else{
        document.querySelector('#notelist').innerHTML += `
            <li class="" style="margin-bottom:1%;" id="${data[i].id}">
              <p>${data[i].Title}</p>
              <p>${data[i].Description}</p>
              <button class="buttonEdit" id="buttonEdit" name="buttonEdit"><i class="fa fa-edit"></i></button></i>
              <span class="close">\u00D7</span>
            </li>
        `;
      };
        closespan();
      }
  };
  
  reader.readAsText(input);
};
function csvToArray(str, delimiter = ",") {
      const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
      const rows = str.slice(str.indexOf("\n") + 1).split("\n");
      const arr = rows.map(function (row) {
        const values = row.split(delimiter);
        const el = headers.reduce(function (object, header, index) {
          object[header] = values[index];
          return object;
        }, {});
        return el;
      });
      return arr;
    }
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.id="sclose";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}
closespan();
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
    id=ev.target.id;
    if(ev.target.classList == "checked"){
      alert(id)
      a=alldata.filter(data=>data.id === id);
      a[0]['Completed']="yes";
      console.log(a);
      alldata=alldata.filter(data=>data.id != id);
      alldata.push(a[0]);
      console.log(alldata);
    }else{
      alert(id)
      a=alldata.filter(data=>data.id === id);
      a[0]['Completed']="no";
      console.log(a);
      alldata=alldata.filter(data=>data.id != id);
      alldata.push(a[0]);
      console.log(alldata);
    }
    
    
    sesdatachange();
  }
  else if(ev.target.id==='buttonEdit'){
    alert("Hello");
    id=ev.target.parentElement.id;
    alert(id);
    a=alldata.filter(data=>data.id === id);
    document.getElementById("stitle").value = a[0]['Title'];
    document.getElementById("sdesc").value = a[0]['Description'];
    eid=id;
  }
}, false);


ssubmit.addEventListener("click",
function newElement() {
  if (document.getElementById("stitle").value   === '' || document.getElementById("sdesc").value === '') {
    alert("You must write something!");
  } else {
    if(eid === 0){
    const a=new Object();
    if(alldata.length === 0){
      a.id='1';
    }else{
      sid=parseInt(alldata[alldata.length-1].id)+1;
      a.id=sid.toString();
    };
      title=document.getElementById("stitle").value
      alert(title);
      a.Title= document.getElementById("stitle").value;
      a.Description = document.getElementById("sdesc").value;
      a.Completed = "no";
      document.querySelector('#notelist').innerHTML += `
            <li style="margin-bottom:1%;" id="${a.id}">
              <p>${a.Title}</p>
              <p>${a.Description}</p>
              <button class="buttonEdit" id="buttonEdit" name="buttonEdit"><i class="fa fa-edit"></i></button></i>
              <span class="close">\u00D7</span>
            </li>
        `;
      alldata.push(a);
      closespan();
    }else{
      alert("edit Code");
      id=eid;
      a=alldata.filter(data=>data.id === id);
      a[0]['Title']= document.getElementById("stitle").value;
      a[0]['Description'] = document.getElementById("sdesc").value;
      alldata=alldata.filter(data=>data.id != id);
      alldata.push(a[0]);
      console.log(alldata);
      eid=0;
    }
  }
  document.getElementById("stitle").value = "";
  document.getElementById("sdesc").value = "";
  console.log(alldata);
  sessionStorage.removeItem("data");
  sesdatachange();
  console.log(alldata);
  location.reload();
});


ssave.addEventListener("click",
  function writeCsv(){
    const csvString = [
      [
        "id",
        "Title",
        "Description",
        "Completed"
      ],
      ...alldata.map(item => [
        item.id,
        item.Title,
        item.Description,
        item.Completed
      ])
    ]
      .map(e => e.join(",")) 
     .join("\n");
     var hiddenElement = document.createElement('a');
     hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvString);  
     hiddenElement.target = '_blank';  
     //provide the name for the CSV file to be downloaded  
     hiddenElement.download = 'data.csv';
     hiddenElement.click();
  });
  function closespan(){
    var close = document.getElementsByClassName("close");
    var i;
    for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
      alldata=alldata.filter(data=>data.id != div.id);
      alert(div.id)
      console.log(alldata);
      sessionStorage.removeItem("data");
      alert(alldata.length);
      if(alldata.length<1){
        alldata=[];
      }else{
          sesdatachange();
         console.log(alldata);  
      }
    }
  }
  }




  function sesdatachange(){
    const csvString = [
      [
        "id",
        "Title",
        "Description",
        "Completed"
      ],
      ...alldata.map(item => [
        item.id,
        item.Title,
        item.Description,
        item.Completed
      ])
    ]
      .map(e => e.join(",")) 
     .join("\n");
     sessionStorage.setItem("data",csvString);
  }