let searchPostCode = document.getElementById('searchPostCode');

searchPostCode.onsubmit = (e)=>{
    e.preventDefault();
    let postCode = document.getElementById('postCode').value;
    let base_url = `/api/postcode`;
    fetch(base_url,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            postcode:postCode
        })
    }).then(res=>res.json()).then((response)=>{
        let calendar = document.getElementById('calendar');
        calendar.innerHTML = '';
        console.log(response)
        if(response.found){
            let available = []; 
            if(response.sunday)available.push("<span class='open'>Sunday</span>");else available.push("<span class='closed'>Sunday</span>")
            if(response.monday)available.push("<span class='open'>Monday</span>");else available.push("<span class='closed'>Monday</span>")
            if(response.tuesday)available.push("<span class='open'>Tuesday</span>");else available.push("<span class='closed'>Tuesday</span>")
            if(response.wednesday)available.push("<span class='open'>Wednesday</span>");else available.push("<span class='closed'>Wednesday</span>")
            if(response.thursday)available.push("<span class='open'>Thursday</span>");else available.push("<span class='closed'>Thursday</span>")
            if(response.friday)available.push("<span class='open'>Friday</span>");else available.push("<span class='closed'>Friday</span>")
            if(response.saturday)available.push("<span class='open'>Saturday</span>");else available.push("<span class='closed'>Saturday</span>")
            calendar.innerHTML = `<div><h1>Available days</h1>${available}</div>`;
        }else{
            calendar.innerHTML = "<p>Could not find that postal code</p>";
        }
    });
}