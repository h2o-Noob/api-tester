let addparam = document.getElementById("addParam");
let count = 1;

let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';

let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';
})

let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'block';
    document.getElementById('parametersBox').style.display = 'none';
})

addparam.addEventListener("click", (e) => {

    count++

    let params = `<div class="form-row my-2">
    <label for="url" class="col-sm-2 col-form-label">Parameter ${count}</label>
    <div class="col-md-4">
        <input type="text" class="form-control" id="parameterKey${count}" placeholder="Enter Parameter ${count} Key">
    </div>
    <div class="col-md-4">
        <input type="text" class="form-control" id="parameterValue${count}" placeholder="Enter Parameter ${count} Value">
    </div>
    <button class="btn btn-primary deleteparam">-</button>
    </div>`;

    document.getElementById("params").innerHTML += params

    let deleteParam = document.getElementsByClassName('deleteparam');
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            // TODO: add a confirmation box to confirm parameter deletion
            e.target.parentElement.remove();
            count--
        })
    }
});

let submit = document.getElementById("submit")

submit.addEventListener('click', ()=>{

    let url = document.getElementById("url").value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;

    if (contentType == 'params') {
        data = {};
        for (let i = 0; i <count + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value; 
            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('requestJsonText').value;
    }

    console.log(data)

    if(requestType == "GET")
    {
        fetch(url, 
            {
                method : "GET",
            })
            .then(response => response.text())
            .then((text) =>{
                // document.getElementById('responseJsonText').value = text;
                document.getElementById('responsePre').innerHTML = text;
                console.log(text)
                //Prism.highlightAll();
            });
    }

    else{
        fetch(url, {
            method: 'POST', 
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              }  
        })
        .then(response=> response.text())
        .then((text) =>{
            // document.getElementById('responseJsonText').value = text;
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
        });

    }
    

})


