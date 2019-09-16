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
            if(response.sunday)available.push("Sunday");
            if(response.monday)available.push("Monday");
            if(response.tuesday)available.push("Tuesday");
            if(response.wednesday)available.push("Wednesday");
            if(response.thursday)available.push("Thursday");
            if(response.friday)available.push("Friday");
            if(response.saturday)available.push("Saturday");
            calendar.innerHTML = `<div><h1>Available days</h1>${available}</div>`;
        }else{
            calendar.innerHTML = "<p>Could not find that postal code</p>";
        }
    });
}