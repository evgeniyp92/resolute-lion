// Data loader function => I shouldnt be able to make this yet but its here for future reference
var loadJSON = function (fetchWhat) {
    fetch(fetchWhat).then(function (response) {
        console.log(response);
        return response.json();
    }).then(function (data) {
        console.log(data)
        return data;
    }).catch(function (err) {
        console.log(err);
    })
}